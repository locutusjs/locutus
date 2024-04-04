// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var strstr = require('../../../../src/php/strings/strstr.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/strstr.js (tested in test/languages/php/strings/test-strstr.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'van Zonneveld'
    var result = strstr('Kevin van Zonneveld', 'van')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'Kevin '
    var result = strstr('Kevin van Zonneveld', 'van', true)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = '@example.com'
    var result = strstr('name@example.com', '@')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = 'name'
    var result = strstr('name@example.com', '@', true)
    expect(result).to.deep.equal(expected)
    done()
  })
})
