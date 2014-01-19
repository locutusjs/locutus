function is_real(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_real/
  // original by: Brett Zamir (http://brett-zamir.me)
  //  depends on: is_float
  //        note: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //        note: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_real(186.31);
  //   returns 1: true

  return this.is_float(mixed_var);
}