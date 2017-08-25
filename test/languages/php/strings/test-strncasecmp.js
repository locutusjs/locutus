// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var strncasecmp = require('../../../../src/php/strings/strncasecmp.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/strncasecmp.js (tested in test/languages/php/strings/test-strncasecmp.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 0
    var result = strncasecmp('Price 12.9', 'Price 12.15', 2)
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = -1
    var result = strncasecmp('Price 12.09', 'Price 12.15', 10)
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 8
    var result = strncasecmp('Price 12.90', 'Price 12.15', 30)
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = 8
    var result = strncasecmp('Version 12.9', 'Version 12.15', 20)
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 5', function (done) {
    var expected = -8
    var result = strncasecmp('Version 12.15', 'Version 12.9', 20)
    expect(result).toEqual(expected)
    done()
  })
})
