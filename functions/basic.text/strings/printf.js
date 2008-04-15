function printf( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://crestidg.com)
    // -    depends on: sprintf
    // *     example 1: printf("%01.2f", 123.1);
    // *     returns 1: 6

    var ret = sprintf.apply(this, arguments);
    document.write(ret);
    return ret.length;
}