function ob_get_contents () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_get_contents();
    // *     returns 1: 'some buffer contents'

    var phpjs = this.php_js;
    if (!phpjs || !phpjs.obs || !phpjs.obs.length) {
        if (phpjs.ini && phpjs.ini.output_buffering &&
            (typeof phpjs.ini.output_buffering.local_value !== 'string' ||
                phpjs.ini.output_buffering.local_value.toLowerCase() !== 'off')) {
            return ''; // If output was already buffered, it would be available in phpjs.obs
        }
        return false;
    }
    return phpjs.obs[phpjs.obs.length-1].buffer; // Retrieve most recently added buffer contents
}