// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_reduce.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_reduce([1, 2, 3, 4, 5], function(v, w){v += w;return v;});;    
    
    // Compare call return value
    success = tester_comparer(returns, 15);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
