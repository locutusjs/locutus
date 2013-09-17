/**
 * Perform an "add"
 *
 // Perform addition: N1 is added to N2 and the value is
 // returned.  The signs of N1 and N2 are ignored.
 //  SCALE_MIN is to set the minimum scale of the result.
 *
 * Basic school maths says to add 2 numbers..
 * 1. make them the same length, the decimal places, and the integer part
 * 2. start from the right and add the two numbers together
 * 3. if the sum of the 2 numbers > 9, carry 1 to the next set and subtract 10 (ie 18 > carry 1 becomes 8). thus 0.9 + 0.9 = 1.8
 *
 * @param bc_num n1
 * @param bc_num n2
 * @param int scale_min
 * @return bc_num
 */
libbcmath._bc_do_add = function(n1, n2, scale_min) {
    var sum;  // bc_num
    var sum_scale, sum_digits; // int
    var n1ptr, n2ptr, sumptr; // int
    var carry, n1bytes, n2bytes; // int
    var tmp; // int


    // Prepare sum.
    sum_scale   = libbcmath.MAX(n1.n_scale, n2.n_scale);
    sum_digits  = libbcmath.MAX(n1.n_len, n2.n_len) + 1;
    sum         = libbcmath.bc_new_num(sum_digits, libbcmath.MAX(sum_scale, scale_min));


    /* Not needed?
    if (scale_min > sum_scale) {
        sumptr = (char *) (sum->n_value + sum_scale + sum_digits);
        for (count = scale_min - sum_scale; count > 0; count--) {
            *sumptr++ = 0;
        }
    }
    */

    // Start with the fraction part.  Initialize the pointers.
    n1bytes = n1.n_scale;
    n2bytes = n2.n_scale;
    n1ptr = (n1.n_len + n1bytes - 1);
    n2ptr = (n2.n_len + n2bytes - 1);
    sumptr = (sum_scale + sum_digits - 1);

    // Add the fraction part.  First copy the longer fraction (ie when adding 1.2345 to 1 we know .2345 is correct already) .
    if (n1bytes != n2bytes) {
        if (n1bytes > n2bytes) {
            // n1 has more dp then n2
            while (n1bytes>n2bytes) {
                sum.n_value[sumptr--] = n1.n_value[n1ptr--];
                // *sumptr-- = *n1ptr--;
                n1bytes--;
            }
        } else {
            // n2 has more dp then n1
            while (n2bytes>n1bytes) {
                sum.n_value[sumptr--] = n2.n_value[n2ptr--];
                // *sumptr-- = *n2ptr--;
                n2bytes--;
            }
        }
    }

    // Now add the remaining fraction part and equal size integer parts.
    n1bytes += n1.n_len;
    n2bytes += n2.n_len;
    carry = 0;
    while ((n1bytes > 0) && (n2bytes > 0)) {

        // add the two numbers together
        tmp = n1.n_value[n1ptr--] + n2.n_value[n2ptr--] + carry;
        // *sumptr = *n1ptr-- + *n2ptr-- + carry;

        // check if they are >= 10 (impossible to be more then 18)
        if (tmp >= libbcmath.BASE) {
            carry = 1;
            tmp -= libbcmath.BASE;  // yep, subtract 10, add a carry
        } else {
            carry = 0;
        }
        sum.n_value[sumptr] = tmp;
        sumptr--;
        n1bytes--;
        n2bytes--;
    }

    // Now add carry the [rest of the] longer integer part.
    if (n1bytes === 0) {
        // n2 is a bigger number then n1
        while (n2bytes-- > 0) {
            tmp = n2.n_value[n2ptr--] + carry;
            // *sumptr = *n2ptr-- + carry;

            if (tmp >= libbcmath.BASE) {
                carry = 1;
                tmp -= libbcmath.BASE;
            } else {
                carry = 0;
            }
            sum.n_value[sumptr--]=tmp;
        }
    } else {
        // n1 is bigger then n2..
        while (n1bytes-- > 0) {
            tmp = n1.n_value[n1ptr--] + carry;
            // *sumptr = *n1ptr-- + carry;

            if (tmp >= libbcmath.BASE) {
                carry = 1;
                tmp -= libbcmath.BASE;
            } else {
                carry = 0;
            }
            sum.n_value[sumptr--]=tmp;
        }
    }

    // Set final carry.
    if (carry == 1) {
        sum.n_value[sumptr] += 1;
        // *sumptr += 1;
    }

    // Adjust sum and return.
    libbcmath._bc_rm_leading_zeros (sum);
    return sum;
};

