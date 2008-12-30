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


window.location = './tester.htm';

window.onload = function(){
    var print_r = function (a, r) {
        return tester_print_r(a, r);
    }

    print('Debug started');
    print();
    /*
     * Debug here, then:
     *   rhino debug.js
     *   
    */

    var combined;
    var keys = ['0', '1', '2'];
    var vals = ['a', 'b', 'c'];

    combined = array_combine(keys, vals);
    if (is_array(combined)) {
        print_r(combined);
    }

    
    print();
    print('Debug finished');
}