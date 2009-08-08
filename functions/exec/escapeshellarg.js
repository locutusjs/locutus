function escapeshellarg(arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: escapeshellarg("kevin's birthday");
    // *     returns 1: "'kevin\'s birthday'"

    var ret = '';

    ret = arg.replace(/[^\\]'/g, function(m, i, s) {
            return m.substr(0, 1)+'\\'+m.substr(1, 1);
    });

    return "'"+ret+"'";
}