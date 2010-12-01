function ob_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_flush();
    // *     returns 1: undefined

    this.php_js = this.phpjs || {};
    var phpjs = this.php_js, obs = phpjs.obs;

    if (!obs || !obs.length) {
        return;
    }
    this.echo(obs[obs.length-1].buffer);
    obs[obs.length-1].buffer = '';
}