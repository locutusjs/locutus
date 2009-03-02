function ignore_user_abort() {
   // http://kevin.vanzonneveld.net
   // +   original by: Brett Zamir
   // %        note 1: We cannot get the exact PHP meaning of abort, since 'abort', per the
   // %        note 1: DOM, is for aborting resource loading (interpreted by Explorer as
   // %        note 1: image loading), and 'unload' will not catch script abortions caused by
   // %        note 1: clicking "stop" as the page is loading
   // %        note 2: While this code presumably should work, at least in Firefox, it
   // %        note 2: does not (perhaps due to a bug in Firefox)
   // *     example 1: ignore_user_abort(true);
   // *     returns 1: 0

   var prev_setting = 0;

   return function (setting) {
       var old_prev_setting = prev_setting;
       
       if (setting) {
           window.addEventListener('unload', function(e){e.preventDefault();e.stopPropagation();}, false);
           window.addEventListener('abort', function(e){e.preventDefault();e.stopPropagation();}, false);
           window.addEventListener('stop', function(e){e.preventDefault();e.stopPropagation();}, false);
           prev_setting = 1;
           return old_prev_setting;
       }
       prev_setting = 0;

       return old_prev_setting;
   };
}