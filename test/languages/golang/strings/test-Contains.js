XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var Contains = require('/Users/kvz/code/phpjs/src/golang/strings/Contains.js')

describe('golang', function () {
  describe('strings.Contains.js', function () {
    it('should pass test 1', function (done) {
      strings.Contains('Kevin', 'K')
      expected = true
      result = Contains('Kevin', 'K')
      expect(result).to.equal(expected)
      done()
    })
  })
})