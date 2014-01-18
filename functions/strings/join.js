function join(glue, pieces) {
  // From: http://phpjs.org/functions
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: implode
  // *     example 1: join(' ', ['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'Kevin van Zonneveld'
  return this.implode(glue, pieces);
}
