function is_unicode(vr) {
  //  discuss at: http://phpjs.org/functions/is_unicode/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Almost all strings in JavaScript should be Unicode
  //   example 1: is_unicode('We the peoples of the United Nations...!');
  //   returns 1: true

  if (typeof vr !== 'string') {
    return false;
  }

  // If surrogates occur outside of high-low pairs, then this is not Unicode
  var arr = [],
    any = '([\s\S])',
    highSurrogate = '[\uD800-\uDBFF]',
    lowSurrogate = '[\uDC00-\uDFFF]',
    highSurrogateBeforeAny = new RegExp(highSurrogate + any, 'g'),
    lowSurrogateAfterAny = new RegExp(any + lowSurrogate, 'g'),
    singleLowSurrogate = new RegExp('^' + lowSurrogate + '$'),
    singleHighSurrogate = new RegExp('^' + highSurrogate + '$');

  while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleLowSurrogate)) { // If high not followed by low surrogate
      return false;
    }
  }
  while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleHighSurrogate)) { // If low not preceded by high surrogate
      return false;
    }
  }
  return true;
}