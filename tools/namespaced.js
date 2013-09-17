// Load actual function source
// Main source we want to test
load('./env.js');
load('./tester.js');

load('../php.namespaced.js');

window.location = './tester.htm';

window.onload = function(){
    print('Debug started');
    
    /*
        Debug here, then:
         rhino namespaced.js
    */
    
    // Create PHPJS object
    //window.$P = PHP_JS();
    
    // Call a PHPJS function
    p = $P.strpos('Kevin van Zonneveld', 'e');
    
    // Call another PHPJS function
    d = $P.date('F j, Y, g:i a');
    
    print(d);
    print(p);
    
    print('Debug finished');
}