function array () {
    // http://kevin.vanzonneveld.net
    // +   original by: d3x
    // *     example 1: array('Kevin', 'van', 'Zonneveld');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld']

    return Array.prototype.slice.call(arguments);
}