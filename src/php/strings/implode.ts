type KeyedValues = { [key: string]: unknown }

export function implode(glue: unknown[] | KeyedValues | string, pieces?: unknown[] | KeyedValues): string {
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

  let i = ''
  let retVal = ''
  let tGlue = ''
  let actualGlue = glue
  let actualPieces = pieces

  if (arguments.length === 1) {
    actualPieces = glue as unknown[] | KeyedValues
    actualGlue = ''
  }

  if (typeof actualPieces === 'object' && actualPieces !== null) {
    if (Array.isArray(actualPieces)) {
      return actualPieces.join(String(actualGlue))
    }
    for (i in actualPieces) {
      retVal += tGlue + actualPieces[i]
      tGlue = String(actualGlue)
    }
    return retVal
  }

  return String(actualPieces)
}
