function ini_alter (varname, newvalue) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // -    depends on: ini_set
    // *     example 1: ini_alter('date.timezone', 'America/Chicago');
    // *     returns 1: 'Asia/Hong_Kong'
    return this.ini_set(varname, newvalue);
}