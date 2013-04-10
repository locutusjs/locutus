function session_decode(str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // -    depends on: unserialize
    // -    depends on: urldecode
    // *     example 1:
    // *     returns 1:

/**
* Decode string from session format
*/
    return this.unserialize(this.urldecode(str));
}
