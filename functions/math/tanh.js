function tanh(arg) {
  //  discuss at: http://phpjs.org/functions/tanh/
  // original by: Onno Marsman
  //   example 1: tanh(5.4251848798444815);
  //   returns 1: 0.9999612058841574

  return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
}