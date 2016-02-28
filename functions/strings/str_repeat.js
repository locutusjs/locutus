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

    if("function" === typeof String.prototype.repeat){ //use native ES6 Harmony, if exist.
      input = String.prototype.repeat.call(input, multiplier);
    }else{
      input = ((new Array(multiplier + 1)).join(input));
    }
    
    return input;
  }
