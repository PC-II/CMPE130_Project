const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    submit: path.resolve(__dirname, 'src/submit.js'),
    firebase: path.resolve(__dirname, 'src/firebase.js'),
    results: path.resolve(__dirname, 'src/results.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
  },
  watch: true,
}