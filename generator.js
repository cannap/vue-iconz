const path = require('path')
const camelize = require('camelize')
const { promisify } = require('util')
const { readFileSync } = require('fs')

const iconSets = require('./config').iconSets

var filndir = require('filendir')
const cheerio = require('cheerio')
const glob = promisify(require('glob'))
const dist = path.resolve('dist')

const _ = require('underscore')
var rimraf = require('rimraf')
var attrs = ['xlink:href', 'clip-path', 'fill-opacity', 'fill']
const template = require('./template')
var cleanAtrributes = function ($el, $) {
  _.each(attrs, function (attr) {
    $el.removeAttr(attr)
  })
  if ($el.children().length === 0) {
    return false
  } //

  $el.children().each(function (index, el) {
    cleanAtrributes($(el), $)
  })
}

//
function writeIcon (iconPath) {
  var iconFolder = iconPath.split('/')[3] // Hope this works

  var fileName = path.basename(iconPath, '.svg')
  var componentName = camelize(`${iconFolder}-${fileName}`)

  var destination = path.join(dist, iconFolder, fileName + '.js')

  filndir.ws(destination, generateIcon(iconPath, componentName), 'utf-8')
}

function generateIcon (iconPath, componentName) {
  var svg = readFileSync(iconPath, 'utf-8')

  let $ = cheerio.load(svg, {
    xmlMode: true
  })
  var $svg = $('svg')

  cleanAtrributes($svg, $)
  var content = $svg.html()

  var viewBox = $svg.attr('viewBox')
  return template({
    componentName,
    content,
    viewBox
  })
}

async function generateIcons (path) {
  try {
    const icons = await glob(path)

    return icons
  } catch (error) {
    console.log(error)
  }
} //

rimraf(dist, () => {
  var work = []
  var iconCount = 0
  for (let set in iconSets) {
    work.push(generateIcons(iconSets[set]))
  }
  var data = []
  Promise.all(work)
    .then(data => {
      for (let set of data) {
        let iconFolder = set[0].split('/')[3]

        const imports =
          set
            .map(iconPath => {
              let fileName = path.basename(iconPath, '.svg')
              let componentName = camelize(`${iconFolder}-${fileName}`)

              return `var ${componentName} = require('./${fileName}').default`
            })
            .join('\n') + '\n'

        const exports =
          set
            .map(iconPath => {
              let fileName = path.basename(iconPath, '.svg')
              let componentName = camelize(`${iconFolder}-${fileName}`)
              return `${componentName},`
            })
            .join('\n') + '\n'

        const indexJS = `
${imports}
module.exports = {
  ${exports}
}

`
        var destination = path.join(dist, iconFolder, 'index.js')
        filndir.ws(destination, indexJS, 'utf-8')
        for (let icon of set) {
          iconCount++
          writeIcon(icon)
        } //

        filndir.ws(
          './docs/iconCount.js',
          `export default { iconCount: ${iconCount} }\n`
        )
      }
    })
    .catch(err => {
      console.log('error', err)
    })
})
