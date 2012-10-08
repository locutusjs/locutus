function floatval (mixed_var) {
  // +   original by: Michael White (http://getsprink.com)
  // %        note 1: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
  // *     example 1: floatval('150.03_page-section');
  // *     returns 1: 150.03
  // *     example 2: floatval('page: 3');
  // *     returns 2: 0
  // *     example 2: floatval('-50 + 8');
  // *     returns 2: -50
  return (parseFloat(mixed_var) || 0);
}
