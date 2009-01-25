// Load actual function source
// Main source we want to test
load('./env.js');
load('./tester.js');

// load('../functions/funchand/call_user_func_array.js');
// load('../functions/funchand/create_function.js');
// load('../functions/funchand/function_exists.js');

load('../functions/var/gettype.js');
load('../functions/var/intval.js');
load('../functions/var/is_array.js');
load('../functions/var/is_object.js');
load('../functions/array/array_combine.js');
load('../functions/string/substr_count.js');


window.location = './tester.htm';

window.onload = function(){
    var print_r = function (a, r) {
        return tester_print_r(a, r);
    }

    var d = new Date();
    var stop = 0, start = 0, diff = 0;

    var implementation1 = substr_count();
    var implementation2 = function substr_count2( haystack, needle, offset, length ) {
          if(!isNaN(offset)){
            if(!isNaN(length)){
              haystack=haystack.substr(offset,length);
            }else haystack = haystack.substr(offset)
          }
          haystack = haystack.split(needle).length-1
          return haystack<0?false:haystack;
    };

    start = d.getTime();
implementation1
    stop = d.getTime();
    diff = stop - start;

    print();
    print('Debug finished');
}