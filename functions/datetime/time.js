function time() {
    // http://kevin.vanzonneveld.net
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: time();
    // *     returns 1: 1216363871
    
    var d = new Date();
    return Math.round(d.getTime()/1000);
}