function timezone_name_get (tzo) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: tzo = timezone_open('Europe/Prague');
    // *     example 1: timezone_name_get(tzo);
    // *     returns 1: 'Europe/Prague'
    
    return tzo.getName();
}