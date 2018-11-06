module.exports = function ascii_letters () { // eslint-disable-line camelcase
  //   original by: Yury Shapkarin (http://shapkarin.me)
  //   example 1: ascii_letters()
  //   returns 1: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var pattern = /[a-zA-Z]+/g
  var length = 26
  var i = 65

  return [...Array(length + 6 + length)]
          .reduce(function (accumulator) {
            return accumulator + String.fromCharCode(i++)
          }, '')
          .match(pattern)
          .reverse().join('')
}
