// poi.config.js
var IgnorePlugin= require('webpack').IgnorePlugin
module.exports = {
  webpack(config) {

 config.plugins.push(new IgnorePlugin(/icons/))
///  config.plugins.push(new IgnorePlugin(/dist/))
 // config.plugins.push(new IgnorePlugin(/dest/))
    return config // <-- Important, must return it
  }
}