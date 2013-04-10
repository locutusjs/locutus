function bcsqrt(operand, scale) {
    // http://kevin.vanzonneveld.net
    // +   original by: Robin Speekenbrink (http://www.kingsquare.nl/))

    var out = Math.sqrt(operand)
    if (typeof precision !=='undefined') {
        out = Math.round( Math.round( out * Math.pow( 10, scale + 1 ) ) / Math.pow( 10, 1 ) ) / Math.pow(10, scale);
    }
    return out;
}
