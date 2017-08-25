// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var long2ip = require('../../../../src/php/network/long2ip.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/network/long2ip.js (tested in test/languages/php/network/test-long2ip.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '192.0.34.166'
    var result = long2ip( 3221234342 )
    expect(result).toEqual(expected)
    done()
  })
})
