XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_replace_recursive = require('/Users/kvz/code/phpjs/src/php/array/array_replace_recursive.js')

describe('php.array.array_replace_recursive.js', function () {
  it.skip('should pass example 1', function (done) {
    array_replace_recursive({'citrus' : ["orange"], 'berries' : ["blackberry", "raspberry"]}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']});
    var expected = {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}
    var result = array_replace_recursive({'citrus' : ["orange"], 'berries' : ["blackberry", "raspberry"]}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']});
    expect(result).to.deep.equal(expected)
    done()
  })
})