// Karma configuration
// Generated on Sat Nov 21 2015 16:55:19 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern : 'libs/jquery/dist/jquery.min.js', watched :false},
      {pattern : 'libs/angular/angular.js', watched :false},
      {pattern : 'libs/angular-mocks/angular-mocks.js', watched :false},
      {pattern : 'libs/angular-material/angular-material.js', watched :false},
      {pattern : 'libs/modernizr/modernizr.js', watched :false},
      {pattern : 'libs/highcharts-ng/dist/highcharts-ng.js', watched :false},
      {pattern : 'libs/highcharts/highcharts.js', watched :false},
      {pattern : 'libs/angular-bootstrap/ui-bootstrap.min.js', watched :false},
      {pattern : 'libs/angular-bootstrap/ui-bootstrap-tpls.min.js', watched :false},
      {pattern : 'libs/angular-strap/dist/angular-strap.min.js', watched :false},
      {pattern : 'libs/angular-strap/dist/angular-strap.tpl.min.js', watched :false},
      {pattern : 'libs/bootstrap-material-design/dist/js/ripples.min.js', watched :false},
      {pattern : 'libs/bootstrap-material-design/dist/js/material.min.js', watched :false},
      {pattern : 'libs/angular-animate/angular-animate.min.js', watched :false},
      {pattern : 'libs/angular-route/angular-route.min.js', watched :false},
      {pattern : 'libs/angular-aria/angular-aria.min.js', watched :false},
      {pattern : 'libs/hammerjs/hammer.min.js', watched :false},
      {pattern : 'libs/angular-busy/dist/angular-busy.js', watched :false},

      {pattern : 'app.js', watched :true},
      {pattern : 'service/*.js', watched :true},
      {pattern : 'directive/*/*.html', watched :false},
      {pattern : 'directive/*/*.js', watched :true},
      {pattern : 'test/*/*spec.js', watched :true}
    ],


    // list of files to exclude
    exclude: [
    ],


    preprocessors: {
      'directive/**/*.html': ['ng-html2js'],
      'service/*.js': ['coverage'],
      'directive/*/*.js': ['coverage']

    },

    ngHtml2JsPreprocessor: {
      moduleName: 'html2jsTemplates'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


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
    browsers: ['PhantomJS'],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      "karma-coverage",
      'karma-ng-html2js-preprocessor'
    ],

    // optionally, configure the reporter
    coverageReporter: {
      dir : 'coverage/',
      reporters:[
        {type: 'html',file : 'coverage.html'}
      ]
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  });
};
