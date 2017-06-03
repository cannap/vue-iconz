var fs = require('fs')
var filetree = {}

var toScan = './dist'
const dirTree = require('directory-tree')
const tree = dirTree('./dist')
const jsonfile = require('jsonfile')
console.log(tree)
/*
jsonfile.writeFile('./docs/icons.json', tree, function (err) {
  console.error(err)
})
*/

fs.writeFile('./docs/icons.js', tree)
