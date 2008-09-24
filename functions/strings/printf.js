function printf( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://getsprink.com)
    // -    depends on: sprintf
    // *     example 1: printf("%01.2f", 123.1);
    // *     returns 1: 6

    var bodies = [], body, elmt;
    var ret = '';
    
    // .shift() does not work to get first item in bodies
    bodies = document.getElementsByTagName("body");
    if (!bodies || ! bodies[0]) {
        return false;
    }
    body   = bodies[0];
    
    
    ret = sprintf.apply(this, arguments);

    elmt = document.createTextNode(ret);
    body.appendChild(elmt);
    
    return ret.length;
}