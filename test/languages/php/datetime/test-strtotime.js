XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var strtotime = require('/Users/kvz/code/phpjs/src/php/datetime/strtotime.js')

describe('php.datetime.strtotime.js', function () {
  it('should pass example 1', function (done) {
    strtotime('+1 day', 1129633200);
    var expected = 1129719600
    var result = strtotime('+1 day', 1129633200);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    var expected = 1130425202
    var result = strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    strtotime('last month', 1129633200);
    var expected = 1127041200
    var result = strtotime('last month', 1129633200);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    strtotime('2009-05-04 08:30:00 GMT');
    var expected = 1241425800
    var result = strtotime('2009-05-04 08:30:00 GMT');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 5', function (done) {
    strtotime('2009-05-04 08:30:00+00');
    var expected = 1241425800
    var result = strtotime('2009-05-04 08:30:00+00');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 6', function (done) {
    strtotime('2009-05-04 08:30:00+02:00');
    var expected = 1241418600
    var result = strtotime('2009-05-04 08:30:00+02:00');
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 7', function (done) {
    strtotime('2009-05-04T08:30:00Z');
    var expected = 1241425800
    var result = strtotime('2009-05-04T08:30:00Z');
    expect(result).to.deep.equal(expected)
    done()
  })
})