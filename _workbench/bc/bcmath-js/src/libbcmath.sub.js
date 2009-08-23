/* Here is the full subtract routine that takes care of negative numbers.
   N2 is subtracted from N1 and the result placed in RESULT.  SCALE_MIN
   is the minimum scale for the result. */
libbcmath.bc_sub = function(n1, n2, scale_min) {
    var diff; // bc_num
    var cmp_res, res_scale; //int
    if (n1.n_sign != n2.n_sign) {
        diff = libbcmath._bc_do_add (n1, n2, scale_min);
        diff.n_sign = n1.n_sign;
    } else {
        /* subtraction must be done. */
        /* Compare magnitudes. */
        cmp_res = libbcmath._bc_do_compare(n1, n2, false, false);
        switch (cmp_res) {
            case -1:
                /* n1 is less than n2, subtract n1 from n2. */
                diff = libbcmath._bc_do_sub(n2, n1, scale_min);
                diff.n_sign = (n2.n_sign == libbcmath.PLUS ? libbcmath.MINUS : libbcmath.PLUS);
                break;
            case  0:
                /* They are equal! return zero! */
                res_scale = libbcmath.MAX(scale_min, libbcmath.MAX(n1.n_scale, n2.n_scale));
                diff = libbcmath.bc_new_num(1, res_scale);
                libbcmath.memset(diff.n_value, 0, 0, res_scale+1);
                break;
            case  1:
                /* n2 is less than n1, subtract n2 from n1. */
                diff = libbcmath._bc_do_sub(n1, n2, scale_min);
                diff.n_sign = n1.n_sign;
                break;
        }
    }

    /* Clean up and return. */
    //bc_free_num (result);
    //*result = diff;
    return diff;
};
