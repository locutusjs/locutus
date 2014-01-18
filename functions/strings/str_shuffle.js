function str_shuffle(str) {
  // From: http://phpjs.org/functions
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: shuffled = str_shuffle("abcdef");
  // *     example 1: shuffled.length
  // *     returns 1: 6

  if (arguments.length === 0) {
    throw 'Wrong parameter count for str_shuffle()';
  }

  if (str == null) {
    return '';
  }

  str += '';

  var newStr = '', rand, i = str.length;

  while (i) {
    rand = Math.floor(Math.random() * i);
    newStr += str.charAt(rand);
    str = str.substring(0, rand) + str.substr(rand + 1);
    i--;
  }

  return newStr;
}
