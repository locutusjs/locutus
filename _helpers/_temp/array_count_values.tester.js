// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_helpers/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_count_values.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);;    
    
    // Compare call return value
    success = tester_comparer(returns, {3:2, 5:1, "foo":2, "bar":1});
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });;    
    
    // Compare call return value
    success = tester_comparer(returns, {3:2, 5:1, "foo":2, "bar":1});
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = array_count_values([ true, 4.2, 42, "fubar" ]);;    
    
    // Compare call return value
    success = tester_comparer(returns, {42:1, "fubar":1});
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
