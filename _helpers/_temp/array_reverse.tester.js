// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_reverse.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_reverse( [ 'php', '4.0', ['green', 'red'] ], true );;    
    
    // Compare call return value
    success = tester_comparer(returns, { 2: ['green', 'red'], 1: 4, 0: 'php'});
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
