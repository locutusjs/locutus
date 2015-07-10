/**
 * A JavaScript equivalent of PHP's ip2long(). Convert IPv4 address in dotted
 * notation to 32-bit long integer.
 * You can pass IP in all possible representations, i.e.:
 *     192.0.34.166
 *     0xC0.0x00.0x02.0xEB
 *     0xC00002EB
 *     3221226219
 *     0.0xABCDEF
 *     255.255.255.256
 *     0300.0000.0002.0353
 *     030000001353
 *
 * @param string ip IPv4-address in one of possible representations.
 * @return Number The 32-bit number notation of IP-address expressed in decimal.
 */
function ip2long(ip) {
    // discuss at: http://phpjs.org/functions/ip2long/
    // original by: Waldo Malqui Silva
    // improved by: Victor
    // improved by: Alexander Zubakov
    //  revised by: fearphage (http://http/my.opera.com/fearphage/)
    //  revised by: Theriault

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
