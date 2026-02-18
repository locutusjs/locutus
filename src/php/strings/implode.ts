import type { PhpAssoc, PhpValue } from '../_helpers/_phpTypes.ts'

type KeyedValues = PhpAssoc<PhpValue>

export function implode(...args: Array<PhpValue[] | KeyedValues | string | undefined>): string {
  //      discuss at: https://locutus.io/php/implode/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Waldo Malqui Silva (https://waldo.malqui.info)
  //     improved by: Itsacon (https://www.itsacon.net/)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //       example 1: implode(' ', ['Kevin', 'van', 'Zonneveld'])
  //       returns 1: 'Kevin van Zonneveld'
  //       example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'})
  //       returns 2: 'Kevin van Zonneveld'

  let retVal = ''
  let tGlue = ''
  let actualGlue = args[0]
  let actualPieces = args[1]

  if (args.length === 1) {
    actualPieces = args[0] as PhpValue[] | KeyedValues
    actualGlue = ''
  }

  if (typeof actualPieces === 'object' && actualPieces !== null) {
    if (Array.isArray(actualPieces)) {
      return actualPieces.join(String(actualGlue))
    }
    for (const key in actualPieces) {
      retVal += tGlue + actualPieces[key]
      tGlue = String(actualGlue)
    }
    return retVal
  }

  return String(actualPieces)
}
