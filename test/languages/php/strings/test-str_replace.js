XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var str_replace = require('/Users/kvz/code/phpjs/src/php/strings/str_replace.js')

describe('php', function () {
  describe('strings.str_replace.js', function () {
    it('should pass test 1', function (done) {
      str_replace(' ', '.', 'Kevin van Zonneveld');
      expected = 'Kevin.van.Zonneveld'
      result = str_replace(' ', '.', 'Kevin van Zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
      expected = 'hemmo, mars'
      result = str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      str_replace(Array('S','F'),'x','ASDFASDF');
      expected = 'AxDxAxDx'
      result = str_replace(Array('S','F'),'x','ASDFASDF');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt');
      expected = 'xSyFxSyF' // cnt = 0 (incorrect before fix)
'xSyFxSyF' // cnt = 4 (correct after fix)
      result = str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt');
      expect(result).to.equal(expected)
      done()
    })
  })
})