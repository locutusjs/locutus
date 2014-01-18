function sinh(arg) {
  // From: http://phpjs.org/functions
  // +   based on: Onno Marsman
  // *     example 1: sinh(-0.9834330348825909);
  // *     returns 1: -1.1497971402636502
  return (Math.exp(arg) - Math.exp(-arg)) / 2;
}
