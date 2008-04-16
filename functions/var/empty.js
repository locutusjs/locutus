function empty( mixed_var ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // *     example 1: empty(null);
    // *     returns 1: true

    return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false  ||  ( is_array(mixed_var) && mixed_var.length === 0 ) );
}