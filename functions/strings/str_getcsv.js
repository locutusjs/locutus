function str_getcsv(input, delimiter, enclosure, escape) {
  //  discuss at: http://phpjs.org/functions/str_getcsv/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: str_getcsv('"abc","def","ghi"');
  //   returns 1: ['abc', 'def', 'ghi']
  //   example 2: str_getcsv('"row2""cell1","row2cell2","row2cell3"', null, null, '"');
  //   returns 2: ['row2"cell1', 'row2cell2', 'row2cell3']

  // These test cases allowing for missing delimiters are not currently supported
  /*
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
  var i, inpLen, output = [];
  var backwards = function(str) { // We need to go backwards to simulate negative look-behind (don't split on
    //an escaped enclosure even if followed by the delimiter and another enclosure mark)
    return str.split('')
      .reverse()
      .join('');
  };
  var pq = function(str) { // preg_quote()
    return String(str)
      .replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<\>\|\:])/g, '\\$1');
  };

  delimiter = delimiter || ',';
  enclosure = enclosure || '"';
  escape = escape || '\\';
  var pqEnc = pq(enclosure);
  var pqEsc = pq(escape);

  input = input.replace(new RegExp('^\\s*' + pqEnc), '')
    .replace(new RegExp(pqEnc + '\\s*$'), '');

  // PHP behavior may differ by including whitespace even outside of the enclosure
  input = backwards(input)
    .split(new RegExp(pqEnc + '\\s*' + pq(delimiter) + '\\s*' + pqEnc + '(?!' + pqEsc + ')',
      'g'))
    .reverse();

  for (i = 0, inpLen = input.length; i < inpLen; i++) {
    output.push(backwards(input[i])
      .replace(new RegExp(pqEsc + pqEnc, 'g'), enclosure));
  }

  return output;
}