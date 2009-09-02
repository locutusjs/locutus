// Load Includes
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/env.js');
// Include: Shell Requirement
load('/home/kevin/workspace/plutonia-phpjs/_tools/tester.js');

// Main source we want to test
load('/home/kevin/workspace/plutonia-phpjs/functions/var/serialize.js');
while(true) {
    if (tester_function_exists('serialize')) {
        break;
    }
    print('serialize does not exist yet');
    tester_sleep(1);
}

window.location = '/home/kevin/workspace/plutonia-phpjs/_tools/tester.htm';
window.onload = function(){
    print('## SETS ##');
    // Execute Example Code
    returns = serialize(['Kevin', 'van', 'Zonneveld']);;    
    
    // Compare call return value
    success = tester_comparer(returns, 'a:3:{i:0;s:5:\"Kevin\";i:1;s:3:\"van\";i:2;s:9:\"Zonneveld\";}');
    print('> returns', 1, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
    // Execute Example Code
    returns = serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});;    
    
    // Compare call return value
    success = tester_comparer(returns, 'a:3:{s:9:\"firstName\";s:5:\"Kevin\";s:7:\"midName\";s:3:\"van\";s:7:\"surName\";s:9:\"Zonneveld\";}');
    print('> returns', 2, success, tester_trim(tester_print_r(returns, true)));
    print('## RESULTS ##');
    
}
