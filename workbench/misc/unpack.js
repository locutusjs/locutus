function unpack(format, data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tim de Koning (http://www.kingsquare.nl)
    // +      parts by: Jonas Raoni Soares Silva
    // +      http://www.jsfromhell.com
    // +   bugfixed by: marcuswestin
    // %        note 1: Float decoding by: Jonas Raoni Soares Silva
    // %        note 2: Home: http://www.kingsquare.nl/blog/22-12-2009/13650536
    // %        note 3: Feedback: phpjs-unpack@kingsquare.nl
    // %        note 4: 'machine dependant byte order and size' aren't
    // %        note 5: applicable for JavaScript unpack works as on a 32bit,
    // %        note 6: little endian machine
    // *     example 1: unpack('f2test', 'abcddbca');
    // *     returns 1: { 'test1': 1.6777999408082E+22.
    // *     returns 2: 'test2': 2.6100787562286E+20 }

    var formatPointer = 0, dataPointer = 0, result = {}, instruction = '',
            quantifier = '', label = '', currentData = '', i = 0, j = 0,
            word = '', precisionBits = 0, exponentBits = 0, dataByteLength = 0;

    // Used by float decoding
    var b = [], bias,  signal, exponent, significand, divisor, curByte,
            byteValue, startBit = 0, mask, currentResult;

    var readBits = function(start, length, byteArray){
        var offsetLeft, offsetRight, curByte, lastByte, diff, sum;

        function shl(a, b){
            for(++b; --b;) {
                a = ((a %= 0x7fffffff + 1) & 0x40000000) === 0x40000000 ?
                    a * 2 :
                    (a - 0x40000000) * 2 + 0x7fffffff + 1;
            }
            return a;
        }
        if(start < 0 || length <= 0) {
            return 0;
        }

        offsetRight = start % 8;
        curByte = byteArray.length - (start >> 3) - 1;
        lastByte = byteArray.length + (-(start + length) >> 3);
        diff = curByte - lastByte;
        sum = (
                (byteArray[ curByte ] >> offsetRight) &
                ((1 << (diff ? 8 - offsetRight : length)) - 1)
            ) + (
               diff && (offsetLeft = (start + length) % 8) ?
                (byteArray[ lastByte++ ] & ((1 << offsetLeft) - 1)) <<
                (diff-- << 3) - offsetRight :
                0
            );

        for(; diff;) {
            sum += shl(byteArray[ lastByte++ ], (diff-- << 3) - offsetRight);
        }
        return sum;
    };

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

                if (quantifier>currentData.length) {
                    throw new Error('Warning: unpack(): Type ' + instruction +
                            ': not enough input, need '  + quantifier);
                }

                currentResult = '';
                for(i=0;i<currentData.length;i++) {
                    word = currentData.charCodeAt(i).toString(16);
                    if (instruction === 'h') {
                        word = word[1]+word[0];
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

                for (i=0;i<currentData.length;i++) {
                     currentResult = currentData.charCodeAt(i);
                     if ((instruction === 'c') && (currentResult >= 128)) {
                        currentResult -= 256;
                     }
                     result[label+(quantifier>1?
                            (i+1):
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

                for (i=0;i<currentData.length;i+=2) {
                     // sum per word;
                    currentResult = ((currentData.charCodeAt(i+1) & 0xFF) << 8) +
                            (currentData.charCodeAt(i) & 0xFF);
                    if ((instruction === 's') && (currentResult >= 32768)) {
                        currentResult -= 65536;
                    }
                    result[label+(quantifier>1?
                            ((i/2)+1):
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

                for (i=0;i<currentData.length;i+=2) {
                     // sum per word;
                    currentResult = ((currentData.charCodeAt(i) & 0xFF) << 8) +
                            (currentData.charCodeAt(i+1) & 0xFF);
                    result[label+(quantifier>1?
                            ((i/2)+1):
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

                for (i=0;i<currentData.length;i+=4) {
                    currentResult =
                            ((currentData.charCodeAt(i+3) & 0xFF) << 24) +
                            ((currentData.charCodeAt(i+2) & 0xFF) << 16) +
                            ((currentData.charCodeAt(i+1) & 0xFF) << 8) +
                            ((currentData.charCodeAt(i) & 0xFF));
                    result[label+(quantifier>1?
                            ((i/4)+1):
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

                for (i=0;i<currentData.length;i+=4) {
                    currentResult =
                            ((currentData.charCodeAt(i) & 0xFF) << 24) +
                            ((currentData.charCodeAt(i+1) & 0xFF) << 16) +
                            ((currentData.charCodeAt(i+2) & 0xFF) << 8) +
                            ((currentData.charCodeAt(i+3) & 0xFF));
                    result[label+(quantifier>1?
                            ((i/4)+1):
                            '')] = currentResult;
                }

                break;

            case 'f':
            case 'd':
                exponentBits = 8;
                dataByteLength = 4;
                if (instruction === 'd') {
                    exponentBits = 11;
                    dataByteLength = 8;
                }

               if (quantifier === '*') {
                    quantifier = (data.length - dataPointer) / dataByteLength;
                } else {
                    quantifier = parseInt(quantifier, 10);
                }

                currentData = data.substr(dataPointer,
                        quantifier * dataByteLength);
                dataPointer += quantifier * dataByteLength;

                for (i=0;i<currentData.length;i+=dataByteLength) {
                    data = currentData.substr(i, dataByteLength);

                    b = [];
                    for(j = data.length-1; j >= 0  ; --j) {
                        b.push(data.charCodeAt(j));
                    }

                    precisionBits = (instruction === 'f')?23:52;

                    bias = Math.pow(2, exponentBits - 1) - 1;
                    signal = readBits(precisionBits + exponentBits, 1, b);
                    exponent = readBits(precisionBits, exponentBits, b);
                    significand = 0;
                    divisor = 2;
                    curByte = b.length + (-precisionBits >> 3) - 1;
                    startBit = 0;

                    do {
                        byteValue = b[ ++curByte ];
                        startBit = precisionBits % 8 || 8;
                        mask = 1 << startBit;
                        for(; (mask >>= 1);) {
                            if (byteValue & mask) {
                                significand += 1 / divisor;
                            }
                            divisor *= 2;
                        }
                    } while ((precisionBits -= startBit));

                        if (exponent === (bias << 1) + 1) {
                            if (significand) {
                                currentResult = NaN;
                            } else {
                                if (signal) {
                                    currentResult = -Infinity;
                                } else {
                                    currentResult = +Infinity;
                                }
                            }
                        } else {
                            if ((1 + signal * -2) * (exponent || significand)) {
                                if (!exponent) {
                                    currentResult = Math.pow(2, -bias + 1) *
                                            significand;
                                } else {
                                    currentResult = Math.pow(2,
                                            exponent - bias) *
                                            (1 + significand);
                                }
                            } else {
                                currentResult = 0;
                            }
                        }
                        result[label+(quantifier>1?
                                ((i/4)+1):
                                '')] = currentResult;
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
