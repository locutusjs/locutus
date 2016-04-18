module.exports = function strtolower (str) {
  //  discuss at: http://locutusjs.io/php/strtolower/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Onno Marsman
  //   example 1: strtolower('Kevin van Zonneveld');
  //   returns 1: 'kevin van zonneveld'

  return (str + '')
    .toLowerCase()
}
