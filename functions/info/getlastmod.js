function getlastmod() {
  // From: http://phpjs.org/functions
  // +   based on: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Will not work on browsers which don't support document.lastModified
  // *          test: skip
  // *     example 1: getlastmod();
  // *     returns 1: 1237610043
  return new Date(this.window.document.lastModified).getTime() / 1000;
}
