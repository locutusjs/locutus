module.exports = function ascii_letters() {
  //   original by: Yury Shapkarin (http://shapkarin.me)
  //   example 1: ascii_letters()
  //   returns 1: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  var pattern = /[a-zA-Z]+/g;
  var length = 26;
  var startFrom = 65;

  return [...Array(length + 6 + length)]
      .reduce(a => a + String.fromCharCode(i++), '' , i=startFrom)
      .match(pattern)
      .reverse().join('')
}
