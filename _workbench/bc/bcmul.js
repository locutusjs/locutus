function bcmul(left_operand, right_operand, scale) {
    // http://kevin.vanzonneveld.net
    // +   original by: Lance
    // -    depends on: bcadd
    // *     example 1: bcmul(4, 2);
    // *     returns 1: 0

    left_operand = left_operand.toString();
    right_operand = right_operand.toString();

    // BC Math Support functions
    var bc_trimzeros = function(ba) {
        if (ba.search(/\./i) == -1) {
            ba = ba + ".0";
        }
        if (ba.charAt(0) == ".") {
            ba = "0" + ba;
        }
        while (ba.charAt(ba.length - 1) == "0") {
            ba = ba.substring(0,ba.length - 1);
        }
        if (ba.charAt(ba.length - 1) == ".") {
            ba = ba.substring(0,ba.length - 1);
        }
        while ((ba.length>1) && (ba.charAt(0)=="0") && (ba.charAt(1)!=".")) {
            ba = ba.substring(1,ba.length);
        }
        return ba;
    }
    var bc_makestr = function(sym, mul) {
        var CompoundString="";
        while (bc_is_equal(mul,"0") == "FALSE") {
            CompoundString = CompoundString + sym;
            mul = bcsub(mul,"1", 10);
        }
        return CompoundString;
    }
    var bc_is_equal = function(op1, op2) {
        var c=0, r = "FALSE";
        if (op1.length == op2.length) {
            r = "TRUE";
            for (c = 0; c < op1.length; c++) {
                if (op1.charAt(c) != op2.charAt(c)) {
                    r = "FALSE";
                }
            }
        }
        return r;
    }
    var bc_trunc = function(number, scale) {
        var x=number.split('.');
        if (x.length == 1) return number;
        if (scale == 0) return x[0];
        x = x[0] + '.' + x[1].substr(0, scale);
        return x;
    }
    var bc_sp = function(Multiplicand, SingleDigitMultiplier) {
        var car = "0";
        var sp = "";
        var tp = "0";
        for (var c = Multiplicand.length-1; c > (-1); c--) {
            tp = (Multiplicand.charAt(c) * SingleDigitMultiplier) + parseInt(car);
            if (tp < 10) {
                tp = "0" + tp
            }
            car = (tp + "").charAt(0);
            sp = (tp + "").charAt(1) + sp;
        }
        if (car != "0") {
            sp = (car + sp)
        }
        return sp;
    }
    var bc_is_less_than = function(op1,op2) {
        var Result = "";
        if (op1.charAt(0) == "-" && op2.charAt(0) !="-") {
            Result = "TRUE"
            }
        if (op1.charAt(0) != "-" && op2.charAt(0) =="-") {
            Result = "FALSE"
            }
        if (bc_is_equal(op1,op2) == "TRUE") {
            Result = "FALSE"
            }
        if (op1.charAt(0) == "-" && op2.charAt(0) =="-") {
            Result = bc_is_less_than(bc_ss(op2),bc_ss(op1))
            }
        if (Result == "") {
            var type = "";
            var AnswerArray1 = op1.split(".");
            var AnswerArray2 = op2.split(".");
            if (AnswerArray1[0] == "") {
                AnswerArray1[0] = "0";
            }
            type = typeof AnswerArray1[1];
            if (type == "undefined") {
                AnswerArray1[1] = "0";
            }
            if (AnswerArray2[0] == "") {
                AnswerArray2[0] = "0";
            }
            type = typeof AnswerArray2[1];
            if (type == "undefined") {
                AnswerArray2[1] = "0";
            }
            op1 = AnswerArray1[0] + "." + AnswerArray1[1];
            op2 = AnswerArray2[0] + "." + AnswerArray2[1];
            if (AnswerArray1[1].length > AnswerArray2[1].length) {
                op2 += bc_makestr("0",AnswerArray1[1].length-AnswerArray2[1].length+"");
            }
            if (AnswerArray2[1].length > AnswerArray1[1].length) {
                op1 += bc_makestr("0",AnswerArray2[1].length-AnswerArray1[1].length+"");
            }
            if (AnswerArray1[0].length > AnswerArray2[0].length) {
                op2 = bc_makestr("0",AnswerArray1[0].length-AnswerArray2[0].length+"") + op2;
            }
            if (AnswerArray2[0].length > AnswerArray1[0].length) {
                op1 = bc_makestr("0",AnswerArray2[0].length-AnswerArray1[0].length+"") + op1;
            }
            var counter = 0;
            while ((Result=="") && (counter < op1.length)) {
                if (op2.charAt(counter) < op1.charAt(counter)) {
                    Result = "FALSE";
                }
                if (op2.charAt(counter) > op1.charAt(counter)) {
                    Result = "TRUE";
                }
                counter++;
            }
        }
        return Result;
    }
    var bc_is_greater_than = function(op1,op2) {
        var Result = "";
        if (op1.charAt(0) == "-" && op2.charAt(0) !="-") {
            Result = "FALSE"
            }
        if (op1.charAt(0) != "-" && op2.charAt(0) =="-") {
            Result = "TRUE"
            }
        if (bc_is_equal(op1,op2) == "TRUE") {
            Result = "FALSE"
            }
        if (op1.charAt(0) == "-" && op2.charAt(0) =="-") {
            Result = bc_is_greater_than(bc_ss(op2),bc_ss(op1))
            }
        if (Result == "") {
            var type = "";
            var AnswerArray1 = op1.split("."); // Split into an array
            var AnswerArray2 = op2.split("."); // Split into an array
            if (AnswerArray1[0] == "") {
                AnswerArray1[0] = "0";
            }
            type = typeof AnswerArray1[1];
            if (type == "undefined") {
                AnswerArray1[1] = "0";
            }
            if (AnswerArray2[0] == "") {
                AnswerArray2[0] = "0";
            }
            type = typeof AnswerArray2[1];
            if (type == "undefined") {
                AnswerArray2[1] = "0";
            }
            op1 = AnswerArray1[0] + "." + AnswerArray1[1];
            op2 = AnswerArray2[0] + "." + AnswerArray2[1];
            if (AnswerArray1[1].length > AnswerArray2[1].length) {
                op2 += bc_makestr("0",AnswerArray1[1].length-AnswerArray2[1].length+"");
            }
            if (AnswerArray2[1].length > AnswerArray1[1].length) {
                op1 += bc_makestr("0",AnswerArray2[1].length-AnswerArray1[1].length+"");
            }
            if (AnswerArray1[0].length > AnswerArray2[0].length) {
                op2 = bc_makestr("0",AnswerArray1[0].length-AnswerArray2[0].length+"") + op2;
            }
            if (AnswerArray2[0].length > AnswerArray1[0].length) {
                op1 = bc_makestr("0",AnswerArray2[0].length-AnswerArray1[0].length+"") + op1;
            }
            var counter = 0;
            while ((Result=="") && (counter < op1.length))  {
                if (op2.charAt(counter) < op1.charAt(counter)) {
                    Result = "TRUE"
                    }
                if (op2.charAt(counter) > op1.charAt(counter)) {
                    Result = "FALSE"
                    }
                counter++;
            }
        }
        return Result;
    }
    var bc_divide_operation = function(right_operand, left_operand) {
        var TempMultiplier = "", NumberOfZeroes;
        // Declare variables
        var Quotient = "";
        var Remainder = "";
        var Answer = "";
        var QuotientSign = "";
        var counterDiv = 0;
        var DivHashTable = new Array(10);
        var Oldleft_operand;
        var Oldright_operand;
        var temp = "";
        if (left_operand == "0") {
            Quotient = "Undefined";
            Remainder = "Undefined";
        }
        if (right_operand == "0" && !Quotient) {
            Quotient = "0";
            Remainder = "0";
        }
        if (!Quotient && left_operand.charAt(0)!="-" && right_operand.charAt(0)=="-") {
            QuotientSign = "-";
            right_operand = right_operand.substring(1,right_operand.length)
        }
        if (!Quotient && left_operand.charAt(0)=="-" && right_operand.charAt(0)!="-") {
            QuotientSign = "-";
            left_operand = left_operand.substring(1,left_operand.length);
        }
        if (!Quotient && left_operand.charAt(0)=="-" && right_operand.charAt(0)=="-") {
            right_operand = right_operand.substring(1,right_operand.length);
            left_operand = left_operand.substring(1,left_operand.length);
        }
        if (bc_is_less_than(right_operand,left_operand) == "TRUE" && !Quotient) {
            Quotient = "0";
            Remainder = right_operand;
        }
        if (bc_is_equal(left_operand,right_operand) == "TRUE" && !Quotient) {
            Quotient = "1";
            Remainder = "0";
        }
        if (left_operand == "1" && !Quotient) {
            Quotient = right_operand;
            Remainder = "0";
        }
        if (Quotient == "") {
            Oldleft_operand = left_operand;
            Oldright_operand = right_operand;
            if ((left_operand.search(/\./) == -1) && (right_operand.search(/\./) == -1)) {
            // nothing
            } else {
                var Throwaway = "";
                var left_operandMultiplier = "";
                var right_operandMultiplier = "";
                if (left_operand.search(/\./) == (-1)) left_operandMultiplier = ""; else {
                    left_operandMultiplier = RegExp.rightContext
                    }
                if (right_operand.search(/\./) == (-1)) right_operandMultiplier = ""; else {
                    right_operandMultiplier = RegExp.rightContext
                    }
                TempMultiplier = Math.max(left_operandMultiplier.length,right_operandMultiplier.length)+"";
                TempMultiplier = "1" + bc_makestr("0",TempMultiplier+""); // Build the Multiplier
                left_operand=bcmul(left_operand,TempMultiplier,10); // Perform the Big Multiplication
                right_operand=bcmul(right_operand,TempMultiplier,10); // Perform the Big Multiplication
            }
            for (counterDiv = 0; counterDiv < 10; counterDiv++) {
                DivHashTable[counterDiv] = bcmul(left_operand,(counterDiv + ''), 10); // the "+''" converts counterDiv to a string
            }
            var CurrentAnswer = "";
            var Newright_operand = right_operand;
            var Pointer = "";
            var right_operandMultiplierSubstring = "";
            TempMultiplier = "";
            var HashCounter;
            while ((bc_is_greater_than(Newright_operand,left_operand) == "TRUE") || (bc_is_equal(Newright_operand,left_operand) == "TRUE")) {
                Pointer = 1;
                while (bc_is_less_than(Newright_operand.substring(0,Pointer),left_operand) == "TRUE") {
                    Pointer++ ;
                }
                right_operandMultiplierSubstring = Newright_operand.substring(0,Pointer);
                HashCounter = 9;
                while (bc_is_greater_than(DivHashTable[HashCounter]+"",right_operandMultiplierSubstring) == "TRUE") {
                    HashCounter-- ;
                }
                TempMultiplier = HashCounter+"" + bc_makestr("0",Newright_operand.length-right_operandMultiplierSubstring.length+"");
                CurrentAnswer = bcadd(CurrentAnswer,TempMultiplier,10);
                Newright_operand = bcsub(Newright_operand,bcmul(left_operand,TempMultiplier,10),10);
            }
            Quotient = CurrentAnswer;
            Remainder = bcsub(Oldright_operand,bcmul(Oldleft_operand,Quotient,10),10);
        }
        return {
            div: (QuotientSign + Quotient),
            mod: Remainder
        };
    }
    var bc_ss = function(Arg) {
        if (Arg.charAt(0)=="-") {
            Arg = Arg.substring(1,Arg.length);
        } else {
            Arg="-"+Arg;
        }
        return Arg;
    }
    // End BC Math Support functions


    var p='';
    var ds='0';
    var ps='';
    // Determine the Product Sign and render both numbers positive
    if (left_operand.charAt(0) == "-" && right_operand.charAt(0) != "-") {
        ps = "-"
    }
    if (left_operand.charAt(0) != "-" && right_operand.charAt(0) == "-") {
        ps = "-"
    }
    if (left_operand.charAt(0) == "-") {
        left_operand = left_operand.substring(1,left_operand.length)
    }
    if (right_operand.charAt(0) == "-") {
        right_operand = right_operand.substring(1,right_operand.length)
    }
    // Handle the easy cases (when either the Muliplicand or the right_operand is "1" or "0")
    if (bc_trimzeros(left_operand) == "0"){
        p = "0";
        ps="";
    }
    if (bc_trimzeros(right_operand) == "0") {
        p = "0";
        ps="";
    }
    if (bc_trimzeros(left_operand) == "1") {
        p = right_operand;
    }
    if (bc_trimzeros(right_operand) == "1") {
        p = left_operand;
    }
    if (p == "")  {
        ds = 0;
        var dsleft_operand = left_operand.length-(left_operand.indexOf(".")+1);
        var dsright_operand = right_operand.length-(right_operand.indexOf(".")+1);
        if(dsleft_operand == left_operand.length) {
            dsleft_operand = 0;
        }
        if(dsright_operand == right_operand.length) {
            dsright_operand = 0;
        }
        ds = dsright_operand + dsleft_operand;
        left_operand=bc_trimzeros(left_operand.replace(".",""));
        right_operand=bc_trimzeros(right_operand.replace(".",""));
        p = "0";
        for (var counter = right_operand.length-1; counter > -1; counter--) {
            NumberOfZeroes = bc_makestr("0",right_operand.length - counter - 1+"");
            p = bcadd(p,(bc_sp(left_operand,right_operand.charAt(counter)) + NumberOfZeroes), 10);
        }
        if (ds > p.length) {
            p = "0." + bc_makestr("0",ds - p.length + "") + p;
        } else if (ds == p.length) {
            p = "0." + p;
        } else if (ds < p.length) {
            p = p.substr(0,p.length - ds) + "." + p.substr(p.length - ds,ds);
        }
    }
    p = bc_trimzeros(ps + p);
    
    return bc_trunc(p, scale);
}