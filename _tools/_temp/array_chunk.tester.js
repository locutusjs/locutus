// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_chunk.js');
while(true) {
    if (tester_function_exists('array_chunk')) {
        break;
    }
    print('array_chunk does not exist yet');
    tester_sleep(1);
}

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_chunk(['Kevin', 'van', 'Zonneveld'], 2);;    
    
    // Compare call return value
    success = tester_comparer(returns, {0 : {0: 'Kevin', 1: 'van'} , 1 : {0: 'Zonneveld'}});
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
