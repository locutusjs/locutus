function getlastmod() {
  //  discuss at: http://phpjs.org/functions/getlastmod/
  // original by: Brett Zamir (http://brett-zamir.me)
  //        note: Will not work on browsers which don't support document.lastModified
  //        test: skip
  //   example 1: getlastmod();
  //   returns 1: 1237610043

  return new Date(this.window.document.lastModified)
    .getTime() / 1000;
}