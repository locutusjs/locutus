function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: null
    
    var arg = '', argc = arguments.length, argv = arguments, i = 0;
    var bodies = [], body, elmt;
    
    // .shift() does not work to get first item in bodies
    bodies = document.getElementsByTagName("body");
    if (!bodies || ! bodies[0]) {
        return false;
    }
    body   = bodies[0];
    
    for (i = 0; i < argc; i++ ) {
        arg = argv[i];
        if (document.createTextNode && document.appendChild) {
            elmt = document.createTextNode(arg);
            document.appendChild(elmt);
        } else if (document.write) {
            document.write(arg);
        }
    }
    
    return null;
}