function is_resource (handle) {
    if (!handle || typeof handle !== 'object' || handle.constructor !== 'PHPJS_Resource') {
        return false;
    }
    return true;
}