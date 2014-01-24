function strtoupper(str) {
  //  discuss at: http://phpjs.org/functions/strtoupper/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Onno Marsman
  //   example 1: strtoupper('Kevin van Zonneveld');
  //   returns 1: 'KEVIN VAN ZONNEVELD'

  return (str + '')
    .toUpperCase();
}