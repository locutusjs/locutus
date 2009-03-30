// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_count_values.js');
while(true) {
    if (tester_function_exists('array_count_values')) {
        break;
    }
    print('array_count_values does not exist yet');
    tester_sleep(1);
}

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);;    
    
    // Compare call return value
    success = tester_comparer(returns, {3:2, 5:1, "foo":2, "bar":1});
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });;    
    
    // Compare call return value
    success = tester_comparer(returns, {3:2, 5:1, "foo":2, "bar":1});
    print('> returns', 2, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = array_count_values([ true, 4.2, 42, "fubar" ]);;    
    
    // Compare call return value
    success = tester_comparer(returns, {42:1, "fubar":1});
    print('> returns', 3, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
