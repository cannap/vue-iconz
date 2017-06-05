var paths = require('./config').iconSets
var promisify = require('util').promisify
var { basename } = require('path')
var glob = promisify(require('glob'))
var { findIndex } = require('underscore')
var { writeFileSync } = require('fs')
var jsonminify = require('jsonminify')
var promises = []
for (let path in paths) {
  promises.push(glob(paths[path]))
}

function generateObject (folderPaths) {
  var icons = [
    {
      name: 'Material Design icons',
      url: 'https://materialdesignicons.com/',
      folder: 'mdi',
      set: []
    },
    {
      name: 'Ionicons',
      url: 'http://ionicons.com/',
      folder: 'ion',
      set: []
    },

    {
      name: 'Typicons',
      url: 'http://typicons.com/',
      folder: 'ti',
      set: []
    },
    {
      name: 'Octicons',
      url: 'http://typicons.com/',
      folder: 'oct',

      set: []
    }
  ] //

  return new Promise(function (resolve, reject) {
    for (let folder of folderPaths) {
      for (let file of folder) {
        var originalName = basename(file, '.svg')
        var iconSetName = file.split('/')[3]
        var fileIndex = findIndex(icons, { folder: iconSetName })
        if (fileIndex < 0) {
          reject(new Error(`Iconset not found "${iconSetName}"`))
        }

        var tags = originalName.split('-').join(',')
        console.log(tags)
        icons[fileIndex].set.push({
          name: iconSetName + '-' + originalName,
          tags: tags
        })
      } //
    }

    for (let iconSet of icons) {
      writeFileSync(
        `./static/data/${iconSet.folder}.json`,
        jsonminify(JSON.stringify(iconSet))
      )
    }
    writeFileSync(`./static/data/all.json`, jsonminify(JSON.stringify(icons)))
    resolve(icons)
  })
} //

Promise.all(promises)
  .then(folderPaths => {
    generateObject(folderPaths).then(icons => {
      var fileContent = `export default  ${JSON.stringify(icons)}`

      writeFileSync('./docs/icons.js', fileContent)
    })
  })
  .catch(err => {
    console.log(err)
  })
