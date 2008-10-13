function sleep(seconds) {
    // http://kevin.vanzonneveld.net
    // +   original by: Christian Doebler
    // %          note: Could lock up the user's browser. Consider using setTimeout() instead.
    // *     example 1: sleep(1);
    // *     returns 1: 0;
    
    seconds *= 1000;
    var start = new Date().getTime();
    while (new Date().getTime() < start + seconds);
    
    return 0;
}