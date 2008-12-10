function gettype( mixed_var ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Ricardo F. Santos
    // %        note 1: lacks only resource type
    // *     example 1: gettype(186.31);
    // *     returns 1: true

    switch (type = typeof mixed_var) {
    case 'boolean':
    case 'string':
        return type;
        break;
    case 'number':
        return (is_float(mixed_var)) ? 'double' : 'integer';
        break;
    case 'object':
        return (mixed_var instanceof Array) ? 'array' : ((mixed_var === null) ? 'NULL' : 'object');
        break;
    }

    return 'unknown type';
}