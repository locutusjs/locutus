export function repeat(str: string, count: number): string {
  //  discuss at: https://locutus.io/tcl/repeat/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: repeat('ab', 3)
  //   returns 1: 'ababab'
  //   example 2: repeat('ab', 0)
  //   returns 2: ''
  //   example 3: repeat('x', -2)
  //   returns 3: ''

  const times = Math.trunc(Number(count))
  if (!Number.isFinite(times) || times <= 0) {
    return ''
  }

  return String(str).repeat(times)
}
