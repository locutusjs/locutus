function gmstrftime (format, timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: strftime
    // *     example 1: gmstrftime("%A", 1062462400);
    // *     returns 1: 'Tuesday'
    var dt = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
        (typeof(timestamp) == 'number') ? new Date(timestamp*1000) : // UNIX timestamp
        new Date(timestamp));
    timestamp = Date.parse(dt.toUTCString().slice(0, -4))/1000;
    return this.strftime(format, timestamp);
}