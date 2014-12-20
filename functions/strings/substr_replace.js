function substr_replace(str, repl, start, length){
	/*
	discuss at: http://phpjs.org/functions/substr_replace/
	original by: Tobie Ebede
	
	substr_replace

		substr_replace — Replace text within a portion of a string

	Description

		mixed substr_replace ( mixed $string , mixed $replacement , mixed $start [, mixed $length ] )

		substr_replace() replaces a copy of string delimited by the start and (optionally) length parameters
		with the string given in replacement.

	Parameters

		string
			The input string.

			An array of strings can be provided, in which case the replacements will occur on each
			string in turn. In this case, the replacement, start and length parameters may be provided
			either as scalar values to be applied to each input string in turn, or as arrays, in which
			case the corresponding array element will be used for each input string.

		replacement
			The replacement string.

		start
			If start is positive, the replacing will begin at the start'th offset into string.

			If start is negative, the replacing will begin at the start'th character from the end of
			string.

		length
			If given and is positive, it represents the length of the portion of string which is to be
			replaced. If it is negative, it represents the number of characters from the end of string
			at which to stop replacing. If it is not given, then it will default to strlen( string );
			i.e. end the replacing at the end of string. Of course, if length is zero then this function
			will have the effect of inserting replacement into string at the given start offset.
	*/
	// Parrametres
	if(typeof(length)=="undefined"){
		length = str;
		if(typeof(length)=="object"){
			for(i=0;i!=length;i++){
				length[i]=length[i].length;
			}
		}else{
			length = length.length;
		}
	}
	if(typeof(start)=="object"){
		for(i=0;i!=start.length;i++){
			start[i]=parseInt(start[i]);
		}
	}else{
		start = parseInt(start);
	}
	if(typeof(length)=="object"){
		for(i=0;i!=length.length;i++){
			length[i]=parseInt(length[i]);
		}
	}else{
		length = parseInt(length);
	}
	x = Array();
	// Operation Principale
	function sub_rep_op(opstr, oprepl, opstart, oplength){
		if(opstart<0){opstart = opstr.length+opstart;}
		if(oplength<0){
			cut1 = opstr.substring(0, opstart+oplength);
			cut2 = opstr.substring(opstart+oplength, opstart);
			cut3 = opstr.substring(opstart, opstr.length);
		}else{
			cut1 = opstr.substring(0, opstart);
			cut2 = opstr.substring(opstart, opstart+oplength);
			cut3 = opstr.substring(opstart+oplength, opstr.length);
		}
		cut2 = oprepl;
		return cut1+cut2+cut3;
	}
	// CrÃ©ation du tableau des tÃ¢ches
	tache = Array();
	if(typeof(str)=="string"){
			tache[0] = Array(str);
	}else if(typeof(str)=="object"&&typeof(str[0])=="string"){
		for(i=0;i!=str.length;i++){
			tache[i] = Array(str[i]);
		}
	}
	for(i=0;i!=tache.length; i++){
		// Replacement
		if(typeof(repl)=="string"){
			// String Replacement
			tache[i][1]=repl;
		}else if(tache.length==1){
			// Array non-Relative Replacement
			tache[i][1]=repl;
		}else{
			// Array Relative Replacement
			tache[i][1]=repl[i];
		}
		// Start
		if(typeof(start)=="number"){
			// String Start
			tache[i][2]=start;
		}else if(tache.length==1){
			// Array non-Relative Start
			tache[i][2]=start;
		}else{
			// Array Relative Start
			tache[i][2]=start[i];
		}
		// Length
		if(typeof(length)=="number"){
			// String Length
			tache[i][3]=length;
		}else if(tache.length==1){
			// Array non-Relative Length
			tache[i][3]=length;
		}else{
			// Array Relative Length
			tache[i][3]=length[i];
		}
	}
	for(i=0;i!=tache.length;i++){
		opStr = tache[i][0];
		opRep = tache[i][1];
		opSta = tache[i][2];
		opLen = tache[i][3];
		op = Array();
		count = 1;
		if(typeof(opRep)=="object"&&opRep.length>count){
			count = opRep.length;
		}
		if(typeof(opSta)=="object"&&opSta.length>count){
			count = opSta.length;
		}
		if(typeof(opLen)=="object"&&opLen.length>count){
			count = opLen.length;
		}
		for(j=0;j!=count;j++){
			op[j] = Array();
			// Replacement
			if(typeof(opRep)=="string"){
				// String Replacement
				op[j][0]=opRep;
			}else{
				// Array Relative Replacement
				op[j][0]=opRep[j];
			}
			// Start
			if(typeof(opSta)=="number"){
				// String Start
				op[j][1]=opSta;
			}else{
				// Array Relative Start
				op[j][1]=opSta[j];
			}
			// Length
			if(typeof(opLen)=="number"){
				// String Length
				op[j][2]=opLen;
			}else{
				// Array Relative Length
				op[j][2]=opLen[j];
			}
		}
		syncString=opStr;
		for(j=0;j!=op.length;j++){
			syncString = sub_rep_op(syncString, op[j][0],op[j][1],op[j][2]);
		}
		x[i] = syncString;
	}
	if(x.length==1){
		return x[0];
	}else{
		return x;
	}
}
