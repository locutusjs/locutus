function runkit_method_rename (classname, methodname, newname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: runkit_method_rename('someClass', 'someMethod', 'newMethod');
    // *     returns 1: true

	if (typeof classname === 'string') {
		classname = window[classname];
	}

	/*
	var method = classname[methodname]; // Static
	classname[newname] = method;
	delete classname[methodname];
	*/

    if (classname.name !== 'PHP_JS' ||  // By default, don't allow overriding of PHP functions
        (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] &&
        (this.php_js.ini['runkit.internal_override'].local_value === true ||
            this.php_js.ini['runkit.internal_override'].local_value === 1 ||
            this.php_js.ini['runkit.internal_override'].local_value === '1' ||
            this.php_js.ini['runkit.internal_override'].local_value === 'true'
            )
        )) {
        var method = classname.prototype[methodname];
        classname.prototype[newname] = method;
        delete classname.prototype[methodname];
        return true;
    }
    return false;
}