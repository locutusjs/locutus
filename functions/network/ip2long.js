function ip2long(IP) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +   improved by: Victor
    // +    revised by: fearphage (http://http/my.opera.com/fearphage/)
    // +    revised by: Theriault
    // *     example 1: ip2long('192.0.34.166');
    // *     returns 1: 3221234342
    // *     example 2: ip2long('0.0xABCDEF');
    // *     returns 2: 11259375
    // *     example 3: ip2long('255.255.255.256');
    // *     returns 3: false

    var i = 0;
    // Allows decimal, octal, and hexadecimal.
    IP = IP.match(/^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i); // Verify IP format.
    if (!IP) {
        return false; // Invalid format.
    }
    IP[0] = 0;
    for (i = 1; i < 5; i += 1) {
        IP[0] += !!IP[i].length;
        IP[i] = parseInt(IP[i]) || 0;
    }
    IP.push(256, 256, 256, 256); // Use IP for overflow values. Each component must be less than its relative overflow.
    IP[4 + IP[0]] *= Math.pow(256, 4 - IP[0]); // Recalculate overflow of last component.
    if (IP[1] >= IP[5] || IP[2] >= IP[6] || IP[3] >= IP[7] || IP[4] >= IP[8]) { // Verify that nothing overflows.
        return false;
    }
    return IP[1] * (IP[0] === 1 || 16777216) + IP[2] * (IP[0] <= 2 || 65536) + IP[3] * (IP[0] <= 3 || 256) + IP[4] * 1;
}