module.exports = function ascii_letters() {
  //   original by: Yury Shapkarin (https://shapkarin.me)
  //   example 1: ascii_letters()
  //   returns 1: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const length = 26
  let i = 65

  return [...new Array(length + 6 + length)]
    .reduce(function (accumulator) {
      return accumulator + String.fromCharCode(i++)
    }, '')
    .match(/[a-zA-Z]+/g)
    .reverse()
    .join('')
}
