function substr_replace(str, replace, start, length) {
  //  discuss at: http://phpjs.org/functions/substr_replace/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
  //   returns 1: 'bob'
  //   example 2: $var = 'ABCDEFGH:/MNRPQR/';
  //   example 2: substr_replace($var, 'bob', 0, $var.length);
  //   returns 2: 'bob'
  //   example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
  //   returns 3: 'bobABCDEFGH:/MNRPQR/'
  //   example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
  //   returns 4: 'ABCDEFGH:/bob/'
  //   example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
  //   returns 5: 'ABCDEFGH:/bob/'
  //   example 6: substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
  //   returns 6: 'ABCDEFGH://'
  //   example 7: substr_replace('ABCDEFGH:/MNRPQR/', ['1', '2', '3'], 9, 0)
  //   returns 7: 'ABCDEFGH:321/MNRPQR/'
  //   example 8: substr_replace('ABCDEFGH:/MNRPQR/', ['1', '2', '3'], [10, 11, 12], 2)
  //   returns 8: 'ABCDEFGH:/123/'
  //   example 9: substr_replace('ABCDEFGH:/MNRPQR/', ['1', '2', '3'], [0, 3, 5], [8, 6, 0])
  //   returns 9: '1:/2/3'
  //   example 10: substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], 'YYY', 3, 3)
  //   returns 10: ['A: YYY','B: YYY','C: YYY']
  //   example 11: substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], ['AAA', 'BBB', 'CCC'], 3, 3)
  //   returns 11: ['A: AAA','B: BBB','C: CCC']
  //   example 12: substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], ['AAA', 'BBB', 'CCC'], 3, [1, 2, 3])
  //   returns 12: ['A: AAAXX','B: BBBX','C: CCC']
  //   example 13: substr_replace(['A: XXXXX', 'B: XXXXX', 'C: XXXXX'], ['AAA', 'BBB', 'CCC'], [3, 4, 5], [1, 2, 3])
  //   returns 13: ['A: AAAXXXX','B: XBBBXX','C: XXCCC']

  function substrReplace(str, replace, start, length) {

    if (start < 0) { // start position in str
      start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
      length = length + str.length - start;
    }

    return str.slice(0, start) + replace.substr(0, length) + replace.slice(length) + str.slice(start + length);
  }
  var returns = Array();
  var tasks = Array();
  if (typeof(length) === "undefined") { // Get length if not given
    length = str;
    if (typeof(length) === "object") {
      for (i = 0; i !== length; i++)
        length[i] = length[i].length;
    }else{
      length = length.length;
    }
  }
  if (typeof(start) === "object") { // Convert start to integer
    for(i = 0; i !== start.length; i++){
      start[i] = parseInt(start[i]);
    }
  }else{
    start = parseInt(start);
  }
  if (typeof(length) === "object") { // Convert length to integer
    for (i = 0; i != length.length; i++) {
      length[i] = parseInt(length[i]);
    }
  }else{
    length = parseInt(length);
  }
  if (typeof(str) === "string") { // Add strings into tasks
      tasks[0] = Array(str);
  }else if (typeof(str) === "object") {
    for (i = 0; i !== str.length; i++) {
      tasks[i] = Array(str[i]);
    }
  }
  for (i = 0; i !== tasks.length; i++) {
    tasks[i][1] = (typeof(replace) === "string" || tasks.length === 1) // Add replaces into tasks
      ? replace
      : replace[i];
    tasks[i][2] = (typeof(start) === "number" || tasks.length === 1) // Add starts into tasks
      ? start
      : start[i];
    tasks[i][3] = (typeof(length) === "number" || tasks.length === 1) // Add lengths into tasks
      ? length
      : length[i];
    var string = tasks[i][0];// This string
    var count = 1; // Number of operations for this string
    count = (typeof(tasks[i][1]) === "object" && tasks[i][1].length > count)
      ? tasks[i][1].length
      : count;
    count = (typeof(tasks[i][2]) === "object" && tasks[i][2].length > count)
      ? tasks[i][2].length
      : count;
    count = (typeof(tasks[i][3]) === "object" && tasks[i][3].length > count)
      ? tasks[i][3].length
      : count;
    for (j = 0; j !== count; j++) {
      var replacee = (typeof(tasks[i][1]) === "string")
        ? tasks[i][1]
        : tasks[i][1][j];
      var startt = (typeof(tasks[i][2]) === "number")
        ? tasks[i][2]
        : tasks[i][2][j];
      var lengthh = (typeof(tasks[i][3]) === "number")
        ? tasks[i][3]
        : tasks[i][3][j];
      string = substrReplace(string, replacee, startt, lengthh);
    }
    returns[i] = string;
  }
  return (returns.length === 1)
    ? returns[0]
    : returns;
}
