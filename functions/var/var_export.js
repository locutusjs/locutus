function var_export(mixed_expression, bool_return) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: johnrembo
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // -    depends on: echo
    // *     example 1: var_export(null);
    // *     returns 1: null
    // *     example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
    // *     returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
    // *     example 3: data = 'Kevin';
    // *     example 3: var_export(data, true);
    // *     returns 3: "'Kevin'"

    var retstr = "";
    var iret = "";
    var cnt = 0;
    var x = [];
    var key = '', i = 0;
    
    var __getType = function( inp ) {
        var match, type = typeof inp;
        if (type == 'object' && inp.constructor && inp.constructor.name === 'PHPJS_Resource') {
            return 'resource';
        }
        if (type == 'object' && !inp) {
            return 'null'; // Should this be just null?
        }
        if (type == "object") {
            if (!inp.constructor) {
                return 'object';
            }
            var cons = inp.constructor.toString();
            if (match = cons.match(/(\w+)\(/)) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {
                if (cons == types[key]) {
                    type = types[key];
                    break;
                }
            }
        }
        return type;
    };
    var type = __getType(mixed_expression);
    
    if( type === null) {
        retstr = "NULL";
    } else if(type == 'array' || type == 'object') {
        for(i in mixed_expression) {
            x[cnt++] = var_export(i,true)+" => "+var_export(mixed_expression[i], true);
        }
        iret = x.join(',\n  ');
        retstr = "array (\n  "+iret+"\n)";
    }
    else if (type === 'resource') {
        retstr = 'NULL'; // Resources treated as null for var_export
    } else {
        retstr = (!isNaN( mixed_expression )) ? mixed_expression : "'" + mixed_expression.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0") + "'";
    }
    
    if(bool_return != true) {
        this.echo(retstr);
        return null;
    } else {
        return retstr;
    }
}