var fs = require('fs')
var path = require('path')
var expect = require('chai').expect
var __root = path.dirname(__dirname)
var Util = require('../src/_util/util')

describe('locutusutil', function () {
  describe('parse', function () {
    it('should parse array_change_key_case correctly', function (done) {
      var files = {
        'array_change_key_case': fs.readFileSync(__root + '/test/fixtures/func_array_change_key_case.js', 'utf-8'),
        'pos': fs.readFileSync(__root + '/test/fixtures/func_pos.js', 'utf-8'),
        'current': fs.readFileSync(__root + '/test/fixtures/func_current.js', 'utf-8'),
        'is_binary': fs.readFileSync(__root + '/test/fixtures/func_is_binary.js', 'utf-8')
      }

      var util = new Util({
        injectDependencies: ['ini_set', 'ini_get']
      })

      var relative = 'php/strings/' + 'array_change_key_case'

      util.opener = function (name, requesterParams, cb) {
        return cb(null, relative, files[name])
      }

      var fixture = JSON.parse(fs.readFileSync(__root + '/test/fixtures/fix_array_change_key_case.js', 'utf-8'))

      util.parse(relative, files['array_change_key_case'], function (err, params) {
        // fs.writeFileSync(__root + '/test/fixtures/fix_array_change_key_case.js', JSON.stringify(params, null, '  '))
        expect(err).to.deep.equal(null)
        expect(params).to.deep.equal(fixture)
        done()
      })
    })
  })

  describe('load', function () {
    it('should load strings.Count correctly', function (done) {
      var util = new Util({
        __src: __root + '/src'
      })

      util.load('strings.Count', {}, function (err, params) {
        // fs.writeFileSync(__root + '/test/fixtures/fix_array_change_key_case.js', JSON.stringify(params, null, '  '))
        expect(err).to.deep.equal(null)
        expect(params.headKeys).to.deep.equal([ [ 'strings.Index', 'unicode.utf8.RuneCountInString' ] ])
        done()
      })
    })
  })
})
