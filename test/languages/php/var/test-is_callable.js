// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var ini_set = require('../../../../src/php/info/ini_set') // eslint-disable-line no-unused-vars,camelcase
var ini_get = require('../../../../src/php/info/ini_get') // eslint-disable-line no-unused-vars,camelcase
var is_callable = require('../../../../src/php/var/is_callable.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/php/var/is_callable.js (tested in test/languages/php/var/test-is_callable.js)', function () {
  it('should pass example 1', function (done) {
    var expected = true
    var result = is_callable('is_callable')
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = true // gives true because does not do strict checking
    var result = is_callable('bogusFunction', true)
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 3', function (done) {
    var expected = 'SomeClass::someMethod'
    function SomeClass () {}
    SomeClass.prototype.someMethod = function (){}
    var testObj = new SomeClass()
    is_callable([testObj, 'someMethod'], true, 'myVar')
    var result = myVar
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 4', function (done) {
    var expected = true
    var result = is_callable(function () {})
    expect(result).toEqual(expected)
    done()
  })
})
