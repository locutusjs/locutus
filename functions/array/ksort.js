function ksort(array, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
    // *     returns 1: true
    // *     example 2: ksort(data);
    // *     results 2: data == {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    
    var tmp_arr = {}, values = array, keys = [], key_num = 0, key = '', i = 0; 
    var sorter = false, array = false;
    
    // For now only SORT_NUMERIC has a custom sorter
    // and SORT_REGULAR, SORT_STRING, and SORT_LOCALE_STRING
    // are all handled with the default sorter 
    if (sort_flags == 'SORT_NUMERIC') {
        sorter = function (a, b) {
            return(a - b);
        };
    }
    
    // Make a list of key names
    for (key in values) { 
        keys[key_num++] = key; 
    }
     
    // Sort key names
    if (sorter !== false) {
        keys = keys.sort(sorter);
    } else {
        keys = keys.sort();
    }
    
    // Rebuild array with sorted keynames
    for (i = 0; i < key_num; i++) {
        key = keys[i];
        tmp_arr[key] = values[key]; 
    } 
    
    // Overwrite the original array, don't return it, to be complient with the php manual
    array = tmp_arr;
    return true; 
}