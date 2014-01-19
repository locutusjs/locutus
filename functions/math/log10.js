function log10(arg) {
  //  discuss at: http://phpjs.org/functions/log10/
  // original by: Philip Peterson
  // improved by: Onno Marsman
  // improved by: Tod Gentille
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: log10(10);
  //   returns 1: 1
  //   example 2: log10(1);
  //   returns 2: 0

  return Math.log(arg) / 2.302585092994046; // Math.LN10
}