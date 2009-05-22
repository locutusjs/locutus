function import_request_variables (types, prefix) {
    // http://kevin.vanzonneveld.net
    // +      original by: Jalal Berrami
    // + reimplemented by: Brett Zamir (http://brettz9.blogspot.com)
    // + improved by: Brett Zamir (http://brettz9.blogspot.com)
    // *        example 1: document.cookie = 'snack=yummy';
    // *        example 1: import_request_variables('gc', 'pr_');
    // *        results 1: pr_snack == 'yummy'

    var i = 0, current = '', url = '', vars = '', arrayBracketPos = -1, arrName='', win = this.window, targetObj = this.window;
    prefix = prefix || '';

    if (this.php_js && this.php_js.ini && this.php_js.ini['phpjs.requestVarsObj'] &&
        this.php_js.ini['phpjs.requestVarsObj'].local_value) { // Allow designated object to be used instead of window
        targetObj = this.php_js.ini['phpjs.requestVarsObj'].local_value;
    }

    if (/g/i.test(types)) { // GET
        for(i = 0, url = win.location.href, vars = url.substring(url.lastIndexOf("?") + 1, url.length).split("&"); i < vars.length; i++){
            current = vars[i].split("=");
            arrayBracketPos = current[0].indexOf('[');
            if (arrayBracketPos !== -1) {
                arrName = current[0].substring(0, arrayBracketPos);
                if (!targetObj[prefix+arrName]) {
                    targetObj[prefix+arrName] = [];
                }
                targetObj[prefix+arrName].push(current[1] || null);
            }
            else {
                targetObj[prefix+current[0]] = current[1] || null;
            }
        }
    }
    if (/c/i.test(types)) { // COOKIE
        for(i = 0, vars = win.document.cookie.split("&"); i < vars.length;i++){
            current = vars[i].split("=");
            targetObj[prefix+current[0]] = current[1].split(";")[0] || null;
        }
    }
}