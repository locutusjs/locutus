// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_map.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_map( function(a){return (a * a * a)}, [1, 2, 3, 4, 5] );;    
    
    // Compare call return value
    success = tester_comparer(returns, [ 1, 8, 27, 64, 125 ]);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
