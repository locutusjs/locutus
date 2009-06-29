function metaphone(word, phones){
    // +   original by: Greg Frazier
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: metaphone('Gnu');
    // *     returns 1: 'N'

    // As far as use of the String() constructor, author says "I vaguely remember something about Internet Explorer 6 giving me errors unless it was done that way"
    
	var wordlength = word.length,
        x = 0, tempchar = "",
        metaword = "";
	var removedbl = function(word){
		var wordlength = word.length,
		tempword = word.toLowerCase(),
		rebuilt,
		tempchar1, tempchar2,
		x;

		tempchar1 = tempword.charAt(0);
		rebuilt = tempchar1;
		for(x=1;x<wordlength;x++){
			tempchar2 = tempword.charAt(x);
			if(tempchar2 != tempchar1 || tempchar2 == 'c' || tempchar2 == 'g'){
				rebuilt += tempchar2;
			}
			tempchar1 = tempchar2;
		}
		return rebuilt;
	};
	var isVowel=function(a){
		switch(a.toLowerCase()) {
			case 'a': return true;
			case 'e': return true;
			case 'i': return true;
			case 'o': return true;
			case 'u': return true;
			default: return false;
		}
	};
	var tempword = removedbl(word.toLowerCase());

	//Special wh- case
	if(tempword.charAt(0) == 'w' && tempword.charAt(1) == 'h'){
		// Remove "h" and rebuild the string
		tempword = "w" + tempword.substr(2);
	}

	for(x=0; x<wordlength; x++){
		tempchar = String(tempword).charAt(x);
		if(x === 0 && x+1 <= wordlength){
			switch(tempchar){
				case 'a': if(tempword.charAt(x+1) == 'e'){ metaword += 'e'; }else{metaword += 'a';} break;
				case 'e': metaword += 'e'; break;
				case 'i': metaword += 'i'; break;
				case 'o': metaword += 'o'; break;
				case 'u': metaword += 'u'; break;
				case 'g': if(String(tempword).charAt(x+1) == 'n'){ x += 1; tempchar = String(tempword).charAt(x);} break;
				case 'k': if(String(tempword).charAt(x+1) == 'n'){ x += 1; tempchar = String(tempword).charAt(x);} break;
				case 'p': if(String(tempword).charAt(x+1) == 'n'){ x += 1; tempchar = String(tempword).charAt(x);} break;
				case 'w': if(String(tempword).charAt(x+1) == 'r'){ x += 1; tempchar = String(tempword).charAt(x); break;} break;
			}
		}
		if(isVowel(tempchar) === false){
			switch(tempchar){
				case 'b': if(String(tempword).charAt(x-1) == 'm'){ break;}else{metaword += 'b';} break;
				case 'c': if(x+1 <= wordlength){
							if(String(tempword).charAt(x+1) == 'h' && String(tempword).charAt(x-1) != 's'){
                                if (x === 0 && (x+2 <= wordlength) && isVowel(String(tempword).charAt(x+2))) {
                                    metaword += 'k';
                                } else {
                                    metaword += 'x';
                                }
                             }else if(String(tempword).charAt(x+1) == 'i' && String(tempword).charAt(x+2) == 'a'){ metaword += 'x';}
							else if(String(tempword).charAt(x+1) == 'i' || String(tempword).charAt(x+1) == 'e' || String(tempword).charAt(x+1) == 'y'){
								if(x > 0){
									if(String(tempword).charAt(x-1) == 's'){
										break;
									}else{
										metaword += 's';
									}
								}else{
									metaword += 's';
								}
							}else{
								metaword += 'k';
							}
						  }else{
							metaword += 'k';
						  }
						  break;
				case 'd': if(x+2 <= wordlength){
							if(String(tempword).charAt(x+1) == 'g'){
								if(String(tempword).charAt(x+2) == 'e' || String(tempword).charAt(x+2) == 'y' || String(tempword).charAt(x+2) == 'i'){
									metaword += 'j';
									x += 2;
								}else{
									metaword += 't';
								}
							}else{
								metaword += 't';
							}
						  }else{
								metaword += 't';
						  }
						  break;
				case 'f': metaword += 'f'; break;
				case 'g': if(x < wordlength){
							if((String(tempword).charAt(x+1) == 'n' && x+1 == wordlength - 1) || (String(tempword).charAt(x+1) == 'n' && String(tempword).charAt(x+2) == 's' && x+2 == wordlength - 1)){break;}
							if(String(tempword).charAt(x+1) == 'n' && String(tempword).charAt(x+2) == 'e' && String(tempword).charAt(x+3) == 'd' && x+3 == wordlength - 1){break;}
							if(String(tempword).charAt(x-1) == 'n' && String(tempword).charAt(x-2) == 'i' && x == wordlength - 1){break;}
							if(String(tempword).charAt(x+1) == 'h' && x+1 <= wordlength-1 && String(tempword).charAt(x-1) == 'u' && String(tempword).charAt(x-2) == 'o'){metaword += 'f';break;}
							if(String(tempword).charAt(x+1) == 'h' && x+2 <= wordlength){if(isVowel(String(tempword).charAt(x+2)) === false){break; /*silent*/ }else{metaword += 'k';}}
							else if(x+1 == wordlength){if(String(tempword).charAt(x+1) == 'n'){break;}else{metaword += 'k';}}
							else if(x+3 == wordlength){if(String(tempword).charAt(x+1) == 'n' && String(tempword).charAt(x+2) == 'e' && String(tempword).charAt(x+3) == 'd'){}else{metaword += 'k';}}
							else if(x+1 <= wordlength){if(String(tempword).charAt(x+1) == 'i' || String(tempword).charAt(x+1) == 'e' || String(tempword).charAt(x+1) == 'y'){
													if(String(tempword).charAt(x-1) != 'g'){ metaword += 'j';}
													}else if(x > 0){ if(String(tempword).charAt(x-1) == 'd'){
														switch(String(tempword).charAt(x+1)){
															case 'e':
															case 'y':
															case 'i': break;
															default: metaword += 'k';
														}
														}else{metaword += 'k';}
													}else{metaword += 'k';}
							}else{
								metaword += 'k';
							}
						  }else{
								metaword += 'k';
						  }
						  break;
				case 'm': metaword += 'm'; break;
				case 'j': metaword += 'j'; break;
				case 'n': metaword += 'n'; break;
				case 'q': metaword += 'k'; break;
				case 'r': metaword += 'r'; break;
				case 'l': metaword += 'l'; break;
				case 'v': metaword += 'f'; break;
				case 'z': metaword += 's'; break;
				case 'x': if(x === 0){metaword += 's';}else{metaword += 'ks';} break;
				case 'm': metaword += 'm'; break;
				case 'k': if(x > 0){ if(String(tempword).charAt(x-1) != 'c'){metaword += 'k';}}else{metaword += 'k';} break;
				case 'p': if(x+1 <= wordlength){if(String(tempword).charAt(x+1) == 'h'){metaword += 'f';}else{metaword +='p';}}else{metaword += 'p';} break;
				case 'y': if(x+1 <= wordlength){if(isVowel(String(tempword).charAt(x+1)) === true){metaword += 'y';}}else{metaword += 'y';} break;
				case 'h': if(x === 0 || ['c', 's', 'p', 't', 'g'].indexOf(String(tempword).charAt(x-1)) === -1) {
                            if(isVowel(String(tempword).charAt(x+1)) === true){metaword += 'h';}} break;
				case 's': if(x+1 <= wordlength){if(String(tempword).charAt(x+1) == 'h'){ metaword += 'x'; }
							else if(x+2 <= wordlength){if(String(tempword).charAt(x+1) == 'i'){if(String(tempword).charAt(x+2) == 'o' || String(tempword).charAt(x+2) == 'a'){metaword += 'x';}else{metaword += 's';}
							}else{metaword += 's';}}else{metaword += 's';}}else{metaword += 's';} break;
				case 't': if(x+1 <= wordlength){if(String(tempword).charAt(x+1) == 'h'){ metaword += '0'; }
							else if(x+2 <= wordlength){if(String(tempword).charAt(x+1) == 'i'){if(String(tempword).charAt(x+2) == 'o' || String(tempword).charAt(x+2) == 'a'){metaword += 'x';}else{metaword += 't';}
							}else{metaword += 't';}}else{metaword += 't';}}else{metaword += 't';} break;
				case 'w': if(x+1 <= wordlength){if(isVowel(String(tempword).charAt(x+1)) === true){metaword += 'w';}} break;
			}
		}
	}

    phones = parseInt(phones, 10);
    if (metaword.length > phones) {
        return metaword.substr(0, phones).toUpperCase();
    }
	return metaword.toUpperCase();
}
