function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: null
    
    var doc_elem = document.createDocumentFragment();
    
    for( i = 0; i < echo.arguments.length; i++ ) {
        if( doc_elem.body && doc_elem.body.innerHTML ) {
            doc_elem.body.innerHTML = doc_elem.body.innerHTML + echo.arguments[i];
        } else {
            doc_elem.write( echo.arguments[i] );
        }
    }
    
    return null;
}