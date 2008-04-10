function nl2br( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br/>van<br/>Zonneveld'

    return str.replace(/([^>])\n/g, '$1<br/>');
}