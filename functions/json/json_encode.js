var json = ( function ( ) {

if ( ! String.prototype.trim ) {
  String.prototype.trim = function ( ) {
		return this.replace ( /^\s+|\s+$/g , '' ) ;
  } ;
}

function toString ( object ) {
	return Object.prototype.toString.call ( object ) ;
}

function syn_error ( msg , i ) {
	if ( SyntaxError ) {
		throw new SyntaxError ( msg + ' at char ' + i ) ;
	}
	else {
		throw 'SyntaxError: ' + msg + ' at char ' + i ;
	}
}

function decode ( code ) {
	var code = code.trim ( ) ;
	
	//core variables
	var output = null ;
	var buffer = null ;
	var parent = null ;
	var path = [ ] ;
	var i = 0 ;
	var chr ;
	var key = null ;
	
	//temporary syntax buffer
	var sbuffer = '' ;
	
	//string parser
	var str_esc = false ;
	var unicode = false ;
	var ubuff ;
	var hexa_char = /^[a-f0-9]$/i ;
	
	//number parser
	var number = /^-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$/ ;	
	
	//object parser
	var write_key = false ;
	
	//tokens
	var expected ;
	var val = expected = /[\{\[tfn"0-9\-]/ ;
	
	function is_object ( ) {
		var temp = output ;
		for ( var i = 0 ; i < path.length ; i ++ ) {
			temp = temp [ path [ i ] ] 
		}
		return toString ( temp ) == '[object Object]' ;
	}
	
	function is_array ( ) {
		var temp = output ;
		for ( var i = 0 ; i < path.length ; i ++ ) {
			temp = temp [ path [ i ] ] 
		}
		return toString ( temp ) == '[object Array]' ;
	}
		
	function flush ( ) {
		function input ( loc , val ) {
			if ( loc.length == 1 ) {
				this [ loc [ 0 ] ] = val ;
				return ;
			}
			if ( ! this [ loc [ 0 ] ] ) {
				if ( toString ( loc [ 1 ] ) === '[object String]' ) {
					this [ loc [ 0 ] ] = { } ;
				}
				else {
					this [ loc [ 0 ] ] = [ ] ;
				}
			}
			input.call ( this [ loc [ 0 ] ] , loc.slice ( 1 ) , val ) ;
		}
		function get ( loc ) {
			if ( loc.length == 0 ) {
				return ;
			}
			if ( loc.length == 1 ) {
				return this [ loc [ 0 ] ] ;
			}
			return get.call ( this [ loc [ 0 ] ] , loc.slice ( 1 ) ) ;
		}
		if ( path.length == 0 && key == null ) {
			if ( output == null ) {
				output = buffer ;
			}
		}
		else {
			path.push ( key ) ;
			input.call ( output , path , buffer ) ;
			path.pop ( ) ;
		}
	}
	
	for ( ; i < code.length ; i ++ ) {
		chr = code [ i ] ;
		if ( parent == 'string' ) {
			if ( str_esc ) {	
				switch ( chr ) {
				case 'b' :
					sbuffer += '\b' ;
					break ;
				case 'f' :
					sbuffer += '\f' ;
					break ;
				case 'n' :
					sbuffer += '\n' ;
					break ;
				case 'r' :
					sbuffer += '\r' ;
					break ;
				case 't' :
					sbuffer += '\t' ;
					break ;
				case 'u' :
					unicode = 0 ;
					ubuff = '' ;
					break ;
				default :
					sbuffer += chr ;
				}
				str_esc = false ;
			}
			else {
				if ( unicode !== false ) {
					if ( hexa_char.test ( chr ) ) {
						unicode ++ ;
						ubuff += chr ;
					}
					else {
						syn_error ( 'Invalid hexadecimal character' , i ) ;
					}
					if ( unicode == 4 ) {
						unicode = false ;
						sbuffer += String.fromCharCode ( parseInt ( ubuff , 16 ) ) ;
					}
				}
				else {
					if ( chr == '\\' ) {
						str_esc = true ;
						
					}
					else if ( chr == '"' ) {
						buffer = sbuffer ;
						parent = null ;
						if ( write_key ) {
							key = buffer ;
							expected = /[:]/ ;
						}
						else {
							flush ( ) ;
							if ( is_object ( ) ) {
								expected = /[,\}]/ ;
							}
							else if ( is_array ( ) ) {
								expected = /[,\]]/ ;
							}
							else {
								expected = /[]/ ;
							}
						}
					}
					else {
						sbuffer += chr ;
					}
				}
			}
		}
		else if ( parent == 'number' ) {
			if ( number.test ( sbuffer + chr + '0' ) ) {
				sbuffer += chr ;
			}
			else {
				if ( ! number.test ( sbuffer ) ) {
					syn_error ( 'Unexpected token ' + chr , i ) ;
				}
				buffer = parseFloat ( sbuffer ) ;
				flush ( ) ;
				i -- ;
				parent = null ;
				//expect value separator
				if ( is_object ( ) ) {
					expected = /[,\}]/ ;
				}
				else if ( is_array ( ) ) {
					expected = /[,\]]/ ;
				}
				else {
					expected = /[]/ ;
				}
				continue ;
			}
		}
		else if ( parent == 'special' ) {
			sbuffer += chr ;
			if ( sbuffer.length == 4 ) {
				if ( sbuffer == 'true' || sbuffer == 'null' ) {
					buffer = eval ( sbuffer ) ;
					flush ( ) ;
					parent = null ;
					//expect value separator
					if ( is_object ( ) ) {
						expected = /[,\}]/ ;
					}
					else if ( is_array ( ) ) {
						expected = /[,\]]/ ;
					}
					else {
						expected = /[]/ ;
					}
				}
				else if ( sbuffer == 'fals' && code [ i + 1 ] == 'e' ) {
					buffer = false ;
					flush ( ) ;
					parent = null ;
					i ++ ;
					//expect value separator
					if ( is_object ( ) ) {
						expected = /[,\}]/ ;
					}
					else if ( is_array ( ) ) {
						expected = /[,\]]/ ;
					}
					else {
						expected = /[]/ ;
					}
				}
				else {
					syn_error ( 'Unidentified identifier ' + sbuffer , i ) ;
				}
			}
		}
		else {
			sbuffer = '' ;
			//skip whitespaces
			if ( chr == ' ' ) {
				continue ;
			}
			//check token if expected
			if ( ! expected.test ( chr ) ) {
				syn_error ( 'Unexpected token ' + chr , i ) ;
			}
			switch ( chr ) {
			case '{' :
				buffer = { } ;
				flush ( ) ;
				if ( key != null ) {
					path.push ( key ) ;
				}
				key = null ;
				write_key = true ;
				expected = /["\}]/ ;
				break ;
			case '}' :
				path.pop ( ) ;
				write_key = false ;
				key = null ;
				if ( is_object ( ) ) {
					expected = /[\},]/ ;
				}
				else if ( is_array ( ) ) {
					expected = /[\],]/ ;
				}
				else {
					expected = /[]/ ;
				}
				break ;
			case '"' :
				parent = 'string' ;
				expected = val ;
				break ;
			case ':' :
				if ( is_object ( ) ) {
					if ( write_key && key != null ) {
						write_key = false ;
					}
				}
				expected = val ;
				break ;
			case ',' :
				if ( is_object ( ) ) {
					key = null ;
					write_key = true ;
					expected = /["]/ ;
				}
				else if ( is_array ( ) ) {
					key ++ ;
					expected = val ;
				}
				break ;
			case '[' :
				buffer = [ ] ;
				flush ( ) ;
				if ( key != null ) {
					path.push ( key ) ;
				}
				key = 0 ;
				write_key = false ;
				expected = /[\{\[tfn"0-9\-\]]/ ;
				break ;
			case ']' :
				path.pop ( ) ;
				key = null ;
				if ( is_object ( ) ) {
					expected = /[\},]/ ;
				}
				else if ( is_array ( ) ) {
					expected = /[\],]/ ;
				}
				else {
					expected = /[]/ ;
				}
				break ;
			default :
				if ( /^[0-9]|-$/.test ( chr ) ) {
					//number
					parent = 'number' ;
					i -- ;
				}
				else if ( /^[tfn]$/.test ( chr ) ) {
					//special ( true | false | null )
					parent = 'special' ;
					i -- ;
				}
			}
		}
	}
	
	//check for unclosed { or [ or "
	if ( ( parent != null && parent != 'number' ) || key != null ) {
		syn_error ( 'Unexpected token ILLEGAL' , i - 1 ) ;
	}	
	else if ( parent == 'number' ) {
		if ( number.test ( sbuffer ) ) {
			return parseFloat ( sbuffer ) ;
		}
		else {
			syn_error ( 'Unexpected token ILLEGAL' , i - 1 ) ;
		}
	}
	
	return output ;
}

