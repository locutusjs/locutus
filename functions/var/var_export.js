function var_export ( mixed_expression, bool_return ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // -    depends on: echo
    // *     example 1: var_export(null);
    // *     returns 1: 'NULL'

    var __pad_lines = function ( x ) {
        return x.split("\n").join("\n  ");
    };
    
    var retstr = "";
    
    if(mixed_expression instanceof Array) {
        var iret = "";
        for(i in mixed_expression) {
            iret=iret+"\n"+var_export(i,true)+" => "+var_export(mixed_expression[i], true)+",";
        }
        retstr = "array ("+__pad_lines(iret)+"\n)";
    } else if( mixed_expression === null) {
        retstr = "NULL";
    } else {
        retstr = (!isNaN( mixed_expression )) ? mixed_expression : "'" + mixed_expression.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0") + "'";
    }
    
    if(bool_return != true) {
        echo(retstr);
        return null;
    }
    else {
        return retstr;
    }
}

