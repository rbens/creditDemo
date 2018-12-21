// Karma configuration
// Generated on Sat Nov 21 2015 16:55:19 GMT+0100 (CET)
const webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            './test/index.test.js'
        ],


        // list of files to exclude
        exclude: [],


        preprocessors: {
            './test/index.test.js': ['webpack']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'html2jsTemplates'
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },

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
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless'],

        // Which plugins to enable
        plugins: [
            "karma-jasmine",
            "karma-webpack",
            'karma-babel-preprocessor',
            'karma-chrome-launcher',
            'karma-coverage-istanbul-reporter'
        ],

        // optionally, configure the reporter
        reporters: [ 'progress', 'coverage-istanbul' ],
        coverageIstanbulReporter: {
            reports: [ 'text-summary' ],
            fixWebpackSourcePaths: true
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    });
};
