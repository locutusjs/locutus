// warning: This file is auto generated by `npm run build:tests`
// Do not edit by hand!
process.env.TZ = 'UTC'
var Index = require('../../../../src/golang/strings/Index2.js') // eslint-disable-line no-unused-vars,camelcase

describe('src/golang/strings/Index2.js (tested in test/languages/golang/strings/test-Index2.js)', function () {
  it('should pass example 1', function (done) {
    var expected = 0
    var result = Index('Kevin', 'K')
    expect(result).toEqual(expected)
    done()
  })
  it('should pass example 2', function (done) {
    var expected = -1
    var result = Index('Kevin', 'Z')
    expect(result).toEqual(expected)
    done()
  })
})
