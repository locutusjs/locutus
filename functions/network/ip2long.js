function ip2long(ip) {
  //  discuss at: http://phpjs.org/functions/ip2long/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  // improved by: Victor
  // improved by: Alexander Zubakov (http://xinit.co/)
  //  revised by: fearphage (http://http/my.opera.com/fearphage/)
  //  revised by: Theriault
  //   example 1: ip2long('192.0.34.166');
  //   returns 1: 3221234342
  //   example 2: ip2long('0.0xABCDEF');
  //   returns 2: 11259375
  //   example 3: ip2long('255.255.255.256');
  //   returns 3: false
  //   example 4: ip2long('0300.0000.0002.0353');
  //   returns 4: 3221226219
  //   example 5: ip2long('030000001353');
  //   returns 5: 3221226219

    // PHP allows decimal, octal, and hexadecimal IP components.
    // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.
    ip = ip.match(
        /^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
    );

    // invalid format.
    if (ip === null) return false;

    // reuse IP variable for component counter.
    ip[0] = 0;
    for (var i = 1; i <= 4; i++) {
        // calculate radix for parseInt()
        var radix = 10;

        // radix should be 8 or 16
        if (typeof ip[i] !== 'undefined' && ip[i].length > 1 && ip[i][0] === '0')
            radix = ip[i][1].toLowerCase() === 'x' ? 16 : 8;

        ip[0] += !! ((ip[i] || '').length);
        ip[i] = parseInt(ip[i], radix) || 0;
    }

    // continue to use IP for overflow values.
    // PHP does not allow any component to overflow.
    ip.push(256, 256, 256, 256);

    // recalculate overflow of last component supplied to make up for missing components.
    ip[4 + ip[0]] *= Math.pow(256, 4 - ip[0]);

    if (ip[1] >= ip[5] || ip[2] >= ip[6] || ip[3] >= ip[7] || ip[4] >= ip[8])
        return false;

    return ip[1] * (ip[0] === 1 || 16777216) + ip[2] * (ip[0] <= 2 || 65536) + ip[3] * (ip[0] <= 3 || 256) + ip[4] * 1;
}
