function ob_get_status (full_status) {
    var i=0, retObj = {}, obs={}, retArr=[];
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
            // Fix: When exactly do type and status vary (see also below for non-full-status) and how to set size/block_size?
            // type: PHP_OUTPUT_HANDLER_INTERNAL (0) or PHP_OUTPUT_HANDLER_USER (1)
            // status: PHP_OUTPUT_HANDLER_START (0), PHP_OUTPUT_HANDLER_CONT (1) or PHP_OUTPUT_HANDLER_END (2)
            retObj = {chunk_size:obs.chunk_size, name:obs.callback, del:obs.erase, type:1,status:0};
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
    retObj = {level:this.php_js.obs.length, name:obs.callback, del:obs.erase, type:1,status:0};
    return retObj;
}
