function fopen (filename, mode, use_include_path, context) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     returns 1: 'Resource id #1'

    // BEGIN file inclusion: file_get_contents
    var file_get_contents = function ( url ) {
        var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        if (!req) throw new Error('XMLHttpRequest not supported');
        req.open("GET", url, false);
        req.send(null);
        return req.responseText;
    }
    // END file inclusion

    if (use_include_path === 1 || use_include_path === '1' || use_include_path === true) { 
        // Not implemented yet: Search for file in include path too
    }
    if (context) {
        // Not implemented yet, but could be useful to modify nature of HTTP request, etc.
    }

    for (var i=0; i < mode.length; i++) { // Have to deal with other flags if ever allow
        switch(mode[i]) {
            case 'r':
                break;
            case 'r+':
            case 'w':
            case 'w+':
            case 'a':
            case 'a+':
            case 'x':
            case 'x+':
                throw 'Writing is not implemented';
            case 'b':
            case 't':
                throw 'Windows-only modes are not supported';
            default:
                throw 'Unrecognized file mode passed to fopen()';
                break;
        }
    }

    // BEGIN STATIC
    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.resourceData) {
        this.php_js.resourceData = {};
    }
    if (!this.php_js.resourceIdCounter) {
        this.php_js.resourceIdCounter = 0;
    }
    if (!this.php_js.resourceDataPointer) {
        this.php_js.resourceDataPointer = {};
    }
    this.php_js.resourceIdCounter++;

    function PHPJS_Resource (type, id) { // Can reuse the following for other resources, just changing the instantiation
        this.type = type;
        this.id = id;
    }
    PHPJS_Resource.prototype.toString = function () {
        return 'Resource id #'+this.id;
    };
    PHPJS_Resource.prototype.get_resource_type = function () {
        return this.type;
    };
    PHPJS_Resource.prototype.var_dump = function () {
        return 'resource('+this.id+') of type ('+this.type+')';
    };
    // END STATIC

    this.php_js.resourceData[this.php_js.resourceIdCounter] = file_get_contents(filename);
    this.php_js.resourceDataPointer[this.php_js.resourceIdCounter] = 0;

    return new PHPJS_Resource('stream', this.php_js.resourceIdCounter); // may be 'file' instead of 'stream' type on some systems
}
