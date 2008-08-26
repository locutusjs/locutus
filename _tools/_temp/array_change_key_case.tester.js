// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_change_key_case.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_change_key_case(42);;    
    
    // Compare call return value
    success = tester_comparer(returns, false);
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_change_key_case([ 3, 5 ]);;    
    
    // Compare call return value
    success = tester_comparer(returns, {0: 3, 1: 5});
    print('> returns', 2, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_change_key_case({ FuBaR: 42 });;    
    
    // Compare call return value
    success = tester_comparer(returns, {"fubar": 42});
    print('> returns', 3, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');;    
    
    // Compare call return value
    success = tester_comparer(returns, {"fubar": 42});
    print('> returns', 4, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');;    
    
    // Compare call return value
    success = tester_comparer(returns, {"FUBAR": 42});
    print('> returns', 5, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_change_key_case({ FuBaR: 42 }, 2);;    
    
    // Compare call return value
    success = tester_comparer(returns, {"FUBAR": 42});
    print('> returns', 6, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
