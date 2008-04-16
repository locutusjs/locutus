function compact ( var_names ) {
    // http://kevin.vanzonneveld.net
    // +   original by: _argos
    // *     example 1: compact('var1', 'var2');
    // *     returns 1: {}

    var Index = 0, Matrix = {};
    var process = function ( value ) {
        for ( var i = 0; i < value.length; i++ ) {
            var key_value = value [ i ];
            if ( key_value instanceof Array ) {
                process ( key_value );
            } else {
                if ( typeof window [ key_value ] !== 'undefined' ) {
                    Matrix [ key_value ] = window [ key_value ];
                }
            }
        }
        return true;
    };

    process ( arguments );
    return Matrix;
}