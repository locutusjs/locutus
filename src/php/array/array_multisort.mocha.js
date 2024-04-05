'use strict'

// To run:
//
//   ./node_modules/.bin/mocha -r babel-register src/php/array/array_multisort.mocha.js
//

const expect = require('chai').expect
const array_multisort = require('./array_multisort.js')

describe('src/php/array/array_multisort.js', function () {
  it('should pass example 1', function (done) {
    const $ar1 = [10, 100, 100, 0]
    const $ar2 = [1, 3, 2, 4]
    array_multisort($ar1, $ar2)
    expect($ar1).to.deep.equal([0, 10, 100, 100])
    expect($ar2).to.deep.equal([4, 1, 2, 3])
    done()
  })
})
