module.exports = function is_resource (handle) { // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_resource/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Luis Salazar (https://www.freaky-media.com/)
  //   example 1: is_resource('a')
  //   returns 1: false

  return !(!handle || typeof handle !== 'object' || !handle.constructor)
}
