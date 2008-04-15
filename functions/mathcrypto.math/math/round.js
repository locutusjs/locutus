function round ( val, precision ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // *     example 1: round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: round(3.6);
    // *     returns 2: 4
 
    var precision = (round.arguments.length > 1) ? round.arguments[1] : 0;
    return Math.round(val * Math.pow(10, precision))/Math.pow(10, precision);
}