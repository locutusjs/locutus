// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_search.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});;    
    
    // Compare call return value
    success = tester_comparer(returns, 'surname');
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
