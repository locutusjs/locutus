function mt_rand(min, max) {
  //  discuss at: http://phpjs.org/functions/mt_rand/
  // original by: Onno Marsman
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: Kongo
  // improved by: Elad Karako (http://icompile.eladkarako.com)
  //   example 1: mt_rand(1, 1);
  //   returns 1: 1
  //   example 2: mt_rand(-40, -10);
  //   returns 2: -37

  var
    MIN_INTEGER = Number && Number.MIN_SAFE_INTEGER || 0, //JavaScript native min lower-limit.
    MAX_INTEGER = Number && Number.MAX_SAFE_INTEGER || 2147483647; //JavaScript native max upper-limit.

  //normalize input (if not number or float)
  min = ("number" === typeof min) ? Math.floor(min) : MIN_INTEGER;
  max = ("number" === typeof max) ? Math.floor(max) : MAX_INTEGER;

  //buffer-overflow prevention.
  min = min < MIN_INTEGER ? MIN_INTEGER : min;
  min = min > MAX_INTEGER ? MAX_INTEGER : min;
  max = max < MIN_INTEGER ? MIN_INTEGER : max;
  max = max > MAX_INTEGER ? MAX_INTEGER : max;

  max = ((max - min) + 1); //lowering upper-limit.
  return min + Math.floor(Math.random() * max);
}
