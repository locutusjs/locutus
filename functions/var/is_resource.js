function is_resource (handle) {
    if (!handle || typeof handle !== 'object' ||  !(handle instanceof PHPJS_Resource)) {
        return false;
    }
    return true;
}