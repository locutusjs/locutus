function print (arg) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Implemented correctly, but causes a problem for the phpjs.org compiler
    // -    depends on: echo
    // *     example 1: print('Hello World');
    // *     returns 1: 1

    this.echo(arg);
    return 1;
}
