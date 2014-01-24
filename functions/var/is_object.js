function is_object(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_object/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Legaev Andrey
  // improved by: Michael White (http://getsprink.com)
  //   example 1: is_object('23');
  //   returns 1: false
  //   example 2: is_object({foo: 'bar'});
  //   returns 2: true
  //   example 3: is_object(null);
  //   returns 3: false

  if (Object.prototype.toString.call(mixed_var) === '[object Array]') {
    return false;
  }
  return mixed_var !== null && typeof mixed_var === 'object';
}