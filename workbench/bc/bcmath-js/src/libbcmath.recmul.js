
libbcmath.MUL_BASE_DIGITS = 80;
libbcmath.MUL_SMALL_DIGITS = (libbcmath.MUL_BASE_DIGITS / 4); //#define MUL_SMALL_DIGITS mul_base_digits/4


/* The multiply routine.  N2 times N1 is put int PROD with the scale of
   the result being MIN(N2 scale+N1 scale, MAX (SCALE, N2 scale, N1 scale)).
   */
/**
 * @param n1 bc_num
 * @param n2 bc_num
 * @param scale [int] optional
 */
libbcmath.bc_multiply = function(n1, n2, scale) {
    var pval; // bc_num
    var len1, len2; // int
    var full_scale, prod_scale; // int

    // Initialize things.
    len1 = n1.n_len + n1.n_scale;
    len2 = n2.n_len + n2.n_scale;
    full_scale = n1.n_scale + n2.n_scale;
    prod_scale = libbcmath.MIN(full_scale,libbcmath.MAX(scale,libbcmath.MAX(n1.n_scale, n2.n_scale)));

    //pval = libbcmath.bc_init_num(); // allow pass by ref
    // Do the multiply
    pval = libbcmath._bc_rec_mul (n1, len1, n2, len2, full_scale);

    // Assign to prod and clean up the number.
    pval.n_sign  = ( n1.n_sign == n2.n_sign ? libbcmath.PLUS : libbcmath.MINUS );
    //pval.n_value = pval.n_ptr; // @FIX
    pval.n_len   = len2 + len1 + 1 - full_scale;
    pval.n_scale = prod_scale;
    libbcmath._bc_rm_leading_zeros(pval);
    if (libbcmath.bc_is_zero(pval)) {
        pval.n_sign = libbcmath.PLUS;
    }
    //bc_free_num (prod);
    return pval;
};

libbcmath.new_sub_num = function(length, scale, value) {
    var temp = new libbcmath.bc_num();
    temp.n_sign = libbcmath.PLUS;
    temp.n_len = length;
    temp.n_scale = scale;
    temp.n_value = value;
    return temp;
};

libbcmath._bc_simp_mul = function(n1, n1len, n2, n2len, full_scale) {
    var prod;   // bc_num
    var n1ptr, n2ptr, pvptr; // char *n1ptr, *n2ptr, *pvptr;
    var n1end, n2end; //char *n1end, *n2end;        /* To the end of n1 and n2. */
    var indx, sum, prodlen; //int indx, sum, prodlen;

    prodlen = n1len+n2len+1;

    prod = libbcmath.bc_new_num(prodlen, 0);

    n1end = n1len-1; //(char *) (n1->n_value + n1len - 1);
    n2end = n2len-1; //(char *) (n2->n_value + n2len - 1);
    pvptr = prodlen-1; //(char *) ((*prod)->n_value + prodlen - 1);
    sum = 0;

    // Here is the loop...
    for (indx = 0; indx < prodlen-1; indx++) {
        n1ptr = n1end - libbcmath.MAX(0, indx-n2len+1); //(char *) (n1end - MAX(0, indx-n2len+1));
        n2ptr = n2end - libbcmath.MIN(indx, n2len-1); //(char *) (n2end - MIN(indx, n2len-1));
        while ((n1ptr >= 0) && (n2ptr <= n2end)) {
            sum += n1.n_value[n1ptr--] * n2.n_value[n2ptr++];   //sum += *n1ptr-- * *n2ptr++;
        }
        prod.n_value[pvptr--] = Math.floor(sum % libbcmath.BASE); //*pvptr-- = sum % BASE;
        sum = Math.floor(sum / libbcmath.BASE); //sum = sum / BASE;
    }
    prod.n_value[pvptr]=sum; //*pvptr = sum;
    return prod;
};


/* A special adder/subtractor for the recursive divide and conquer
   multiply algorithm.  Note: if sub is called, accum must
   be larger that what is being subtracted.  Also, accum and val
   must have n_scale = 0.  (e.g. they must look like integers. *) */
libbcmath._bc_shift_addsub = function(accum, val, shift, sub) {
    var accp, valp; //signed char *accp, *valp;
    var count, carry; //int  count, carry;

    count = val.n_len;
    if (val.n_value[0] === 0) {
        count--;
    }

    //assert (accum->n_len+accum->n_scale >= shift+count);
    if (!(accum.n_len+accum.n_scale >= shift+count)) {
        throw new Error("len + scale < shift + count"); // ?? I think thats what assert does :)
    }


    // Set up pointers and others
    accp = accum.n_len + accum.n_scale - shift - 1; // (signed char *)(accum->n_value + accum->n_len + accum->n_scale - shift - 1);
    valp = val.n_len = 1; //(signed char *)(val->n_value + val->n_len - 1);
    carry = 0;
    if (sub) {
        // Subtraction, carry is really borrow.
        while (count--) {
            accum.n_value[accp] -= val.n_value[valp--] + carry; //*accp -= *valp-- + carry;
            if (accum.n_value[accp] < 0) {  //if (*accp < 0)
                carry = 1;
                accum.n_value[accp--] += libbcmath.BASE; //*accp-- += BASE;
            } else {
                carry = 0;
                accp--;
            }
        }
        while (carry) {
            accum.n_value[accp] -= carry; //*accp -= carry;
            if (accum.n_value[accp] < 0) { //if (*accp < 0)
                accum.n_value[accp--] += libbcmath.BASE; //    *accp-- += BASE;
            } else {
                carry = 0;
            }
        }
    } else {
        // Addition
        while (count--) {
            accum.n_value[accp] += val.n_value[valp--] + carry; //*accp += *valp-- + carry;
            if (accum.n_value[accp] > (libbcmath.BASE-1)) {//if (*accp > (BASE-1))
                carry = 1;
                accum.n_value[accp--] -= libbcmath.BASE; //*accp-- -= BASE;
            } else {
                carry = 0;
                accp--;
            }
        }
        while (carry) {
            accum.n_value[accp] += carry; //*accp += carry;
            if (accum.n_value[accp] > (libbcmath.BASE-1)) { //if (*accp > (BASE-1))
                accum.n_value[accp--] -= libbcmath.BASE; //*accp-- -= BASE;
            } else {
                carry = 0;
            }
        }
    }
    return true; // accum is the pass-by-reference return
};

