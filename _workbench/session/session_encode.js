function session_encode () {
  /**
    * Encode string in session format (serialized then url encoded)
    */
    return this.urldecode(this.getcookie('JSSESSID'));
}
