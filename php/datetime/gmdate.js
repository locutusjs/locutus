function gmdate (format, timestamp) {
  //  discuss at: http://phpjs.org/functions/gmdate/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Alex
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //  depends on: date
  //   example 1: gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
  //   returns 1: '07:09:40 m is month'

  var dt = typeof timestamp === 'undefined' ? new Date() : // Not provided
    typeof timestamp === 'object' ? new Date(timestamp) : // Javascript Date()
    // UNIX timestamp (auto-convert to int)
    new Date(timestamp * 1000)
  timestamp = Date.parse(dt.toUTCString()
    .slice(0, -4)) / 1000
  return this.date(format, timestamp)
}