/* Recursive divide and conquer multiply algorithm.
   Based on
   Let u = u0 + u1*(b^n)
   Let v = v0 + v1*(b^n)
   Then uv = (B^2n+B^n)*u1*v1 + B^n*(u1-u0)*(v0-v1) + (B^n+1)*u0*v0

   B is the base of storage, number of digits in u1,u0 close to equal.
*/
libbcmath._bc_rec_mul = function (u, ulen, v, vlen, full_scale) {
    var prod; // @return
    var u0, u1, v0, v1; //bc_num
    var u0len, v0len;   //int
    var m1, m2, m3, d1, d2; //bc_num
    var n, prodlen, m1zero; // int
    var d1len, d2len;   // int

    // Base case?
    if ( (ulen+vlen) < libbcmath.MUL_BASE_DIGITS || ulen < libbcmath.MUL_SMALL_DIGITS || vlen < libbcmath.MUL_SMALL_DIGITS ) {
        return libbcmath._bc_simp_mul(u, ulen, v, vlen,  full_scale);
    }

    // Calculate n -- the u and v split point in digits.
    n = Math.floor((libbcmath.MAX(ulen, vlen)+1) / 2);

    // Split u and v.
    if (ulen < n) {
        u1 = libbcmath.bc_init_num(); //u1 = bc_copy_num (BCG(_zero_));
        u0 = libbcmath.new_sub_num(ulen,0, u.n_value);
    } else {
        u1 = libbcmath.new_sub_num(ulen-n, 0, u.n_value);
        u0 = libbcmath.new_sub_num(n, 0, u.n_value+ulen-n);
    }
    if (vlen < n) {
        v1 = libbcmath.bc_init_num(); //bc_copy_num (BCG(_zero_));
        v0 = libbcmath.new_sub_num(vlen,0, v.n_value);
    } else {
        v1 = libbcmath.new_sub_num(vlen-n, 0, v.n_value);
        v0 = libbcmath.new_sub_num(n, 0, v.n_value+vlen-n);
    }
    libbcmath._bc_rm_leading_zeros(u1);
    libbcmath._bc_rm_leading_zeros(u0);
    u0len = u0.n_len;
    libbcmath._bc_rm_leading_zeros(v1);
    libbcmath._bc_rm_leading_zeros(v0);
    v0len = v0.n_len;

    m1zero = libbcmath.bc_is_zero(u1) || libbcmath.bc_is_zero(v1);

    // Calculate sub results ...

    d1 = libbcmath.bc_init_num(); // needed?
    d2 = libbcmath.bc_init_num(); // needed?
    d1 = libbcmath.bc_sub(u1, u0, 0);
    d1len = d1.n_len;

    d2 = libbcmath.bc_sub (v0, v1, 0);
    d2len = d2.n_len;

    // Do recursive multiplies and shifted adds.
    if (m1zero) {
        m1 = libbcmath.bc_init_num(); //bc_copy_num (BCG(_zero_));
    } else {
        //m1 = libbcmath.bc_init_num(); //allow pass-by-ref
        m1 = libbcmath._bc_rec_mul (u1, u1.n_len, v1, v1.n_len, 0);
    }
    if (libbcmath.bc_is_zero(d1) || libbcmath.bc_is_zero(d2)) {
        m2 = libbcmath.bc_init_num(); //bc_copy_num (BCG(_zero_));
    } else {
        //m2 = libbcmath.bc_init_num(); //allow pass-by-ref
        m2 = libbcmath._bc_rec_mul (d1, d1len, d2, d2len, 0);
    }

    if (libbcmath.bc_is_zero(u0) || libbcmath.bc_is_zero(v0)) {
        m3 = libbcmath.bc_init_num(); //bc_copy_num (BCG(_zero_));
    } else {
        //m3 = libbcmath.bc_init_num(); //allow pass-by-ref
        m3 = libbcmath._bc_rec_mul(u0, u0.n_len, v0, v0.n_len, 0);
    }

    // Initialize product
    prodlen = ulen+vlen+1;
    prod = libbcmath.bc_new_num(prodlen, 0);

    if (!m1zero) {
        libbcmath._bc_shift_addsub(prod, m1, 2*n, 0);
        libbcmath._bc_shift_addsub(prod, m1, n, 0);
    }
    libbcmath._bc_shift_addsub(prod, m3, n, 0);
    libbcmath._bc_shift_addsub(prod, m3, 0, 0);
    libbcmath._bc_shift_addsub(prod, m2, n, d1.n_sign != d2.n_sign);

    return prod;
    // Now clean up!
    //bc_free_num (&u1);
    //bc_free_num (&u0);
    //bc_free_num (&v1);
    //bc_free_num (&m1);
    //bc_free_num (&v0);
    //bc_free_num (&m2);
    //bc_free_num (&m3);
    //bc_free_num (&d1);
    //bc_free_num (&d2);
};
