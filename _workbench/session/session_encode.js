function session_encode () {
    // http://kevin.vanzonneveld.net
    // +   original by: Louis Stowasser
    // -    depends on: urldecode
    // -    depends on: getcookie
    // *     example 1: 
    // *     returns 1: 

    /**
    * Encode string in session format (serialized then url encoded)
    */
    return this.urldecode(this.getcookie('JSSESSID'));
}
