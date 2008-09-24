function round ( val, precision ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Onno Marsman
    // *     example 1: round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: round(3.6);
    // *     returns 2: 4
 
    return parseFloat(parseFloat(val).toFixed(precision));
}