function set_time_limit(seconds) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: set_time_limit(4);
    // *     returns 1: undefined
    
    window.setTimeout(function () {throw 'Maximum execution time exceeded';}, seconds*1000);
}