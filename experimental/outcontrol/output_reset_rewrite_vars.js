function output_reset_rewrite_vars () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: output_reset_rewrite_vars();
    // *     returns 1: true

    // Fix: also need to deal with those set by session_start() (will add to same obs?)

    this.php_js = this.php_js || {};
    var phpjs = this.php_js, obs = phpjs.obs;

    if (obs && obs.length && obs[obs.length-1].vars) {
        obs[obs.length-1].vars = {};
    }
    return true;
}
