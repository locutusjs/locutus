function get_resource_type (handle) {
    if (!handle || typeof handle !== 'object' || handle.constructor !== 'PHPJS_Resource') {
        return false;
    }
    return handle.get_resource_type();
}