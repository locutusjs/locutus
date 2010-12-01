function ob_get_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_get_clean();
    // *     returns 1: 'some buffer contents'
    var buffer = '';
    this.php_js = this.phpjs || {};
    var phpjs = this.php_js, obs = phpjs.obs;
    if (!obs || !obs.length) {
        return false;
    }
    buffer = obs[obs.length-1].buffer;
    obs.pop();
    return buffer;
}