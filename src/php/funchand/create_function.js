module.exports = function create_function(args, code) {
  //       discuss at: https://locutus.io/php/create_function/
  //      original by: Johnny Mast (https://www.phpvrouwen.nl)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //        example 1: var $f = create_function('a, b', 'return (a + b)')
  //        example 1: $f(1, 2)
  //        returns 1: 3

  try {
    return Function.apply(null, args.split(',').concat(code))
  } catch (_e) {
    return false
  }
}
