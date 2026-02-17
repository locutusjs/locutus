export function str_split(
  string: string | number | boolean | null,
  splitLength?: number | string | null,
): string[] | false {
  //      discuss at: https://locutus.io/php/str_split/
  // parity verified: PHP 8.3
  //     original by: Martijn Wieringa
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //      revised by: Theriault (https://github.com/Theriault)
  //      revised by: Rafał Kukawski (https://blog.kukawski.pl)
  //        input by: Bjorn Roesbeke (https://www.bjornroesbeke.be/)
  //       example 1: str_split('Hello Friend', 3)
  //       returns 1: ['Hel', 'lo ', 'Fri', 'end']

  const normalizedSplitLength = splitLength === null || typeof splitLength === 'undefined' ? 1 : Number(splitLength)
  if (string === null || normalizedSplitLength < 1 || Number.isNaN(normalizedSplitLength)) {
    return false
  }

  const input = String(string)
  const chunks: string[] = []
  let pos = 0
  const len = input.length

  while (pos < len) {
    chunks.push(input.slice(pos, (pos += normalizedSplitLength)))
  }

  return chunks
}
