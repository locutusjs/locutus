function htmlspecialchars(string, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nathan
    // +   bugfixed by: Arno
    // *     example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
    // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    
    string = string.toString();
    
    // Always encode
    string = string.replace(/&/g, '&amp;');
    string = string.replace(/</g, '&lt;');
    string = string.replace(/>/g, '&gt;');
    
    // Encode depending on quote_style
    if (quote_style == 'ENT_QUOTES') {
        string = string.replace(/"/g, '&quot;');
        string = string.replace(/'/g, '&#039;');
    } else if (quote_style != 'ENT_NOQUOTES') {
        // All other cases (ENT_COMPAT, default, but not ENT_NOQUOTES)
        string = string.replace(/"/g, '&quot;');
    }
    
    return string;
}