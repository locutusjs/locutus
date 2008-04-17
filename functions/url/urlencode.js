function urlencode( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
                                     
    var ret = str;
    
    ret = ret.toString();
    ret = encodeURIComponent(ret);
    ret = ret.replace(/%20/g, '+');

    return ret;
}