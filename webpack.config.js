const path = require('path')

module.exports = {
  mode: 'development',
  entry: { 
  index: './src/index.js',
  cont_ems: './src/cont_ems.js'
},
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: '[name].bundle.js'
  },
  watch: true
}