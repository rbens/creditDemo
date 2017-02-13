/*jslint node: true */
'use strict';

var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules','libs','coverage','dist','temp'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function(file){
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 ||
                !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function(pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function(patterns){
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            main: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    livereload: 35729
                }
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: createFolderGlobs('*.js')
            }
        },
        clean: {
            before:{
                src:['dist','temp']
            },
            after: {
                src:['temp']
            }
        },
        less: {
            development: {
                options: {
                },
                files: {
                    "public/styles/css/credit.css": "public/styles/less/credit.less"
                }
            },
            production: {
                options: {
                },
                files: {
                    'temp/app.css': 'app.less'
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js','*.less','*.html','*.json']),'!_SpecRunner.html','!.grunt'],
                tasks: ['less:development']
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: 'mainApp',
                    htmlmin:'<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'),'!index.html','!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['config/**'], dest: 'dist/',filter:'isFile',expand:true},
                    {cwd: 'public/flaticon/',src: ['**.woff','**.ttf'], dest: 'dist/',filter:'isFile',expand:true},
                    {src: ['public/img/**'], dest: 'dist/',filter:'isFile',expand:true},
                    {src: ['public/styles/**'], dest: 'dist/',filter:'isFile',expand:true},
                    {src: ['views/**/**.html'], dest: 'dist/',filter:'isFile',expand:true},
                    {src: ['directive/**/**.html'], dest: 'dist/',filter:'isFile',expand:true}
                ]
            }
        },
        dom_munger:{
            read: {
                options: {
                    read:[
                        {selector:'script[data-concat!="false"]',attribute:'src',writeto:'appjs'},
                        {selector:'link[rel="stylesheet"][data-concat!="false"]',attribute:'href',writeto:'appcss'}
                    ]
                },
                src: 'index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]','link[rel="stylesheet"][data-remove!="false"]'],
                    append: [
                        {selector:'body',html:'<script src="app.full.min.js"></script>'},
                        {selector:'head',html:'<link rel="stylesheet" href="app.full.min.css">'}
                    ]
                },
                src:'index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src:['temp/app.css','<%= dom_munger.data.appcss %>'],
                dest:'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>','<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngAnnotate: {
            main: {
                src:'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest:'dist/app.full.min.js'
            }
        },
        'string-replace': {
            prod: {
                files: {
                    'dist/app.full.min.js':'dist/app.full.min.js'
                },
                options: {
                    replacements: [{
                        pattern: /localhost:8090/g,
                        replacement: 'credit-immo.eu-central-1.elasticbeanstalk.com/'
                    }]
                }
            },
            local: {},
            dev: {
                files: {
                    'dist/app.full.min.js':'dist/app.full.min.js'
                },
                options: {
                    replacements: [{

                        pattern: /localhost:8090/g,
                        replacement: 'credit-immo-dev.eu-central-1.elasticbeanstalk.com/'
                    }]
                }
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        karma: {
            options: {
                frameworks: ['jasmine'],
                files: [  //this files data is also updated in the watch handler, if updated change there too
                    '<%= dom_munger.data.appjs %>',
                    'libs/angular/angular.js',
                    'libs/angular-mocks/angular-mocks.js',
                    createFolderGlobs('*-spec.js')
                ],
                reporters:['coverage'],
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true
            },
            during_watch: {
                browsers: ['PhantomJS']
            }
        }
    });
    var target = grunt.option('target') || 'local';
    grunt.registerTask('build',['jshint','clean:before','less','dom_munger','ngtemplates','cssmin','concat','ngAnnotate','uglify',['string-replace:']+target,'copy','htmlmin','clean:after']);
    grunt.registerTask('serve', ['dom_munger:read','jshint','connect', 'watch']);
    grunt.registerTask('test',['dom_munger:read','karma:all_tests']);
};

