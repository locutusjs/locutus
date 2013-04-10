/* Some utility routines for the divide:  First a one digit multiply.
   NUM (with SIZE digits) is multiplied by DIGIT and the result is
   placed into RESULT.  It is written so that NUM and RESULT can be
   the same pointers.  */
/**
 *
 * @param array num     (pass by ref)
 * @param int size
 * @param int digit
 * @param array result  (pass by ref)
 */
libbcmath._one_mult = function(num, n_ptr, size, digit, result, r_ptr) {
    var carry, value; // int
    var nptr, rptr; // int pointers

     if (digit === 0) {
        libbcmath.memset(result, 0, 0, size);   //memset (result, 0, size);
    } else {
        if (digit == 1) {
            libbcmath.memcpy(result, r_ptr, num, n_ptr, size); //memcpy (result, num, size);
        } else {
            /*  Initialize */
            nptr = n_ptr+size-1; //nptr = (unsigned char *) (num+size-1);
            rptr = r_ptr+size-1; //rptr = (unsigned char *) (result+size-1);
            carry = 0;

            while (size-- > 0) {
                value = num[nptr--] * digit + carry; //value = *nptr-- * digit + carry;
                //result[rptr--] = libbcmath.cint(value % libbcmath.BASE); // @CHECK cint //*rptr-- = value % BASE;
                result[rptr--] = value % libbcmath.BASE; // @CHECK cint //*rptr-- = value % BASE;
                //carry = libbcmath.cint(value / libbcmath.BASE);   // @CHECK cint //carry = value / BASE;
                carry = Math.floor(value / libbcmath.BASE);   // @CHECK cint //carry = value / BASE;
            }

            if (carry != 0) {
                result[rptr] = carry;
            }
        }
    }
}


/* The full division routine. This computes N1 / N2.  It returns
   0 if the division is ok and the result is in QUOT.  The number of
   digits after the decimal point is SCALE. It returns -1 if division
   by zero is tried.  The algorithm is found in Knuth Vol 2. p237. */

