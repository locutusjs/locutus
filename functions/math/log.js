function log (arg, base) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: log(8723321.4, 7);
    // *     returns 1: 8.212871815082147

    if (base === undefined) {
        return Math.log(arg);
    } else {
        return Math.log(arg)/Math.log(base);
    }
}