function define(name, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Ricardo F. Santos
    // *     example 1: define('IMAGINARY_CONSTANT1', 'imaginary_value1');
    // *     returns 1: true
    
    if (/boolean|number|null|string/.test(typeof value) !== true) {
        return false;
    }
    
    return (window[name] = value) !== undefined;
}