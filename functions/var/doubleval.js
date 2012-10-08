function doubleval (mixed_var) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  //  -   depends on: floatval
  // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
  // *     example 1: doubleval(186);
  // *     returns 1: 186.00
  return this.floatval(mixed_var);
}
