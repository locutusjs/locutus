XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var acos = require('/Users/kvz/code/phpjs/src/ruby/Math/acos.js')

describe('ruby', function () {
  describe('Math.acos.js', function () {
    it('should pass test 1', function (done) {
      (acos(0.3) + '').substr(0, 17);
      expected = "1.266103672779499"
      result = (acos(0.3) + '').substr(0, 17);
      expect(result).to.equal(expected)
      done()
    })
  })
})