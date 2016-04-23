XMLHttpRequest = {}
window = {window: {},document: {lastModified: 1388954399,getElementsByTagName: function(){return [];}},location: {href: ""}}
process.env.TZ = 'UTC'
window.window = window
var expect = require('chai').expect
var ini_set = require('/Users/kvz/code/phpjs/src/php/info/ini_set')
var ini_get = require('/Users/kvz/code/phpjs/src/php/info/ini_get')
var gmdate = require('/Users/kvz/code/phpjs/src/php/datetime/gmdate.js')

describe('php.datetime.gmdate.js', function () {
  it('should pass example 1', function (done) {
    gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
    var expected = '07:09:40 m is month'
    var result = gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
    expect(result).to.deep.equal(expected)
    done()
  })
})