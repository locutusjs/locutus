module.exports = function gmstrftime(format, timestamp) {
  //  discuss at: https://locutus.io/php/gmstrftime/
  //   verified: 8.3
  // original by: Brett Zamir (https://brett-zamir.me)
  //    input by: Alex
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: gmstrftime("%A", 1062462400)
  //   returns 1: 'Tuesday'

  const strftime = require('../datetime/strftime')

  const _date =
    typeof timestamp === 'undefined'
      ? new Date()
      : timestamp instanceof Date
        ? new Date(timestamp)
        : new Date(timestamp * 1000)

  timestamp = Date.parse(_date.toUTCString().slice(0, -4)) / 1000

  return strftime(format, timestamp)
}
