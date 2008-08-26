function time() {
    // http://kevin.vanzonneveld.net
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: timeStamp = time();
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    
    var d = new Date();
    return Math.round(d.getTime()/1000);
}