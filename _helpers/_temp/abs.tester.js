// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/math/abs.js');

window.location = '/home/kevin/workspace/plutonia-phpjs/_helpers/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = abs(4.2);;    
    
    // Compare call return value
    success = tester_comparer(returns, 4.2);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = abs(-4.2);;    
    
    // Compare call return value
    success = tester_comparer(returns, 4.2);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = abs(-5);;    
    
    // Compare call return value
    success = tester_comparer(returns, 5);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
    print('## SETS ##');
    // Execute Example Code
    returns = abs('_argos');;    
    
    // Compare call return value
    success = tester_comparer(returns, 0);
    print('> returns', success, tester_trim(tester_print_r(returns, true)));
    
    print('## RESULTS ##');
}
