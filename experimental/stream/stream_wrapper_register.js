function stream_wrapper_register (protocol, classname, flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: In addition to accepting a global classname, we'll also allow a class constructor to be passed in
    // *     example 1: function VariableStream () {}
    // *     example 1: VariableStream.prototype = {stream_open: function () {}, stream_read : function () {}, stream_write : function () {}, stream_tell : function () {}, stream_eof : function () {}, stream_seek : function () {}};
    // *     example 1: stream_wrapper_register('var', 'VariableStream');
    // *     returns 1: true

    var opts = 0, i = 0;

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.stream_wrappers = this.php_js.stream_wrappers || {};
    // END REDUNDANT

    if (this.php_js.stream_wrappers[protocol]) {
        return false; // must call stream_wrapper_unregister() before trying to assign
    }

    if (typeof classname === 'string') {
        var win = window; // make configurable by custom phpjs ini later
        classname = win[classname];
    }
    if (!flags) {flags = 0;}
    var OPTS = {
        STREAM_IS_URL : 1
    };
    if (typeof options === 'number') {
        opts = flags;
    }
    else { // Allow for a single string or an array of string flags (currently only one possible though)
        flags = [].concat(flags);
        for (i=0; i < flags.length; i++) {
            // Resolve string input to bitwise
            if (OPTS[flags[i]]) {
                opts = opts | OPTS[flags[i]];
            }
        }
    }

    this.php_js.stream_wrappers[protocol] = {is_url: opts & OPTS.STREAM_IS_URL, clss: classname};

/*
// The stream wrapper prototype "class" (all properties and methods below are public); more like an interface, but not all methods are required
streamWrapper   {
    // Properties
    resource context ; // $context in PHP
    // Methods
    __construct ( void )
    bool dir_closedir ( void )
    bool dir_opendir ( string $path , int $options )
    string dir_readdir ( void )
    bool dir_rewinddir ( void )
    bool mkdir ( string $path , int $mode , int $options )
    bool rename ( string $path_from , string $path_to )
    bool rmdir ( string $path , int $options )
    resource stream_cast ( int $cast_as )
    void stream_close ( void )
    bool stream_eof ( void )
    bool stream_flush ( void )
    bool stream_lock ( mode $operation )
    bool stream_open ( string $path , string $mode , int $options , string &$opened_path )
    string stream_read ( int $count )
    bool stream_seek ( int $offset , int $whence = SEEK_SET )
    bool stream_set_option ( int $option , int $arg1 , int $arg2 )
    array stream_stat ( void )
    int stream_tell ( void )
    int stream_write ( string $data )
    bool unlink ( string $path )
    array url_stat ( string $path , int $flags )
}
 */

// COPY-AND-PASTE
/*
function streamWrapper () {
    this.context;
}
streamWrapper.prototype = {
    constructor : streamWrapper,
    dir_closedir : function () {},
    dir_opendir : function (path, options) {},
    dir_readdir : function () {},
    dir_rewinddir : function () {},
    mkdir : function (path, mode, options) {},
    rename : function (path_from, path_to) {},
    rmdir : function (path, options) {},
    stream_cast : function (cast_as) {},
    stream_close : function () {},
    stream_eof : function () {},
    stream_flush : function () {},
    stream_lock : function (mode, operation) {},
    stream_open : function (path, mode, options, opened_path) {},
    stream_read : function (count) {},
    stream_seek : function (offset, whence) {
        if (!whence) {
            whence = 'SEEK_SET';
        }
    },
    stream_set_option : function (option, arg1, arg2) {},
    stream_stat : function () {},
    stream_tell : function () {},
    stream_write : function (data) {},
    unlink : function (path) {},
    url_stat : function (path, flags) {}
};
*/

    return true;
}
