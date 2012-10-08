function is_integer (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  //  -   depends on: is_int
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: is_integer(186.31);
  // *     returns 1: false
  // *     example 2: is_integer(12);
  // *     returns 2: true
  return this.is_int(mixed_var);
}
