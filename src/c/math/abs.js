module.exports = function abs (mixed_number) {
  //  discuss at: http://locutusjs.io/c/abs/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: abs(4.2);
  //   returns 1: 4.2
  //   example 2: abs(-4.2);
  //   returns 2: 4.2
  //   example 3: abs(-5);
  //   returns 3: 5
  //   example 4: abs('_argos');
  //   returns 4: 0

  return Math.abs(mixed_number) || 0
}
