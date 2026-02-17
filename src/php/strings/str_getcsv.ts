export function str_getcsv(
  input: string,
  delimiter?: string | null,
  enclosure?: string | null,
  escapeCharacter?: string | null,
): string[] {
  //      discuss at: https://locutus.io/php/str_getcsv/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: str_getcsv('"abc","def","ghi"')
  //       returns 1: ['abc', 'def', 'ghi']
  //       example 2: str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"')
  //       returns 2: ['row2"cell1', 'row2cell2', 'row2cell3']

  /*
  // These test cases allowing for missing delimiters are not currently supported
    str_getcsv('"row2""cell1",row2cell2,row2cell3', null, null, '"');
    ['row2"cell1', 'row2cell2', 'row2cell3']

    str_getcsv('row1cell1,"row1,cell2",row1cell3', null, null, '"');
    ['row1cell1', 'row1,cell2', 'row1cell3']

    str_getcsv('"row2""cell1",row2cell2,"row2""""cell3"');
    ['row2"cell1', 'row2cell2', 'row2""cell3']

    str_getcsv('row1cell1,"row1,cell2","row1"",""cell3"', null, null, '"');
    ['row1cell1', 'row1,cell2', 'row1","cell3'];

    Should also test newlines within
  */

  let i = 0
  let inpLen = 0
  const output: string[] = []
  const _backwards = function (str: string): string {
    // We need to go backwards to simulate negative look-behind (don't split on
    // an escaped enclosure even if followed by the delimiter and another enclosure mark)
    return str.split('').reverse().join('')
  }
  const _pq = function (str: string): string {
    // preg_quote()
    return String(str).replace(/([\\.+*?[^\]$(){}=!<>|:])/g, '\\$1')
  }

  const delimiterValue = delimiter || ','
  const enclosureValue = enclosure || '"'
  const escapeValue = escapeCharacter || '\\'
  const pqEnc = _pq(enclosureValue)
  const pqEsc = _pq(escapeValue)

  const trimmedInput = input.replace(new RegExp('^\\s*' + pqEnc), '').replace(new RegExp(pqEnc + '\\s*$'), '')

  // PHP behavior may differ by including whitespace even outside of the enclosure
  const entries = _backwards(trimmedInput)
    .split(new RegExp(pqEnc + '\\s*' + _pq(delimiterValue) + '\\s*' + pqEnc + '(?!' + pqEsc + ')', 'g'))
    .reverse()

  for (i = 0, inpLen = entries.length; i < inpLen; i++) {
    output.push(_backwards(entries[i] ?? '').replace(new RegExp(pqEsc + pqEnc, 'g'), enclosureValue))
  }

  return output
}
