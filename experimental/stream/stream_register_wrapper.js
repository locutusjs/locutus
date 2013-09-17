function stream_register_wrapper (protocol, classname, flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: stream_wrapper_register
    // %          note 1: In addition to accepting a global classname, we'll also allow a class constructor to be passed in
    // *     example 1: function VariableStream () {}
    // *     example 1: VariableStream.prototype = {stream_open: function () {}, stream_read : function () {}, stream_write : function () {}, stream_tell : function () {}, stream_eof : function () {}, stream_seek : function () {}};
    // *     example 1: stream_wrapper_register('var', 'VariableStream');
    // *     returns 1: true

    return this.stream_wrapper_register();
}
