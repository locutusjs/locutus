function basename(path) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ozh
    // *     example 1: basename('/etc/passwd');
    // *     returns 1: '/etc'
    // *     example 2: basename('c:/Temp/x');
    // *     returns 2: 'c:/Temp'

    return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');;
}