// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var idate = require('../../../../src/php/datetime/idate.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/datetime/idate.js (tested in test/languages/php/datetime/test-idate.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 9
    var result = idate('y', 1255633200)
    expect(result).toEqual(expected)
    done()
  })
})
