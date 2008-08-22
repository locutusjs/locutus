// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/strings/addslashes.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = addslashes("kevin's birthday");;    
    
    // Compare call return value
    success = tester_comparer(returns, "kevin\'s birthday");
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    
    
}
