// Karma configuration
// Generated on Sat Nov 21 2015 16:55:19 GMT+0100 (CET)
const path = require('path');
const webpackConfig = require('./webpack.test.js');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-jquery','jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'test/index.test.js',
            // fixtures
            {pattern: 'test/*.json', watched: true, served: true, included: false}
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
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--disable-web-security'
                ]
            }
        },

        // Which plugins to enable
        plugins: [
            "karma-jasmine",
            "karma-webpack",
            'karma-babel-preprocessor',
            'karma-chrome-launcher',
            'karma-jasmine-jquery',
            'karma-coverage-istanbul-reporter'
        ],

        // optionally, configure the reporter
        reporters: [ 'progress', 'coverage-istanbul' ],
        coverageIstanbulReporter: {
            reports: [ 'html','text-summary' ],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

    });
};
