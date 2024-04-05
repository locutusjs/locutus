// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var array_chunk = require('../../../../src/php/array/array_chunk.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/array_chunk.js (tested in test/languages/php/array/test-array_chunk.js)', function () {
  it('should pass example 1', function (done) {
    var expected = [['Kevin', 'van'], ['Zonneveld']]
    var result = array_chunk(['Kevin', 'van', 'Zonneveld'], 2)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
    var result = array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = [['Kevin', 'van'], ['Zonneveld']]
    var result = array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2)
    expect(result).to.deep.equal(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]
    var result = array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true)
    expect(result).to.deep.equal(expected)
    done()
  })
})
