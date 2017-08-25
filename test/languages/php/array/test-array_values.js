// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_values = require('../../../../src/php/array/array_values.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_values.js (tested in test/languages/php/array/test-array_values.js)', function () {
  it('should pass example 1', function (done) {
    var expected = [ 'Kevin', 'van Zonneveld' ]
    var result = array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
    expect(result).toEqual(expected)
    done()
  })
})
