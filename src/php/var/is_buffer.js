module.exports = function is_buffer(vr) {
  //  discuss at: https://locutus.io/php/is_buffer/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: is_buffer('This could be binary or a regular string...')
  //   returns 1: true

  return typeof vr === 'string'
}
