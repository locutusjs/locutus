/**
 * PHP Implementation of the libbcmath functions
 *
 * Designed to replicate the PHP functions exactly.
 * Also includes new function: bcround
 */


/**
 * bcadd - Add two arbitrary precision numbers
 *         Sums left_operand and right_operand.
 *
 * @param string left_operand       The left operand, as a string
 * @param string right_operand      The right operand, as a string.
 * @param int [scale]               The optional parameter is used to set the number of digits after the decimal place in the result. You can also set the global scale for all functions by using bcscale()
 * @return string
 */
function bcadd(left_operand, right_operand, scale) {
    var first, second, result;

    if (typeof(scale) == 'undefined') {
        scale = libbcmath.scale;
    }
    scale   = ((scale < 0) ? 0 : scale);

    // create objects
    first   = libbcmath.bc_init_num();
    second  = libbcmath.bc_init_num();
    result  = libbcmath.bc_init_num();

    first   = libbcmath.php_str2num(left_operand.toString());
    second  = libbcmath.php_str2num(right_operand.toString());


    result  = libbcmath.bc_add(first, second, scale);

    if (result.n_scale > scale) {
        result.n_scale = scale;
    }

    return result.toString();
}

/**
 * bcsub - Subtract one arbitrary precision number from another
 *         Returns difference between the left operand and the right operand.
 *
 * @param string left_operand       The left operand, as a string
 * @param string right_operand      The right operand, as a string.
 * @param int [scale]               The optional parameter is used to set the number of digits after the decimal place in the result. You can also set the global scale for all functions by using bcscale()
 * @return string
 */
function bcsub(left_operand, right_operand, scale) {
    var first, second, result;

    if (typeof(scale) == 'undefined') {
        scale = libbcmath.scale;
    }
    scale   = ((scale < 0) ? 0 : scale);

    // create objects
    first   = libbcmath.bc_init_num();
    second  = libbcmath.bc_init_num();
    result  = libbcmath.bc_init_num();

    first   = libbcmath.php_str2num(left_operand.toString());
    second  = libbcmath.php_str2num(right_operand.toString());

    result  = libbcmath.bc_sub(first, second, scale);

    if (result.n_scale > scale) {
        result.n_scale = scale;
    }

    return result.toString();

}

/**
 * bccomp - Compare two arbitrary precision numers
 *
 * @param string left_operand       The left operand, as a string
 * @param string right_operand      The right operand, as a string.
 * @param int [scale]               The optional parameter is used to set the number of digits after the decimal place in the result. You can also set the global scale for all functions by using bcscale()
 * @return int                      0: Left/Right are equal, 1 if left > right, -1 otherwise
 */
function bccomp(left_operand, right_operand, scale) {
    var first, second; //bc_num

    if (typeof(scale) == 'undefined') {
        scale = libbcmath.scale;
    }
    scale   = ((scale < 0) ? 0 : scale);

    first   = libbcmath.bc_init_num();
    second  = libbcmath.bc_init_num();

    first   = libbcmath.bc_str2num(left_operand.toString(), scale);     // note bc_ not php_str2num
    second  = libbcmath.bc_str2num(right_operand.toString(), scale);    // note bc_ not php_str2num

    return libbcmath.bc_compare(first, second, scale);
}

/**
 * bcscale - Set default scale parameter for all bc math functions
 * @param int   scale   The scale factor (0 to infinate)
 * @return bool
 */
function bcscale(scale) {
    scale = parseInt(scale, 10);
    if (isNaN(scale)) {
        return false;
    }
    if (scale < 0) {
        return false;
    }
    libbcmath.scale = scale;
    return true;
}


/**
 * bcdiv - Divide two arbitrary precision numbers
 *
 * @param string left_operand       The left operand, as a string
 * @param string right_operand      The right operand, as a string.
 * @param int [scale]               The optional parameter is used to set the number of digits after the decimal place in the result. You can also set the global scale for all functions by using bcscale()
 * @return string                   The result as a string
 */
