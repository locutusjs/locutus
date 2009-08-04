function bcdiv (left_operand, right_operand, scale) {
    // http://kevin.vanzonneveld.net
    // +   original by: Lance
    // %        note 1: TODO: Write proper bcdiv function :(
    // *     example 1: bcsub(4, 2);
    // *     returns 1: 0
    
    return parseFloat(left_operand) / parseFloat(right_operand);
    //return this.bcmul(left_operand, (1/right_operand), scale);
} 