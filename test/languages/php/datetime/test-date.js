XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var date = require('/Users/kvz/code/phpjs/src/php/datetime/date.js')

describe('php', function () {
  describe('datetime.date.js', function () {
    it('should pass test 1', function (done) {
      date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
      expected = '09:09:40 m is month'
      result = date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 2', function (done) {
      date('F j, Y, g:i a', 1062462400);
      expected = 'September 2, 2003, 2:26 am'
      result = date('F j, Y, g:i a', 1062462400);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 3', function (done) {
      date('Y W o', 1062462400);
      expected = '2003 36 2003'
      result = date('Y W o', 1062462400);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 4', function (done) {
      x = date('Y m d', (new Date()).getTime()/1000);
      (x+'').length === 10 // 2009 01 09
      expected = true
x = date('Y m d', (new Date()).getTime()/1000);
      result = (x+'').length === 10 // 2009 01 09
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 5', function (done) {
      date('W', 1104534000);
      expected = '53'
      result = date('W', 1104534000);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 6', function (done) {
      date('B t', 1104534000);
      expected = '999 31'
      result = date('B t', 1104534000);
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 7', function (done) {
      date('W U', 1293750000.82); // 2010-12-31
      expected = '52 1293750000'
      result = date('W U', 1293750000.82); // 2010-12-31
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 8', function (done) {
      date('W', 1293836400); // 2011-01-01
      expected = '52'
      result = date('W', 1293836400); // 2011-01-01
      expect(result).to.equal(expected)
      done()
    })
    it('should pass test 9', function (done) {
      date('W Y-m-d', 1293974054); // 2011-01-02
      expected = '52 2011-01-02'
      result = date('W Y-m-d', 1293974054); // 2011-01-02
      expect(result).to.equal(expected)
      done()
    })
  })
})