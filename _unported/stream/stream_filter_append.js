function stream_filter_append (stream, filtername, read_write, params) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)

    var i = 0, opts = 0;

    if (!stream.filters) {
        stream.filters = [];
    }
    stream.filters.push(filtername);


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

    
}