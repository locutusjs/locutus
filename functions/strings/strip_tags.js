function strip_tags(str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i>,<b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    
    var match = '';
    
    if (allowed_tags) {
        allowed_tags = allowed_tags.replace(/[><]/g, '');
        allowed_tags = allowed_tags.replace(/ /g, '');
        allowed_tags = allowed_tags.replace(/,/g, '|'); 
    }
    
    match = '/</?[^('+allowed_tags+')][^>]*>/gi';
    alert(match);
    
    return str.replace(match, '');
}