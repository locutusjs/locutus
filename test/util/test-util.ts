import { expect } from 'chai'
import { Util } from '../../src/_util/util.ts'

describe('util', function () {
  describe('_load', function () {
    it('should parse array_change_key_case correctly', async function () {
      const util = new Util()

      const relative = 'php/array/array_change_key_case.js'

      const params = await util._load(relative, {})
      expect(params).to.not.be.null
      expect(params?.headKeys.example[0][0]).to.deep.equal('array_change_key_case(42)')
    })
  })
})
