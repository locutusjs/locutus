function __LINE__(e) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Not a function in PHP, so in experimental
    // %        note 2: This function depends on the non-standard lineNumber property of Error instances (Mozilla)
    // %        note 3: Also requires 'e' error object to be passed in as an argument, unlike PHP
    // *     example 1: function a () {try {throw new Error();} catch (e) {return __LINE__(e);}}
    // *     example 1: a();
    // *     returns 1: '10'

    return e.lineNumber;
}
