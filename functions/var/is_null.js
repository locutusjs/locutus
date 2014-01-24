function is_null(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_null/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: is_null('23');
  //   returns 1: false
  //   example 2: is_null(null);
  //   returns 2: true

  return (mixed_var === null);
}