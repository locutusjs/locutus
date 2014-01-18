function user_error(error_msg, error_type) {
  // http://kevin.vanzonneveld.net
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // -    depends on: trigger_error
  // *     example 1: user_error('Cannot divide by zero', 256);
  // *     returns 1: true
  return this.trigger_error(error_msg, error_type);
}
