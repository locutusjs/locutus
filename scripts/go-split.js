var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
// var indentString = require('indent-string')
var stripIndent = require('strip-indent')
var mainFile = process.argv[2]
var mainPackage = process.argv[3] || '*'
var __root = path.dirname(__dirname)

function cleanFile (filepath, cb) {
  exec(__root + '/node_modules/.bin/invig --src ' + filepath, function (err, stdout) {
    if (err) {
      // throw new Error(err)
    }
    console.log('Cleaned: ' + filepath)
    if (cb) {
      cb(null)
    }
  })
}

function splitFunctions (pkgNameSlug, pkgContent) {
  var fncMatches = pkgContent.match(/^\s+([a-zA-Z]+) = function([\s\S]+?)\$pkg\.[a-zA-Z]+ = [a-zA-Z]+$/mg)
  if (!fncMatches) {
    return
  }

  fncMatches.forEach(function (fncBody) {
    var parsed = fncBody.match(/^\s+([a-zA-Z]+)/)
    var fncName = parsed[1]
    var fncNameSlug = fncName.replace(/[^A-Za-z0-9]+/g, '-')
    var fncFile = 'split-' + pkgNameSlug + '-' + fncNameSlug + '.js'
    var fncContent = fncBody

    fncContent = stripIndent(fncBody)
    fncContent = fncContent.replace(/([a-zA-Z]+) = function/, 'module.exports = function $1')
    fncContent = fncContent.replace(/^\$pkg\..+$/mg, '').trim() + '\n'

    fs.writeFile(fncFile, fncContent, 'utf-8', function (err) {
      if (err) {
        // throw new Error(err)
      }
      console.log('Written: ' + fncFile)
      cleanFile(fncFile)
    })
  })
}

function splitPackages (buf) {
  var pkgs = buf.split(/^ {2}\$packages\['/m)
  pkgs.forEach(function (pkg) {
    var matches = pkg.match(/(.+)']\s*=/)
    if (!matches) {
      return
    }

    var pkgName = matches[1]
    var pkgNameSlug = pkgName.replace(/[^A-Za-z0-9]+/g, '-')
    var pkgContent = 'var $packages; $packages[\'' + pkg

    if (mainPackage !== '*' && mainPackage !== pkgName) {
      return
    }

    splitFunctions(pkgNameSlug, pkgContent)
  })
}

var buf = fs.readFileSync(mainFile, 'utf-8')
splitPackages(buf)
