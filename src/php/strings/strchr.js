module.exports = function strchr (haystack, needle, bool) {
  //  discuss at: http://locutusjs.io/php/strchr/
  // original by: Philip Peterson
  //  depends on: strstr
  //   example 1: strchr('Kevin van Zonneveld', 'van');
  //   returns 1: 'van Zonneveld'
  //   example 2: strchr('Kevin van Zonneveld', 'van', true);
  //   returns 2: 'Kevin '

  return this.strstr(haystack, needle, bool)
}
