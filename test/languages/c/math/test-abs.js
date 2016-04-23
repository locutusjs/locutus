XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var abs = require('/Users/kvz/code/phpjs/src/c/math/abs.js')

describe('c', function () {
  describe('math.abs.js', function () {
    it('should pass test 1', function (done) {
      abs(4.2);
      expected = 4.2
      result = abs(4.2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      abs(-4.2);
      expected = 4.2
      result = abs(-4.2);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      abs(-5);
      expected = 5
      result = abs(-5);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      abs('_argos');
      expected = 0
      result = abs('_argos');
      expect(result).to.equal(expected)
      done()
    })
  })
})