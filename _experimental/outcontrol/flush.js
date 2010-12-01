function flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: flush();
    // *     returns 1: undefined

    this.php_js = this.phpjs || {};
    var phpjs = this.php_js, obs = phpjs.obs;

    // Not distinct from ob_flush() in JavaScript, since not sending to a browser
    if (!obs || !obs.length) {
        return;
    }
    this.echo(obs[obs.length-1].buffer);
    obs[obs.length-1].buffer = '';
}