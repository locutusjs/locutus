function output_add_rewrite_var (name, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ob_list_handlers
    // -    depends on: ob_start
    // *     example 1: output_add_rewrite_var('var', 'value');
    // *     returns 1: true

    var handlers = [], handler = '', startAgain = true;

    this.php_js = this.php_js || {};
    var phpjs = this.php_js, obs = phpjs.obs;

    handlers = this.ob_list_handlers();

    if (handlers) {
        handler = handlers.pop();
        if (handler === 'URL-Rewriter') {
            startAgain = false;
        }
    }
    if (startAgain) {
        this.ob_start('URL-Rewriter', 0, true);
    }

    if (!obs[obs.length-1].vars) {
        obs[obs.length-1].vars = {};
    }
    obs[obs.length-1].vars[name] = value;

    return true;
}
