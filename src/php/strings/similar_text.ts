import type { PhpMixed } from '../_helpers/_phpTypes.ts'

export function similar_text(
  first: string | number | boolean | null | undefined,
  second: string | number | boolean | null | undefined,
  percent?: PhpMixed,
): number {
  //      discuss at: https://locutus.io/php/similar_text/
  // parity verified: PHP 8.3
  //     original by: Rafał Kukawski (https://blog.kukawski.pl)
  //     bugfixed by: Chris McMacken
  //     bugfixed by: Jarkko Rantavuori original by findings in stackoverflow (https://stackoverflow.com/questions/14136349/how-does-similar-text-work)
  //     improved by: Markus Padourek (taken from https://www.kevinhq.com/2012/06/php-similartext-function-in-javascript_16.html)
  //       example 1: similar_text('Hello World!', 'Hello locutus!')
  //       returns 1: 8
  //       example 2: similar_text('Hello World!', null)
  //       returns 2: 0

  if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
    return 0
  }

  const firstValue = String(first)
  const secondValue = String(second)

  let pos1 = 0
  let pos2 = 0
  let max = 0
  const firstLength = firstValue.length
  const secondLength = secondValue.length
  let sum = 0

  for (let p = 0; p < firstLength; p++) {
    for (let q = 0; q < secondLength; q++) {
      let l = 0
      for (
        l = 0;
        p + l < firstLength && q + l < secondLength && firstValue.charAt(p + l) === secondValue.charAt(q + l);
        l++
      ) {
        // @todo: ^-- break up this crazy for loop and put the logic in its body
      }
      if (l > max) {
        max = l
        pos1 = p
        pos2 = q
      }
    }
  }

  sum = max

  if (sum) {
    if (pos1 && pos2) {
      sum += similar_text(firstValue.substr(0, pos1), secondValue.substr(0, pos2))
    }

    if (pos1 + max < firstLength && pos2 + max < secondLength) {
      sum += similar_text(
        firstValue.substr(pos1 + max, firstLength - pos1 - max),
        secondValue.substr(pos2 + max, secondLength - pos2 - max),
      )
    }
  }

  if (!percent) {
    return sum
  }

  return (sum * 200) / (firstLength + secondLength)
}
