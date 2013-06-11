function md5 ( str , raw_output ) {
  function rot ( x , n ) {
		return ( x << n ) | ( x >>> ( 32 - n ) ) ;
	}
	function FF ( a , b , c , d , k , s , i ) {
		return b + rot ( a + ( ( b & c ) | ( ( ~ b ) & d )) + k + i , s ) ;
	}
	function GG ( a , b , c , d , k , s , i ) {
		return b + rot ( a + (( b & d ) | ( c & ( ~ d ) )) + k + i , s ) ;
	}
	function HH ( a , b , c , d , k , s , i ) {
		return b + rot ( a + ( b ^ c ^ d ) + k + i , s ) ;
	}
	function II ( a , b , c , d , k , s , i ) {
		return b + rot ( a + ( c ^ ( b | ( ~ d ) ) ) + k + i , s ) ;
	}
	var b = [ ] ;
	var M = [ ] ;
	var i = 0 ;
	for ( ; i < str.length ; i ++ ) {
		b.push ( str.charCodeAt ( i ) & 255 ) ;
	}
	i = 0 ;
	while ( ( b.length & 63 ) != 56 ) {
		if ( i > 0 ) {
			b.push ( 0 ) ;
		}
		else {
			b.push ( 128 ) ;
		}
		i ++ ;
	}
	for ( i = 0 ; i < b.length ; i += 4 ) {
		M.push ( b [ i ] | ( b [ i + 1 ] << 8 ) | ( b [ i + 2 ] << 16 ) | ( b [ i + 3 ] << 24 ) ) ;
	}
	b = str.length << 3 ;
	M.push ( b & 4294967295 ) ;
	M.push ( ( b / 4294967295 ) & 4294967295 ) ;
	var a = 1732584193 ;
	var b = -271733879 ;
	var c = -1732584194 ;
	var d = 271733878 ;
	var x = [ ] ;
	for ( i = 0 ; i < M.length / 16 ; i ++ ) {
		for ( var j = 0 ; j < 16 ; j ++ ) {
			x [ j ] = M [ i * 16 + j ] ;
		}
		var aa = a ;
		var bb = b ;
		var cc = c ;
		var dd = d ;
		
		a = FF ( a , b , c , d , x [ 0 ] , 7 , -680876936 ) ;
		d = FF ( d , a , b , c , x [ 1 ] , 12 , -389564586 ) ;
		c = FF ( c , d , a , b , x [ 2 ] , 17 , 606105819 ) ; 
		b = FF ( b , c , d , a , x [ 3 ] , 22 , -1044525330 ) ;
		
		a = FF ( a , b , c , d , x [ 4 ] , 7 , -176418897 ) ;
		d = FF ( d , a , b , c , x [ 5 ] , 12 , 1200080426 ) ;
		c = FF ( c , d , a , b , x [ 6 ] , 17 , -1473231341 ) ;
		b = FF ( b , c , d , a , x [ 7 ] , 22 , -45705983 ) ;
		
		a = FF ( a , b , c , d , x [ 8 ] , 7 , 1770035416 ) ;
		d = FF ( d , a , b , c , x [ 9 ] , 12 , -1958414417 ) ;
		c = FF ( c , d , a , b , x [ 10 ] , 17 , -42063 ) ;
		b = FF ( b , c , d , a , x [ 11 ] , 22 , -1990404162 ) ;
		
		a = FF ( a , b , c , d , x [ 12 ] , 7 , 1804603682 ) ;
		d = FF ( d , a , b , c , x [ 13 ] , 12 , -40341101 ) ;
		c = FF ( c , d , a , b , x [ 14 ] , 17 , -1502002290 ) ;
		b = FF ( b , c , d , a , x [ 15 ] , 22 , 1236535329 ) ;
		
		a = GG ( a , b , c , d , x [ 1 ] , 5 , -165796510 ) ;
		d = GG ( d , a , b , c , x [ 6 ] , 9 , -1069501632 ) ;
		c = GG ( c , d , a , b , x [ 11 ] , 14 , 643717713 ) ; 
		b = GG ( b , c , d , a , x [ 0 ] , 20 , -373897302 ) ;
		
		a = GG ( a , b , c , d , x [ 5 ] , 5 , -701558691 ) ;
		d = GG ( d , a , b , c , x [ 10 ] , 9 , 38016083 ) ;
		c = GG ( c , d , a , b , x [ 15 ] , 14 , -660478335 ) ;
		b = GG ( b , c , d , a , x [ 4 ] , 20 , -405537848 ) ;
		
		a = GG ( a , b , c , d , x [ 9 ] , 5 , 568446438 ) ;
		d = GG ( d , a , b , c , x [ 14 ] , 9 , -1019803690 ) ;
		c = GG ( c , d , a , b , x [ 3 ] , 14 , -187363961 ) ;
		b = GG ( b , c , d , a , x [ 8 ] , 20 , 1163531501 ) ;
		
		a = GG ( a , b , c , d , x [ 13 ] , 5 , -1444681467 ) ;
		d = GG ( d , a , b , c , x [ 2 ] , 9 , -51403784 ) ;
		c = GG ( c , d , a , b , x [ 7 ] , 14 , 1735328473 ) ;
		b = GG ( b , c , d , a , x [ 12 ] , 20 , -1926607734 ) ;
		
		a = HH ( a , b , c , d , x [ 5 ] , 4 , -378558 ) ;
		d = HH ( d , a , b , c , x [ 8 ] , 11 , -2022574463 ) ;
		c = HH ( c , d , a , b , x [ 11 ] , 16 , 1839030562 ) ;
		b = HH ( b , c , d , a , x [ 14 ] , 23 , -35309556 ) ;
		
		a = HH ( a , b , c , d , x [ 1 ] , 4 , -1530992060 ) ;
		d = HH ( d , a , b , c , x [ 4 ] , 11 , 1272893353 ) ;
		c = HH ( c , d , a , b , x [ 7 ] , 16 , -155497632 ) ;
		b = HH ( b , c , d , a , x [ 10 ] , 23 , -1094730640 ) ;
		
		a = HH ( a , b , c , d , x [ 13 ] , 4 , 681279174 ) ;
		d = HH ( d , a , b , c , x [ 0 ] , 11 , -358537222 ) ;
		c = HH ( c , d , a , b , x [ 3 ] , 16 , -722521979 ) ;
		b = HH ( b , c , d , a , x [ 6 ] , 23 , 76029189 ) ;
		
		a = HH ( a , b , c , d , x [ 9 ] , 4 , -640364487 ) ;
		d = HH ( d , a , b , c , x [ 12 ] , 11 , -421815835 ) ;
		c = HH ( c , d , a , b , x [ 15 ] , 16 , 530742520 ) ;
		b = HH ( b , c , d , a , x [ 2 ] , 23 , -995338651 ) ;

		a = II ( a , b , c , d , x [ 0 ] , 6 , -198630844 ) ;
		d = II ( d , a , b , c , x [ 7 ] , 10 , 1126891415 ) ;
		c = II ( c , d , a , b , x [ 14 ] , 15 , -1416354905 ) ; 
		b = II ( b , c , d , a , x [ 5 ] , 21 , -57434055 ) ;
		
		a = II ( a , b , c , d , x [ 12 ] , 6 , 1700485571 ) ;
		d = II ( d , a , b , c , x [ 3 ] , 10 , -1894986606 ) ;
		c = II ( c , d , a , b , x [ 10 ] , 15 , -1051523 ) ;
		b = II ( b , c , d , a , x [ 1 ] , 21 , -2054922799 ) ;
		
		a = II ( a , b , c , d , x [ 8 ] , 6 , 1873313359 ) ;
		d = II ( d , a , b , c , x [ 15 ] , 10 , -30611744 ) ;
		c = II ( c , d , a , b , x [ 6 ] , 15 , -1560198380 ) ;
		b = II ( b , c , d , a , x [ 13 ] , 21 , 1309151649 ) ;
		
		a = II ( a , b , c , d , x [ 4 ] , 6 , -145523070 ) ;
		d = II ( d , a , b , c , x [ 11 ] , 10 , -1120210379 ) ;
		c = II ( c , d , a , b , x [ 2 ] , 15 , 718787259 ) ;
		b = II ( b , c , d , a , x [ 9 ] , 21 , -343485551 ) ;
		
		a += aa ;
		b += bb ;
		c += cc ;
		d += dd ;
	}
	function byte2str ( n ) {
		var num = "0123456789abcdef" ;
		return num [ n >>> 4 ] + num [ n & 15 ] ;
	}
	var digest = [ 
		( a & 255 ) ,
		( ( a >>> 8 ) & 255 ) ,
		( ( a >>> 16 ) & 255 ) ,
		( ( a >>> 24 ) & 255 ) ,
		( b & 255 ) ,
		( ( b >>> 8 ) & 255 ) ,
		( ( b >>> 16 ) & 255 ) ,
		( ( b >>> 24 ) & 255 ) ,
		( c & 255 ) ,
		( ( c >>> 8 ) & 255 ) ,
		( ( c >>> 16 ) & 255 ) ,
		( ( c >>> 24 ) & 255 ) ,
		( d & 255 ) ,
		( ( d >>> 8 ) & 255 ) ,
		( ( d >>> 16 ) & 255 ) ,
		( ( d >>> 24 ) & 255 ) ,
	] ;
	if ( raw_output === true ) {
		return digest ;
	}
	var encoded = "" ;
	for ( var i = 0 ; i < digest.length ; i ++ ) {
		encoded += byte2str ( digest [ i ] ) ;
	}
	return encoded ;
}
