module.exports.frexp = function frexp (arg) { // -> [number x, int11 exp]
  // original by: Oskar Larsson Högfeldt (locutus@oskar-lh.name)

  // Like frexp of C and std::frexp of C++,
  // but returns an array instead of using a pointer argument for passing the exponent result.
  // Object.is(n, frexp(n)[0] * 2 ** frexp(n)[1]) for all number values of n except when Math.isFinite(n) && Math.abs(n) > 2**1023
  // Object.is(n, (2 * frexp(n)[0]) * 2 ** (frexp(n)[1] - 1)) for all number values of n
  // Object.is(n, frexp(n)[0]) for these values of n: 0, -0, NaN, Infinity, -Infinity
  // Math.abs(frexp(n)[0]) is >= 0.5 and < 1.0 for any other number-type value of n
  // See http://en.cppreference.com/w/cpp/numeric/math/frexp for a more detailed description

  arg = Number(arg)

  let result = [arg, 0]
  
  if (arg !== 0 && Number.isFinite(arg)) {
    const absArg = Math.abs(arg)
    let exp = Math.max(-1023, Math.floor(Math.log2(absArg)) + 1)
    let x = absArg * 2 ** -exp

    // These while loops compensate for rounding errors that sometimes occur because of ECMAScript's Math.log2's undefined precision
    // and also works around the issue of 2 ** exp === Infinity when exp >= 1024
    while (x < 0.5) {
      x *= 2
      exp--
    }
    while (x >= 1) {
      x *= 0.5
      exp++
    }

    x *= Math.sign(arg)
    result[0] = x
    result[1] = exp
  }
  return result
}
