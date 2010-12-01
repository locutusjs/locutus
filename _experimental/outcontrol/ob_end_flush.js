function ob_end_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_end_flush();
    // *     returns 1: true

    this.php_js = this.phpjs || {};
    var obs = this.php_js.obs;

    if (!obs || !obs.length) {
        return false;
    }
    var contents = obs[obs.length-1].buffer;
    obs.pop();
    this.echo(contents);

    return true;
}