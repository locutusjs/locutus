function substr_replace(str, repl, start, length){
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

  function substr_replace_(str, replace, start, length) {

    if (start < 0) { // start position in str
      start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
      length = length + str.length - start;
    }

    return str.slice(0, start) + replace.substr(0, length) + replace.slice(length) + str.slice(start + length);
  }
  // Get length if not given
  if (typeof(length)=="undefined") {
    length = str;
    if (typeof(length)=="object") {
      for (i=0;i!=length;i++) {
        length[i]=length[i].length;
      }
    }else{
      length = length.length;
    }
  }
  // Convert start to integer
  if (typeof(start)=="object") {
    for(i=0;i!=start.length;i++){
      start[i]=parseInt(start[i]);
    }
  }else{
    start = parseInt(start);
  }
  // Convert length to integer
  if (typeof(length)=="object") {
    for (i=0;i!=length.length;i++) {
      length[i]=parseInt(length[i]);
    }
  }else{
    length = parseInt(length);
  }
  var returns = Array();
  var task = Array();
  if (typeof(str)=="string") {
      task[0] = Array(str);
  }else if (typeof(str)=="object"&&typeof(str[0])=="string") {
    for (i=0;i!=str.length;i++) {
      task[i] = Array(str[i]);
    }
  }
  for (i=0;i!=task.length; i++) {
    // Replacement
    if (typeof(repl)=="string") {
      // String Replacement
      task[i][1]=repl;
    }else if (task.length==1) {
      // Array non-Relative Replacement
      task[i][1]=repl;
    }else{
      // Array Relative Replacement
      task[i][1]=repl[i];
    }
    // Start
    if (typeof(start)=="number") {
      // String Start
      task[i][2]=start;
    }else if (task.length==1) {
      // Array non-Relative Start
      task[i][2]=start;
    }else{
      // Array Relative Start
      task[i][2]=start[i];
    }
    // Length
    if (typeof(length)=="number") {
      // String Length
      task[i][3]=length;
    }else if (task.length==1) {
      // Array non-Relative Length
      task[i][3]=length;
    }else{
      // Array Relative Length
      task[i][3]=length[i];
    }
  }
  for (i=0;i!=task.length;i++) {
    var opStr = task[i][0];
    var opRep = task[i][1];
    var opSta = task[i][2];
    var opLen = task[i][3];
    var op = Array();
    var count = 1;
    if (typeof(opRep)=="object"&&opRep.length>count) {
      count = opRep.length;
    }
    if (typeof(opSta)=="object"&&opSta.length>count) {
      count = opSta.length;
    }
    if (typeof(opLen)=="object"&&opLen.length>count) {
      count = opLen.length;
    }
    for (j=0;j!=count;j++) {
      op[j] = Array();
      // Replacement
      if (typeof(opRep)=="string") {
        // String Replacement
        op[j][0]=opRep;
      }else{
        // Array Relative Replacement
        op[j][0]=opRep[j];
      }
      // Start
      if (typeof(opSta)=="number") {
        // String Start
        op[j][1]=opSta;
      }else{
        // Array Relative Start
        op[j][1]=opSta[j];
      }
      // Length
      if (typeof(opLen)=="number") {
        // String Length
        op[j][2]=opLen;
      }else{
        // Array Relative Length
        op[j][2]=opLen[j];
      }
    }
    var string_buffering=opStr;
    for (j=0;j!=op.length;j++) {
      string_buffering = substr_replace_(string_buffering, op[j][0],op[j][1],op[j][2]);
    }
    returns[i] = string_buffering;
  }
  if (returns.length==1) {
    return returns[0];
  }else{
    return returns;
  }
}
