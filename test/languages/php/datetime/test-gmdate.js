// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var gmdate = require('../../../../src/php/datetime/gmdate.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/datetime/gmdate.js (tested in test/languages/php/datetime/test-gmdate.js)', function () {
  it('should pass example 1', function (done) {
    var expected = '07:09:40 m is month'
    var result = gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
    expect(result).to.deep.equal(expected)
    done()
  })
})
