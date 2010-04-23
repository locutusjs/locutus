function round (val, precision, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Onno Marsman
    // +      input by: Greenseed
    // +    revised by: T.Wild
    // +      input by: meo
    // +      input by: William
    // +      bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Great work. Ideas for improvement:
    // %        note 1:  - code more compliant with developer guidelines
    // %        note 1:  - for implementing PHP constant arguments look at
    // %        note 1:  the pathinfo() function, it offers the greatest
    // %        note 1:  flexibility & compatibility possible
    // *     example 1: round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: round(3.6);
    // *     returns 2: 4
    // *     example 3: round(2.835, 2);
    // *     returns 3: 2.84
    // *     example 4: round(1.1749999999999, 2);
    // *     returns 4: 1.17
    // *     example 5: round(1.17499999999999, 2);
    // *     returns 5: 1.18

    /* Declare Variables
     * retVal  - Temporary holder of the value to be returned
     * V       - String representation of val

     * integer - Integer portion of val
     * decimal - decimal portion of val
     * decp    - Character index of . [decimal point] inV
     * negative- Was val a negative value?
     *
     * _round_half_oe - Rounding function for ROUND_HALF_ODD and ROUND_HALF_EVEN

     * _round_half_ud - Rounding function for ROUND_HALF_UP and ROUND_HALF_DOWN
     * _round_half    - Primary function for round half rounding modes
     */
    var retVal = 0, v = '', integer = '', decimal = '', decp = 0, negative = false;
    var _round_half_oe = function (dtR, dtLa, even) { // round to odd or even
        if (even === true) {
            if (dtLa === 50) {
                if ((dtR % 2) === 1) {
                    if (dtLa >= 5) {
                        dtR++;
                    } else {
                        dtR--;
                    }
                }
            } else if (dtLa >= 5) {
                dtR++;
            }
        } else {
            if (dtLa === 5) {
                if ((dtR % 2) === 0) {
                    if (dtLa >= 5) {
                        dtR++;
                    } else {
                        dtR--;
                    }
                }
            } else if (dtLa >= 5) {
                dtR++;
            }
        }
        return dtR;
    };
    var _round_half_ud = function (dtR, dtLa, up) { // round up or down
        if (up === true) {
            if (dtLa >= 5) {
                dtR++;
            }
        } else {
            if (dtLa > 5) {
                dtR++;
            }
        }
        return dtR;
    };
    var _round_half = function (val, decplaces, mode) {
    /*Declare variables
         *V       - string representation of Val
         *Vlen    - The length of V - used only when rounding integers

         *VlenDif - The difference between the lengths of the original V
         *              and the V after being truncated
         *decp    - Character in index of . [decimal place] in V
         *integer - Integer protion of Val
         *decimal - Decimal portion of Val
         *DigitToRound - The digit to round

         *DigitToLookAt- The digit to compare when rounding
         *
         *round - A function to do the rounding
         */
        var v = val.toString(), vlen = 0, vlenDif = 0;
        var decp = v.indexOf('.');
        var digitToRound = 0, digitToLookAt = 0;
        var integer = '', decimal = '';
        var round = null, bool = false;
        switch (mode) {
            case 'up':
                bool = true;
                // Fall-through
            case 'down':
                round = _round_half_ud;
                break;
            case 'even':
                bool = true;
                // Fall-through
            case 'odd':
                round = _round_half_oe;
                break;
        }
        if (decplaces < 0) { // Int round
            vlen = v.length;

            decplaces = vlen + decplaces;
            digitToLookAt = Number(v.charAt(decplaces));
            digitToRound  = Number(v.charAt(decplaces - 1));
            digitToRound  = round(digitToRound, digitToLookAt, bool);
            v = v.slice(0, decplaces - 1);
            vlenDif = vlen - v.length - 1;

            if (digitToRound === 10) {
                v = String(Number(v) + 1) + '0';
            } else {
                v += digitToRound;
            }

            v = Number(v) * (Math.pow(10, vlenDif));
        } else if (decplaces > 0) {
            integer = v.slice(0, decp);
            decimal = v.slice(decp + 1);
            digitToLookAt = Number(decimal.charAt(decplaces));

            digitToRound  = Number(decimal.charAt(decplaces - 1));
            digitToRound  = round(digitToRound, digitToLookAt, bool);
            decimal = decimal.slice(0, decplaces - 1);
            if (digitToRound === 10) {
                v = Number(integer + '.' + decimal) + (1 * (Math.pow(10, (0 - decimal.length))));
            } else {
                v = Number(integer + '.' + decimal + digitToRound);
            }
        } else { // 0 decimal places
            integer = v.slice(0, decp);
            decimal = v.slice(decp + 1);
            digitToLookAt = Number(decimal.charAt(decplaces));
            digitToRound = Number(integer.charAt(integer.length - 1));
            digitToRound = round(digitToRound, digitToLookAt, bool);
            decimal = '0';
            integer = integer.slice(0, integer.length - 1);
            if (digitToRound === 10) {
                v = Number((Number(integer) + 1) + decimal); // Need to add extra 0 since passing 10
            } else {
                v = Number(integer + digitToRound);
            }
        }
        return v;
    };

    // precision optional - defaults 0
    if (typeof precision === 'undefined') {
        precision = 0;
    }
    // mode optional - defaults round half up
    if (typeof mode === 'undefined') {
        mode = 'PHP_ROUND_HALF_UP';
    }

    negative = val < 0; // Remember if val is negative

    v = Math.abs(val).toString(); // Take a string representation of val
    decp = v.indexOf('.');        // And locate the decimal point
    if (decp === -1 && precision >= 0) {
        /* If there is no decimal point and the precision is greater than 0
         * there is no need to round, return val
         */
        return val;
    } else {
        if (decp === -1) {
            // There are no decimals so integer=V and decimal=0
            integer = v;
            decimal = '0';
        } else {
            // Otherwise we have to split the decimals from the integer
            integer = v.slice(0, decp);
            if (precision >= 0) {
                // If the precision is greater than 0 then split the decimals from the integer
                // We truncate the decimals to a number of places equal to the precision requested+1
                decimal = v.substr(decp + 1, precision + 1);
            } else {
                // If the precision is less than 0 ignore the decimals - set to 0
                decimal = '0';
            }
        }
        if (precision > 0 && precision >= decimal.length) {
            /*
            * If the precision requested is more decimal places than already exist
            * there is no need to round - return val
            */
            return val;
        } else if (precision < 0 && Math.abs(precision) >= integer.length){
           /*
            * If the precison is less than 0, and is greater than than the
            * number of digits in integer, return 0 - mimics PHP
            */
            return 0;
        }
        if (decimal === '0') {
            return Number(integer);
        }
        val = Number(integer + '.' + decimal); // After sanitizing, recreate val
    }

    // Call approriate function based on passed mode, fall through for integer constants
    switch (mode) {
        case 0: case 'PHP_ROUND_HALF_UP':
            retVal = _round_half(val, precision, 'up');
            break;
        case 1:  case 'PHP_ROUND_HALF_DOWN':
            retVal = _round_half(val, precision, 'down');
            break;
        case 2: case 'PHP_ROUND_HALF_EVEN':
            retVal = _round_half(val, precision, 'even');
            break;
        case 3: case 'PHP_ROUND_HALF_ODD':
            retVal = _round_half(val, precision, 'odd');
            break;
    }
    return negative ? 0 - retVal : retVal;
}
