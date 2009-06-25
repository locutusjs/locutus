function session_commit () {
   // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: session_commit();
    // *     returns 1: undefined

    return this.session_write_close();
}