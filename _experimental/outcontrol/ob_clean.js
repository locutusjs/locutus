function ob_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_clean();
    // *     returns 1: undefined

    this.php_js = this.phpjs || {};
    var phpjs = this.php_js, obs = phpjs.obs;

    if (!obs || !obs.length) {
        return;
    }
    obs[obs.length-1].buffer = '';
}