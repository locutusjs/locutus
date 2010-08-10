function soundex (str) {
	// +   original by: Arnout Kazemier (http://www.3rd-Eden.com)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'
    // *     example 2: soundex('Ellery');
    // *     returns 2: 'E460'
    // *     example 3: soundex('Euler');
    // *     returns 3: 'E460'
	str = str.toUpperCase();
	
	var sdx = [str[0],0,0,0],
		m = soundex.map,
		k = soundex.keys,
		i = 1, s = 0, key, code,
		l = str.length;
	
	for (; i < l; i++){
		j = k.length;
		while( s != 3 && j-- ){
			key = k[j];
			if (key.indexOf(str[i]) !== -1) {
				code = m[key];
				if ( code != sdx[s] ){
					sdx[++s] = code;
				}
			}
		}
	}
	
	return sdx.join('')
};
soundex.map = {	BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6 };
soundex.keys = ['BFPV', 'CGJKQSXZ', 'DT', 'L', 'MN', 'R'];