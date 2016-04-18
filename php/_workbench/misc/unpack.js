module.exports = function unpack (format, data)  {
  // http://kevin.vanzonneveld.net
  // +   original by: Tim de Koning (http://www.kingsquare.nl)
  // +      parts by: Jonas Raoni Soares Silva - http://www.jsfromhell.com
  // +      parts by: Joshua Bell - http://cautionsingularityahead.blogspot.nl/
  // +
  // +   bugfixed by: marcuswestin
  // %        note 1: Float decoding by: Jonas Raoni Soares Silva
  // %        note 2: Home: http://www.kingsquare.nl/blog/22-12-2009/13650536
  // %        note 3: Feedback: phpjs-unpack@kingsquare.nl
  // %        note 4: 'machine dependant byte order and size' aren't
  // %        note 5: applicable for JavaScript unpack works as on a 32bit,
  // %        note 6: little endian machine
  // *     example 1: unpack('d', "\u0000\u0000\u0000\u0000\u00008YÀ");
  // *     returns 1: { "": -100.875 }

  var formatPointer = 0, dataPointer = 0, result = {}, instruction = '',
      quantifier = '', label = '', currentData = '', i = 0, j = 0,
      word = '', fbits = 0, ebits = 0, dataByteLength = 0;

  // Used by float decoding - by Joshua Bell
	//http://cautionsingularityahead.blogspot.nl/2010/04/javascript-and-ieee754-redux.html
  var fromIEEE754 = function(bytes, ebits, fbits) {
    // Bytes to bits
    var bits = [];
    for (var i = bytes.length; i; i -= 1) {
      var byte = bytes[i - 1];
      for (var j = 8; j; j -= 1) {
        bits.push(byte % 2 ? 1 : 0); byte = byte >> 1;
      }
    }
    bits.reverse();
    var str = bits.join('');

    // Unpack sign, exponent, fraction
    var bias = (1 << (ebits - 1)) - 1;
    var s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    var e = parseInt(str.substring(1, 1 + ebits), 2);
    var f = parseInt(str.substring(1 + ebits), 2);

    // Produce number
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN : s * Infinity;
    }
    else if (e > 0) {
      return s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits));
    }
    else if (f !== 0) {
      return s * Math.pow(2, -(bias-1)) * (f / Math.pow(2, fbits));
    }
    else {
      return s * 0;
    }
  }

  while (formatPointer < format.length) {
    instruction = format.charAt(formatPointer);

    // Start reading 'quantifier'
    quantifier = '';
    formatPointer++;
    while ((formatPointer < format.length) &&
        (format.charAt(formatPointer).match(/[\d\*]/) !== null)) {
      quantifier += format.charAt(formatPointer);
      formatPointer++;
    }
    if (quantifier === '') {
      quantifier = '1';
    }


    // Start reading label
    label = '';
    while ((formatPointer < format.length) &&
        (format.charAt(formatPointer) !== '/')) {
      label += format.charAt(formatPointer);
      formatPointer++;
    }
    if (format.charAt(formatPointer) === '/') {
      formatPointer++;
    }

    // Process given instruction
    switch (instruction) {
      case 'a': // NUL-padded string
      case 'A': // SPACE-padded string
        if (quantifier === '*') {
          quantifier = data.length - dataPointer;
        } else {
          quantifier = parseInt(quantifier, 10);
        }
        currentData = data.substr(dataPointer, quantifier);
        dataPointer += quantifier;

        if (instruction === 'a') {
          currentResult = currentData.replace(/\0+$/, '');
        } else {
          currentResult = currentData.replace(/ +$/, '');
        }
        result[label] = currentResult;
        break;

      case 'h': // Hex string, low nibble first
      case 'H': // Hex string, high nibble first
        if (quantifier === '*') {
          quantifier = data.length - dataPointer;
        } else {
          quantifier = parseInt(quantifier, 10);
        }
        currentData = data.substr(dataPointer, quantifier);
        dataPointer += quantifier;

        if (quantifier > currentData.length) {
          throw new Error('Warning: unpack(): Type ' + instruction +
              ': not enough input, need ' + quantifier);
        }

        currentResult = '';
        for (i = 0; i < currentData.length; i++) {
          word = currentData.charCodeAt(i).toString(16);
          if (instruction === 'h') {
            word = word[1] + word[0];
          }
          currentResult += word;
        }
        result[label] = currentResult;
        break;

      case 'c': // signed char
      case 'C': // unsigned c
        if (quantifier === '*') {
          quantifier = data.length - dataPointer;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        currentData = data.substr(dataPointer, quantifier);
        dataPointer += quantifier;

        for (i = 0; i < currentData.length; i++) {
          currentResult = currentData.charCodeAt(i);
          if ((instruction === 'c') && (currentResult >= 128)) {
            currentResult -= 256;
          }
          result[label + (quantifier > 1 ?
              (i + 1) :
              '')] = currentResult;
        }
        break;

      case 'S': // unsigned short (always 16 bit, machine byte order)
      case 's': // signed short (always 16 bit, machine byte order)
      case 'v': // unsigned short (always 16 bit, little endian byte order)
        if (quantifier === '*') {
          quantifier = (data.length - dataPointer) / 2;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        currentData = data.substr(dataPointer, quantifier * 2);
        dataPointer += quantifier * 2;

        for (i = 0; i < currentData.length; i += 2) {
          // sum per word;
          currentResult = ((currentData.charCodeAt(i + 1) & 0xFF) << 8) +
              (currentData.charCodeAt(i) & 0xFF);
          if ((instruction === 's') && (currentResult >= 32768)) {
            currentResult -= 65536;
          }
          result[label + (quantifier > 1 ?
              ((i / 2) + 1) :
              '')] = currentResult;
        }
        break;

      case 'n': // unsigned short (always 16 bit, big endian byte order)
        if (quantifier === '*') {
          quantifier = (data.length - dataPointer) / 2;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        currentData = data.substr(dataPointer, quantifier * 2);
        dataPointer += quantifier * 2;

        for (i = 0; i < currentData.length; i += 2) {
          // sum per word;
          currentResult = ((currentData.charCodeAt(i) & 0xFF) << 8) +
              (currentData.charCodeAt(i + 1) & 0xFF);
          result[label + (quantifier > 1 ?
              ((i / 2) + 1) :
              '')] = currentResult;
        }
        break;

      case 'i': // signed integer (machine dependent size and byte order)
      case 'I': // unsigned integer (machine dependent size & byte order)
      case 'l': // signed long (always 32 bit, machine byte order)
      case 'L': // unsigned long (always 32 bit, machine byte order)
      case 'V': // unsigned long (always 32 bit, little endian byte order)
        if (quantifier === '*') {
          quantifier = (data.length - dataPointer) / 4;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        currentData = data.substr(dataPointer, quantifier * 4);
        dataPointer += quantifier * 4;

        for (i = 0; i < currentData.length; i += 4) {
          currentResult =
              ((currentData.charCodeAt(i + 3) & 0xFF) << 24) +
              ((currentData.charCodeAt(i + 2) & 0xFF) << 16) +
              ((currentData.charCodeAt(i + 1) & 0xFF) << 8) +
              ((currentData.charCodeAt(i) & 0xFF));
          result[label + (quantifier > 1 ?
              ((i / 4) + 1) :
              '')] = currentResult;
        }

        break;

      case 'N': // unsigned long (always 32 bit, little endian byte order)
        if (quantifier === '*') {
          quantifier = (data.length - dataPointer) / 4;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        currentData = data.substr(dataPointer, quantifier * 4);
        dataPointer += quantifier * 4;

        for (i = 0; i < currentData.length; i += 4) {
          currentResult =
              ((currentData.charCodeAt(i) & 0xFF) << 24) +
              ((currentData.charCodeAt(i + 1) & 0xFF) << 16) +
              ((currentData.charCodeAt(i + 2) & 0xFF) << 8) +
              ((currentData.charCodeAt(i + 3) & 0xFF));
          result[label + (quantifier > 1 ?
              ((i / 4) + 1) :
              '')] = currentResult;
        }

        break;

      case 'f': //float
      case 'd': //double
        ebits = 8;
        fbits = (instruction === 'f') ? 23 : 52;
        dataByteLength = 4;
        if (instruction === 'd') {
          ebits = 11;
          dataByteLength = 8;
        }

        if (quantifier === '*') {
          quantifier = (data.length - dataPointer) / dataByteLength;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        currentData = data.substr(dataPointer, quantifier * dataByteLength);
        dataPointer += quantifier * dataByteLength;

        for (i = 0; i < currentData.length; i += dataByteLength) {
          data = currentData.substr(i, dataByteLength);

          bytes = [];
          for (j = data.length - 1; j >= 0; --j) {
            bytes.push(data.charCodeAt(j));
          }
          result[label + (quantifier > 1 ?
              ((i / 4) + 1) :
              '')] = fromIEEE754(bytes, ebits, fbits);
        }

        break;

      case 'x': // NUL byte
      case 'X': // Back up one byte
      case '@': // NUL byte
        if (quantifier === '*') {
          quantifier = data.length - dataPointer;
        } else {
          quantifier = parseInt(quantifier, 10);
        }

        if (quantifier > 0) {
          if (instruction === 'X') {
            dataPointer -= quantifier;
          } else {
            if (instruction === 'x') {
              dataPointer += quantifier;
            } else {
              dataPointer = quantifier;
            }
          }
        }
        break;

      default:
        throw new Error('Warning:  unpack() Type ' + instruction +
            ': unknown format code');
    }
  }
  return result;
}
