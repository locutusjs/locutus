function initCache () {
  const store = []
  // cache only first element, second is length to jump ahead for the parser
  const cache = function cache (value) {
    store.push(value[0])
    return value
  }

  cache.get = (index) => {
    if (index >= store.length) {
      throw RangeError(`Can't resolve reference ${index + 1}`)
    }

    return store[index]
  }

  return cache
}

function expectType (str, cache) {
  const types = /^(?:N(?=;)|[bidsSaOCrR](?=:)|[^:]+(?=:))/g
  const type = (types.exec(str) || [])[0]

  if (!type) {
    throw SyntaxError('Invalid input: ' + str)
  }

  switch (type) {
    case 'N':
      return cache([ null, 2 ])
    case 'b':
      return cache(expectBool(str))
    case 'i':
      return cache(expectInt(str))
    case 'd':
      return cache(expectFloat(str))
    case 's':
      return cache(expectString(str))
    case 'S':
      return cache(expectEscapedString(str))
    case 'a':
      return expectArray(str, cache)
    case 'O':
      return expectObject(str, cache)
    case 'C':
      return expectClass(str, cache)
    case 'r':
    case 'R':
      return expectReference(str, cache)
    default:
      throw SyntaxError(`Invalid or unsupported data type: ${type}`)
  }
}

function expectBool (str) {
  const reBool = /^b:([01]);/
  const [ match, boolMatch ] = reBool.exec(str) || []

  if (!boolMatch) {
    throw SyntaxError('Invalid bool value, expected 0 or 1')
  }

  return [ boolMatch === '1', match.length ]
}

function expectInt (str) {
  const reInt = /^i:([+-]?\d+);/
  const [ match, intMatch ] = reInt.exec(str) || []

  if (!intMatch) {
    throw SyntaxError('Expected an integer value')
  }

  return [ parseInt(intMatch, 10), match.length ]
}

function expectFloat (str) {
  const reFloat = /^d:(NAN|-?INF|(?:\d+\.\d*|\d*\.\d+|\d+)(?:[eE][+-]\d+)?);/
  const [ match, floatMatch ] = reFloat.exec(str) || []

  if (!floatMatch) {
    throw SyntaxError('Expected a float value')
  }

  let floatValue

  switch (floatMatch) {
    case 'NAN':
      floatValue = Number.NaN
      break
    case '-INF':
      floatValue = Number.NEGATIVE_INFINITY
      break
    case 'INF':
      floatValue = Number.POSITIVE_INFINITY
      break
    default:
      floatValue = parseFloat(floatMatch)
      break
  }

  return [ floatValue, match.length ]
}

function readBytes (str, len, escapedString = false) {
  let bytes = 0
  let out = ''
  let c = 0
  const strLen = str.length
  let wasHighSurrogate = false
  let escapedChars = 0

  while (bytes < len && c < strLen) {
    let chr = str.charAt(c)
    const code = chr.charCodeAt(0)
    const isHighSurrogate = code >= 0xd800 && code <= 0xdbff
    const isLowSurrogate = code >= 0xdc00 && code <= 0xdfff

    if (escapedString && chr === '\\') {
      chr = String.fromCharCode(parseInt(str.substr(c + 1, 2), 16))
      escapedChars++

      // each escaped sequence is 3 characters. Go 2 chars ahead.
      // third character will be jumped over a few lines later
      c += 2
    }

    c++

    bytes += isHighSurrogate || (isLowSurrogate && wasHighSurrogate)
      // if high surrogate, count 2 bytes, as expectation is to be followed by low surrogate
      // if low surrogate preceded by high surrogate, add 2 bytes
      ? 2
      : code > 0x7ff
        // otherwise low surrogate falls into this part
        ? 3
        : code > 0x7f
          ? 2
          : 1

    // if high surrogate is not followed by low surrogate, add 1 more byte
    bytes += wasHighSurrogate && !isLowSurrogate ? 1 : 0

    out += chr
    wasHighSurrogate = isHighSurrogate
  }

  return [ out, bytes, escapedChars ]
}

function expectString (str) {
  // PHP strings consist of one-byte characters.
  // JS uses 2 bytes with possible surrogate pairs.
  // Serialized length of 2 is still 1 JS string character
  const reStrLength = /^s:(\d+):"/g // also match the opening " char
  const [ match, byteLenMatch ] = reStrLength.exec(str) || []

  if (!byteLenMatch) {
    throw SyntaxError('Expected string length annotation')
  }

  const len = parseInt(byteLenMatch, 10)

  str = str.substr(match.length)

  let [ strMatch, bytes ] = readBytes(str, len)

  if (bytes !== len) {
    throw SyntaxError(`Expected string of ${len} bytes, but got ${bytes}`)
  }

  str = str.substr(strMatch.length)

  // strict parsing, match closing "; chars
  if (!str.startsWith('";')) {
    throw SyntaxError('Expected ";')
  }

  return [ strMatch, match.length + strMatch.length + 2 ] // skip last ";
}

function expectEscapedString (str) {
  const reStrLength = /^S:(\d+):"/g // also match the opening " char
  const [ match, strLenMatch ] = reStrLength.exec(str) || []

  if (!match) {
    throw SyntaxError('Expected an escaped string value')
  }

  const len = parseInt(strLenMatch, 10)

  str = str.substr(match.length)

  let [ strMatch, bytes, escapedChars ] = readBytes(str, len, true)

  if (bytes !== len) {
    throw SyntaxError(`Expected escaped string of ${len} bytes, but got ${bytes}`)
  }

  str = str.substr(strMatch.length + escapedChars * 2)

  // strict parsing, match closing "; chars
  if (!str.startsWith('";')) {
    throw SyntaxError('Expected ";')
  }

  return [ strMatch, match.length + strMatch.length + 2 ] // skip last ";
}

