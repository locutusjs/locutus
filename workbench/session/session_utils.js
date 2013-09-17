// This file is only for assisting session testing; it is NOT a php.js function
/**
* Get value of a cookie
*/
function getcookie(name) {
    var cookies = document.cookie.split(';'),i=0,l=cookies.length,
        current;
    for(;i<l;i++) {
        current = cookies[i].split('=');
//            current[0] = current[0].replace(/\s+/,"");
        if(current[0] === name) {return current[1];}
    }
    return undefined;
}
