module.exports = function ascii_lowercase () { // eslint-disable-line camelcase
  //   original by: Yury Shapkarin (http://shapkarin.me)
  //   example 1: ascii_lowercase()
  //   returns 1: 'abcdefghijklmnopqrstuvwxyz'

  const length = 26
  let i = 65 + length + 6

  return [...Array(length)]
    .reduce(function (accumulator) {
      return accumulator + String.fromCharCode(i++)
    }, '')
}