function expectKeyOrIndex (str) {
  try {
    return expectString(str)
  } catch (err) {}

  try {
    return expectEscapedString(str)
  } catch (err) {}

  try {
    return expectInt(str)
  } catch (err) {
    throw SyntaxError('Expected key or index')
  }
}

function expectObject (str, cache) {
  // O:<class name length>:"class name":<prop count>:{<props and values>}
  // O:8:"stdClass":2:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"baz";}
  const reObjectLiteral = /^O:(\d+):"([^"]+)":(\d+):\{/
  const [ objectLiteralBeginMatch, /* classNameLengthMatch */, className, propCountMatch ] = reObjectLiteral.exec(str) || []

  if (!objectLiteralBeginMatch) {
    throw SyntaxError('Invalid input')
  }

  if (className !== 'stdClass') {
    throw SyntaxError(`Unsupported object type: ${className}`)
  }

  let totalOffset = objectLiteralBeginMatch.length

  const propCount = parseInt(propCountMatch, 10)
  const obj = {}
  cache([obj])

  str = str.substr(totalOffset)

  for (let i = 0; i < propCount; i++) {
    const prop = expectKeyOrIndex(str)
    str = str.substr(prop[1])
    totalOffset += prop[1]

    const value = expectType(str, cache)
    str = str.substr(value[1])
    totalOffset += value[1]

    obj[prop[0]] = value[0]
  }

  // strict parsing, expect } after object literal
  if (str.charAt(0) !== '}') {
    throw SyntaxError('Expected }')
  }

  return [ obj, totalOffset + 1 ] // skip final }
}

function expectClass (str, cache) {
  // can't be well supported, because requires calling eval (or similar)
  // in order to call serialized constructor name
  // which is unsafe
  // or assume that constructor is defined in global scope
  // but this is too much limiting
  throw Error('Not yet implemented')
}

function expectReference (str, cache) {
  const reRef = /^[rR]:([1-9]\d*);/
  const [ match, refIndex ] = reRef.exec(str) || []

  if (!match) {
    throw SyntaxError('Expected reference value')
  }

  return [ cache.get(parseInt(refIndex, 10) - 1), match.length ]
}

function expectArray (str, cache) {
  const reArrayLength = /^a:(\d+):{/
  const [ arrayLiteralBeginMatch, arrayLengthMatch ] = reArrayLength.exec(str) || []

  if (!arrayLengthMatch) {
    throw SyntaxError('Expected array length annotation')
  }

  str = str.substr(arrayLiteralBeginMatch.length)

  const array = expectArrayItems(str, parseInt(arrayLengthMatch, 10), cache)

  // strict parsing, expect closing } brace after array literal
  if (str.charAt(array[1]) !== '}') {
    throw SyntaxError('Expected }')
  }

  return [ array[0], arrayLiteralBeginMatch.length + array[1] + 1 ] // jump over }
}

function expectArrayItems (str, expectedItems = 0, cache) {
  let key
  let hasStringKeys = false
  let item
  let totalOffset = 0
  let items = []
  cache([items])

  for (let i = 0; i < expectedItems; i++) {
    key = expectKeyOrIndex(str)

    // this is for backward compatibility with previous implementation
    if (!hasStringKeys) {
      hasStringKeys = (typeof key[0] === 'string')
    }

    str = str.substr(key[1])
    totalOffset += key[1]

    // references are resolved immediately, so if duplicate key overwrites previous array index
    // the old value is anyway resolved
    // fixme: but next time the same reference should point to the new value
    item = expectType(str, cache)
    str = str.substr(item[1])
    totalOffset += item[1]

    items[key[0]] = item[0]
  }

  // this is for backward compatibility with previous implementation
  if (hasStringKeys) {
    items = Object.assign({}, items)
  }

  return [ items, totalOffset ]
}

module.exports = function unserialize (str) {
  //       discuss at: https://locutus.io/php/unserialize/
  //      original by: Arpad Ray (mailto:arpad@php.net)
  //      improved by: Pedro Tainha (https://www.pedrotainha.com)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Chris
  //      improved by: James
  //      improved by: Le Torbi
  //      improved by: Eli Skeggs
  //      bugfixed by: dptr1988
  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: philippsimon (https://github.com/philippsimon/)
  //       revised by: d3x
  //         input by: Brett Zamir (https://brett-zamir.me)
  //         input by: Martin (https://www.erlenwiese.de/)
  //         input by: kilops
  //         input by: Jaroslaw Czarniak
  //         input by: lovasoa (https://github.com/lovasoa/)
  //      improved by: Rafał Kukawski
  // reimplemented by: Rafał Kukawski
  //           note 1: We feel the main purpose of this function should be
  //           note 1: to ease the transport of data between php & js
  //           note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
  //        example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
  //        returns 1: ['Kevin', 'van', 'Zonneveld']
  //        example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
  //        returns 2: {firstName: 'Kevin', midName: 'van'}
  //        example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
  //        returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
  //        example 4: unserialize(undefined)
  //        returns 4: false
  //        example 5: unserialize('O:8:"stdClass":1:{s:3:"foo";b:1;}')
  //        returns 5: { foo: true }
  //        example 6: unserialize('a:2:{i:0;N;i:1;s:0:"";}')
  //        returns 6: [null, ""]
  //        example 7: unserialize('S:7:"\\65\\73\\63\\61\\70\\65\\64";')
  //        returns 7: 'escaped'

  try {
    if (typeof str !== 'string') {
      return false
    }

    return expectType(str, initCache())[0]
  } catch (err) {
    console.error(err)
    return false
  }
}
