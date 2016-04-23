XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtotime = require('/Users/kvz/code/phpjs/src/php/datetime/strtotime.js')

describe('php', function () {
  describe('datetime.strtotime.js', function () {
    it('should pass test 1', function (done) {
      strtotime('+1 day', 1129633200);
      expected = 1129719600
      result = strtotime('+1 day', 1129633200);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
      expected = 1130425202
      result = strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      strtotime('last month', 1129633200);
      expected = 1127041200
      result = strtotime('last month', 1129633200);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      strtotime('2009-05-04 08:30:00 GMT');
      expected = 1241425800
      result = strtotime('2009-05-04 08:30:00 GMT');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      strtotime('2009-05-04 08:30:00+00');
      expected = 1241425800
      result = strtotime('2009-05-04 08:30:00+00');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      strtotime('2009-05-04 08:30:00+02:00');
      expected = 1241418600
      result = strtotime('2009-05-04 08:30:00+02:00');
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      strtotime('2009-05-04T08:30:00Z');
      expected = 1241425800
      result = strtotime('2009-05-04T08:30:00Z');
      expect(result).to.equal(expected)
      done()
    })
  })
})