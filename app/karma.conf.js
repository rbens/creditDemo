// Karma configuration
// Generated on Sat Nov 21 2015 16:55:19 GMT+0100 (CET)
const webpackConfig = require('./webpack.base.js');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            './node_modules/angular/angular.js',
            './vendor.js',
            './app.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './test/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        preprocessors: {
            './vendor.js': ['webpack'],
            './app.js': ['webpack'],
            './test/**/*.js': ['babel']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'html2jsTemplates'
        },
        webpack: webpackConfig,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Which plugins to enable
        // plugins: [
        //     "karma-phantomjs-launcher",
        //     "karma-jasmine",
        //     "karma-coverage",
        //     'karma-ng-html2js-preprocessor'
        // ],

        // optionally, configure the reporter
        // coverageReporter: {
        //     dir: 'coverage/',
        //     reporters: [
        //         {type: 'html', file: 'coverage.html'}
        //     ]
        // },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
