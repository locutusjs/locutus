module.exports = function ascii_uppercase () { // eslint-disable-line camelcase
  //   original by: Yury Shapkarin (http://shapkarin.me)
  //   example 1: ascii_uppercase()
  //   returns 1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const length = 26
  let i = 65

  return [...Array(length)]
    .reduce(function (accumulator) {
      return accumulator + String.fromCharCode(i++)
    }, '')
}
