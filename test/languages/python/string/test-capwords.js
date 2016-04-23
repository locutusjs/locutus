XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var capwords = require('/Users/kvz/code/phpjs/src/python/string/capwords.js')

describe('python', function () {
  describe('string.capwords.js', function () {
    it('should pass test 1', function (done) {
      capwords('kevin van  zonneveld');
      expected = 'Kevin Van  Zonneveld'
      result = capwords('kevin van  zonneveld');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      capwords('HELLO WORLD');
      expected = 'HELLO WORLD'
      result = capwords('HELLO WORLD');
      expect(result).to.equal(expected)
      done()
    })
  })
})