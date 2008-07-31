// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_diff_assoc.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});;    
    
    // Compare call return value
    success = tester_comparer(returns, {1: 'van', 2: 'Zonneveld'});
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
