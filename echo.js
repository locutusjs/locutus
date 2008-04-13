function echo ( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: null
    
    for( i = 0; i < echo.arguments.length; i++ ) {
        if( document.body && document.body.innerHTML ) {
            document.body.innerHTML = document.body.innerHTML + echo.arguments[i];
        } else {
            document.write( echo.arguments[i] );
        }
    }
    //return null;
}