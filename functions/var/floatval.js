function floatval(mixed_var) {
  //  discuss at: http://phpjs.org/functions/floatval/
  // original by: Michael White (http://getsprink.com)
  //        note: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
  //   example 1: floatval('150.03_page-section');
  //   returns 1: 150.03
  //   example 2: floatval('page: 3');
  //   example 2: floatval('-50 + 8');
  //   returns 2: 0
  //   returns 2: -50

  return (parseFloat(mixed_var) || 0);
}