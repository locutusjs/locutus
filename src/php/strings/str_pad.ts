export function str_pad(input: string, padLength: number, padString: string, padType: string): string {
  //      discuss at: https://locutus.io/php/str_pad/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Michael White (https://getsprink.com)
  //        input by: Marco van Oort
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Afonso Januário (https://github.com/afonsojanu)
  //       example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
  //       returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
  //       example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
  //       returns 2: '-----Kevin van Zonneveld------'

  let padToGo

  const _strPadRepeater = function (s: string, len: number): string {
    let collect = ''

    while (collect.length < len) {
      collect += s
    }
    collect = collect.substr(0, len)

    return collect
  }

  input += ''
  padString = padString !== undefined ? padString : ' '

  if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
    padType = 'STR_PAD_RIGHT'
  }
  if ((padToGo = padLength - input.length) > 0) {
    if (padType === 'STR_PAD_LEFT') {
      input = _strPadRepeater(padString, padToGo) + input
    } else if (padType === 'STR_PAD_RIGHT') {
      input = input + _strPadRepeater(padString, padToGo)
    } else if (padType === 'STR_PAD_BOTH') {
      const leftToGo = Math.floor(padToGo / 2)
      const rightToGo = padToGo - leftToGo
      input = _strPadRepeater(padString, leftToGo) + input + _strPadRepeater(padString, rightToGo)
    }
  }

  return input
}
