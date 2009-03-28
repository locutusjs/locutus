function output_reset_rewrite_vars () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: output_reset_rewrite_vars();
    // *     returns 1: true

    // Fix: also need to deal with those set by session_start() (will add to same obs?)

    if (this.php_js && this.php_js.obs && this.php_js.obs.length && this.php_js.obs[this.php_js.obs.length-1].vars) {
        this.php_js.obs[this.php_js.obs.length-1].vars = {};
    }
    return true;
}