function srand (seed) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: gettimeofday
    // -    depends on: time
    // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
    // %          note 2: In order for this to work, the commented out portion in rand() must be used instead of the default JS-based implementation
    // *     example 1: srand(13450);
    // *     returns 1: undefined
    // *     example 2: srand();
    // *     returns 2: undefined

    var s1, s2, that = this;

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    // php_srand
    var lcg_seed = function () {
        try {
            var tv = that.gettimeofday();
            s1 = tv.sec ^ (~tv.usec);
        }
        catch (e) {
            s1 = 1;
        }
        s2 = Math.random(); // instead of tsrm_thread_id() or getpid()
        this.php_js.seeded = 1;
    };

    var MODMULT = function (a, b, c, m, s) {
        var q = s/a;
        s = b * (s - a*q) - c*q;
        if (s < 0) {
            s += m;
        }
        return s;
    };
    var php_combined_lcg = function () {
        if (!this.php_js.seeded) {
            lcg_seed(); // should only be run once
        }
        s1 = MODMULT(53668, 40014, 12211, 2147483563, s1);
        s2 = MODMULT(52774, 40692, 3791, 2147483399, s2);

        var z = s1 - s2;
        if (z < 1) {
            z += 2147483562;
        }
        return z * 4.656613e-10;
    };
    this.php_js.rand_seed = seed ||
        (parseInt(this.time() * Math.random(), 10) ^ parseInt(1000000.0 * php_combined_lcg(), 10)); // php_rand.h: GENERATE_SEED(); using Math.random() instead of getpid
}
