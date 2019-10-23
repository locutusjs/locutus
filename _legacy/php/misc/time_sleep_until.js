module.exports = function time_sleep_until (timestamp) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/time_sleep_until/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: For study purposes. Current implementation could lock up the user's browser.
  //      note 1: Expects a timestamp in seconds, so DO NOT pass in a JavaScript timestamp which are in milliseconds (e.g., new Date()) or otherwise the function will lock up the browser 1000 times longer than probably intended.
  //      note 1: Consider using setTimeout() instead.
  //   example 1: time_sleep_until(1233146501) // delays until the time indicated by the given timestamp is reached
  //   returns 1: true

  while (new Date() < timestamp * 1000) {}
  return true
}
