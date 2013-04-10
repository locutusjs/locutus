function vfprintf (handle, format, args) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // -    depends on: sprintf
    // -    depends on: fwrite
    // *     example 1: var fp = fopen('currency.txt', 'w');
    // *     example 1: vfprintf(fp, '%01.2f', [123.1]); // 123.10
    // *     returns 1: 6


    var str = this.sprintf.apply(this, [].concat(format, args));
    try {
        this.fwrite(handle, str);
    }
    catch(e) {
        throw new Error('Error in vfprintf() file-writing');
    }
    return str.length;
}
