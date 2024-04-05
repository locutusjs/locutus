// warning: This file is auto generated by `yarn build:tests`
// Do not edit by hand!

'use strict'

process.env.TZ = 'UTC'
var expect = require('chai').expect
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var natsort = require('../../../../src/php/array/natsort.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/array/natsort.js (tested in test/languages/php/array/test-natsort.js)', function () {
  it('should pass example 1', function (done) {
    var expected = {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
    var $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"}
    natsort($array1)
    var result = $array1
    expect(result).to.deep.equal(expected)
    done()
  })
})
