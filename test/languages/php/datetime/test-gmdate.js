XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gmdate = require('/Users/kvz/code/phpjs/src/php/datetime/gmdate.js')

describe('php', function () {
  describe('datetime.gmdate.js', function () {
    it('should pass test 1', function (done) {
      gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
      expected = '07:09:40 m is month'
      result = gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
      expect(result).to.equal(expected)
      done()
    })
  })
})