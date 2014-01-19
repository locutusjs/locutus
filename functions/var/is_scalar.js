function is_scalar(mixed_var) {
  //  discuss at: http://phpjs.org/functions/is_scalar/
  // original by: Paulo Freitas
  //   example 1: is_scalar(186.31);
  //   returns 1: true
  //   example 2: is_scalar({0: 'Kevin van Zonneveld'});
  //   returns 2: false

  return (/boolean|number|string/)
    .test(typeof mixed_var);
}