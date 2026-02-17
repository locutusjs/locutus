export function intval(mixedVar: unknown, base?: number): number {
  //      discuss at: https://locutus.io/php/intval/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: stensi
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
  //        input by: Matteo
  //       example 1: intval('Kevin van Zonneveld')
  //       returns 1: 0
  //       example 2: intval(4.2)
  //       returns 2: 4
  //       example 3: intval(42, 8)
  //       returns 3: 42
  //       example 4: intval('09')
  //       returns 4: 9
  //       example 5: intval('1e', 16)
  //       returns 5: 30
  //       example 6: intval(0x200000001)
  //       returns 6: 8589934593
  //       example 7: intval('0xff', 0)
  //       returns 7: 255
  //       example 8: intval('010', 0)
  //       returns 8: 8

  let tmp = 0

  const type = typeof mixedVar

  if (type === 'boolean') {
    return Number(mixedVar)
  } else if (type === 'string') {
    const stringValue = mixedVar as string
    if (base === 0) {
      const match = stringValue.match(/^\s*0(x?)/i)
      base = match ? (match[1] ? 16 : 8) : 10
    }
    tmp = Number.parseInt(stringValue, base || 10)
    return Number.isNaN(tmp) || !Number.isFinite(tmp) ? 0 : tmp
  } else if (type === 'number' && Number.isFinite(mixedVar)) {
    const numberValue = mixedVar as number
    return numberValue < 0 ? Math.ceil(numberValue) : Math.floor(numberValue)
  } else {
    return 0
  }
}
