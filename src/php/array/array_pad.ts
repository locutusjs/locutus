type PadValue = {} | null | undefined

export function array_pad<TInput extends PadValue = PadValue, TPad extends PadValue = PadValue>(
  input: TInput[] | PadValue,
  padSize: number,
  padValue: TPad,
): Array<TInput | TPad> {
  //      discuss at: https://locutus.io/php/array_pad/
  // parity verified: PHP 8.3
  //     original by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: array_pad([ 7, 8, 9 ], 2, 'a')
  //       returns 1: [ 7, 8, 9]
  //       example 2: array_pad([ 7, 8, 9 ], 5, 'a')
  //       returns 2: [ 7, 8, 9, 'a', 'a']
  //       example 3: array_pad([ 7, 8, 9 ], 5, 2)
  //       returns 3: [ 7, 8, 9, 2, 2]
  //       example 4: array_pad([ 7, 8, 9 ], -5, 'a')
  //       returns 4: [ 'a', 'a', 7, 8, 9 ]

  let pad: Array<TInput | TPad> = []
  const newArray: Array<TInput | TPad> = []
  let newLength = 0
  let diff = 0
  let i = 0

  if (Array.isArray(input) && !Number.isNaN(padSize)) {
    newLength = padSize < 0 ? padSize * -1 : padSize
    diff = newLength - input.length

    if (diff > 0) {
      for (i = 0; i < diff; i++) {
        newArray[i] = padValue
      }
      pad = padSize < 0 ? [...newArray, ...input] : [...input, ...newArray]
    } else {
      pad = input
    }
  }

  return pad
}
