// var fs = require('fs')
var expect = require('chai').expect
var Util = require('../src/_util/util')

describe('util', function () {
  describe('_load', function () {
    it('should parse array_change_key_case correctly', function (done) {
      var util = new Util()

      var relative = 'php/array/array_change_key_case.js'

      util._load(relative, {}, function (err, params) {
        expect(err).to.deep.equal(null)
        expect(params.headKeys.example[0][0]).to.deep.equal('array_change_key_case(42)')
        done()
      })
    })
  })
})
