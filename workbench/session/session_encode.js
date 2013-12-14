function session_encode () {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // -    depends on: urldecode
    // *     example 1:
    // *     returns 1:

    var _getcookie = function (name) {
        var cookies = document.cookie.split(';'),i=0,l=cookies.length,
            current;
        for(;i<l;i++) {
            current = cookies[i].split('=');
    //            current[0] = current[0].replace(/\s+/,"");
            if(current[0] === name) {return current[1];}
        }
        return undefined;
    };

    /**
    * Encode string in session format (serialized then url encoded)
    */
    return this.urldecode(_getcookie('JSSESSID'));
}
