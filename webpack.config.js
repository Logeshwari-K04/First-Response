const path = require('path')

module.exports = {
  mode: 'development',
  entry: { 
  index: './src/index.js',
  cont_ems: './src/cont_ems.js',
  call_fa: './src/call_fa.js',
},
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: '[name].bundle.js'
  },
  watch: true,
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, 'node_modules/@firebase/app'),
      'firebase/firestore': path.resolve(__dirname, 'node_modules/@firebase/firestore'),
      // add more aliases for other Firebase modules if needed
    },
    extensions: ['.js'],
  },
};