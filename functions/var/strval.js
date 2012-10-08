function strval (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Comment out the entire switch if you want JS-like behavior instead of PHP behavior
  // -    depends on: gettype
  // *     example 1: strval({red: 1, green: 2, blue: 3, white: 4});
  // *     returns 1: 'Array'
  var type = '';

  if (str === null) {
    return '';
  }

  type = this.gettype(str);
  switch (type) {
  case 'boolean':
    if (str === true) {
      return '1';
    }
    return '';
  case 'array':
    return 'Array';
  case 'object':
    return 'Object';
  }

  return str;
}
