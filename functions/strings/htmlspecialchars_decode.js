function htmlspecialchars_decode(string, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
    // *     returns 1: '<p>this -> &quot;</p>'
    
    string = string.toString();
    
    // Always encode
    string.replace('/&amp;/g', '&');
    string.replace('/&lt;/g', '<');
    string.replace('/&gt;/g', '>');
    
    // Encode depending on quote_style
    if (quote_style == 'ENT_QUOTES') {
        string.replace('/&quot;/g', '"');
        string.replace('/&#039;/g', '\'');
    } else if (quote_style != 'ENT_NOQUOTES') {
        // All other cases (ENT_COMPAT, default, but not ENT_NOQUOTES)
        string.replace('/&quot;/g', '"');
    }
    
    return string;
}