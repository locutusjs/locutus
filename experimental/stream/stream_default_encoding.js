function stream_default_encoding (encoding) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Not yet documented at PHP site
    // *     example 1: stream_default_encoding('UTF-8');
    // *     returns 1: true

    this.ini_set('unicode.stream_encoding', encoding);
    return true;
}
