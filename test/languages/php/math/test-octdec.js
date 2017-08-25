// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var octdec = require('../../../../src/php/math/octdec.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/math/octdec.js (tested in test/languages/php/math/test-octdec.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 63
    var result = octdec('77')
    expect(result).toEqual(expected)
    done()
  })
})
