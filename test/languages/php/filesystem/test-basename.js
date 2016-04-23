XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var basename = require('/Users/kvz/code/phpjs/src/php/filesystem/basename.js')

describe('php.filesystem.basename.js', function () {
  it('should pass example 1', function (done) {
    basename('/www/site/home.htm', '.htm')
    var expected = 'home'
    var result = basename('/www/site/home.htm', '.htm')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    basename('ecra.php?p=1')
    var expected = 'ecra.php?p=1'
    var result = basename('ecra.php?p=1')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    basename('/some/path/')
    var expected = 'path'
    var result = basename('/some/path/')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    basename('/some/path_ext.ext/','.ext')
    var expected = 'path_ext'
    var result = basename('/some/path_ext.ext/','.ext')
    expect(result).to.deep.equal(expected)
    done()
  })
})