function get_defined_vars () {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Test case 1: If get_defined_vars can find itself in the defined vars, it worked :)
  // *     example 1: function test_in_array(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
  // *     example 1: funcs = get_defined_vars();
  // *     example 1: found = test_in_array(funcs, 'get_defined_vars');
  // *     results 1: found == true
  var i = '',
    arr = [],
    already = {};

  for (i in this.window) {
    try {
      if (typeof this.window[i] === 'object') {
        for (var j in this.window[i]) {
          if (this.window[j] && !already[j]) {
            already[j] = 1;
            arr.push(j);
          }
        }
      } else if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    } catch (e) { // Problems accessing some properties in FF (e.g., sessionStorage)
      if (!already[i]) {
        already[i] = 1;
        arr.push(i);
      }
    }
  }

  return arr;
}
