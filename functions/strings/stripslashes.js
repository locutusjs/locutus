function stripslashes( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"

    return str.replace('/\0/g', '0').replace('/\(.)/g', '$1');
}