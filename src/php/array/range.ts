export function range(low: string | number, high: string | number, step?: number): Array<string | number> {
  //      discuss at: https://locutus.io/php/range/
  // parity verified: PHP 8.3
  //     original by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: range ( 0, 12 )
  //       returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //       example 2: range( 0, 100, 10 )
  //       returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  //       example 3: range( 'a', 'i' )
  //       returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  //       example 4: range( 'c', 'a' )
  //       returns 4: ['c', 'b', 'a']

  const matrix: Array<string | number> = []
  let iVal: number
  let endval: number
  const walker = step || 1
  let chars = false
  const lowIsNumeric = !Number.isNaN(Number(low))
  const highIsNumeric = !Number.isNaN(Number(high))

  if (lowIsNumeric && highIsNumeric) {
    iVal = Number(low)
    endval = Number(high)
  } else if (!lowIsNumeric && !highIsNumeric) {
    chars = true
    iVal = String(low).charCodeAt(0)
    endval = String(high).charCodeAt(0)
  } else {
    iVal = lowIsNumeric ? Number(low) : 0
    endval = highIsNumeric ? Number(high) : 0
  }

  const plus = !(iVal > endval)
  if (plus) {
    while (iVal <= endval) {
      matrix.push(chars ? String.fromCharCode(iVal) : iVal)
      iVal += walker
    }
  } else {
    while (iVal >= endval) {
      matrix.push(chars ? String.fromCharCode(iVal) : iVal)
      iVal -= walker
    }
  }

  return matrix
}
