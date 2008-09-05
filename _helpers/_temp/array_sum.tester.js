// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_sum.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_sum([4, 9, 182.6]);;    
    
    // Compare call return value
    success = tester_comparer(returns, 195.6);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
