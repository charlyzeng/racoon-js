// Karma configuration
// Generated on Tue Jan 05 2021 17:54:02 GMT+0800 (GMT+08:00)

const resolve = require('@rollup/plugin-node-resolve').default;
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

const watch = Object.prototype.hasOwnProperty.call(process.env, 'WATCH');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'detectBrowsers'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.test.js',
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.test.js': ['rollup'],
    },

    rollupPreprocessor: {
      output: {
        format: 'umd',
        name: 'racoon',
        sourcemap: 'inline',
      },
      plugins: [
        json(),
        commonjs(),
        resolve(),
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'runtime',
        }),
      ],
    },

    detectBrowsers: {
      // enable/disable, default is true
      enable: true,

      // enable/disable phantomjs support, default is true
      usePhantomJS: false,

      // use headless mode, for browsers that support it, default is false
      preferHeadless: false,

      // post processing of browsers list
      // here you can edit the list of browsers used by karma
      postDetection(installedBrowsers) {
        // Can not launch Edge. For detail to see the follow issue:
        // https://github.com/MicrosoftEdge/edge-launcher/issues/23
        return installedBrowsers.filter(browser => browser !== 'Edge');
      },
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: watch,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'Firefox', 'Safari', 'Edge'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !watch,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
