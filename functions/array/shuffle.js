function shuffle( array ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: shuffle(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    
    array.sort(function() {return 0.5 - Math.random();});
    return true;
}