function escape_str ( str ) {
	return str.replace ( /"/g , '\\"' )
		.replace ( /\\/g , '\\\\' )
		.replace ( /\//g , '/' ) 
		.replace ( /\b/g , '\\b' ) 
		.replace ( /\f/g , '\\f' ) 
		.replace ( /\n/g , '\\n' )
		.replace ( /\r/g , '\\r' ) 
		.replace ( /\t/g , '\\t' ) ;
}

function encode ( object ) {
	//encode 
	if ( toString ( object ) == '[object Array]' ) {
		var output = '[' ;
		for ( var i = 0 ; i < object.length ; i ++ ) {
			if ( i > 0 ) {
				output += ',' ;
			}
			output += encode ( object [ i ] ) ;
		}
		return output + ']' ;
	}
	else if ( toString ( object ) == '[object Object]' ) {
		var output = '{' ,
			i = 0 ;
		for ( var prop in object ) {
			if ( i > 0 ) {
				output += ',' ;
			}
			output += '"' + escape_str ( prop ) + '":' + encode ( object [ prop ] ) ;
			i ++ ;
		}
		return output + '}' ;
	}
	else if ( toString ( object ) == '[object Number]' ) {
		return String ( object ) ;
	}
	else if ( toString ( object ) == '[object String]' ) {
		return '"' + escape_str ( object ) + '"' ;
	}
	else {
		if ( object ) {
			return String ( object ) ;
		}
		return 'null' ;
	}
}

return {
	decode : decode ,
	encode : encode
} ;

} ) ( ) ;
