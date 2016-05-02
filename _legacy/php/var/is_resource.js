module.exports = function is_resource (handle) { // eslint-disable-line camelcase
  //  discuss at: http://locutusjs.io/php/is_resource/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Luis Salazar (http://www.freaky-media.com/)
  //   example 1: is_resource('a')
  //   returns 1: false

  return !(!handle || typeof handle !== 'object' || !handle.constructor)
}
