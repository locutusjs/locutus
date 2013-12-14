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
load('../functions/var/serialize.js');
load('../functions/var/var_dump.js');
load('../functions/datetime/date.js');
load('../functions/datetime/mktime.js');
load('../functions/strings/echo.js');



window.location = './tester.htm';

window.onload = function(){
    var print_r = function (a, r) {
        return tester_print_r(a, r);
    }

    //print('Debug started');
    /*
     * Debug here, then:
     *   rhino debug.js
     *   
    */

//
//    var $ser;
//
//    $ser = serialize("a \n b");
//    var_dump($ser);

	var timestamp = mktime( 0, 0, 0, 10, 31, 2010 );
	var temp = timestamp + (60*60*24*7);
    string_date = date('d-m-Y', temp);

    print(string_date);

    //print('Debug finished');
}