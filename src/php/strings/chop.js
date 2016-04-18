module.exports = function chop (str, charlist) {
  //  discuss at: http://locutusjs.io/php/chop/
  // original by: Paulo Freitas
  //  depends on: rtrim
  //   example 1: rtrim('    Kevin van Zonneveld    ');
  //   returns 1: '    Kevin van Zonneveld'

  return this.rtrim(str, charlist)
}
