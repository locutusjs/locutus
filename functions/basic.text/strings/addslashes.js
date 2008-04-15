function addslashes( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // *     example 1: addslashes("kevin's birthday");
    // *     returns 1: "kevin\'s birthday"

    return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
}