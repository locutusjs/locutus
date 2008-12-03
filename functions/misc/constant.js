function constant(name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Ricardo F. Santos
    // *     example 1: constant('IMAGINARY_CONSTANT1');
    // *     returns 1: null

    if (window[name] === undefined) {
        return null;
    }

    return window[name];
}