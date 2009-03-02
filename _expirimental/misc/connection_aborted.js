function connection_aborted() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: connection_aborted();
    // *     returns 1: 0

    var retVal = 0;

    window.addEventListener('abort', function(e){
        retVal = 1;
    }, false);
    window.addEventListener('unload', function(e){
        retVal = 1;
    }, false);
    window.addEventListener('stop', function(e){
        retVal = 1;
    }, false);
   
    return retVal;
}