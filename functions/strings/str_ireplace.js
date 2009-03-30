function str_ireplace ( search, replace, subject ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Martijn Wieringa
    // +      input by: penutbutterjelly
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Jack
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_ireplace('l', 'l', 'HeLLo');
    // *     returns 1: 'Hello'

    var i, k = '';
    var searchl = 0;
    var reg;

    search += '';
    searchl = search.length;
    if (!(replace instanceof Array)) {
        replace = new Array(replace);
        if (search instanceof Array) {
            // If search is an array and replace is a string,
            // then this replacement string is used for every value of search
            while (searchl > replace.length) {
                replace[replace.length] = replace[0];
            }
        }
    }

    if (!(search instanceof Array)) {
        search = new Array(search);
    }
    while (search.length>replace.length) {
        // If replace has fewer values than search,
        // then an empty string is used for the rest of replacement values
        replace[replace.length] = '';
    }

    if (subject instanceof Array) {
        // If subject is an array, then the search and replace is performed
        // with every entry of subject , and the return value is an array as well.
        for (k in subject) {
            subject[k] = str_ireplace(search, replace, subject[k]);
        }
        return subject;
    }

    searchl = search.length;
    for (i = 0; i < searchl; i++) {
        reg = new RegExp(search[i], 'gi');
        subject = subject.replace(reg, replace[i]);
    }

    return subject;
}