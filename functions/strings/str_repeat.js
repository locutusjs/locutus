function str_repeat(input, multiplier) {
  //  discuss at: http://phpjs.org/functions/str_repeat/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Ian Carter (http://euona.com/)
  // improved by: Elad Karako (http://icompile.eladkarako.com/)
  //   example 1: str_repeat('-=', 10);
  //   returns 1: '-=-=-=-=-=-=-=-=-=-='
  //   example 2: str_repeat('abc', 0);
  //   returns 2: ''

    input = ("string" === typeof input) ? input : "";
    multiplier = ("number" === typeof multiplier) ? Math.max(0, multiplier) : 0;

    return ("function" === typeof String.prototype.repeat) ? String.prototype.repeat.call(input, multiplier) : ((new Array(multiplier + 1)).join(input)); //ES6 Harmony, or Array Join, Either Way: No Loops.
  }
