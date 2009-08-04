function str_rot13 (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   bugfixed by: Onno Marsman
    // *     example 1: str_rot13('Kevin van Zonneveld');
    // *     returns 1: 'Xriva ina Mbaariryq'
    // *     example 2: str_rot13('Xriva ina Mbaariryq');
    // *     returns 2: 'Kevin van Zonneveld'

    return (str+'').replace(/[A-Za-z]/g, function (c) {
        return String.fromCharCode((((c = c.charCodeAt(0)) & 223) - 52) % 26 + (c & 32) + 65);
    });
}