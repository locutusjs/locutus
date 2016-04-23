XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var sprintf = require('/Users/kvz/code/phpjs/src/php/strings/sprintf.js')

describe('php.strings.sprintf.js', function () {
  it('should pass example 1', function (done) {
    sprintf("%01.2f", 123.1)
    var expected = '123.10'
    var result = sprintf("%01.2f", 123.1)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    sprintf("[%10s]", 'monkey')
    var expected = '[    monkey]'
    var result = sprintf("[%10s]", 'monkey')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    sprintf("[%'#10s]", 'monkey')
    var expected = '[####monkey]'
    var result = sprintf("[%'#10s]", 'monkey')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    sprintf("%d", 123456789012345)
    var expected = '123456789012345'
    var result = sprintf("%d", 123456789012345)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 5', function (done) {
    sprintf('%-03s', 'E')
    var expected = 'E00'
    var result = sprintf('%-03s', 'E')
    expect(result).to.deep.equal(expected)
    done()
  })
})