function setrawcookie(name, value, expires, path, domain, secure) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true

    if (expires instanceof Date) {
        expires = expires.toGMTString();
    } else if(typeof(expires) == 'number') {
        expires = (new Date(+(new Date) + expires * 1e3)).toGMTString();
    }

    var r = [name + "=" + value], s, i;
    for(i in s = {expires: expires, path: path, domain: domain}){
        s[i] && r.push(i + "=" + s[i]);
    }
    
    return secure && r.push("secure"), document.cookie = r.join(";"), true;
}