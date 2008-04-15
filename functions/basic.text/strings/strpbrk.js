function strpbrk( haystack, char_list ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // *     example 1: strpbrk('This is a Simple text.', 'is');
    // *     returns 1: 'is is a Simple text.'

    var lon = haystack.length;
    var lon_search = char_list.length;
    var ret = false;
    var stack = '';

    if(lon >= lon_search) {
        if(lon == lon_search) {
            if(haystack == char_list){
                ret = haystack;
            }
        } else {
            j = 0;
            i = 0;
            while(i < lon_search && j < lon && !ret) {
                if(char_list[i] == haystack[j]) {
                    i++;
                    if(i == lon_search) ret = true;
                }
                j++;
            }
            if(ret){
                for(i = (j-lon_search); i < lon; i++){
                    stack += haystack[i];
                }
            }
            if(stack != ''){
                ret = stack;
            }
        }
    }
    return ret;
}