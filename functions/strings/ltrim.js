function ltrim(str, charlist) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // *     example 1: ltrim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld    '
  charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  var re = new RegExp('^[' + charlist + ']+', 'g');
  return (str + '').replace(re, '');
}
