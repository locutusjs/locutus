function ob_end_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_end_clean();
    // *     returns 1: true

    this.php_js = this.phpjs || {};
    var phpjs = this.php_js, obs = phpjs.obs;

    if (!obs || !obs.length) {
        return false;
    }
    obs.pop();
    return true;
}