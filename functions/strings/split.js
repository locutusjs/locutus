function split (delimiter, string) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: explode
  // *     example 1: split(' ', 'Kevin van Zonneveld');
  // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
  return this.explode(delimiter, string);
}
