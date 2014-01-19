function soundex(str) {
  //  discuss at: http://phpjs.org/functions/soundex/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // original by: Arnout Kazemier (http://www.3rd-Eden.com)
  // improved by: Jack
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //  revised by: Rafał Kukawski (http://blog.kukawski.pl)
  //   example 1: soundex('Kevin');
  //   returns 1: 'K150'
  //   example 2: soundex('Ellery');
  //   returns 2: 'E460'
  //   example 3: soundex('Euler');
  //   returns 3: 'E460'

  str = (str + '')
    .toUpperCase();
  if (!str) {
    return '';
  }
  var sdx = [0, 0, 0, 0],
    m = {
      B: 1,
      F: 1,
      P: 1,
      V: 1,
      C: 2,
      G: 2,
      J: 2,
      K: 2,
      Q: 2,
      S: 2,
      X: 2,
      Z: 2,
      D: 3,
      T: 3,
      L: 4,
      M: 5,
      N: 5,
      R: 6
    },
    i = 0,
    j, s = 0,
    c, p;

  while ((c = str.charAt(i++)) && s < 4) {
    if (j = m[c]) {
      if (j !== p) {
        sdx[s++] = p = j;
      }
    } else {
      s += i === 1;
      p = 0;
    }
  }

  sdx[0] = str.charAt(0);
  return sdx.join('');
}