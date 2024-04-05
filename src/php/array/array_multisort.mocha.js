'use strict'

// To run:
//
//   ./node_modules/.bin/mocha -r babel-register src/php/array/array_multisort.mocha.js
//

const expect = require('chai').expect
const array_multisort = require('./array_multisort.js')

describe('src/php/array/array_multisort.js', function () {
  it('should pass example 1', function (done) {
    const expected = 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    const result = array_multisort(['productIds[]', '_'], 'SORT_ASC', ['productIds[]=977385529', '_=1502965788347'])
    expect(result).to.deep.equal(expected)
    done()
  })
})
