function substr_replace(str, repl, start, length){
  //  discuss at: http://phpjs.org/functions/substr_replace/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
  //   returns 1: 'bob'
  //   example 2: $var = 'ABCDEFGH:/MNRPQR/';
  //   example 2: substr_replace($var, 'bob', 0, $var.length);
  //   returns 2: 'bob'
  //   example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
  //   returns 3: 'bobABCDEFGH:/MNRPQR/'
  //   example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
  //   returns 4: 'ABCDEFGH:bobMNRPQR/'
  //   example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
  //   returns 5: 'ABCDEFGH:bobMNRPQR/'
  //   example 6: substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)
  //   returns 6: 'ABCDEFGH:MNRPQR/'
  //   example 7: substr_replace('ABCDEFGH:/MNRPQR/', ['1', '2', '3'], 9, 0)
  //   returns 7: 'ABCDEFGH:321/MNRPQR/'
  //   example 8: substr_replace('ABCDEFGH:/MNRPQR/', ['1', '2', '3'], [10, 11, 12], 2)
  //   returns 8: 'ABCDEFGH:/123/'
  //   example 9: substr_replace('ABCDEFGH:/MNRPQR/', ['1', '2', '3'], [0, 3, 5], [8, 6, 0])
  //   returns 9: '1:/2/3'
  //   example 10: substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], 'YYY', 3, 3)
  //   returns 10: 'A: YYY,B: YYY,C: YYY'
  //   example 11: substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], ['AAA', 'BBB', 'CCC'], 3, 3)
  //   returns 11: 'A: AAA,B: BBB,C: CCC'
  //   example 12: substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], ['AAA', 'BBB', 'CCC'], 3, [1, 2, 3])
  //   returns 12: 'A: AAAXX,B: BBBX,C: CCC'
  //   example 13: substr_replace(['A: XXXXX', 'B: XXXXX', 'C: XXXXX'], ['AAA', 'BBB', 'CCC'], [3, 4, 5], [1, 2, 3])
  //   returns 13: 'A: AAAXXXX,B: XBBBXX,C: XXCCC'

	if(typeof(length)=="undefined"){// Parrametres
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
