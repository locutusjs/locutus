XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_replace = require('/Users/kvz/code/phpjs/src/php/strings/str_replace.js')

describe('php.strings.str_replace.js', function () {
  it('should pass example 1', function (done) {
    str_replace(' ', '.', 'Kevin van Zonneveld')
    var expected = 'Kevin.van.Zonneveld'
    var result = str_replace(' ', '.', 'Kevin van Zonneveld')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars')
    var expected = 'hemmo, mars'
    var result = str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    str_replace(Array('S','F'),'x','ASDFASDF')
    var expected = 'AxDxAxDx'
    var result = str_replace(Array('S','F'),'x','ASDFASDF')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt')
    var expected = 'xSyFxSyF' // cnt = 0 (incorrect before fix)
'xSyFxSyF' // cnt = 4 (correct after fix)
    var result = str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt')
    expect(result).to.deep.equal(expected)
    done()
  })
})