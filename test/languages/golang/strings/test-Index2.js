XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var Index = require('/Users/kvz/code/phpjs/src/golang/strings/Index2.js')

describe('golang', function () {
  describe('strings.Index2.js', function () {
    it('should pass test 1', function (done) {
      strings.Index('Kevin', 'K')
      expected = 0
      result = Index('Kevin', 'K')
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strings.Index('Kevin', 'Z')
      expected = -1
      result = Index('Kevin', 'Z')
      expect(result).to.equal(expected)
      done()
    })
  })
})