/**
 * Perform a subtraction
 *
 // Perform subtraction: N2 is subtracted from N1 and the value is
 //  returned.  The signs of N1 and N2 are ignored.  Also, N1 is
 //  assumed to be larger than N2.  SCALE_MIN is the minimum scale
 //  of the result.
 *
 * Basic school maths says to subtract 2 numbers..
 * 1. make them the same length, the decimal places, and the integer part
 * 2. start from the right and subtract the two numbers from each other
 * 3. if the sum of the 2 numbers < 0, carry -1 to the next set and add 10 (ie 18 > carry 1 becomes 8). thus 0.9 + 0.9 = 1.8
 *
 * @param bc_num n1
 * @param bc_num n2
 * @param int scale_min
 * @return bc_num
 */
libbcmath._bc_do_sub = function(n1, n2, scale_min) {
    var diff; //bc_num
    var diff_scale, diff_len; // int
    var min_scale, min_len; // int
    var n1ptr, n2ptr, diffptr; // int
    var borrow, count, val; // int

    // Allocate temporary storage.
    diff_len    = libbcmath.MAX(n1.n_len,   n2.n_len);
    diff_scale  = libbcmath.MAX(n1.n_scale, n2.n_scale);
    min_len     = libbcmath.MIN(n1.n_len,   n2.n_len);
    min_scale   = libbcmath.MIN(n1.n_scale, n2.n_scale);
    diff        = libbcmath.bc_new_num(diff_len, libbcmath.MAX(diff_scale, scale_min));

    /* Not needed?
    // Zero extra digits made by scale_min.
    if (scale_min > diff_scale) {
        diffptr = (char *) (diff->n_value + diff_len + diff_scale);
        for (count = scale_min - diff_scale; count > 0; count--) {
            *diffptr++ = 0;
        }
    }
    */

    // Initialize the subtract.
    n1ptr   = (n1.n_len + n1.n_scale -1);
    n2ptr   = (n2.n_len + n2.n_scale -1);
    diffptr = (diff_len + diff_scale -1);

    // Subtract the numbers.
    borrow = 0;

    // Take care of the longer scaled number.
    if (n1.n_scale != min_scale) {
        // n1 has the longer scale
        for (count = n1.n_scale - min_scale; count > 0; count--) {
            diff.n_value[diffptr--] = n1.n_value[n1ptr--];
            // *diffptr-- = *n1ptr--;
        }
    } else {
        // n2 has the longer scale
        for (count = n2.n_scale - min_scale; count > 0; count--) {
            val = 0 - n2.n_value[n2ptr--] - borrow;
            //val = - *n2ptr-- - borrow;
            if (val < 0) {
                val += libbcmath.BASE;
                borrow = 1;
            } else {
                borrow = 0;
                diff.n_value[diffptr--] = val;
                //*diffptr-- = val;
            }
        }
    }

    // Now do the equal length scale and integer parts.
    for (count = 0; count < min_len + min_scale; count++) {
        val = n1.n_value[n1ptr--] - n2.n_value[n2ptr--] - borrow;
        //val = *n1ptr-- - *n2ptr-- - borrow;
        if (val < 0) {
            val += libbcmath.BASE;
            borrow = 1;
        } else {
            borrow = 0;
        }
        diff.n_value[diffptr--] = val;
        //*diffptr-- = val;
    }

    // If n1 has more digits then n2, we now do that subtract.
    if (diff_len != min_len) {
        for (count = diff_len - min_len; count > 0; count--) {
            val = n1.n_value[n1ptr--] - borrow;
            // val = *n1ptr-- - borrow;
            if (val < 0) {
                val += libbcmath.BASE;
                borrow = 1;
            } else {
                borrow = 0;
            }
            diff.n_value[diffptr--] = val;
        }
    }

    // Clean up and return.
    libbcmath._bc_rm_leading_zeros(diff);
    return diff;
};
