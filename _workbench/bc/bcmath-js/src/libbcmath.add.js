/**
 * Base add function
 *
 //  Here is the full add routine that takes care of negative numbers.
 //  N1 is added to N2 and the result placed into RESULT.  SCALE_MIN
 //  is the minimum scale for the result.
 *
 * @param bc_num n1
 * @param bc_num n2
 * @pram int scale_min
 * @return bc_num
 */
libbcmath.bc_add = function(n1, n2, scale_min) {
    var sum, cmp_res, res_scale;

    if (n1.n_sign === n2.n_sign) {
        sum = libbcmath._bc_do_add(n1, n2, scale_min);
        sum.n_sign = n1.n_sign;
    } else {
        /* subtraction must be done. */
        cmp_res = libbcmath._bc_do_compare(n1, n2, false, false); /* Compare magnitudes. */
        switch (cmp_res) {
            case -1:
                /* n1 is less than n2, subtract n1 from n2. */
                sum = libbcmath._bc_do_sub(n2, n1, scale_min);
                sum.n_sign = n2.n_sign;
                break;

            case  0:
                /* They are equal! return zero with the correct scale! */
                res_scale = libbcmath.MAX(scale_min, libbcmath.MAX(n1.n_scale, n2.n_scale));
                sum = libbcmath.bc_new_num(1, res_scale);
                libbcmath.memset(sum.n_value, 0, 0, res_scale+1);
                break;

            case  1:
                /* n2 is less than n1, subtract n2 from n1. */
                sum = libbcmath._bc_do_sub(n1, n2, scale_min);
                sum.n_sign = n1.n_sign;
        }
    }
    return sum;
};
