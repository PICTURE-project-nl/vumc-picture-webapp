const path = require('path')

/*
A config for Webstorm so it can resolve import paths.
See: https://blog.jetbrains.com/webstorm/2017/06/webstorm-2017-2-eap-172-2827/
 */

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
