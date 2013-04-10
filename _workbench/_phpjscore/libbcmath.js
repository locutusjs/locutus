/**
 * BC Math Library for Javascript
 * Ported from the PHP5 bcmath extension source code,
 * which uses the libbcmath package...
 *    Copyright (C) 1991, 1992, 1993, 1994, 1997 Free Software Foundation, Inc.
 *    Copyright (C) 2000 Philip A. Nelson
 *     The Free Software Foundation, Inc.
 *     59 Temple Place, Suite 330
 *     Boston, MA 02111-1307 USA.
 *      e-mail:  philnelson@acm.org
 *     us-mail:  Philip A. Nelson
 *               Computer Science Department, 9062
 *               Western Washington University
 *               Bellingham, WA 98226-9062
 *
 * bcmath-js homepage:
 *
 * This code is covered under the LGPL licence, and can be used however you want :)
 * Be kind and share any decent code changes.
 */

var libbcmath = {
    PLUS: '+',
    MINUS: '-',
    BASE: 10,           // must be 10 (for now)
    scale: 0,           // default scale

    /**
     * Basic number structure
     */
    bc_num: function() {
        this.n_sign = null; // sign
        this.n_len = null;  /* (int) The number of digits before the decimal point. */
        this.n_scale = null; /* (int) The number of digits after the decimal point. */
        //this.n_refs = null; /* (int) The number of pointers to this number. */
        //this.n_text = null; /* ?? Linked list for available list. */
        this.n_value = null;  /* array as value, where 1.23 = [1,2,3] */
        this.toString = function() {
            var r, tmp;
            tmp=this.n_value.join('');

            // add minus sign (if applicable) then add the integer part
            r = ((this.n_sign == libbcmath.PLUS) ? '' : this.n_sign) + tmp.substr(0, this.n_len);

            // if decimal places, add a . and the decimal part
            if (this.n_scale > 0) {
                r += '.' + tmp.substr(this.n_len, this.n_scale);
            }
            return r;
        };
    },

    /**
     * @param int length
     * @param int scale
     * @return bc_num
     */
    bc_new_num: function(length, scale) {
        var temp; // bc_num
        temp            = new libbcmath.bc_num();
        temp.n_sign     = libbcmath.PLUS;
        temp.n_len      = length;
        temp.n_scale    = scale;
        temp.n_value    = libbcmath.safe_emalloc(1, length+scale, 0);
        libbcmath.memset(temp.n_value, 0, 0, length+scale);
        return temp;
    },

    safe_emalloc: function(size, len, extra) {
        return Array((size * len) + extra);
    },

    /**
     * Create a new number
     */
    bc_init_num: function() {
        return new libbcmath.bc_new_num(1,0);

    },

    _bc_rm_leading_zeros: function (num) {
        /* We can move n_value to point to the first non zero digit! */
        while ((num.n_value[0] === 0) && (num.n_len > 1)) {
            num.n_value.shift();
            num.n_len--;
        }
    },

    /**
     * Convert to bc_num detecting scale
     */
    php_str2num: function(str) {
        var p;
        p = str.indexOf('.');
        if (p==-1) {
            return libbcmath.bc_str2num(str, 0);
        } else {
            return libbcmath.bc_str2num(str, (str.length-p));
        }

    },

    CH_VAL: function(c) {
        return c - '0'; //??
    },

    BCD_CHAR: function(d) {
        return d + '0'; // ??
    },

    isdigit: function(c) {
        return (isNaN(parseInt(c,10)) ? false : true);
    },

    bc_str2num: function(str_in, scale) {
        var str,num, ptr, digits, strscale, zero_int, nptr;
        // remove any non-expected characters
        /* Check for valid number and count digits. */

        str=str_in.split(''); // convert to array
        ptr = 0;    // str
        digits = 0;
        strscale = 0;
        zero_int = false;
        if ( (str[ptr] === '+') || (str[ptr] === '-'))  {
            ptr++;  /* Sign */
        }
        while (str[ptr] === '0') {
            ptr++;            /* Skip leading zeros. */
        }
        //while (libbcmath.isdigit(str[ptr])) {
        while ((str[ptr]) % 1 === 0) { //libbcmath.isdigit(str[ptr])) {
            ptr++;
            digits++;    /* digits */
        }

        if (str[ptr] === '.') {
            ptr++;            /* decimal point */
        }
        //while (libbcmath.isdigit(str[ptr])) {
        while ((str[ptr]) % 1 === 0) { //libbcmath.isdigit(str[ptr])) {
            ptr++;
            strscale++;    /* digits */
        }

        if ((str[ptr]) || (digits+strscale === 0)) {
            // invalid number, return 0
            return libbcmath.bc_init_num();
              //*num = bc_copy_num (BCG(_zero_));
        }

        /* Adjust numbers and allocate storage and initialize fields. */
        strscale = libbcmath.MIN(strscale, scale);
        if (digits === 0) {
            zero_int = true;
            digits = 1;
        }

        num = libbcmath.bc_new_num(digits, strscale);

        /* Build the whole number. */
        ptr = 0; // str
        if (str[ptr] === '-') {
            num.n_sign = libbcmath.MINUS;
            //(*num)->n_sign = MINUS;
            ptr++;
        } else {
            num.n_sign = libbcmath.PLUS;
            //(*num)->n_sign = PLUS;
            if (str[ptr] === '+') {
                ptr++;
            }
        }
        while (str[ptr] === '0') {
            ptr++;            /* Skip leading zeros. */
        }

        nptr = 0; //(*num)->n_value;
        if (zero_int) {
            num.n_value[nptr++] = 0;
            digits = 0;
        }
        for (;digits > 0; digits--) {
            num.n_value[nptr++] = libbcmath.CH_VAL(str[ptr++]);
            //*nptr++ = CH_VAL(*ptr++);
        }

        /* Build the fractional part. */
        if (strscale > 0) {
            ptr++;  /* skip the decimal point! */
            for (;strscale > 0; strscale--) {
                num.n_value[nptr++] = libbcmath.CH_VAL(str[ptr++]);
            }
        }

        return num;
    },

    cint: function(v) {
        if (typeof(v) == 'undefined') {
            v = 0;
        }
        var x=parseInt(v,10);
        if (isNaN(x)) {
            x = 0;
        }
        return x;
    },

    /**
     * Basic min function
     * @param int
     * @param int
     */
    MIN: function(a, b) {
        return ((a > b) ? b : a);
    },

    /**
     * Basic max function
     * @param int
     * @param int
     */
    MAX: function(a, b) {
        return ((a > b) ? a : b);
    },

    /**
     * Basic odd function
     * @param int
     * @param int
     */
    ODD: function(a) {
        return (a & 1);
    },

    /**
     * replicate c function
     * @param array     return (by reference)
     * @param string    char to fill
     * @param int       length to fill
     */
    memset: function(r, ptr, chr, len) {
        var i;
        for (i=0;i<len;i++) {
            r[ptr+i] = chr;
        }
    },

    /**
     * Replacement c function
     * Obviously can't work like c does, so we've added an "offset" param so you could do memcpy(dest+1, src, len) as memcpy(dest, 1, src, len)
     * Also only works on arrays
     */
    memcpy: function(dest, ptr, src, srcptr, len) {
        var i;
        for (i=0;i<len;i++) {
            dest[ptr+i]=src[srcptr+i];
        }
        return true;
    },


    /**
     * Determine if the number specified is zero or not
     * @param bc_num num    number to check
     * @return boolean      true when zero, false when not zero.
     */
    bc_is_zero: function(num) {
        var count; // int
        var nptr; // int

        /* Quick check. */
        //if (num == BCG(_zero_)) return TRUE;

        /* Initialize */
        count = num.n_len + num.n_scale;
        nptr = 0; //num->n_value;

        /* The check */
        while ((count > 0) && (num.n_value[nptr++] === 0)) {
            count--;
        }

        if (count !== 0) {
            return false;
        } else {
            return true;
        }
    },

    bc_out_of_memory: function() {
        throw new Error("(BC) Out of memory");
    }
};

