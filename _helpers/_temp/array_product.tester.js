// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/array/array_product.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = array_product([ 2, 4, 6, 8 ]);;    
    
    // Compare call return value
    success = tester_comparer(returns, 384);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
