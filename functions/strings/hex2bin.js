function hex2bin(s) {
  //  discuss at: http://phpjs.org/functions/hex2bin/
  // original by: Dumitru Uzun (http://duzun.me)
  //   example 1: hex2bin('44696d61');
  //   returns 1: 'Dima'
  //   example 2: hex2bin('00');
  //   returns 2: '\x00'
  //   example 3: hex2bin('2f1q')
  //   returns 3: false
  //   example 4: hex2bin('44696d6');
  //   returns 4: false

  var ret = [], i = 0, l;

  s += '';
  
  l = s.length;
  
  // 5.4.1:	A warning is thrown if the input string is of odd length. 
  //        In PHP 5.4.0 the string was silently accepted,
  //        but the last byte was truncated.
  if ( l & 1 ) {
    // PHP 5.4.1
    if ( typeof console != 'undefined' && console.warn ) {
        throw new Error('hex2bin(): Hexadecimal input string must have an even length');
    }
    return false;
  }

  for ( ; i < l; i += 2 ) {
    var c = parseInt(s.substr(i, 1), 16);
    var k = parseInt(s.substr(i+1, 1), 16);
    if(isNaN(c) || isNaN(k)) return false;
    ret.push( (c << 4) | k );
  }

  return String.fromCharCode.apply(String, ret);
}
