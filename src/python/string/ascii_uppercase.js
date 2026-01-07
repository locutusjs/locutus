module.exports = function ascii_uppercase() {
  //   verified: 3.12
  //   original by: Yury Shapkarin (https://shapkarin.me)
  //   example 1: ascii_uppercase()
  //   returns 1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const length = 26
  let i = 65

  return [...new Array(length)].reduce(function (accumulator) {
    return accumulator + String.fromCharCode(i++)
  }, '')
}
