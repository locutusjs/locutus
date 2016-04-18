var assert = require('assert')
var fs = require('fs')
var glob = require('glob')
var path = require('path')
var __root = path.dirname(__dirname)
var LocutusUtil = require('../src/_util/locutusutil')
var locutusUtil = new LocutusUtil({
  injectDependencies: ['ini_set', 'ini_get']
})
assert.deepEqualWithDifflet = require('deep-equal-with-difflet')

var files = {
  'array_change_key_case': fs.readFileSync(__root + '/test/fixtures/func_array_change_key_case.js', 'utf-8'),
  'pos'                  : fs.readFileSync(__root + '/test/fixtures/func_pos.js', 'utf-8'),
  'current'              : fs.readFileSync(__root + '/test/fixtures/func_current.js', 'utf-8'),
  'is_binary'            : fs.readFileSync(__root + '/test/fixtures/func_is_binary.js', 'utf-8')
}

locutusUtil.opener = function (name, cb) {
  return cb(null, files[name])
}

var fixture = JSON.parse(fs.readFileSync(__root + '/test/fixtures/fix_array_change_key_case.js', 'utf-8'))

describe('locutusutil', function () {
  describe('parse', function () {
    it('should return exact fixture', function (done) {
      locutusUtil.parse('array_change_key_case', files['array_change_key_case'], function (err, params) {
        // fs.writeFileSync(__root + '/test/fixtures/fix_array_change_key_case.js', JSON.stringify(params, null, '  '))
        assert.equal(null, err)
        assert.deepEqualWithDifflet(params, fixture)
        done()
      })
    })
  })
})
