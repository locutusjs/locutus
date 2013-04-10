function stream_filter_append (stream, filtername, read_write, params) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var fp = fopen('test.txt', 'w+');
    // *     example 1: stream_filter_append(fp, 'string.rot13', 'STREAM_FILTER_WRITE');
    // *     returns 1: 'Resource id #1'

    // Fix: "When a new filter is appended to a stream, data in the internal buffers is processed through the new filter at that time."

    var i = 0, opts = 0, resource = {};

    // FLAGS: read_write
    if (!read_write) {read_write = 0;}
    var OPTS = {
        STREAM_FILTER_READ: 1,
        STREAM_FILTER_WRITE : 2,
        STREAM_FILTER_ALL : 1 | 2
    };
    if (typeof options === 'number') {
        opts = read_write;
    }
    else { // Allow for a single string or an array of string flags
        read_write = [].concat(read_write);
        for (i=0; i < read_write.length; i++) {
            // Resolve string input to bitwise
            if (OPTS[read_write[i]]) {
                opts = opts | OPTS[read_write[i]];
            }
        }
    }

    // ATTACH FILTER INFO ONTO STREAM (do instead with map on php_js?)
    if (!stream.filters) {
        stream.filters = [];
    }
    stream.filters.push([filtername, opts, params]);

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.resourceIdCounter = this.php_js.resourceIdCounter || 0;

    function PHPJS_Resource (type, id, opener) { // Can reuse the following for other resources, just changing the instantiation
        // See http://php.net/manual/en/resource.php for types
        this.type = type;
        this.id = id;
        this.opener = opener;
    }
    PHPJS_Resource.prototype.toString = function () {
        return 'Resource id #'+this.id;
    };
    PHPJS_Resource.prototype.get_resource_type = function () {
        return this.type;
    };
    PHPJS_Resource.prototype.var_dump = function () {
        return 'resource('+this.id+') of type ('+this.type+')';
    };
    // END REDUNDANT

    this.php_js.resourceIdCounter++;
    resource = new PHPJS_Resource('stream filter', this.php_js.resourceIdCounter, 'stream_filter_append');
    resource.streamData = [stream, filtername, opts, params]; // Will be used as basis for stream_filter_remove()
    return resource;
}
