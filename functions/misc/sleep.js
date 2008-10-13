function sleep(seconds) {
    // http://kevin.vanzonneveld.net
    // +   original by: Christian Doebler
    // %          note: For study purposes. Current implementation could lock up the user's browser. 
    // %          note: Consider using setTimeout() instead.
    // *     example 1: sleep(1);
    // *     returns 1: 0
    
    seconds *= 1000;
    var start = new Date().getTime();
    while (new Date().getTime() < start + seconds);
    
    return 0;
}