function tester_comparer(result, should) {
    var _getType = function(obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t == "object") {
            t = "array";
        }
        return t;
    }
    
    var _why = function(str) {
        //print('***', str);
    }

    var key = '';
    var fkey = '';
    var val;
    
    var useResult = result;
    var useShould = should;
    
    // Determine types
    var resType = _getType(useResult);
    var shdType = _getType(useShould);
    
    /*
    // Number vs string comparison bails out too early
    if (resType != shdType) {
        // Bail out if types don't match
        _why('types don\'t match ('+resType+' vs '+shdType+')');
        return false;
    }
    */
    
    // Iterate & compare arrays 
    if (resType == "array") {
        // Bail out if count doesn't match
        var resCount = tester_count(useResult);
        var shdCount = tester_count(useShould);
        if (resCount != shdCount) {
            _why('count doesn\'t match ('+resCount+' vs '+shdCount+')');
            return false;
        }
        
        for (key in useShould) {
            // Rhino has a bug (https://bugzilla.mozilla.org/show_bug.cgi?id=419090)
            // causing us to use an uglier method, element order.
            
            val = useShould[key];
            if (false === (fkey = tester_array_search(val, useResult))) {
                _why('element doesn\'t exist in test-result');                
                return false;
            } 
            
            // Clear out
            useResult[fkey] = null;
            
            /*
            if (typeof(result[key]) == 'undefined') {
                // Bail out if element doesn't even exist in test-result
                _why('element doesn\'t exist in test-result');
                return false;
            }
            if (false == tester_comparer(result[key], should[key])) {
                return false;
            }
            */
        }
        // Arrays matched
        return true;
    }
    
    // 'Simple' types.
    if(useResult != useShould){
        _why('simple value doesn\'t match ('+useResult+' vs '+useShould+')');
        return false;
    }
    
    // Simple types matched;
    return true;
}

function tester_count( mixed_var, mode ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: _argos
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6

    var key, cnt = 0;

    if( mode == 'COUNT_RECURSIVE' ) mode = 1;
    if( mode != 1 ) mode = 0;

    for (key in mixed_var){
        cnt++;
        if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
            cnt += tester_count(mixed_var[key], 1);
        }
    }

    return cnt;
}

function tester_function_exists( function_name ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
    // *     example 1: function_exists('isFinite');
    // *     returns 1: true


    if (typeof function_name == 'string'){
        return (typeof window[function_name] == 'function');
    } else{
        return (function_name instanceof Function);
    }
}

function tester_sleep(seconds) {
    // http://kevin.vanzonneveld.net
    // +   original by: Christian Doebler
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %          note: For study purposes. Current implementation could lock up the user's browser.
    // %          note: Consider using setTimeout() instead.
    // *     example 1: sleep(1);
    // *     returns 1: 0

    var start = new Date().getTime();
    while (new Date() < start + seconds*1000);
    return 0;
}

function tester_trim( str, charlist ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'

    var whitespace;
    
    if (!charlist) {
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    } else{
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    }
  
    for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function tester_array_search( needle, haystack, strict ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'

    var strict = !!strict;

    for(var key in haystack){
        if (tester_comparer(haystack[key]), needle) {
            return key;
        }
    }

    return false;
}

function tester_print_r( array, return_val ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://crestidg.com)
    // +   improved by: Ben Bryan
    // *     example 1: tester_print_r(1, true);
    // *     returns 1: 1

    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";

        if (typeof obj == 'array' || typeof obj == 'object') {
            str += "Array\n" + base_pad + "(\n";
            for (var key in obj) {
                if (typeof obj[key] == 'array' || typeof obj[key] == 'object' ) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else if(obj == null || obj == undefined) {
            str = '';
        } else {
            str = obj.toString();
        }

        return str;
    };

    var repeat_char = function (len, pad_char) {
        var str = "";
        for(var i=0; i < len; i++) { 
            str += pad_char; 
        };
        return str;
    };
    output = formatArray(array, 0, pad_val, pad_char);

    if (return_val !== true) {
        print(output);
        return true;
    } else {
        return output;
    }
}