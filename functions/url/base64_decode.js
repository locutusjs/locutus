function base64_decode ( str ) {
    var encoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" ;
  	var decoded = "" ;
		var v = [ ] ;
		for ( var i = 0 ; i < str.length ; i += 4 ) {
			v = [ 
				encoding.indexOf ( str [ i ] ) , 
				encoding.indexOf ( str [ i + 1 ] ) , 
				encoding.indexOf ( str [ i + 2 ] ) , 
				encoding.indexOf ( str [ i + 3 ] )
			] ;
			if ( v [ 0 ] === -1 ) return "" ;
			if ( v [ 1 ] === -1 ) return "" ;
			if ( v [ 2 ] === -1 ) return "" ;
			if ( v [ 3 ] === -1 ) return "" ;
			decoded += String.fromCharCode ( v [ 0 ] << 2 | v [ 1 ] >>> 4 ) ;
			if ( v [ 1 ] == 64 || v [ 2 ] == 64 || v [ 3 ] == 64 ) continue ;
			decoded += String.fromCharCode ( ( v [ 1 ] & 15 ) << 4 | v [ 2 ] >>> 2 ) ;
			decoded += String.fromCharCode ( v [ 3 ] | ( v [ 2 ] << 6 ) & 192 ) ;
		}
		return decoded ;
	}
