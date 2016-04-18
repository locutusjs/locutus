var preg_match_all = (function() {
  //  discuss at: 
  //  original by: Camille Hodoul (http://webdev-snippets.net)
  //        note: The pattern must be a RegExp object.
  //        note: The function returns the matches array, instead of using a reference.
  //        note: Flag combination isn't supported yet.
  //        note: Dependency: strncmp.js
  //  example 1: var str = 'X-MyHeader: MyValue; X-AZE: adqdsdfff;USERAGENT: Chrome123123 é';
  //  example 1: var ptr = / *([a-zA-Z0-9\-]+) *: *([^;]*)/gm;
  //  example 1: jsPregMatchAll(ptr,str);
  //  returns 1: [
  //  returns 1:  ['X-MyHeader: MyValue',' X-AZE: adqdsdfff','USERAGENT: Chrome123123 é'],
  //  returns 1:  ['X-MyHeader','X-AZE','USERAGENT'],
  //  returns 1:  ['MyValue','adqdsdfff','Chrome123123 é']]

  //  UNFINISHED this is a work in progress.
  //  It's using Javascript's regex engine, which is different from PHP's PCRE.




  //  _find_parens_sub and _strcmp are declared in the closure, to avoid polluting the global scope.

  //  _find_parens_sub : I copied this function from http://www.opensource.apple.com/source/pcre/pcre-4.2/pcre/pcre_compile.c ,
  //  but removed the parts I don't need, so it isn't an exact implementation.
  //  the comments in the code are from the original file.
  //  This functions returns the number of capturing parentheses in a pattern
  function _find_parens_sub(ptr, count) {
    var count = count || 0;
    var start_count = count;
    var hwm_count = start_count;
    var i = 0;
    var dup_parens = false;
    //  If the first character is a parenthesis, check on the type of group we are
    //  dealing with. The very first call may not start with a parenthesis.
    if(ptr[0] == '(') {
      if(ptr[1] == '?' && ptr[2] == '|') {
        i += 3;
        dup_parens = true;
      }

      //  Handle a normal, unnamed capturing parenthesis
      else if(ptr[1] != '?' && ptr[1] != '*') {
        count += 1;
        i++;
      }
      //  Handle a condition. If it is an assertion, just carry on so that it
      //  is processed as normal. If not, skip to the closing parenthesis of the
      //  condition (there can't be any nested parens. */
      else if(ptr[i + 2] == '(') {
        i += 2;
        if(ptr[i + 1] != '(') {
          while(!!ptr[i] && ptr[i] != ')') i++;
          if(ptr[i] != 0) i++;
        }
      }
      //  We have either (? or (* and not a condition
      else {
        i += 2;
        if(ptr[i] == 'P') i++;

        //  We have to disambiguate (?<! and (?<= from (?<name> for named groups
        if((ptr[i] == '<' && ptr[i + 1] != '!' && ptr[i + 1] != '=') || ptr[i] == '\'') {
          count++;
        }
      }
    }

    //  Past any initial parenthesis handling, scan for parentheses or vertical
    //  bars.
    for(; !!ptr[i]; i++) {
      //  Skip over backslashed characters and also entire \Q...\E 
      if(ptr[i] == '\\') {
        if(!ptr[++i]) throw new Error('Weird backslash ?');
        if(ptr[i] == 'Q') {
          for(;;) {
            while(!!ptr[++i] && ptr[i] != '\\') {};
            if(!ptr[i]) throw new Error('No \\E ?');
            if(ptr[++i] == 'E') break;
          }
      }
        continue;
      }
      //  Skip over character classes; this logic must be similar to the way they
    //  are handled for real. If the first character is '^', skip it. Also, if the
    //  first few characters (either before or after ^) are \Q\E or \E we skip them
    //  too.
      if(ptr[i] == '[') {
        var negate_class = false;
        for(;;) {
          var c = ptr[++i];
          if(c == '\\') {
            if(ptr[i] == 'E') i++;
            else if(!_strncmp(ptr[i + 1]), 'Q\\E', 3) {
              i += 3;
            } else {
              break;
            }
          } else if(!negate_class && c == '^') {
            negate_class = true;
          } else break;
        }


        //  If the next character is ']', it is a data character that must be
        //  skipped, except in JavaScript compatibility mode
        if(ptr[i] == ']' && false) {
          i++;
        }
        while(ptr[++i] != ']') {
          if(!ptr[i]) {
            return count;
          }
          if(ptr[i] == '\\') {
            if(!ptr[++i]) throw new Error('Weird backslash ?');
            if(ptr[i] == 'Q') {
              for(;;) {
                while(!!ptr[++i] && ptr[i] != '\\') {};
                if(!ptr[i]) throw new Error('No \\E ?');
                if(ptr[++i] == 'E') break;
              }
            }
            continue;
          }
        }
        continue;
      }


      //  Check for the special metacharacters
      if(ptr[i] == '(') {

        count = _find_parens_sub(ptr.slice(i), count);
        return count;
      } else if(ptr[i] == ')') {
        if(dup_parens && count < hwm_count) count = hwm_count;
      } else if(ptr[i] == '|' && dup_parens) {
        if(count > hwm_count) hwm_count = count;
        count = start_count;
      }
    }
    return count;
  }


  function _strncmp(str1, str2, lgth) {
    //       discuss at: http://locutusjs.org/php/strncmp/
    //      original by: Waldo Malqui Silva (http://waldo.malqui.info)
    //         input by: Steve Hilder
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //       revised by: gorthaur
    //  reimplemented by: Brett Zamir (http://brett-zamir.me)

    var s1 = (str1 + '')
      .substr(0, lgth);
    var s2 = (str2 + '')
      .substr(0, lgth);

    return((s1 == s2) ? 0 : ((s1 > s2) ? 1 : -1));
  }

  //  the actual function
  return function(pattern, s, flag, offset) {
      
    var order = flag || 'PREG_PATTERN_ORDER';
    //  TODO support flag combination
    var matches = [];
    var nbP = _find_parens_sub(pattern.source);

    if(typeof (offset) !== 'undefined' && offset > 0) {
      //  try to reproduce the behavior of the offset parameter, but I'm not sure how to test it.
      //  I have to rebuild a pattern.
      var ps = pattern.toString();
      var delimiter = ps.charAt(0);
      
      //  FIXME : If the user has escaped his delimiter in the pattern, I should unescape it before passing it to the RegExp constructor.
      //  but this should be done after the .join() ofc
      
      var t = ps.split(delimiter);
      t.shift();
      var flags = t.pop();
      t[0] = '.{' + offset + '}' + t[0];
      ps = t.join(delimiter);
      //  Have to rebuild it at runtime so no literal...	
      pattern = new RegExp(ps, flags); 
    }

    
    //  If the flag is 2 or 3, I should init the matches array with n+1 arrays
    //  Where n = nb of capturing parentheses
    
    if(order == 'PREG_PATTERN_ORDER' || order == 'PREG_OFFSET_CAPTURE') {
      for(var i = 0; i < 1 + nbP; i++) {
        matches[i] = [];
      }
    }

    s.replace(pattern, function () {
      var args = [].slice.call(arguments);
      //  Remove unnecessary elements from the args array
      var fullMatch = args.pop();
      var offset = args.pop();
      var substr = args[0];
      //  args now only contains the matches
      if(order === 'PREG_SET_ORDER') {
        matches.push(args);
      } else if(order === 'PREG_PATTERN_ORDER') {
        var l = args.length;
        matches[0].push(substr);
        for(var i = 1; i < l; i++) {
          if(!matches[(i)]) matches[(i)] = [];
          matches[(i)].push(args[i]);
        }
      } else if(order === 'PREG_OFFSET_CAPTURE') {
        if(!matches[0]) matches[0] = [];
        matches[0].push([args[0], offset]);
        var l = args.length;
        for(var i = 1; i < l; i++) {
          if(!matches[i]) matches[i] = [];
          matches[i].push([args[i], fullMatch.indexOf(args[i])]);
        }
      }
    });
    return matches;
  };
})();
