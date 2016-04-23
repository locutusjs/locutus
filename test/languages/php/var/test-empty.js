XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var empty = require('/Users/kvz/code/phpjs/src/php/var/empty.js')

describe('php.var.empty.js', function () {
  it('should pass example 1', function (done) {
    empty(null);
    var expected = true
    var result = empty(null);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    empty(undefined);
    var expected = true
    var result = empty(undefined);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    empty([]);
    var expected = true
    var result = empty([]);
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    empty({});
    var expected = true
    var result = empty({});
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 5', function (done) {
    empty({'aFunc' : function () { alert('humpty'); } });
    var expected = false
    var result = empty({'aFunc' : function () { alert('humpty'); } });
    expect(result).to.deep.equal(expected)
    done()
  })
})