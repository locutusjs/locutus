function output_add_rewrite_var (name, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ob_list_handlers
    // *     example 1: output_add_rewrite_var('var', 'value');
    // *     returns 1: true

    var handlers = [], handler='', startAgain=true;

    handlers = this.ob_list_handlers();

    if (handlers) {
        handler = handlers.pop();
        if (handler === 'URL-Rewriter') {
            startAgain = false;
        }
    }
    if (startAgain) {
        ob_start('URL-Rewriter', 0, true);
    }

    if (!this.php_js.obs[this.php_js.obs.length-1].vars) {
        this.php_js.obs[this.php_js.obs.length-1].vars = {};
    }
    this.php_js.obs[this.php_js.obs.length-1].vars[name] = value;

    return true;
}