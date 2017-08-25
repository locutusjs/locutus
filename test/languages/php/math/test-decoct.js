// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var decoct = require('../../../../src/php/math/decoct.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/math/decoct.js (tested in test/languages/php/math/test-decoct.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '17'
    var result = decoct(15)
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = '410'
    var result = decoct(264)
    expect(result).toEqual(expected)
    done()
  })
})
