function hex2bin(s) {
  //  discuss at: http://phpjs.org/functions/hex2bin/
  // original by: Dumitru Uzun (http://duzun.me)
  //   example 1: bin2hex('44696d61');
  //   returns 1: 'Dima'
  //   example 2: bin2hex('00');
  //   returns 2: '\x00'

  var ret = [], i = 0, l;

  s += '';

  for ( l = s.length ; i < l; i+=2 ) {
    ret.push(parseInt(s.substr(i, 2), 16));
  }

  return String.fromCharCode.apply(String, ret);
}
