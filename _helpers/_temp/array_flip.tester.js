// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_flip.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_flip( {a: 1, b: 1, c: 2} );;    
    
    // Compare call return value
    success = tester_comparer(returns, {1: 'b', 2: 'c'});
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
