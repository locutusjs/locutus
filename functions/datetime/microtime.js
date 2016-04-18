module.exports = function microtime (get_as_float) {
  //  discuss at: http://phpjs.org/functions/microtime/
  // original by: Paulo Freitas
  // improved by: Dumitru Uzun (http://duzun.me)
  //   example 1: timeStamp = microtime(true);
  //   example 1: timeStamp > 1000000000 && timeStamp < 2000000000
  //   returns 1: true
  //   example 2: /^0\.[0-9]{1,6} [0-9]{10,10}$/.test(microtime())
  //   returns 2: true

  if (typeof performance !== 'undefined' && performance.now) {
    var now = (performance.now() + performance.timing.navigationStart) / 1e3
    if (get_as_float) return now

    // Math.round(now)
    var s = now | 0
    return (Math.round((now - s) * 1e6) / 1e6) + ' ' + s
  } else {
    var now = (Date.now ? Date.now() : new Date()
      .getTime()) / 1e3
    if (get_as_float) return now

    // Math.round(now)
    var s = now | 0
    return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s
  }
}
