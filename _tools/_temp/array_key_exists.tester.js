// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_key_exists.js');
while(true) {
    if (tester_function_exists('array_key_exists')) {
        break;
    }
    print('array_key_exists does not exist yet');
    tester_sleep(1);
}

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_key_exists('kevin', {'kevin': 'van Zonneveld'});;    
    
    // Compare call return value
    success = tester_comparer(returns, true);
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
