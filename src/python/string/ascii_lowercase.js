module.exports = function ascii_lowercase() {
  //    verified: 3.12
  // original by: Yury Shapkarin (https://shapkarin.me)
  //   example 1: ascii_lowercase()
  //   returns 1: 'abcdefghijklmnopqrstuvwxyz'

  const length = 26
  let i = 65 + length + 6

  return [...new Array(length)].reduce(function (accumulator) {
    return accumulator + String.fromCharCode(i++)
  }, '')
}
