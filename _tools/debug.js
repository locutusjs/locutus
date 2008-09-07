// Load actual function source
// Main source we want to test
load('./env.js');
load('./tester.js');

load('../functions/funchand/call_user_func_array.js');
load('../functions/funchand/create_function.js');
load('../functions/funchand/function_exists.js');

window.location = './tester.htm';

window.onload = function(){
    print('Debug started');

    /*
    Debug here, then:
     rhino debug.js
    */
    
    print('Debug finished');
}