function strip_tags(str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Luke Godfrey
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i>,<b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    
    var key = '', tag = '';
    var matches = allowed_array = [];
    var allowed_keys = {};
    
    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_tags  = allowed_tags.replace(/[\<\> ]+/g, '');;
        allowed_array = allowed_tags.split(',');
        
        for (key in allowed_array) {
            tag = allowed_array[key];
            allowed_keys['<' + tag + '>']   = true;
            allowed_keys['<' + tag + ' />'] = true;
            allowed_keys['</' + tag + '>']  = true;
        }
    }
    
    // Match tags
    matches = str.match(/(<\/?[^>]+>)/gi);
    
    // Is tag not in allowed list? Remove from str! 
    for (key in matches) {
        tag = matches[key].toString();
        if (!allowed_keys[tag]) {
            // Looks like this is
            // reg = RegExp(tag, 'g');
            // str = str.replace(reg, '');
            str = str.replace(tag, "");
        }
    }
    
    return str;
}