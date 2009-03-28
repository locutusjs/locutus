function ob_get_status (full_status) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: ob_get_status(true);
    // *     returns 1: [{chunk_size:4096, name:myCallback, del:true, type:1,status:0}]

    var i=0, retObj = {}, obs={}, retArr=[], name = '';
    if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
        if (this.php_js.ini && this.php_js.ini['output_buffering'] &&
                (typeof this.php_js.ini['output_buffering'].local_value !== 'string' ||
                    this.php_js.ini['output_buffering'].local_value.toLowerCase() !== 'off')
            ) { // handler itself is stored in 'output_handler' ini
            retObj = {type:1, status:0, name:'default output handler', del:true};
            if (full_status) {
                retObj.chunk_size = 4096;
                return [retObj];
            }
            else {
                retObj.level = 1;
                return retObj;
            }
		}
        return retArr;
    }
	if (full_status) {
        for (i=0; i < this.php_js.obs.length; i++) {
            obs = this.php_js.obs[i];
            name = obs.callback && obs.callback.name ? (obs.callback.name === 'URLRewriter' ? 'URL-Rewriter' : obs.callback.name) : undefined;
            retObj = {chunk_size:obs.chunk_size, name:name, del:obs.erase, type:obs.type,status:obs.status};
            if (obs.size) {
                retObj.size = obs.size;
            }
            if (obs.block_size) {
                retObj.block_size = obs.block_size;
            }
            retArr.push(retObj);
        }
		return retArr;
	}
    obs = this.php_js.obs[this.php_js.obs.length-1];
    name = obs.callback.name;
    retObj = {level:this.php_js.obs.length, name:name, del:obs.erase, type:obs.type,status:obs.status};
    return retObj;
}