function bcdiv(left_operand, right_operand, scale) {
    var first, second, result;

    if (typeof(scale) == 'undefined') {
        scale = libbcmath.scale;
    }
    scale   = ((scale < 0) ? 0 : scale);

    // create objects
    first   = libbcmath.bc_init_num();
    second  = libbcmath.bc_init_num();
    result  = libbcmath.bc_init_num();

    first   = libbcmath.php_str2num(left_operand.toString());
    second  = libbcmath.php_str2num(right_operand.toString());

    result  = libbcmath.bc_divide(first, second, scale);
    if (result === -1) {
        // error
        throw new Error(11, "(BC) Division by zero");
    }
    if (result.n_scale > scale) {
        result.n_scale = scale;
    }
    return result.toString();
}

/**
 * bcdiv - Multiply two arbitrary precision number
 *
 * @param string left_operand       The left operand, as a string
 * @param string right_operand      The right operand, as a string.
 * @param int [scale]               The optional parameter is used to set the number of digits after the decimal place in the result. You can also set the global scale for all functions by using bcscale()
 * @return string                   The result as a string
 */
function bcmul(left_operand, right_operand, scale) {
    var first, second, result;

    if (typeof(scale) == 'undefined') {
        scale = libbcmath.scale;
    }
    scale   = ((scale < 0) ? 0 : scale);

    // create objects
    first   = libbcmath.bc_init_num();
    second  = libbcmath.bc_init_num();
    result  = libbcmath.bc_init_num();

    first   = libbcmath.php_str2num(left_operand.toString());
    second  = libbcmath.php_str2num(right_operand.toString());

    result  = libbcmath.bc_multiply(first, second, scale);

    if (result.n_scale > scale) {
        result.n_scale = scale;
    }
    return result.toString();
}


/**
 * bcround - Returns the rounded value of [val] to the specified [precision] (number of digits after the decimal point).
 *           [precision] can also be a negative or zero (default)
 *           Note: uses "round up and away from zero" method (ie -1.5 > -2, 1.5 > 2 where .5 always goes to 1 (or 0.5 to -1) etc
 *
 * @param string val            The value to round (accept in virtually any format)
 * @param int    precision      The optional number of digits to round-to
 * @return string               In exact decimal places of precision (ie bcround('1.2222', 2) == '1.22' or bcround('1', 4) == '1.0000' )
 */
function bcround(val, precision) {
    var temp, result, digit;
    var right_operand;

    // create number
    temp  = libbcmath.bc_init_num();
    temp  = libbcmath.php_str2num(val.toString());

    // check if any rounding needs
    if (precision >= temp.n_scale) {
        // nothing to round, just add the zeros.
        while (temp.n_scale < precision) {
            temp.n_value[temp.n_len+temp.n_scale]=0;
            temp.n_scale++;
        }
        return temp.toString();
    }

    // get the digit we are checking (1 after the precision)
    // loop through digits after the precision marker
    digit = temp.n_value[temp.n_len + precision];

    right_operand = libbcmath.bc_init_num();
    right_operand = libbcmath.bc_new_num(1, precision);

    if (digit >= 5) {
        //round away from zero by adding 1 (or -1) at the "precision".. ie 1.44999 @ 3dp = (1.44999 + 0.001).toString().substr(0,5)
        right_operand.n_value[right_operand.n_len+right_operand.n_scale-1] = 1;
        if (temp.n_sign == libbcmath.MINUS) {
            // round down
            right_operand.n_sign = libbcmath.MINUS;
        }
        result  = libbcmath.bc_add(temp, right_operand, precision);
    } else {
        // leave-as-is.. just truncate it.
        result  = temp;
    }

    if (result.n_scale > precision) {
        result.n_scale = precision;
    }
    return result.toString();
}
