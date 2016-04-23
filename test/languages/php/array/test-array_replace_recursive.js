XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_replace_recursive = require('/Users/kvz/code/phpjs/src/php/array/array_replace_recursive.js')

describe('php', function () {
  describe('array.array_replace_recursive.js', function () {
    it('should pass test 1', function (done) {
      array_replace_recursive({'citrus' : ["orange"], 'berries' : ["blackberry", "raspberry"]}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']});
      expected = {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}
      result = array_replace_recursive({'citrus' : ["orange"], 'berries' : ["blackberry", "raspberry"]}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']});
      expect(result).to.equal(expected)
      done()
    })
  })
})