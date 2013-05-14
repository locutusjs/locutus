function base64_encode ( str ) {
    var encoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  	var encoded = "" ;
		var v = [ ] ;
		for ( var i = 0 ; i < str.length ; i += 3 ) {
			v = [ str.charCodeAt ( i ) , str.charCodeAt ( i + 1 ) , str.charCodeAt ( i + 2 )] ;
			encoded += encoding [ ( v [ 0 ] >>> 2 ) & 63 ] 
				+ encoding [ ( v [ 0 ] & 3 ) << 4 | v [ 1 ] >>> 4 ] 
				+ encoding [ ( str [ i + 1 ] ) ? ( v [ 1 ] & 15 ) << 2 | v [ 2 ] >>> 6 : 64 ] 
				+ encoding [ ( str [ i + 2 ] ) ? v [ 2 ] & 63 : 64 ] ;
		}
		return encoded ;
	}
