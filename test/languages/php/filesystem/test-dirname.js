XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var dirname = require('/Users/kvz/code/phpjs/src/php/filesystem/dirname.js')

describe('php.filesystem.dirname.js', function () {
  it('should pass example 1', function (done) {
    dirname('/etc/passwd');
    var expected = '/etc'
    var result = dirname('/etc/passwd');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    dirname('c:/Temp/x');
    var expected = 'c:/Temp'
    var result = dirname('c:/Temp/x');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    dirname('/dir/test/');
    var expected = '/dir'
    var result = dirname('/dir/test/');
    expect(result).to.deep.equal(expected)
    done()
  })
})