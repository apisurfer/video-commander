const path = require('path');

module.exports = {
  entry: {
    videoCommander: './src/index.js',

    vcProviderFacebook: './src/providers/facebook/index.js',
    vcProviderYoutube: './src/providers/youtube/index.js',
    vcProviderTwitch: './src/providers/twitch/index.js',
    vcProviderVimeo: './src/providers/vimeo/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: '[name]'
  },
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 3 versions']
                }
              }]
            ],
            plugins: ['transform-class-properties', 'transform-object-rest-spread']
          }
        }
      }
    ]
  }
};