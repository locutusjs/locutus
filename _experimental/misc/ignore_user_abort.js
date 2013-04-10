function ignore_user_abort (setting) {
   // http://kevin.vanzonneveld.net
   // +   original by: Brett Zamir (http://brett-zamir.me)
   // %        note 1: We cannot get the exact PHP meaning of abort, since 'abort', per the
   // %        note 1: DOM, is for aborting resource loading (interpreted by Explorer as
   // %        note 1: image loading), and 'unload' will not catch script abortions caused by
   // %        note 1: clicking "stop" as the page is loading
   // %        note 2: While this code presumably should work, at least in Firefox, it
   // %        note 2: does not (perhaps due to a bug in Firefox)
   // *     example 1: ignore_user_abort(true);
   // *     returns 1: 0

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ignoreUserAbort = this.php_js.ignoreUserAbort || 0
    // END REDUNDANT

   var old_prev_setting = this.php_js.ignoreUserAbort;

   if (setting) {
        if (!this.php_js.ignoreAbort) {
            this.php_js.ignoreAbort = true;
        }
        // Fix: Shouldn't override register_shutdown_function() though
       this.window.onunload = function (e){e.preventDefault();e.stopPropagation();};
       this.window.onabort = function (e){e.preventDefault();e.stopPropagation();};
       this.window.onstop = function (e){e.preventDefault();e.stopPropagation();};
       this.php_js.ignoreUserAbort = 1;
       return old_prev_setting;
   }
   else if (setting === false) {
        if (!this.php_js.ignoreAbort) {
            this.php_js.ignoreAbort = false;
        }
   }
   this.php_js.ignoreUserAbort = 0;

   return old_prev_setting;
}
