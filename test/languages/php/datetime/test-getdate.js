XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var getdate = require('/Users/kvz/code/phpjs/src/php/datetime/getdate.js')

describe('php', function () {
  describe('datetime.getdate.js', function () {
    it('should pass test 1', function (done) {
      getdate(1055901520);
      expected = {'seconds': 40, 'minutes': 58, 'hours': 21, 'mday': 17, 'wday': 2, 'mon': 6, 'year': 2003, 'yday': 167, 'weekday': 'Tuesday', 'month': 'June', '0': 1055901520}
      result = getdate(1055901520);
      expect(result).to.equal(expected)
      done()
    })
  })
})