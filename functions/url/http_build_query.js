function http_build_query (formdata, numeric_prefix, arg_separator) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   improved by: Michael White (http://getsprink.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +    revised by: stag019
  // +   input by: Dreamer
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  // +   improved by: Vadim Zozulya
  // %        note 1: If the value is null, key and value is skipped in http_build_query of PHP. But, phpjs is not.
  // -    depends on: urlencode
  // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
  // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
  // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
  // *     example 3: http_build_query({cat1: {key1: 'value1', key2: 'value2', key3: ['val1', 'val2']}, cat2: ['value1', 'value2'], cat3:'value'});
  // *     returns 3: 'cat1[key1]=value1&cat1[key2]=value2&cat1[key3][]=val1&cat1[key3][]=val2&cat2[]=value1&cat2[]=value2&cat3=value'
  var value, key, tmp = [],
    that = this;

  var _http_build_query_helper = function (key, val, arg_separator) {
    var k, tmp = [];
    if (val === true) {
      val = "1";
    } else if (val === false) {
      val = "0";
    }
    if (val != null) {
      if(typeof(val) === "object") {
        var start = 0;
        for (k in val) {
          if (val[k] != null) {
            var sk, num = Number(k);
            if(!isNaN(num) && num - start == 0) {
              sk = '';
              start++;
            } else {
              sk = that.urlencode(k);
            }
            tmp.push(_http_build_query_helper(key + "[" + sk + "]", val[k], arg_separator));
          }
        }
        return tmp.join(arg_separator);
      } else if (typeof(val) !== "function") {
        return key + "=" + that.urlencode(val);
      } else {
        throw new Error('There was an error processing for http_build_query().');
      }
    } else {
      return '';
    }
  };

  if (!arg_separator) {
    arg_separator = "&";
  }
  for (key in formdata) {
    value = formdata[key];
    if (numeric_prefix && !isNaN(key)) {
      key = String(numeric_prefix) + key;
    }
    var query = _http_build_query_helper(that.urlencode(key), value, arg_separator);
    if(query != '') {
      tmp.push(query);
    }
  }

  return tmp.join(arg_separator);
}
