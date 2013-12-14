if (typeof(bcmath) == 'undefined') {
    bcmath = {};
}

/**
 * PHP Unit Tests for bcmath (plus a few custom tests, php was a bit slack on their tests.
 */
bcmath.test = {
    pass: 0,
    fail: 0,

    doTests: function() {
        bcmath.test.pass = 0;
        bcmath.test.fail = 0;

        bcmath.test.bcadd();
        bcmath.test.bcsub();
        bcmath.test.bccomp();
        bcmath.test.bcscale();
        bcmath.test.bcdiv();
        bcmath.test.bcmul();
        bcmath.test.bcround();

        if ((bcmath.test.pass > 0) || (bcmath.test.fail > 0)) {

            alert('Testing complete, pass: ' + bcmath.test.pass + ' (' + ((bcmath.test.pass / (bcmath.test.pass + bcmath.test.fail)) * 100).toFixed(2) + '%) , fail: ' + bcmath.test.fail + ' (' + ((bcmath.test.fail / (bcmath.test.pass + bcmath.test.fail)) * 100).toFixed(2) + '%)');
        } else {
            alert('Test complete with no results?');
        }
    },

    result: function(srcFunction, srcTestNumber, expectedResult, actualResult) {
        if (expectedResult !== actualResult) {
            alert('FAILED: ' + srcFunction + ' #' + srcTestNumber + ', expected: [' + expectedResult + '], actual: [' + actualResult + ']');
            bcmath.test.fail++;
        } else {
            bcmath.test.pass++;
        }
        return true;
    },

    bcadd: function() {

        // set scale to zero
        bcscale(0);

        bcmath.test.result('bcadd', 1, '3', bcadd("1", "2"));
        bcmath.test.result('bcadd', 2, '4.0000', bcadd("-1", "5", 4));
        bcmath.test.result('bcadd', 3, '8728932003911564969352217864684.00', bcadd("1928372132132819737213", "8728932001983192837219398127471", 2));
        bcmath.test.result('bcadd', 4, '3.357000', bcadd('1.123', '2.234', 6));

        return true;
    },

    bcsub: function() {

        // set scale to zero
        bcscale(0);

        bcmath.test.result('bcsub', 1, '-1', bcsub('1','2'));
        bcmath.test.result('bcsub', 2, '-6.0000', bcsub('-1','5', 4));
        bcmath.test.result('bcsub', 3, '8728932000054820705086578390258.00', bcsub('8728932001983192837219398127471','1928372132132819737213', 2));
        bcmath.test.result('bcsub', 4, '-1.111000', bcsub('1.123', '2.234', 6));
        bcmath.test.result('bcsub', 5, '-2.20', bcsub('1.123456', '3.333333', 2)); //-2.209877 note: rounding not applicable as bcmath truncates.

        return true;
    },

    bccomp: function() {
        // set scale to zero
        bcscale(0);

        bcmath.test.result('bccomp', 1, -1, bccomp('-1','5', 4));
        bcmath.test.result('bccomp', 2, -1, bccomp('1928372132132819737213', '8728932001983192837219398127471'));
        bcmath.test.result('bccomp', 3,  0, bccomp('1.00000000000000000001', '1', 2));
        bcmath.test.result('bccomp', 4,  1, bccomp('97321', '2321'));

        return true;
    },

    bcscale: function() {

        bcmath.test.result('bcscale', 1, false, bcscale('fail'));
        bcmath.test.result('bcscale', 2, false, bcscale(-1));
        bcmath.test.result('bcscale', 3, true, bcscale(5));
        bcmath.test.result('bcscale', 4, true, bcscale(0));

        return true;
    },

    bcdiv: function() {

        // set scale to zero
        bcscale(0);

        bcmath.test.result('bcdiv', 1, '0', bcdiv("1", "2"));
        bcmath.test.result('bcdiv', 2, '0.50', bcdiv("1", "2", 2));
        bcmath.test.result('bcdiv', 3, '-0.2000', bcdiv("-1", "5", 4));
        bcmath.test.result('bcdiv', 4, '3333.3333', bcdiv("10000.0000", "3", 4));
        bcmath.test.result('bcdiv', 5, '2387.8877', bcdiv("5573.33", "2.334", 4));
        bcmath.test.result('bcdiv', 7, '1.00', bcdiv('6.00', '6.00', 2));
        bcmath.test.result('bcdiv', 8, '1.00', bcdiv('2.00', '2.00', 2));
        bcmath.test.result('bcdiv', 9, '59.51111111', bcdiv('66.95', '1.125', 8));
        bcmath.test.result('bcdiv', 10, '4526580661.75', bcdiv('8728932001983192837219398127471.00', '1928372132132819737213.00', 2));
        return true;
    },

    bcmul: function() {

        bcscale(0);

        bcmath.test.result('bcmul', 1, '2', bcmul("1", "2"));
        bcmath.test.result('bcmul', 2, '-15', bcmul("-3", "5"));
        bcmath.test.result('bcmul', 3, '12193263111263526900', bcmul("1234567890", "9876543210"));
        bcmath.test.result('bcmul', 4, '3.75', bcmul("2.5", "1.5", 2));
        bcmath.test.result('bcmul', 5, '13008.1522', bcmul("5573.33", "2.334", 4));

        return true;
    },

    bcround: function() {

        bcmath.test.result('bcround', 1, '-2', bcround('-1.5', 0));
        bcmath.test.result('bcround', 2, '-1.1235', bcround('-1.1234567', 4));
        bcmath.test.result('bcround', 3, '2', bcround('1.5', 0));
        bcmath.test.result('bcround', 4, '1.1235', bcround('1.1234567', 4));
        bcmath.test.result('bcround', 5, '1', bcround('1.499999999', 0));
        bcmath.test.result('bcround', 6, '2', bcround('1.5555555555555555555', 0));
        bcmath.test.result('bcround', 7, '1.44', bcround('1.444999', 2));
        bcmath.test.result('bcround', 8, '-1.44', bcround('-1.444999', 2));

        return true;

    }
};
