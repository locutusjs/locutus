// var fs = require('fs')
import { expect } from 'chai'
import { Util } from '../../src/_util/util.ts'

describe('util', function () {
  describe('_load', function () {
    it('should parse array_change_key_case correctly', function (done) {
      const util = new Util()

      const relative = 'php/array/array_change_key_case.js'

      util._load(relative, {}, function (err, params) {
        expect(err).to.deep.equal(null)
        expect(params.headKeys.example[0][0]).to.deep.equal('array_change_key_case(42)')
        done()
      })
    })
  })
})
