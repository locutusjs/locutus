// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var trim = require('../../../../src/php/strings/trim.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/strings/trim.js (tested in test/languages/php/strings/test-trim.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 'Kevin van Zonneveld'
    var result = trim('    Kevin van Zonneveld    ')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = 'o Wor'
    var result = trim('Hello World', 'Hdle')
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = '6'
    var result = trim(16, 1)
    expect(result).to.deep.equal(expected)
    done()
  })
})
