export function ip2long(argIP: string): number | false {
  //  discuss at: https://locutus.io/php/ip2long/
  // original by: Waldo Malqui Silva (https://waldo.malqui.info)
  // improved by: Victor
  //  revised by: fearphage (https://my.opera.com/fearphage/)
  //  revised by: Theriault (https://github.com/Theriault)
  //    estarget: es2015
  //   example 1: ip2long('192.0.34.166')
  //   returns 1: 3221234342
  //   example 2: ip2long('0.0xABCDEF')
  //   returns 2: 11259375
  //   example 3: ip2long('255.255.255.256')
  //   returns 3: false

  // PHP allows decimal, octal, and hexadecimal IP components.
  // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.

  const pattern = new RegExp(
    [
      '^([1-9]\\d*|0[0-7]*|0x[\\da-f]+)',
      '(?:\\.([1-9]\\d*|0[0-7]*|0x[\\da-f]+))?',
      '(?:\\.([1-9]\\d*|0[0-7]*|0x[\\da-f]+))?',
      '(?:\\.([1-9]\\d*|0[0-7]*|0x[\\da-f]+))?$',
    ].join(''),
    'i',
  )

  const matchedParts = argIP.match(pattern) // Verify argIP format.
  if (!matchedParts) {
    // Invalid format.
    return false
  }

  let partCount = 0
  const values: [number, number, number, number] = [0, 0, 0, 0]

  for (let i = 0; i < 4; i += 1) {
    const part = matchedParts[i + 1] ?? ''
    partCount += part.length > 0 ? 1 : 0
    values[i] = Number.parseInt(part) || 0
  }

  // Continue to use overflow values.
  // PHP does not allow any component to overflow.
  const overflow: [number, number, number, number, number, number, number, number] = [
    values[0],
    values[1],
    values[2],
    values[3],
    256,
    256,
    256,
    256,
  ]
  // Recalculate overflow of last component supplied to make up for missing components.
  if (partCount === 1) {
    overflow[4] *= Math.pow(256, 3)
  } else if (partCount === 2) {
    overflow[5] *= Math.pow(256, 2)
  } else if (partCount === 3) {
    overflow[6] *= 256
  }

  if (
    overflow[0] >= overflow[4] ||
    overflow[1] >= overflow[5] ||
    overflow[2] >= overflow[6] ||
    overflow[3] >= overflow[7]
  ) {
    return false
  }

  return (
    values[0] * (partCount === 1 ? 1 : 16777216) +
    values[1] * (partCount <= 2 ? 1 : 65536) +
    values[2] * (partCount <= 3 ? 1 : 256) +
    values[3]
  )
}
