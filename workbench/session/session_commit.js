function session_commit() {
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // *     example 1: session_commit();
  // -    depends on: session_write_close
  // *     returns 1: undefined

  return this.session_write_close();
}
