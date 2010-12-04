function session_decode(str) {
/**
* Decode string from session format
*/
    return this.unserialize(this.urldecode(str));
}
