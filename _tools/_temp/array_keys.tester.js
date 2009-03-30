// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_keys.js');
while(true) {
    if (tester_function_exists('array_keys')) {
        break;
    }
    print('array_keys does not exist yet');
    tester_sleep(1);
}

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );;    
    
    // Compare call return value
    success = tester_comparer(returns, {0: 'firstname', 1: 'surname'});
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
