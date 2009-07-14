function round (val, precision, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Onno Marsman
    // +      input by: Greenseed
    // +    revised by: T.Wild
    // %        note 1: Great work. Ideas for improvement:
    // %        note 1:  - code more compliant with developer guidelines
    // %        note 1:  - for implementing PHP constant arguments look at
    // %        note 1:  the pathinfo() function, it offers the greatest
    // %        note 1:  flexibility & compatibility possible
    // *     example 1: round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: round(3.6);
    // *     returns 2: 4
    // *     example 3: round(2.835,2);
    // *     returns 3: 2.84
    
    var V = val.toString(),integer,decimal,reint = false,decp,d1,d2,pow=0; //Define variables.

    if (typeof precision == 'undefined') {
        precision = 0;
    }
    decp = V.indexOf('.'); //Find index of decimal place

    if (decp == -1) { //If there is no decimal place we are most likely dealing with an integer
        /*---ROUNDING AN INTEGER---
         * If the precision is 0 then we don't need to round
         * otherwise turn the integer into a decimal E.G
         * 100 becomes 0.1
         * 2143 becomes 0.2143
         * take the modulus of the precision and then round the decimal
         * we turn it back into an intgeger at the end
         */
        if (precision === 0) {
            return val;
        } else {
            pow = V.length; //Rember how many powers of ten we need to turn the decimal back to an integer
            V = '0.'+V;
            precision = Math.abs(precision);
            reint = true; //Remeber to change it back
            decp = 1;
        }
    } else if(precision < 0) {
        /*
         * Deling with decimal already, but still want to round an intgeger
         * So truncate V and then do the same as above.
         */
        integer = V.slice(0,decp);
        pow = integer.length;
        V = '0.'+integer;
        precision = Math.abs(precision);
        reint = true;
        decp = 1;
    }

    /*
     * Split the integer and decimal parts of the number
     */
    integer = V.slice(0,decp);
    decimal = V.slice(decp+1);

    /** d1 = decimal before the subject decimal **/

    if (decimal.length <= precision) {
        //If the precision is less or equal to the number of decimals then we don't need to round
        return val;
    } else if(precision === 0) {
        /**
         * Special handling of precision = 0
         * In this case the number before the subject decimal is the last digit of integer
         * not part of the `decimal` variable
         */
        d1 = Number(integer.charAt(integer.length-1));
        integer = integer.slice(0,integer.length-1);//Remove the last digit of integer
    } else {
        d1 = Number(decimal.charAt(precision-1));
    }

    /** d2 = the subject decimal **/
    d2 = Number(decimal.charAt(precision));
    decimal = decimal.slice(0,precision-1); //remove last digit of decimal

    if (mode=='ROUND_CEILING') {
        if (val > 0) {
            mode = 'PHP_ROUND_UP';
        } else {
            mode = 'PHP_ROUND_DOWN';
        }
    } else if (mode == 'ROUND_FLOOR') {
        if (val > 0) {
            mode = 'PHP_ROUND_DOWN';
        } else {
            mode = 'PHP_ROUND_UP';
        }
    }

    switch (mode) {
        case 'PHP_ROUND_UP': //Always round up
            d1+=1;
            break;
        case 'PHP_ROUND_HALF_DOWN': //If subject decimal is more than 5 then round up
            if (d2 > 5){
                d1+=1;
            }
            break;
        default: //If the subject decimal is 5 or more, then round up
            //ROUND_HALF_UP
            if (d2 >= 5){
                d1+=1;
            }
            break;
    }

    if (precision === 0) {
        /*
         * Again, special handling for precision 0
         * if the round has made a value of 10, then add 1 to the integer and set d1 to 0
         * this works because of the way I concatinate them
         */
        if (d1 == 10){
            integer+=1;
            d1 = '0';
        }
        val=Number(integer+d1);
    } else {
        if (d1 == 10) {
            /*
             * intger = 1
             * decimal = 0.555
             * Number(integr+'.'+decimal) = 1.555
             * (0-decimal.length) = -3
             * 1*(10^-3) = 0.001
             * Number(integr+'.'+decimal)+0.001 = 1.556
             */
            val = Number(integer+'.'+decimal)+(1*(Math.pow(10,(0-decimal.length))));
        } else {
            /*
             * otherwsie just re-concatinate the numbers
             */
            val = Number(integer+'.'+decimal+d1);
        }
    }

    if (reint) {
        return val*Math.pow(10,pow);
    } else {
        return val;
    }
}