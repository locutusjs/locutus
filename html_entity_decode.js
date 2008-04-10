function html_entity_decode( string ) {
    // http://kevin.vanzonneveld.net
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'

    var ret, tarea = document.createElement('textarea');
    tarea.innerHTML = string;
    ret = tarea.value;
    return ret;
}