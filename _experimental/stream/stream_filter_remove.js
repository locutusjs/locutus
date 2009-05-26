function stream_filter_remove (stream_filter) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: var fp = fopen("test.txt", "rw");
    // *     example 1: var rot13_filter = stream_filter_append(fp, 'string.rot13', 'STREAM_FILTER_WRITE');
    // *     example 1: fwrite(fp, 'This is ');
    // *     example 1: stream_filter_remove(rot13_filter);
    // *     returns 1: true

    var streamResourceObj = stream_filter.streamData[0];
    var streamData = stream_filter.streamData.slice(1);

    var filterPos = streamResourceObj.filters.indexOf(streamData);

    if (!stream_filter || !stream_filter.streamData || filterPos === -1) {
        return false;
    }

    streamResourceObj.filters.splice(filterPos, 1);
    return true;
}