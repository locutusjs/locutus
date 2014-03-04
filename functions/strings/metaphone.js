function metaphone(word, max_phonemes) {
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
  //   example 4: metaphone('batch batcher');
  //   returns 4: 'BXBXR'

  var type = typeof word;

  if (type === 'undefined' || type === 'object' && word !== null) {
    return null; // weird!
  }

  // infinity and NaN values are treated as strings
  if (type === 'number') {
    if (isNaN(word)) {
      word = 'NAN';
    } else if (!isFinite(word)) {
      word = 'INF';
    }
  }

  if (max_phonemes < 0) {
    return false;
  }

  max_phonemes = Math.floor(+max_phonemes) || 0;

  // alpha depends on locale, so this var might need an update
  // or should be turned into a regex
  // for now assuming pure a-z
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    vowel = 'AEIOU',
    soft = 'EIY',
    leadingNonAlpha = new RegExp('^[^' + alpha + ']+');

  word = typeof word === 'string' ? word : '';
  word = word.toUpperCase()
    .replace(leadingNonAlpha, '');

  if (!word) {
    return '';
  }

  var is = function(p, c) {
    return c !== '' && p.indexOf(c) !== -1;
  };

  var i = 0,
    cc = word.charAt(0), // current char. Short name, because it's used all over the function
    nc = word.charAt(1), // next char
    nnc, // after next char
    pc, // previous char
    l = word.length,
    meta = '',
    // traditional is an internal param that could be exposed
    // for now let it be a local var
    traditional = true;

  switch (cc) {
    case 'A':
      meta += nc === 'E' ? nc : cc;
      i += 1;
      break;
    case 'G':
    case 'K':
    case 'P':
      if (nc === 'N') {
        meta += nc;
        i += 2;
      }
      break;
    case 'W':
      if (nc === 'R') {
        meta += nc;
        i += 2;
      } else if (nc === 'H' || is(vowel, nc)) {
        meta += 'W';
        i += 2;
      }
      break;
    case 'X':
      meta += 'S';
      i += 1;
      break;
    case 'E':
    case 'I':
    case 'O':
    case 'U':
      meta += cc;
      i++;
      break;
  }

  for (; i < l && (max_phonemes === 0 || meta.length < max_phonemes); i += 1) {
    cc = word.charAt(i);
    nc = word.charAt(i + 1);
    pc = word.charAt(i - 1);
    nnc = word.charAt(i + 2);

    if (cc === pc && cc !== 'C') {
      continue;
    }

    switch (cc) {
      case 'B':
        if (pc !== 'M') {
          meta += cc;
        }
        break;
      case 'C':
        if (is(soft, nc)) {
          if (nc === 'I' && nnc === 'A') {
            meta += 'X';
          } else if (pc !== 'S') {
            meta += 'S';
          }
        } else if (nc === 'H') {
          meta += !traditional && (nnc === 'R' || pc === 'S') ? 'K' : 'X';
          i += 1;
        } else {
          meta += 'K';
        }
        break;
      case 'D':
        if (nc === 'G' && is(soft, nnc)) {
          meta += 'J';
          i += 1;
        } else {
          meta += 'T';
        }
        break;
      case 'G':
        if (nc === 'H') {
          if (!(is('BDH', word.charAt(i - 3)) || word.charAt(i - 4) === 'H')) {
            meta += 'F';
            i += 1;
          }
        } else if (nc === 'N') {
          if (is(alpha, nnc) && word.substr(i + 1, 3) !== 'NED') {
            meta += 'K';
          }
        } else if (is(soft, nc) && pc !== 'G') {
          meta += 'J';
        } else {
          meta += 'K';
        }
        break;
      case 'H':
        if (is(vowel, nc) && !is('CGPST', pc)) {
          meta += cc;
        }
        break;
      case 'K':
        if (pc !== 'C') {
          meta += 'K';
        }
        break;
      case 'P':
        meta += nc === 'H' ? 'F' : cc;
        break;
      case 'Q':
        meta += 'K';
        break;
      case 'S':
        if (nc === 'I' && is('AO', nnc)) {
          meta += 'X';
        } else if (nc === 'H') {
          meta += 'X';
          i += 1;
        } else if (!traditional && word.substr(i + 1, 3) === 'CHW') {
          meta += 'X';
          i += 2;
        } else {
          meta += 'S';
        }
        break;
      case 'T':
        if (nc === 'I' && is('AO', nnc)) {
          meta += 'X';
        } else if (nc === 'H') {
          meta += '0';
          i += 1;
        } else if (word.substr(i + 1, 2) !== 'CH') {
          meta += 'T';
        }
        break;
      case 'V':
        meta += 'F';
        break;
      case 'W':
      case 'Y':
        if (is(vowel, nc)) {
          meta += cc;
        }
        break;
      case 'X':
        meta += 'KS';
        break;
      case 'Z':
        meta += 'S';
        break;
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R':
        meta += cc;
        break;
    }
  }

  return meta;

  /*
  "    abc", "ABK", // skip leading whitespace
  "1234.678!@abc", "ABK", // skip leading non-alpha chars
  "aero", "ER", // leading 'a' followed by 'e' turns into 'e'
  "air", "AR", // leading 'a' turns into 'e', other vowels ignored
  // leading vowels added to result
  "egg", "EK",
  "if", "IF",
  "of", "OF",
  "use", "US",
  // other vowels ignored
  "xAEIOU", "S",
  // GN, KN, PN become 'N'
  "gnome", "NM",
  "knight", "NFT",
  "pneumatic", "NMTK",
  // leading 'WR' becomes 'R'
  "wrong", "RNK",
  // leading 'WH+vowel" becomes 'W'
  "wheel", "WL",
  // leading 'X' becomes 'S', 'KS' otherwise
  "xerox", "SRKS",
  "exchange", "EKSXNJ",
  // duplicate chars, except 'C' are ignored
  "accuracy", "AKKRS",
  "blogger", "BLKR",
  "fffound", "FNT",
  // ignore 'B' if after 'M'
  "billboard", "BLBRT",
  "symbol", "SML",
  // 'CIA' -> 'X'
  "special", "SPXL",
  // 'SC[IEY]' -> 'C' ignored
  "science", "SNS",
  // '[^S]C' -> 'C' becomes 'S'
  "dance", "TNS",
  // 'CH' -> 'X'
  "change", "XNJ",
  "school", "SXL",
  // 'C' -> 'K'
  "micro", "MKR",
  // 'DGE', 'DGI', DGY' -> 'J'
  // 'T' otherwise
  "bridge", "BRJ",
  "pidgin", "PJN",
  "edgy", "EJ",
  "handgun", "HNTKN",
  "draw", "TR",
  //'GN\b' 'GNED' -> ignore 'G'
  "sign", "SN",
  "signed", "SNT",
  "signs", "SKNS",
  // [^G]G[EIY] -> 'J'...
  "agency", "AJNS",
  // 'GH' -> 'F' if not b--gh, d--gh, h--gh
  "night", "NFT",
  "bright", "BRT",
  "height", "HT",
  "midnight", "MTNT",
  // 'K' otherwise
  "jogger", "JKR",
  // '[^CGPST]H[AEIOU]' -> 'H', ignore otherwise
  "horse", "HRS",
  "adhere", "ATHR",
  "mahjong", "MJNK",
  "fight", "FFT", // interesting
  "ghost", "FST",
  // 'K' -> 'K' if not after 'C'
  "ski", "SK",
  "brick", "BRK",
  // 'PH' -> 'F'
  "phrase", "FRS",
  // 'P.' -> 'P'
  "hypnotic", "PNTK",
  "topnotch", "TPNX",
  // 'Q' -> 'K'
  "quit", "KT",
  "squid", "SKT",
  // 'SIO', 'SIA', 'SH' -> 'X'
  "version", "FRXN",
  "silesia", "SLX",
  "enthusiasm", "EN0XSM",
  "shell", "XL",
  // 'S' -> 'S' in other cases
  "spy", "SP",
  "system", "SSTM",
  // 'TIO', 'TIA' -> 'X'
  "ratio", "RX",
  "nation", "NXN",
  "spatial", "SPXL",
  // 'TH' -> '0'
  "the", "0",
  "nth", "N0",
  "truth", "TR0",
  // 'TCH' -> ignore 'T'
  "watch", "WX",
  // 'T' otherwise
  "vote", "FT",
  "tweet", "TWT",
  // 'V' -> 'F'
  "evolve", "EFLF",
  // 'W' -> 'W' if followed by vowel
  "rewrite", "RRT",
  "outwrite", "OTRT",
  "artwork", "ARTWRK",
  // 'X' -> 'KS' if not first char
  "excel", "EKSSL",
  // 'Y' -> 'Y' if followed by vowel
  "cyan", "SYN",
  "way", "W",
  "hybrid", "BRT",
  // 'Z' -> 'S'
  "zip", "SP",
  "zoom", "SM",
  "jazz", "JS",
  "zigzag", "SKSK",
  "abc abc", "ABKBK" // eventhough there are two words, second 'a' is ignored
  */
}