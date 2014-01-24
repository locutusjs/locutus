function time() {
  //  discuss at: http://phpjs.org/functions/time/
  // original by: GeekFG (http://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: metjay
  // improved by: HKM
  //   example 1: timeStamp = time();
  //   example 1: timeStamp > 1000000000 && timeStamp < 2000000000
  //   returns 1: true

  return Math.floor(new Date()
    .getTime() / 1000);
}