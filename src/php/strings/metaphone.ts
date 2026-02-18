export function metaphone(word: unknown, maxPhonemes: unknown): string | false | null {
  //      discuss at: https://locutus.io/php/metaphone/
  // parity verified: PHP 8.3
  //     original by: Greg Frazier
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //     improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //       example 1: metaphone('Gnu')
  //       returns 1: 'N'
  //       example 2: metaphone('bigger')
  //       returns 2: 'BKR'
  //       example 3: metaphone('accuracy')
  //       returns 3: 'AKKRS'
  //       example 4: metaphone('batch batcher')
  //       returns 4: 'BXBXR'

  const type = typeof word

  if (type === 'undefined' || (type === 'object' && word !== null)) {
    // weird!
    return null
  }

  // infinity and NaN values are treated as strings
  let normalizedWord = typeof word === 'string' ? word : ''
  if (type === 'number') {
    if (Number.isNaN(word)) {
      normalizedWord = 'NAN'
    } else if (!Number.isFinite(word)) {
      normalizedWord = 'INF'
    } else {
      normalizedWord = ''
    }
  }

  const maxPhonemeLimit = Math.floor(Number(maxPhonemes)) || 0
  if (maxPhonemeLimit < 0) {
    return false
  }

  // alpha depends on locale, so this var might need an update
  // or should be turned into a regex
  // for now assuming pure a-z
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const vowel = 'AEIOU'
  const soft = 'EIY'
  const leadingNonAlpha = new RegExp('^[^' + alpha + ']+')

  normalizedWord = normalizedWord.toUpperCase().replace(leadingNonAlpha, '')

  if (!normalizedWord) {
    return ''
  }

  const is = function (p: string, c: string): boolean {
    return c !== '' && p.indexOf(c) !== -1
  }

  let i = 0
  let cc = normalizedWord.charAt(0) // current char. Short name because it's used all over the function
  let nc = normalizedWord.charAt(1) // next char
  let nnc = '' // after next char
  let pc = '' // previous char
  const l = normalizedWord.length
  let meta = ''
  // traditional is an internal param that could be exposed for now let it be a local var
  const traditional = true

  switch (cc) {
    case 'A':
      meta += nc === 'E' ? nc : cc
      i += 1
      break
    case 'G':
    case 'K':
    case 'P':
      if (nc === 'N') {
        meta += nc
        i += 2
      }
      break
    case 'W':
      if (nc === 'R') {
        meta += nc
        i += 2
      } else if (nc === 'H' || is(vowel, nc)) {
        meta += 'W'
        i += 2
      }
      break
    case 'X':
      meta += 'S'
      i += 1
      break
    case 'E':
    case 'I':
    case 'O':
    case 'U':
      meta += cc
      i++
      break
  }

  for (; i < l && (maxPhonemeLimit === 0 || meta.length < maxPhonemeLimit); i += 1) {
    cc = normalizedWord.charAt(i)
    nc = normalizedWord.charAt(i + 1)
    pc = normalizedWord.charAt(i - 1)
    nnc = normalizedWord.charAt(i + 2)

    if (cc === pc && cc !== 'C') {
      continue
    }

    switch (cc) {
      case 'B':
        if (pc !== 'M') {
          meta += cc
        }
        break
      case 'C':
        if (is(soft, nc)) {
          if (nc === 'I' && nnc === 'A') {
            meta += 'X'
          } else if (pc !== 'S') {
            meta += 'S'
          }
        } else if (nc === 'H') {
          meta += !traditional && (nnc === 'R' || pc === 'S') ? 'K' : 'X'
          i += 1
        } else {
          meta += 'K'
        }
        break
      case 'D':
        if (nc === 'G' && is(soft, nnc)) {
          meta += 'J'
          i += 1
        } else {
          meta += 'T'
        }
        break
      case 'G':
        if (nc === 'H') {
          if (!(is('BDH', normalizedWord.charAt(i - 3)) || normalizedWord.charAt(i - 4) === 'H')) {
            meta += 'F'
            i += 1
          }
        } else if (nc === 'N') {
          if (is(alpha, nnc) && normalizedWord.substr(i + 1, 3) !== 'NED') {
            meta += 'K'
          }
        } else if (is(soft, nc) && pc !== 'G') {
          meta += 'J'
        } else {
          meta += 'K'
        }
        break
      case 'H':
        if (is(vowel, nc) && !is('CGPST', pc)) {
          meta += cc
        }
        break
      case 'K':
        if (pc !== 'C') {
          meta += 'K'
        }
        break
      case 'P':
        meta += nc === 'H' ? 'F' : cc
        break
      case 'Q':
        meta += 'K'
        break
      case 'S':
        if (nc === 'I' && is('AO', nnc)) {
          meta += 'X'
        } else if (nc === 'H') {
          meta += 'X'
          i += 1
        } else if (!traditional && normalizedWord.substr(i + 1, 3) === 'CHW') {
          meta += 'X'
          i += 2
        } else {
          meta += 'S'
        }
        break
      case 'T':
        if (nc === 'I' && is('AO', nnc)) {
          meta += 'X'
        } else if (nc === 'H') {
          meta += '0'
          i += 1
        } else if (normalizedWord.substr(i + 1, 2) !== 'CH') {
          meta += 'T'
        }
        break
      case 'V':
        meta += 'F'
        break
      case 'W':
      case 'Y':
        if (is(vowel, nc)) {
          meta += cc
        }
        break
      case 'X':
        meta += 'KS'
        break
      case 'Z':
        meta += 'S'
        break
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R':
        meta += cc
        break
    }
  }

  return meta
}
