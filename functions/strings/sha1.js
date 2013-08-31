function sha1 ( str , raw_output ) {
  var M = [ ] ;
	var b = [ ] ;
	for ( var i = 0 ; i < str.length ; i ++ ) {
		b.push ( str.charCodeAt ( i ) & 255 ) ;
	}
	var index = 0 ;
	while ( ( b.length & 63 ) != 56 ) {
		if ( index > 0 ) {
			b.push ( 0 ) ;
		}
		else {
			b.push ( 128 ) ;
		}
		index ++ ;
	}
	var len = str.length * 8 ;
	var bstr = "" ;
	for ( var i = 0 ; i < 64 ; i ++ ) {
		bstr = ( len % 2 ) + bstr ;
		len = ( len - ( len % 2 ) ) / 2 ;
	}	
	var aLen = parseInt ( bstr.substr ( 0 , 32 ) , 2 ) ;
	var bLen = parseInt ( bstr.substr ( 32 , 32 ) , 2 ) ;
	b = b.concat ( [
		( aLen >>> 24 ) & 255 ,
		( aLen >>> 16 ) & 255 ,
		( aLen >>> 8 ) & 255 ,
		aLen & 255 ,
		( bLen >>> 24 ) & 255 ,
		( bLen >>> 16 ) & 255 ,
		( bLen >>> 8 ) & 255 ,
		bLen & 255 ,
	] ) ;
	var j ;
	for ( index = 0 ; index < b.length ; index += 4 ) {
		j = index >>> 2 ;
		if ( ! M [ j >>> 4 ] ) {
			M [ j >>> 4 ] = [ ] ;
		}
		M [ j >>> 4 ] [ j & 15 ] = ( b [ index ] << 24 ) | ( b [ index + 1 ] << 16 ) | ( b [ index + 2 ] << 8 ) | b [ index + 3 ] ;
	}
	//FUNCTIONS USED
	function f ( t , b , c , d ) {
		if ( t < 20 ) {
			return ( b & c ) | ( ( ~ b ) & d ) ;
		}
		else if ( t < 40 ) {
			return b ^ c ^ d ;
		}
		else if ( t < 60 ) {
			return ( b & c ) | ( b & d ) | ( c & d ) ;
		}
		else {
			return b ^ c ^ d ;
		}
	}
	function K ( t ) {
		if ( t < 20 ) {
			return 1518500249 ;
		}
		else if ( t < 40 ) {
			return 1859775393 ;
		}
		else if ( t < 60 ) {
			return -1894007588 ;
		}
		else {
			return -899497514 ;
		}
	}
	function S ( n , x ) {
		return ( x << n ) | ( x >>> 32 - n ) ;
	}
	var A , B , C , D , E ;
	var H0 = 1732584193 ,
		H1 = -271733879 , 
		H2 = -1732584194 , 
		H3 = 271733878 , 
		H4 = -1009589776 ;
	var W = [ ] ;
	var TEMP ;
	for ( var i = 0 ; i < M.length ; i ++ ) {
		for ( var j = 0 ; j < 16 ; j ++ ) {
			W [ j ] = M [ i ] [ j ] ;
		}
		A = H0 ;
		B = H1 ;
		C = H2 ;
		D = H3 ;
		E = H4 ;
		for ( var t = 0 ; t < 80 ; t ++ ) {
			var s = t & 15 ;
			if ( t > 15 )
				W [ s ] = S ( 1 , W [ ( s + 13 ) & 15 ] ^ W [ ( s + 8 ) & 15 ] ^ W [ ( s + 2 ) & 15 ] ^ W [ s ] ) ;
			TEMP = S ( 5 , A ) + f ( t , B , C , D ) + E + W [ s ] + K ( t ) ;
			E = D ;
			D = C ;
			C = S ( 30 , B ) ;
			B = A ;
			A = TEMP ;
		}
		H0 += A ;
		H1 += B ;
		H2 += C ;
		H3 += D ;
		H4 += E ;
	}
	var digest = [ 
		( H0 >>> 24 ) & 255 ,
		( H0 >>> 16 ) & 255 ,
		( H0 >>> 8 ) & 255 ,
		H0 & 255 ,
		( H1 >>> 24 ) & 255 ,
		( H1 >>> 16 ) & 255 ,
		( H1 >>> 8 ) & 255 ,
		H1 & 255 ,
		( H2 >>> 24 ) & 255 ,
		( H2 >>> 16 ) & 255 ,
		( H2 >>> 8 ) & 255 ,
		H2 & 255 ,
		( H3 >>> 24 ) & 255 ,
		( H3 >>> 16 ) & 255 ,
		( H3 >>> 8 ) & 255 ,
		H3 & 255 ,
		( H4 >>> 24 ) & 255 ,
		( H4 >>> 16 ) & 255 ,
		( H4 >>> 8 ) & 255 ,
		H4 & 255 ,
	] ;
	if ( raw_output ) {
		return digest ;
	}
	var encoded = "" ;
	var hex = "0123456789abcdef" ;
	for ( var i = 0 ; i < digest.length ; i ++ ) {
		encoded += hex [ digest [ i ] >>> 4 ] + hex [ digest [ i ] & 15 ] ;
	}
	return encoded ;
}
