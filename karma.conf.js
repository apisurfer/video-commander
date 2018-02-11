module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
      'karma-jasmine',
      'karma-html2js-preprocessor',
      'karma-chrome-launcher'
    ],

    browserNoActivityTimeout: 60000,
    frameworks: ['jasmine'],
    files: [
      {pattern: 'test/player-fixtures.html', watched: true, served: true, included: true},
      {pattern: 'dist/*.js', watched: true, served: true, included: true},
      {pattern: 'test/index.js', watched: true, served: true, included: true}
    ],
    exclude: [],
    preprocessors: {
      '**/*.html': ['html2js']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
