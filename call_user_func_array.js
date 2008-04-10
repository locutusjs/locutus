function call_user_func_array( strFunctionName , arrParam ){
    // http://kevin.vanzonneveld.net
    // +   original by: Thiago Mata (http://thiagomata.blog.com)
    // *     example 1: call_user_func_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: call_user_func_array('isNaN', [1]);
    // *     returns 2: false

    var strCommand = "";
    var i;

    strCommand += "return " + strFunctionName + "(";
    for( i = 0; i < arrParam.length; ++i ) {
        strCommand += "arrParam[" + i + "]" ;
        if( ( i + 1 ) != arrParam.length ) {
            strCommand += ",";
        }
    }
    strCommand += ")";
    var oFunction = new Function( "arrParam" , strCommand );
    return oFunction( arrParam );
}