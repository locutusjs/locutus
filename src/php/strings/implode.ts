import type { PhpAssoc, PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

type ImplodeValue = PhpRuntimeValue
type KeyedValues = PhpAssoc<ImplodeValue>

export function implode(pieces: ImplodeValue[] | KeyedValues | string | undefined): string

export function implode(glue: string, pieces: ImplodeValue[] | KeyedValues | string | undefined): string

export function implode(
  glueOrPieces?: ImplodeValue[] | KeyedValues | string,
  pieces?: ImplodeValue[] | KeyedValues | string | undefined,
): string {
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
  let actualGlue = ''
  let actualPieces: ImplodeValue[] | KeyedValues | string | undefined

  if (arguments.length === 1) {
    actualPieces = glueOrPieces
  } else {
    actualGlue = String(glueOrPieces ?? '')
    actualPieces = pieces
  }

  if (typeof actualPieces === 'object' && actualPieces !== null) {
    if (Array.isArray(actualPieces)) {
      return actualPieces.join(actualGlue)
    }
    for (const key in actualPieces) {
      retVal += tGlue + actualPieces[key]
      tGlue = actualGlue
    }
    return retVal
  }

  return String(actualPieces)
}
