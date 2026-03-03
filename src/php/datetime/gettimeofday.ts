type GetTimeOfDayObject = {
  sec: number
  usec: number
  minuteswest: number
  dsttime: number
}

export function gettimeofday(returnFloat?: boolean): number | GetTimeOfDayObject {
  //  discuss at: https://locutus.io/php/gettimeofday/
  // original by: Brett Zamir (https://brett-zamir.me)
  // original by: Josh Fraser (https://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/)
  //    parts by: Breaking Par Consulting Inc (https://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7)
  //  revised by: Theriault (https://github.com/Theriault)
  //   example 1: var $obj = gettimeofday()
  //   example 1: var $result = ('sec' in $obj && 'usec' in $obj && 'minuteswest' in $obj &&80, 'dsttime' in $obj)
  //   returns 1: true
  //   example 2: var $timeStamp = gettimeofday(true)
  //   example 2: var $result = $timeStamp > 1000000000 && $timeStamp < 2000000000
  //   returns 2: true

  const t = new Date()

  if (returnFloat) {
    return t.getTime() / 1000
  }

  // Store current year.
  const y = t.getFullYear()
  return {
    sec: t.getUTCSeconds(),
    usec: t.getUTCMilliseconds() * 1000,
    minuteswest: t.getTimezoneOffset(),
    // Compare Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC to see if DST is observed.
    dsttime: Number(new Date(y, 0).getTime() - Date.UTC(y, 0) !== new Date(y, 6).getTime() - Date.UTC(y, 6)),
  }
}
