// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var htmlspecialchars_decode = require('../../../../src/php/strings/htmlspecialchars_decode.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/htmlspecialchars_decode.js (tested in test/languages/php/strings/test-htmlspecialchars_decode.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '<p>this -> &quot;</p>'
    var result = htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES')
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = '&quot;'
    var result = htmlspecialchars_decode("&amp;quot;")
    expect(result).toEqual(expected)
    done()
  })
})
