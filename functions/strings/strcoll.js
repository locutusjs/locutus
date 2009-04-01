function strcoll (str1, str2) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: strcoll('a', 'b');
    // *     returns 1: -1
	
	// We might modify this to work with setlocale() locales instead of JS's own (and same with sort(), etc.)
    return str1.localeCompare(str2);
}