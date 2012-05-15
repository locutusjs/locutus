function is_bool (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: is_bool(false);
    // *     returns 1: true
    // *     example 2: is_bool(0);
    // *     returns 2: false
    return (typeof mixed_var === 'boolean');
}
