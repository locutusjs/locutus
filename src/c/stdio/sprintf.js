function pad(str, minLength, padChar, leftJustify) {
  const diff = minLength - str.length
  const padStr = padChar.repeat(Math.max(0, diff))

  return leftJustify ? str + padStr : padStr + str
}

module.exports = function sprintf(format, ...args) {
  // original by: Rafał Kukawski
  // bugfixed by: Param Siddharth
  //   example 1: sprintf('%+10.*d', 5, 1)
  //   returns 1: '    +00001'
  //   example 2: sprintf('%s is a %d%% %s %s.', 'Param', 90, 'good', 'boy')
  //   returns 2: 'Param is a 90% good boy.'
  const placeholderRegex = /%(?:(\d+)\$)?([-+#0 ]*)(\*|\d+)?(?:\.(\*|\d*))?([\s\S])/g

  let index = 0

  return format.replace(placeholderRegex, function (match, param, flags, width, prec, modifier) {
    const leftJustify = flags.includes('-')

    // flag '0' is ignored when flag '-' is present
    const padChar = leftJustify ? ' ' : flags.split('').reduce((pc, c) => ([' ', '0'].includes(c) ? c : pc), ' ')

    const positiveSign = flags.includes('+') ? '+' : flags.includes(' ') ? ' ' : ''

    const minWidth = width === '*' ? args[index++] : +width || 0
    let precision = prec === '*' ? args[index++] : +prec

    if (param && !+param) {
      throw Error('Param index must be greater than 0')
    }

    if (param && +param > args.length) {
      throw Error('Too few arguments')
    }

    // compiling with default clang params, mixed positional and non-positional params
    // give only a warning
    const arg = param ? args[param - 1] : args[index]

    if (modifier !== '%') {
      index++
    }

    if (precision === undefined || isNaN(precision)) {
      precision = 'eEfFgG'.includes(modifier) ? 6 : modifier === 's' ? String(arg).length : undefined
    }

    switch (modifier) {
      case '%':
        return '%'
      case 'd':
      case 'i': {
        const number = Math.trunc(+arg || 0)
        const abs = Math.abs(number)
        const prefix = number < 0 ? '-' : positiveSign

        const str = pad(abs.toString(), precision || 0, '0', false)

        if (padChar === '0') {
          return prefix + pad(str, minWidth - prefix.length, padChar, leftJustify)
        }

        return pad(prefix + str, minWidth, padChar, leftJustify)
      }
      case 'e':
      case 'E':
      case 'f':
      case 'F':
      case 'g':
      case 'G': {
        const number = +arg
        const abs = Math.abs(number)
        const prefix = number < 0 ? '-' : positiveSign

        const op = [Number.prototype.toExponential, Number.prototype.toFixed, Number.prototype.toPrecision][
          'efg'.indexOf(modifier.toLowerCase())
        ]

        const tr = [String.prototype.toLowerCase, String.prototype.toUpperCase]['eEfFgG'.indexOf(modifier) % 2]

        const isSpecial = isNaN(abs) || !isFinite(abs)

        const str = isSpecial ? abs.toString().substr(0, 3) : op.call(abs, precision)

        if (padChar === '0' && !isSpecial) {
          return prefix + pad(tr.call(str), minWidth - prefix.length, padChar, leftJustify)
        }

        return pad(tr.call(prefix + str), minWidth, isSpecial ? ' ' : padChar, leftJustify)
      }
      case 'b':
      case 'o':
      case 'u':
      case 'x':
      case 'X': {
        const number = +arg || 0
        const intVal = Math.trunc(number) + (number < 0 ? 0xffffffff + 1 : 0)
        const base = [2, 8, 10, 16, 16]['bouxX'.indexOf(modifier)]
        const prefix = intVal && flags.includes('#') ? ['', '0', '', '0x', '0X']['bouxXX'.indexOf(modifier)] : ''

        if (padChar === '0' && prefix) {
          return (
            prefix +
            pad(pad(intVal.toString(base), precision, '0', false), minWidth - prefix.length, padChar, leftJustify)
          )
        }

        return pad(prefix + pad(intVal.toString(base), precision, '0', false), minWidth, padChar, leftJustify)
      }
      case 'p':
      case 'n': {
        throw Error(`'${modifier}' modifier not supported`)
      }
      case 's': {
        return pad(String(arg).substr(0, precision), minWidth, padChar, leftJustify)
      }
      case 'c': {
        // extension, if arg is string, take first char
        const chr = typeof arg === 'string' ? arg.charAt(0) : String.fromCharCode(+arg)
        return pad(chr, minWidth, padChar, leftJustify)
      }
      case 'a':
      case 'A':
        throw Error(`'${modifier}' modifier not yet implemented`)
      default:
        // for unknown modifiers, return the modifier char
        return modifier
    }
  })
}
