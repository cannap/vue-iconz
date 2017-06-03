const path = require('path')
const camelize = require('camelize')
const { promisify } = require('util')
const { writeFileSync, readFileSync, existsSync, unlinkSync } = require('fs')
const cheerio = require('cheerio')
const glob = promisify(require('glob'))
const dist = path.resolve('dist')
const _ = require('underscore')
var rimraf = require('rimraf')
var attrs = ['xlink:href', 'clip-path', 'fill-opacity', 'fill']
var mkdirp = require('mkdirp')
const template = require('./template')
const iconSets = {
  mdi: './tmpicon/icons/mdi/icons/svg/*.svg',
  fa: './tmpicon/icons/fa/black/svg/*.svg',
  oct: './tmpicon/icons/oct/lib/svg/*.svg',
  ti: './tmpicon/icons/ti/src/svg/*.svg',
  ion: './tmpicon/icons/ion/src/*.svg'
}
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

async function writeIcon (iconPath) {
  var iconFolder = iconPath.split('/')[3] // Hope this works
  var fileName = path.basename(iconPath, '.svg')
  var componentName = camelize(`${iconFolder}-${fileName}`)

  var destination = path.join(dist, iconFolder, fileName + '.js')
  var folderDest = path.join(dist, iconFolder)

  var iconInfo = {}

  mkdirp(folderDest, function () {
    writeFileSync(destination, generateIcon(iconPath, componentName), 'utf-8')
  })
}

function generateIcon (iconPath, componentName) {
  var svg = readFileSync(iconPath, 'utf-8')

  let $ = cheerio.load(svg, {
    xmlMode: true
  })
  var $svg = $('svg')

  cleanAtrributes($svg, $)
  var content = $svg.html()

  // var viewBox = $svg.attr('viewBox')

  return template({
    componentName,
    content
  })
}

async function generateIcons (path) {
  try {
    const icons = await glob(path)
    //
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

  Promise.all(work)
    .then(data => {
      for (set of data) {
        for (icon of set) {
          iconCount++
          writeIcon(icon).then(generatedIcon => {})
        } //
      }
      console.log(`${iconCount} generated Icons`)
    })
    .catch(err => {
      console.log('error')
    })
})
