function get_resource_type (handle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: get_resource_type('a');
    // *     returns 1: false

    if (!handle || typeof handle !== 'object' || handle.constructor !== 'PHPJS_Resource') {
        return false;
    }

    return handle.get_resource_type();
}