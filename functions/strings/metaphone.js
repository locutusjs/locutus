function metaphone(word, phones) {
  //  discuss at: http://phpjs.org/functions/metaphone/
  // original by: Greg Frazier
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  //   example 1: metaphone('Gnu');
  //   returns 1: 'N'
  //   example 2: metaphone('bigger');
  //   returns 2: 'BKR'
  //   example 3: metaphone('accuracy');
  //   returns 3: 'AKKRS'

  word = (word == null ? '' : word + '')
    .toUpperCase();

  function isVowel(a) {
    return a !== '' && 'AEIOU'.indexOf(a) !== -1;
  }

  var wordlength = word.length,
    x = 0,
    metaword = '';

  //Special wh- case
  if (word.substr(0, 2) === 'WH') {
    // Remove "h" and rebuild the string
    word = 'W' + word.substr(2);
  }

  var cc = word.charAt(0); // current char. Short name cause it's used all over the function
  var pc = ''; // previous char. There is none when x === 0
  var nc = word.charAt(1); // next char
  var nnc = ''; // 2 characters ahead. Needed later

  if (1 <= wordlength) {
    switch (cc) {
      case 'A':
        if (nc === 'E') {
          metaword += 'E';
        } else {
          metaword += 'A';
        }
        x += 1;
        break;
      case 'E':
      case 'I':
      case 'O':
      case 'U':
        metaword += cc;
        x += 1;
        break;
      case 'G':
      case 'K':
      case 'P':
        if (nc === 'N') {
          x += 1;
        }
        break;
      case 'W':
        if (nc === 'R') {
          x += 1;
        }
        break;
    }
  }

  for (; x < wordlength; x++) {
    cc = word.charAt(x);
    pc = word.charAt(x - 1);
    nc = word.charAt(x + 1);
    nnc = word.charAt(x + 2);
    
    if (cc === pc && cc !== 'C') { // ignore duplicates except 'CC'
      continue;
    }

    switch (cc) {
      case 'B':
        if (pc !== 'M') {
          metaword += 'B';
        }
        break;
      case 'C':
        if (nc === 'I' && nnc === 'A') {
          metaword += 'X';
        } else if (nc === 'I' || nc === 'E' || nc === 'Y') {
          if (pc !== 'S') {
            metaword += 'S';
          }
        } else if (nc === 'H') {
          metaword += 'X';
          x++;
        } else {
          metaword += 'K';
        }
        break;
      case 'D':
        if (x + 2 <= wordlength && nc === 'G' && 'EIY'.indexOf(nnc) !== -1) {
          metaword += 'J';
          x += 2;
        } else {
          metaword += 'T';
        }
        break;
      case 'F':
        metaword += 'F';
        break;
      case 'G':
        if (x < wordlength) {
          if ((nc === 'N' && x + 1 === wordlength - 1) || (nc === 'N' && nnc === 'S' && x + 2 ===
            wordlength - 1)) {
            break;
          }
          if (word.substr(x + 1, 3) === 'NED' && x + 3 === wordlength - 1) {
            break;
          }
          if (word.substr(x - 2, 3) === 'ING' && x === wordlength - 1) {
            break;
          }

          if (x + 1 <= wordlength - 1 && word.substr(x - 2, 4) === 'OUGH') {
            metaword += 'F';
            break;
          }
          if (nc === 'H' && x + 2 <= wordlength) {
            if (isVowel(nnc)) {
              metaword += 'K';
            }
          } else if (x + 1 === wordlength) {
            if (nc !== 'N') {
              metaword += 'K';
            }
          } else if (x + 3 === wordlength) {
            if (word.substr(x + 1, 3) !== 'NED') {
              metaword += 'K';
            }
          } else if (x + 1 <= wordlength) {
            if ('EIY'.indexOf(nc) !== -1) {
              if (pc !== 'G') {
                metaword += 'J';
              }
            } else if (x === 0 || pc !== 'D' || 'EIY'.indexOf(nc) === -1) {
              metaword += 'K';
            }
          } else {
            metaword += 'K';
          }
        } else {
          metaword += 'K';
        }
        break;
      case 'M':
      case 'J':
      case 'N':
      case 'R':
      case 'L':
        metaword += cc;
        break;
      case 'Q':
        metaword += 'K';
        break;
      case 'V':
        metaword += 'F';
        break;
      case 'Z':
        metaword += 'S';
        break;
      case 'X':
        metaword += (x === 0) ? 'S' : 'KS';
        break;
      case 'K':
        if (x === 0 || pc !== 'C') {
          metaword += 'K';
        }
        break;
      case 'P':
        if (x + 1 <= wordlength && nc === 'H') {
          metaword += 'F';
        } else {
          metaword += 'P';
        }
        break;
      case 'Y':
        if (isVowel(nc)) {
          metaword += 'Y';
        }
        break;
      case 'H':
        if (x === 0 || 'CSPTG'.indexOf(pc) === -1) {
          if (isVowel(nc)) {
            metaword += 'H';
          }
        }
        break;
      case 'S':
        if (x + 1 <= wordlength) {
          if (nc === 'H') {
            metaword += 'X';
          } else if (x + 2 <= wordlength && nc === 'I' && 'AO'.indexOf(nnc) !== -1) {
            metaword += 'X';
          } else {
            metaword += 'S';
          }
        } else {
          metaword += 'S';
        }
        break;
      case 'T':
        if (x + 1 <= wordlength) {
          if (nc === 'H') {
            metaword += '0';
          } else if (x + 2 <= wordlength && nc === 'I' && 'AO'.indexOf(nnc) !== -1) {
            metaword += 'X';
          } else {
            metaword += 'T';
          }
        } else {
          metaword += 'T';
        }
        break;
      case 'W':
        if (x + 1 <= wordlength && isVowel(nc)) {
          metaword += 'W';
        }
        break;
    }
  }

  phones = parseInt(phones, 10);
  if (metaword.length > phones) {
    return metaword.substr(0, phones);
  }
  return metaword;
}
