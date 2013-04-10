if (typeof(bcmath) == 'undefined') {
    bcmath = {};
}

/**
 * Benchmarking tools to see if your changes make a difference or not.
 * Saving every ms counts when code is used heavily by large applications.
 */
bcmath.benchmark = {
    lastStart: null,
    lastStop: null,
    testCount: 500,

    doBenchmark: function() {

        var i, x, browserTime, bcTime;
        bcTime = bcmath.benchmark.start();
        for (i=0;i<bcmath.benchmark.testCount;i++) {
            x = bcdiv('8728932001983192837219398127471' + i + '.34213', '1928372132132819737213' + i + '.99843', 2);
            x = bcmul('1131231232321312' + i + '.3343', '3311231232123' + i + '.00', 2);
            x = bcsub('123123123215589810231' + i + '.3343', '9948123131' + i + '.314', 6);
            x = bcadd('9234232397842987' + i + '.342', '98432908432' + i + '.3242314', 6);
        }
        bcTime = bcmath.benchmark.stop();

        alert('Benchmark time: ' + bcTime);


    },

    start: function() {
        var d = new Date();
        bcmath.benchmark.lastStart = d.getTime();

    },

    stop: function() {
        var d=new Date();
        bcmath.benchmark.lastStop = d.getTime();
        return ((bcmath.benchmark.lastStop - bcmath.benchmark.lastStart) / 1000).toFixed(3) + ' seconds';
    }
};
