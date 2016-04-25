module.exports = function array_rand (input, num_req) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/array_rand/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_rand( ['Kevin'], 1 )
  //   returns 1: 0

  var indexes = []
  var ticks = num_req || 1
  var checkDuplicate = function (input, value) {
    var exist = false,
      index = 0,
      il = input.length
    while (index < il) {
      if (input[index] === value) {
        exist = true
        break
      }
      index++
    }
    return exist
  }

  if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
    while (true) {
      var rand = Math.floor((Math.random() * input.length))
      if (indexes.length === ticks) {
        break
      }
      if (!checkDuplicate(indexes, rand)) {
        indexes.push(rand)
      }
    }
  } else {
    indexes = null
  }

  return ((ticks === 1) ? indexes[0] : indexes)
}
