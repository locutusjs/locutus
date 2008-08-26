// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_diff_key.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_diff_key({red: 1, green: 2, blue: 3, white: 4});;    
    
    // Compare call return value
    success = tester_comparer(returns, {"red":1, "green":2, "blue":3, "white":4});
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});;    
    
    // Compare call return value
    success = tester_comparer(returns, {"green":2, "blue":3, "white":4});
    print('> returns', 2, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {green: 6, blue: 7});;    
    
    // Compare call return value
    success = tester_comparer(returns, {"white":4});
    print('> returns', 3, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});;    
    
    // Compare call return value
    success = tester_comparer(returns, {"green":2, "blue":3, "white":4});
    print('> returns', 4, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
