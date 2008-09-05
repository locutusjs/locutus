// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_walk.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_walk ({'a':'b'} ,'void', 'userdata');;    
    
    // Compare call return value
    success = tester_comparer(returns, true);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = array_walk ('a' ,'void', 'userdata');;    
    
    // Compare call return value
    success = tester_comparer(returns, false);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
