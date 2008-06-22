function rsort( array, sort_flags ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: rsort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    
    var sorter = false;
    
    // For now only SORT_NUMERIC has a custom sorter
    // and SORT_REGULAR, SORT_STRING, and SORT_LOCALE_STRING
    // are all handled with the default sorter 
    if (sort_flags == 'SORT_NUMERIC') {
        sorter = function (a, b) {
            return(a - b);
        };
    }
    
    if (sorter !== false) {
        array.sort(sorter);
    } else {
        array.sort();
    }
    
    // What makes it rsort:
    array.reverse();
    
    return true;
}