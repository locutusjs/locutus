// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_pad.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_pad([ 7, 8, 9 ], 2, 'a');;    
    
    // Compare call return value
    success = tester_comparer(returns, [ 7, 8, 9]);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = array_pad([ 7, 8, 9 ], 5, 'a');;    
    
    // Compare call return value
    success = tester_comparer(returns, [ 7, 8, 9, 'a', 'a']);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = array_pad([ 7, 8, 9 ], 5, 2);;    
    
    // Compare call return value
    success = tester_comparer(returns, [ 7, 8, 9, 2, 2]);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = array_pad([ 7, 8, 9 ], -5, 'a');;    
    
    // Compare call return value
    success = tester_comparer(returns, [ 'a', 'a', 7, 8, 9 ]);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