libbcmath.bc_divide = function(n1, n2, scale) {
    var quot;   // bc_num return
    var qval; // bc_num
    var num1, num2; // string
    var ptr1, ptr2, n2ptr, qptr; // int pointers
    var scale1, val; // int
    var len1, len2, scale2, qdigits, extra, count; // int
    var qdig, qguess, borrow, carry; // int
    var mval; // string
    var zero; // char
    var norm; // int
    var ptrs; // return object from one_mul

    /* Test for divide by zero. (return failure) */
    if (libbcmath.bc_is_zero(n2)) {
        return -1;
    }

    /* Test for zero divide by anything (return zero) */
    if (libbcmath.bc_is_zero(n1)) {
        return libbcmath.bc_new_num(1, scale);
    }

    /* Test for n1 equals n2 (return 1 as n1 nor n2 are zero)
    if (libbcmath.bc_compare(n1, n2, libbcmath.MAX(n1.n_scale, n2.n_scale)) === 0) {
        quot=libbcmath.bc_new_num(1, scale);
        quot.n_value[0] = 1;
        return quot;
    }
    */

    /* Test for divide by 1.  If it is we must truncate. */
    // todo: check where scale > 0 too.. can't see why not (ie bc_is_zero - add bc_is_one function)
    if (n2.n_scale === 0) {
        if (n2.n_len === 1 && n2.n_value[0] === 1) {
            qval = libbcmath.bc_new_num(n1.n_len, scale);       //qval = bc_new_num (n1->n_len, scale);
            qval.n_sign = (n1.n_sign == n2.n_sign ? libbcmath.PLUS : libbcmath.MINUS);
            libbcmath.memset(qval.n_value, n1.n_len, 0, scale); //memset (&qval->n_value[n1->n_len],0,scale);
            libbcmath.memcpy(qval.n_value, 0, n1.n_value, 0, n1.n_len + libbcmath.MIN(n1.n_scale, scale)); //memcpy (qval->n_value, n1->n_value, n1->n_len + MIN(n1->n_scale,scale));
            // can we return here? not in c src, but can't see why-not.
            // return qval;
        }
    }

    /* Set up the divide.  Move the decimal point on n1 by n2's scale.
     Remember, zeros on the end of num2 are wasted effort for dividing. */
    scale2 = n2.n_scale;    //scale2 = n2->n_scale;
    n2ptr = n2.n_len + scale2 - 1;  //n2ptr = (unsigned char *) n2.n_value+n2.n_len+scale2-1;
    while ((scale2 > 0) && (n2.n_value[n2ptr--] === 0)) {
        scale2--;
    }

    len1 = n1.n_len + scale2;
    scale1 = n1.n_scale - scale2;
    if (scale1 < scale) {
        extra = scale - scale1;
    } else {
        extra = 0;
    }

    num1 = libbcmath.safe_emalloc(1, n1.n_len + n1.n_scale, extra + 2); //num1 = (unsigned char *) safe_emalloc (1, n1.n_len+n1.n_scale, extra+2);
    if (num1 === null) {
        libbcmath.bc_out_of_memory();
    }
    libbcmath.memset(num1, 0, 0, n1.n_len+n1.n_scale+extra+2); //memset (num1, 0, n1->n_len+n1->n_scale+extra+2);
    libbcmath.memcpy(num1, 1, n1.n_value, 0, n1.n_len+n1.n_scale); //memcpy (num1+1, n1.n_value, n1.n_len+n1.n_scale);

    len2 = n2.n_len + scale2;  // len2 = n2->n_len + scale2;
    num2 = libbcmath.safe_emalloc(1, len2, 1);//num2 = (unsigned char *) safe_emalloc (1, len2, 1);
    if (num2 === null) {
        libbcmath.bc_out_of_memory();
    }
    libbcmath.memcpy(num2, 0, n2.n_value, 0, len2);  //memcpy (num2, n2.n_value, len2);
    num2[len2] = 0;   // *(num2+len2) = 0;
    n2ptr = 0; //n2ptr = num2;

    while (num2[n2ptr] === 0) {   // while (*n2ptr == 0)
        n2ptr++;
        len2--;
    }

    /* Calculate the number of quotient digits. */
    if (len2 > len1+scale) {
        qdigits = scale+1;
        zero = true;
    } else {
        zero = false;
        if (len2>len1) {
            qdigits = scale+1;      /* One for the zero integer part. */
        } else {
            qdigits = len1-len2+scale+1;
        }
    }

    /* Allocate and zero the storage for the quotient. */
    qval = libbcmath.bc_new_num(qdigits-scale,scale);   //qval = bc_new_num (qdigits-scale,scale);
    libbcmath.memset(qval.n_value, 0, 0, qdigits); //memset (qval->n_value, 0, qdigits);

    /* Allocate storage for the temporary storage mval. */
    mval = libbcmath.safe_emalloc(1, len2, 1); //mval = (unsigned char *) safe_emalloc (1, len2, 1);
    if (mval === null) {
        libbcmath.bc_out_of_memory();
    }

    /* Now for the full divide algorithm. */
    if (!zero) {
        /* Normalize */
        //norm = libbcmath.cint(10 / (libbcmath.cint(n2.n_value[n2ptr]) + 1)); //norm =  10 / ((int)*n2ptr + 1);
        norm = Math.floor(10 / (n2.n_value[n2ptr] + 1)); //norm =  10 / ((int)*n2ptr + 1);
        if (norm != 1) {
            libbcmath._one_mult(num1, 0, len1+scale1+extra+1, norm, num1, 0); //libbcmath._one_mult(num1, len1+scale1+extra+1, norm, num1);
            libbcmath._one_mult(n2.n_value, n2ptr, len2, norm, n2.n_value, n2ptr); //libbcmath._one_mult(n2ptr, len2, norm, n2ptr);

            // @CHECK Is the pointer affected by the call? if so, maybe need to adjust points on return?

        }

        /* Initialize divide loop. */
        qdig = 0;
        if (len2 > len1) {
            qptr = len2-len1; //qptr = (unsigned char *) qval.n_value+len2-len1;
        }  else {
            qptr = 0; //qptr = (unsigned char *) qval.n_value;
        }

        /* Loop */
        while (qdig <= len1+scale-len2) {
            /* Calculate the quotient digit guess. */
            if (n2.n_value[n2ptr] == num1[qdig]) {
                qguess = 9;
            } else {
                qguess = Math.floor((num1[qdig]*10 + num1[qdig+1]) / n2.n_value[n2ptr]);
            }
            /* Test qguess. */

            if (n2.n_value[n2ptr+1]*qguess > (num1[qdig]*10 + num1[qdig+1] - n2.n_value[n2ptr]*qguess)*10 + num1[qdig+2]) { //if (n2ptr[1]*qguess > (num1[qdig]*10 + num1[qdig+1] - *n2ptr*qguess)*10 + num1[qdig+2]) {
                qguess--;
                /* And again. */
                if (n2.n_value[n2ptr+1]*qguess > (num1[qdig]*10 + num1[qdig+1] - n2.n_value[n2ptr]*qguess)*10 + num1[qdig+2]) { //if (n2ptr[1]*qguess > (num1[qdig]*10 + num1[qdig+1] - *n2ptr*qguess)*10 + num1[qdig+2])
                    qguess--;
                }
            }

            /* Multiply and subtract. */
            borrow = 0;
            if (qguess !== 0) {
                mval[0] = 0; //*mval = 0; // @CHECK is this to fix ptr2 < 0?
                libbcmath._one_mult(n2.n_value, n2ptr, len2, qguess, mval, 1); //_one_mult (n2ptr, len2, qguess, mval+1); // @CHECK

                ptr1 = qdig+len2; //(unsigned char *) num1+qdig+len2;
                ptr2 = len2; //(unsigned char *) mval+len2;

                // @CHECK: Does a negative pointer return null?
                //         ptr2 can be < 0 here as ptr1 = len2, thus count < len2+1 will always fail ?
                for (count = 0; count < len2+1; count++) {
                    if (ptr2 < 0) {
                        //val = libbcmath.cint(num1[ptr1]) - 0 - borrow;    //val = (int) *ptr1 - (int) *ptr2-- - borrow;
                        val = num1[ptr1] - 0 - borrow;    //val = (int) *ptr1 - (int) *ptr2-- - borrow;
                    } else {
                        //val = libbcmath.cint(num1[ptr1]) - libbcmath.cint(mval[ptr2--]) - borrow;    //val = (int) *ptr1 - (int) *ptr2-- - borrow;
                        val = num1[ptr1] - mval[ptr2--] - borrow;    //val = (int) *ptr1 - (int) *ptr2-- - borrow;
                    }
                    if (val < 0) {
                        val += 10;
                        borrow = 1;
                    } else {
                        borrow = 0;
                    }
                    num1[ptr1--] = val;
                }
            }

            /* Test for negative result. */
            if (borrow == 1) {
                qguess--;
                ptr1 = qdig+len2; //(unsigned char *) num1+qdig+len2;
                ptr2 = len2-1; //(unsigned char *) n2ptr+len2-1;
                carry = 0;
                for (count = 0; count < len2; count++) {
                    if (ptr2 < 0) {
                        //val = libbcmath.cint(num1[ptr1]) + 0 + carry; //val = (int) *ptr1 + (int) *ptr2-- + carry;
                        val = num1[ptr1] + 0 + carry; //val = (int) *ptr1 + (int) *ptr2-- + carry;
                    } else {
                        //val = libbcmath.cint(num1[ptr1]) + libbcmath.cint(n2.n_value[ptr2--]) + carry; //val = (int) *ptr1 + (int) *ptr2-- + carry;
                        val = num1[ptr1] + n2.n_value[ptr2--] + carry; //val = (int) *ptr1 + (int) *ptr2-- + carry;
                    }
                    if (val > 9) {
                        val -= 10;
                        carry = 1;
                    } else {
                        carry = 0;
                    }
                    num1[ptr1--] = val; //*ptr1-- = val;
                }
                if (carry == 1) {
                    //num1[ptr1] = libbcmath.cint((num1[ptr1] + 1) % 10);  // *ptr1 = (*ptr1 + 1) % 10; // @CHECK
                    num1[ptr1] = (num1[ptr1] + 1) % 10;  // *ptr1 = (*ptr1 + 1) % 10; // @CHECK
                }
            }

            /* We now know the quotient digit. */
            qval.n_value[qptr++] =  qguess;  //*qptr++ =  qguess;
            qdig++;
        }
    }

    /* Clean up and return the number. */
    qval.n_sign = ( n1.n_sign == n2.n_sign ? libbcmath.PLUS : libbcmath.MINUS );
    if (libbcmath.bc_is_zero(qval)) {
        qval.n_sign = libbcmath.PLUS;
    }
    libbcmath._bc_rm_leading_zeros(qval);

    return qval;

    //return 0;    /* Everything is OK. */
};


