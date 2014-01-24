function rtrim(str, charlist) {
  //  discuss at: http://phpjs.org/functions/rtrim/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Erkekjetter
  //    input by: rem
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: rtrim('    Kevin van Zonneveld    ');
  //   returns 1: '    Kevin van Zonneveld'

  charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
    .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
  var re = new RegExp('[' + charlist + ']+$', 'g');
  return (str + '')
    .replace(re, '');
}