---
examples:
  - - "pack('nvc*', 0x1234, 0x5678, 65, 66);"
  - - "pack('H4', '2345')"
  - - "pack('H*', 'D5')"
  - - "pack('d', -100.876)"
returns:
  - - "'4xVAB'"
  - - "'#E'"
  - - "'Õ'"
  - - "\"\\u0000\\u0000\\u0000\\u0000\\u00008YÀ\""
authors:
  original by:
    - 'Tim de Koning (http://www.kingsquare.nl)'
  bugfixed by:
    - 'Tim de Koning (http://www.kingsquare.nl)'
notes:
  - - 'Float encoding by: Jonas Raoni Soares Silva'
    - 'Home: http://www.kingsquare.nl/blog/12-12-2009/13507444'
    - 'Feedback: phpjs-pack@kingsquare.nl'
    - "'machine dependent byte order and size' aren't"
    - 'applicable for JavaScript; pack works as on a 32bit,'
    - little endian machine
layout: function
function: pack
category: misc
code: "function pack (format) {\n  //  discuss at: http://phpjs.org/functions/pack/\n  // original by: Tim de Koning (http://www.kingsquare.nl)\n  //    parts by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)\n  // bugfixed by: Tim de Koning (http://www.kingsquare.nl)\n  //        note: Float encoding by: Jonas Raoni Soares Silva\n  //        note: Home: http://www.kingsquare.nl/blog/12-12-2009/13507444\n  //        note: Feedback: phpjs-pack@kingsquare.nl\n  //        note: 'machine dependent byte order and size' aren't\n  //        note: applicable for JavaScript; pack works as on a 32bit,\n  //        note: little endian machine\n  //   example 1: pack('nvc*', 0x1234, 0x5678, 65, 66);\n  //   returns 1: '4xVAB'\n  //   example 2: pack('H4', '2345')\n  //   returns 2: '#E'\n  //   example 3: pack('H*', 'D5')\n  //   returns 3: 'Õ'\n  //   example 4: pack('d', -100.876)\n  //   returns 4: \"\\u0000\\u0000\\u0000\\u0000\\u00008YÀ\"\n\n  var formatPointer = 0,\n    argumentPointer = 1,\n    result = '',\n    argument = '',\n    i = 0,\n    r = [],\n    instruction, quantifier, word, precisionBits, exponentBits, extraNullCount\n\n  // vars used by float encoding\n  var bias, minExp, maxExp, minUnnormExp, status, exp, len, bin, signal, n, intPart, floatPart, lastBit, rounded, j,\n    k, tmpResult\n\n  while (formatPointer < format.length) {\n    instruction = format.charAt(formatPointer)\n    quantifier = ''\n    formatPointer++\n    while ((formatPointer < format.length) && (format.charAt(formatPointer)\n        .match(/[\\d\\*]/) !== null)) {\n      quantifier += format.charAt(formatPointer)\n      formatPointer++\n    }\n    if (quantifier === '') {\n      quantifier = '1'\n    }\n\n    // Now pack variables: 'quantifier' times 'instruction'\n    switch (instruction) {\n      case 'a':\n      // NUL-padded string\n      case 'A':\n      // SPACE-padded string\n        if (typeof arguments[argumentPointer] === 'undefined') {\n          throw new Error('Warning:  pack() Type ' + instruction + ': not enough arguments')\n        } else {\n          argument = String(arguments[argumentPointer])\n        }\n        if (quantifier === '*') {\n          quantifier = argument.length\n        }\n        for (i = 0; i < quantifier; i++) {\n          if (typeof argument[i] === 'undefined') {\n            if (instruction === 'a') {\n              result += String.fromCharCode(0)\n            } else {\n              result += ' '\n            }\n          } else {\n            result += argument[i]\n          }\n        }\n        argumentPointer++\n        break\n      case 'h':\n      // Hex string, low nibble first\n      case 'H':\n      // Hex string, high nibble first\n        if (typeof arguments[argumentPointer] === 'undefined') {\n          throw new Error('Warning: pack() Type ' + instruction + ': not enough arguments')\n        } else {\n          argument = arguments[argumentPointer]\n        }\n        if (quantifier === '*') {\n          quantifier = argument.length\n        }\n        if (quantifier > argument.length) {\n          throw new Error('Warning: pack() Type ' + instruction + ': not enough characters in string')\n        }\n\n        for (i = 0; i < quantifier; i += 2) {\n        // Always get per 2 bytes...\n          word = argument[i]\n          if (((i + 1) >= quantifier) || typeof argument[i + 1] === 'undefined') {\n            word += '0'\n          } else {\n            word += argument[i + 1]\n          }\n        // The fastest way to reverse?\n          if (instruction === 'h') {\n            word = word[1] + word[0]\n          }\n          result += String.fromCharCode(parseInt(word, 16))\n        }\n        argumentPointer++\n        break\n\n      case 'c':\n      // signed char\n      case 'C':\n      // unsigned char\n      // c and C is the same in pack\n        if (quantifier === '*') {\n          quantifier = arguments.length - argumentPointer\n        }\n        if (quantifier > (arguments.length - argumentPointer)) {\n          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments')\n        }\n\n        for (i = 0; i < quantifier; i++) {\n          result += String.fromCharCode(arguments[argumentPointer])\n          argumentPointer++\n        }\n        break\n\n      case 's':\n      // signed short (always 16 bit, machine byte order)\n      case 'S':\n      // unsigned short (always 16 bit, machine byte order)\n      case 'v':\n      // s and S is the same in pack\n        if (quantifier === '*') {\n          quantifier = arguments.length - argumentPointer\n        }\n        if (quantifier > (arguments.length - argumentPointer)) {\n          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments')\n        }\n\n        for (i = 0; i < quantifier; i++) {\n          result += String.fromCharCode(arguments[argumentPointer] & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF)\n          argumentPointer++\n        }\n        break\n\n      case 'n':\n      // unsigned short (always 16 bit, big endian byte order)\n        if (quantifier === '*') {\n          quantifier = arguments.length - argumentPointer\n        }\n        if (quantifier > (arguments.length - argumentPointer)) {\n          throw new Error('Warning: pack() Type ' + instruction + ': too few arguments')\n        }\n\n        for (i = 0; i < quantifier; i++) {\n          result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] & 0xFF)\n          argumentPointer++\n        }\n        break\n\n      case 'i':\n      // signed integer (machine dependent size and byte order)\n      case 'I':\n      // unsigned integer (machine dependent size and byte order)\n      case 'l':\n      // signed long (always 32 bit, machine byte order)\n      case 'L':\n      // unsigned long (always 32 bit, machine byte order)\n      case 'V':\n      // unsigned long (always 32 bit, little endian byte order)\n        if (quantifier === '*') {\n          quantifier = arguments.length - argumentPointer\n        }\n        if (quantifier > (arguments.length - argumentPointer)) {\n          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments')\n        }\n\n        for (i = 0; i < quantifier; i++) {\n          result += String.fromCharCode(arguments[argumentPointer] & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF)\n          argumentPointer++\n        }\n\n        break\n      case 'N':\n      // unsigned long (always 32 bit, big endian byte order)\n        if (quantifier === '*') {\n          quantifier = arguments.length - argumentPointer\n        }\n        if (quantifier > (arguments.length - argumentPointer)) {\n          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments')\n        }\n\n        for (i = 0; i < quantifier; i++) {\n          result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF)\n          result += String.fromCharCode(arguments[argumentPointer] & 0xFF)\n          argumentPointer++\n        }\n        break\n\n      case 'f':\n      // float (machine dependent size and representation)\n      case 'd':\n      // double (machine dependent size and representation)\n      // version based on IEEE754\n        precisionBits = 23\n        exponentBits = 8\n        if (instruction === 'd') {\n          precisionBits = 52\n          exponentBits = 11\n        }\n\n        if (quantifier === '*') {\n          quantifier = arguments.length - argumentPointer\n        }\n        if (quantifier > (arguments.length - argumentPointer)) {\n          throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments')\n        }\n        for (i = 0; i < quantifier; i++) {\n          argument = arguments[argumentPointer]\n          bias = Math.pow(2, exponentBits - 1) - 1\n          minExp = -bias + 1\n          maxExp = bias\n          minUnnormExp = minExp - precisionBits\n          status = isNaN(n = parseFloat(argument)) || n === -Infinity || n === +Infinity ? n : 0\n          exp = 0\n          len = 2 * bias + 1 + precisionBits + 3\n          bin = new Array(len)\n          signal = (n = status !== 0 ? 0 : n) < 0\n          n = Math.abs(n)\n          intPart = Math.floor(n)\n          floatPart = n - intPart\n\n          for (k = len; k;) {\n            bin[--k] = 0\n          }\n          for (k = bias + 2; intPart && k;) {\n            bin[--k] = intPart % 2\n            intPart = Math.floor(intPart / 2)\n          }\n          for (k = bias + 1; floatPart > 0 && k; --floatPart) {\n            (bin[++k] = ((floatPart *= 2) >= 1) - 0)\n          }\n          for (k = -1; ++k < len && !bin[k];) {}\n\n          if (bin[(lastBit = precisionBits - 1 + (k = (exp = bias + 1 - k) >= minExp && exp <= maxExp ? k + 1 :\n            bias + 1 - (exp = minExp - 1))) + 1]) {\n            if (!(rounded = bin[lastBit])) {\n              for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]) {}\n            }\n            for (j = lastBit + 1; rounded && --j >= 0;\n            (bin[j] = !bin[j] - 0) && (rounded = 0)) {}\n          }\n\n          for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k];) {}\n\n          if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {\n            ++k\n          } else {\n            if (exp < minExp) {\n              if (exp !== bias + 1 - len && exp < minUnnormExp) { /* \"encodeFloat::float underflow\" */ }\n              k = bias + 1 - (exp = minExp - 1)\n            }\n          }\n\n          if (intPart || status !== 0) {\n            exp = maxExp + 1\n            k = bias + 2\n            if (status === -Infinity) {\n              signal = 1\n            } else if (isNaN(status)) {\n              bin[k] = 1\n            }\n          }\n\n          n = Math.abs(exp + bias)\n          tmpResult = ''\n\n          for (j = exponentBits + 1; --j;) {\n            tmpResult = (n % 2) + tmpResult\n            n = n >>= 1\n          }\n\n          n = 0\n          j = 0\n          k = (tmpResult = (signal ? '1' : '0') + tmpResult + bin.slice(k, k + precisionBits)\n            .join(''))\n          .length\n          r = []\n\n          for (; k;) {\n            n += (1 << j) * tmpResult.charAt(--k)\n            if (j === 7) {\n              r[r.length] = String.fromCharCode(n)\n              n = 0\n            }\n            j = (j + 1) % 8\n          }\n\n          r[r.length] = n ? String.fromCharCode(n) : ''\n          result += r.join('')\n          argumentPointer++\n        }\n        break\n\n      case 'x':\n      // NUL byte\n        if (quantifier === '*') {\n          throw new Error('Warning: pack(): Type x: \\'*\\' ignored')\n        }\n        for (i = 0; i < quantifier; i++) {\n          result += String.fromCharCode(0)\n        }\n        break\n\n      case 'X':\n      // Back up one byte\n        if (quantifier === '*') {\n          throw new Error('Warning: pack(): Type X: \\'*\\' ignored')\n        }\n        for (i = 0; i < quantifier; i++) {\n          if (result.length === 0) {\n            throw new Error('Warning: pack(): Type X:' + ' outside of string')\n          } else {\n            result = result.substring(0, result.length - 1)\n          }\n        }\n        break\n\n      case '@':\n      // NUL-fill to absolute position\n        if (quantifier === '*') {\n          throw new Error('Warning: pack(): Type X: \\'*\\' ignored')\n        }\n        if (quantifier > result.length) {\n          extraNullCount = quantifier - result.length\n          for (i = 0; i < extraNullCount; i++) {\n            result += String.fromCharCode(0)\n          }\n        }\n        if (quantifier < result.length) {\n          result = result.substring(0, quantifier)\n        }\n        break\n\n      default:\n        throw new Error('Warning:  pack() Type ' + instruction + ': unknown format code')\n    }\n  }\n  if (argumentPointer < arguments.length) {\n    throw new Error('Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused')\n  }\n\n  return result\n}\n"
permalink: /functions/pack/
redirect_from:
  - /functions/misc/pack/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->