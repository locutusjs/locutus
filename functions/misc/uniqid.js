function uniqid() {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: dechex
    // %        note 1: Uses an internal counter (in php_js global) to avoid collision
    // %        note 2: Not perfect yet. We need to checkout the PHP source
    // %        note 2: to find out how they generate this exactly
    // %        note 2: but for now we have a uniqid that generates unique numbers
    // %        note 2: similar to PHP's uniqid
    // *     example 1: uniqid(); // delays for 2 seconds
    // *     returns 1: '49c6ad2705df7'
    
    if (!this.php_js) {
        this.php_js = {};
    }

    if (!this.php_js.uniqid) {
        var date = new Date();
        this.php_js.uniqid = date.getTime()/1000;
    }

    this.php_js.uniqid++;

	return this.dechex(this.php_js.uniqid)+this.dechex('10243256');
}