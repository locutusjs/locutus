// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var strftime = require('../../../../src/php/datetime/strftime.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/datetime/strftime.js (tested in test/languages/php/datetime/test-strftime.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Tuesday'
    var result = strftime("%A", 1062462400); // Return value will depend on date and locale
    expect(result).toEqual(expected)
    done()
  })
})
