XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var array_splice = require('/Users/kvz/code/phpjs/src/php/array/array_splice.js')

describe('php.array.array_splice.js', function () {
  it.skip('should pass example 1', function (done) {
    input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"};
    array_splice(input, 2);
    var expected = {0: "blue", 'dud': "yellow"}
input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"};
    var result = array_splice(input, 2);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    input = ["red", "green", "blue", "yellow"];
    array_splice(input, 3, 0, "purple");
    var expected = []
input = ["red", "green", "blue", "yellow"];
    var result = array_splice(input, 3, 0, "purple");
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    input = ["red", "green", "blue", "yellow"]
    array_splice(input, -1, 1, ["black", "maroon"]);
    var expected = ["yellow"]
input = ["red", "green", "blue", "yellow"]
    var result = array_splice(input, -1, 1, ["black", "maroon"]);
    expect(result).to.deep.equal(expected)
    done()
  })
})