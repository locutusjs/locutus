function stream_get_filters () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stream_get_filters();
    // *     returns 1: ['string.rot13', 'string.toupper']

    // Fix: Built-in filters to implement (see http://php.net/manual/en/filters.php ); as with get_defined_constants(), allow first-time getting to set
    // string.rot13 (str_rot13()), string.toupper (strtoupper()), string.tolower (strtolower()),
    // string.strip_tags (strip_tags()); params: string containing a list of tags similar to the second parameter of the strip_tags() function, or as an array of tag names
    // convert.base64-encode (base64_encode()), convert.base64-decode (base64_decode()); If line-length  is given, the base64 output will be split into chunks of line-length  characters each. If line-break-chars  is given, each chunk will be delimited by the characters given. These parameters give the same effect as using base64_encode() with chunk_split().; see http://php.net/manual/en/filters.convert.php
    // convert.quoted-printable-encode (no equivalent) convert.quoted-printable-decode (quoted_printable_decode()); parameters given as an associative array. In addition to the parameters supported by convert.base64-encode, convert.quoted-printable-encode  also supports boolean arguments binary  and force-encode-first . convert.base64-decode only supports the line-break-chars  parameter as a type-hint for striping from the encoded payload.
    // zlib.deflate, zlib.inflate, bzip2.compress, bzip2.decompress; see http://php.net/manual/en/filters.compression.php
    // mcrypt.* and mdecrypt.* - see http://php.net/manual/en/filters.encryption.php

    var filter_name = '', retArr = [];

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.stream_filters = this.php_js.stream_filters || {};
    // END REDUNDANT

    for (filter_name in this.php_js.stream_filters) {
        retArr.push(filter_name);
    }
    return retArr;
}
