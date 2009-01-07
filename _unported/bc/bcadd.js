function bcadd(left_operand,right_operand, scale) {
    // http://kevin.vanzonneveld.net
    // +   original by: Lance
    // -    depends on: bcsub
    // *     example 1: bcadd(4, 2);
    // *     returns 1: 0

    left_operand  = left_operand.toString();
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
        var r = "FALSE";
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
            var tp = (Multiplicand.charAt(c) * SingleDigitMultiplier) + parseInt(car);
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
                    };
                if (right_operand.search(/\./) == (-1)) right_operandMultiplier = ""; else {
                    right_operandMultiplier = RegExp.rightContext
                    };
                var TempMultiplier = Math.max(left_operandMultiplier.length,right_operandMultiplier.length)+"";
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
            var TempMultiplier = "";
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

    var answer = "";
    if (left_operand.charAt(0)!="-" && right_operand.charAt(0)=="-") {answer = bcsub(left_operand,bc_ss(right_operand), 10)}
    if (left_operand.charAt(0)=="-" && right_operand.charAt(0)!="-") {answer = bcsub(right_operand,bc_ss(left_operand), 10)}
    if (left_operand.charAt(0)=="-" && right_operand.charAt(0)=="-") {answer = bcsub(left_operand,bc_ss(right_operand), 10)}
    if (answer=="") {
        var left_operandLeftPad = "";
        var right_operandLeftPad = "";
        var left_operandRightPad = "";
        var right_operandRightPad = "";
        var left_operandRightSide = "";
        var right_operandRightSide = "";
        var left_operandLeftSide = "";
        var right_operandLeftSide = "";
        if (left_operand.search(/\./) == -1) {
            left_operandRightSide = "0";
            left_operandLeftSide = left_operand;
        } else {
            left_operandRightSide=RegExp.rightContext;
            left_operandLeftSide=RegExp.leftContext;
        }
        if (right_operand.search(/\./) == -1) {
            right_operandRightSide = "0";
            right_operandLeftSide = right_operand;
        } else {
            right_operandRightSide=RegExp.rightContext;
            right_operandLeftSide=RegExp.leftContext;
        }
        if (left_operandLeftSide.length > right_operandLeftSide.length) {
            right_operandLeftPad = bc_makestr("0",(left_operandLeftSide.length - right_operandLeftSide.length+"")+"");
        }
        if (left_operandLeftSide.length < right_operandLeftSide.length) {
            left_operandLeftPad = bc_makestr("0",(right_operandLeftSide.length - left_operandLeftSide.length)+"");
        }
        if (left_operandRightSide.length > right_operandRightSide.length) {
            right_operandRightPad = bc_makestr("0",(left_operandRightSide.length - right_operandRightSide.length)+"");
        }
        if (left_operandRightSide.length < right_operandRightSide.length) {
            left_operandRightPad = bc_makestr("0",(right_operandRightSide.length - left_operandRightSide.length)+"");
        }
        left_operand = left_operandLeftPad + left_operandLeftSide + "." + left_operandRightSide + left_operandRightPad;
        right_operand = right_operandLeftPad + right_operandLeftSide + "." + right_operandRightSide + right_operandRightPad;
        var CarryFlag = 0;
        answer = "";
        for (counter=left_operand.length-1; counter > (-1); counter--) {
            var temp = parseInt(left_operand.charAt(counter)) + parseInt(right_operand.charAt(counter)) + parseInt(CarryFlag);
            if ((temp > (-1)) && (temp < 20)) {
                if (temp > 9) {
                    CarryFlag = 1;
                    answer = temp-10 + answer;
                 } else {
                   CarryFlag = 0;
                   answer = temp + answer;
                 }
            } else {
                answer = "." + answer;
            }
        }
        if (CarryFlag == 1) {
            answer = "1" + answer;
        }
        answer = bc_trimzeros(answer);
    }
    return bc_trunc(answer, scale);
}