/**
 * This is the "user callable" routine to compare numbers N1 and N2.
 * @param bc_num n1
 * @param bc_num n2
 * @return int -1, 0, 1  (n1 < n2, ==, n1 > n2)
 */
libbcmath.bc_compare = function(n1, n2) {
    return libbcmath._bc_do_compare (n1, n2, true, false);
};

/**
 * @param bc_num n1
 * @param bc_num n2
 * @param boolean use_sign
 * @param boolean ignore_last
 * @return -1, 0, 1 (see bc_compare)
 */
libbcmath._bc_do_compare = function(n1, n2, use_sign, ignore_last) {
    var n1ptr, n2ptr; // int
    var count;    // int

    /* First, compare signs. */
    if (use_sign && (n1.n_sign != n2.n_sign)) {
        if (n1.n_sign == libbcmath.PLUS) {
            return (1);    /* Positive N1 > Negative N2 */
        } else {
            return (-1);    /* Negative N1 < Positive N1 */
        }
    }

    /* Now compare the magnitude. */
    if (n1.n_len != n2.n_len) {
        if (n1.n_len > n2.n_len) {
            /* Magnitude of n1 > n2. */
            if (!use_sign || (n1.n_sign == libbcmath.PLUS)) {
                return (1);
            } else {
                return (-1);
            }
        } else {
            /* Magnitude of n1 < n2. */
            if (!use_sign || (n1.n_sign == libbcmath.PLUS)) {
                return (-1);
            } else {
                return (1);
            }
        }
    }

    /* If we get here, they have the same number of integer digits.
       check the integer part and the equal length part of the fraction. */
    count = n1.n_len + Math.min(n1.n_scale, n2.n_scale);
    n1ptr = 0;
    n2ptr = 0;

    while ((count > 0) && (n1.n_value[n1ptr] == n2.n_value[n2ptr])) {
        n1ptr++;
        n2ptr++;
        count--;
    }

    if (ignore_last && (count == 1) && (n1.n_scale == n2.n_scale)) {
        return (0);
    }

    if (count !== 0) {
        if (n1.n_value[n1ptr] > n2.n_value[n2ptr])  {
            /* Magnitude of n1 > n2. */
            if (!use_sign || n1.n_sign == libbcmath.PLUS) {
                return (1);
            } else {
                return (-1);
            }
        } else {
            /* Magnitude of n1 < n2. */
            if (!use_sign || n1.n_sign == libbcmath.PLUS) {
                return (-1);
            } else {
                return (1);
            }
        }
    }

    /* They are equal up to the last part of the equal part of the fraction. */
    if (n1.n_scale != n2.n_scale) {
        if (n1.n_scale > n2.n_scale) {
            for (count =(n1.n_scale - n2.n_scale); count>0; count--) {
                if (n1.n_value[n1ptr++] !== 0) {
                    /* Magnitude of n1 > n2. */
                    if (!use_sign || n1.n_sign == libbcmath.PLUS) {
                        return (1);
                    } else {
                        return (-1);
                    }
                }
            }
        } else {
            for (count = (n2.n_scale - n1.n_scale); count>0; count--) {
                if (n2.n_value[n2ptr++] !== 0) {
                    /* Magnitude of n1 < n2. */
                    if (!use_sign || n1.n_sign == libbcmath.PLUS) {
                        return (-1);
                    } else {
                        return (1);
                    }
                }
            }
        }
    }

    /* They must be equal! */
    return (0);
};

