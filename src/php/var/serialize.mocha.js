const expect = require('chai').expect
const serialize = require('./serialize.js')

describe('src/php/var/serialize.js', function () {
  it('should pass example 1', function (done) {
    const expected = 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    const result = serialize(['Kevin', 'van', 'Zonneveld'])
    expect(result).to.deep.equal(expected)
    done()
  })
})
