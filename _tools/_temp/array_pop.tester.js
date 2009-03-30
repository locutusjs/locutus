// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_pop.js');
while(true) {
    if (tester_function_exists('array_pop')) {
        break;
    }
    print('array_pop does not exist yet');
    tester_sleep(1);
}

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_pop([0,1,2]);;    
    
    // Compare call return value
    success = tester_comparer(returns, 2);
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    data = {firstName: 'Kevin', surName: 'van Zonneveld'};;    
    returns = lastElem = array_pop(data);;    
    
    // Compare call return value
    success = tester_comparer(returns, 'van Zonneveld');
    print('> returns', 2, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Compare variable results
    success = tester_comparer(data, {firstName: 'Kevin'});
    print('> results', 2, success, tester_trim(tester_print_r(data, true)));
    print('## RESULTS ##');
    
}
