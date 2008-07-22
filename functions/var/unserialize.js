function unserialize ( inp ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // +   improved by: Pedro Tainha (http://www.pedrotainha.com)
    // +   bugfixed by: dptr1988
    // *     example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld']

    error = 0;
    if (inp == "" || inp.length < 2) {
        errormsg = "input is too short";
        return;
    }
    var val, kret, vret, cval;
    var type = inp.charAt(0);
    var cont = inp.substring(2);
    var size = 0, divpos = 0, endcont = 0, rest = "", next = "";

    switch (type) {
    case "N": // null
        if (inp.charAt(1) != ";") {
            errormsg = "missing ; for null";
        }
        // leave val undefined
        rest = cont;
        break;
    case "b": // boolean
        if (!/[01];/.test(cont.substring(0,2))) {
            errormsg = "value not 0 or 1, or missing ; for boolean";
        }
        val = (cont.charAt(0) == "1");
        rest = cont.substring(2);  //changed...
        break;
    case "s": // string
        val = "";
        divpos = cont.indexOf(":");
        if (divpos == -1) {
            errormsg = "missing : for string";
            break;
        }
        size = parseInt(cont.substring(0, divpos));
        if (size == 0) {
            if (cont.length - divpos < 4) {
                errormsg = "string is too short";
                break;
            }
            rest = cont.substring(divpos + 4);
            break;
        }
        if ((cont.length - divpos - size) < 4) {
            errormsg = "string is too short";
            break;
        }
        if (cont.substring(divpos + 2 + size, divpos + 4 + size) != "\";") {
            errormsg = "string is too long, or missing \";";
        }
        val = cont.substring(divpos + 2, divpos + 2 + size);
        rest = cont.substring(divpos + 4 + size);
        break;
    case "i": // integer
    case "d": // float
        var dotfound = 0;
        for (var i = 0; i < cont.length; i++) {
            cval = cont.charAt(i);
            if (isNaN(parseInt(cval)) && !(type == "d" && cval == "." && !dotfound++)) {
                endcont = i;
                break;
            }
        }
        if (!endcont || cont.charAt(endcont) != ";") {
            errormsg = "missing or invalid value, or missing ; for int/float";
        }
        val = cont.substring(0, endcont);
        val = (type == "i" ? parseInt(val) : parseFloat(val));
        rest = cont.substring(endcont + 1);
        break;
    case "a": // array
        if (cont.length < 4) {
            errormsg = "array is too short";
            return;
        }
        divpos = cont.indexOf(":", 1);
        if (divpos == -1) {
            errormsg = "missing : for array";
            return;
        }
        size = parseInt(cont.substring(1*divpos, 0));  //changed...
        cont = cont.substring(divpos + 2);
        val = new Array();
        if (cont.length < 1) {
            errormsg = "array is too short";
            return;
        }
        for (var i = 0; i + 1 < size * 2; i += 2) {
            kret = unserialize(cont, 1);
            if (error || kret[0] == undefined || kret[1] == "") {
                errormsg = "missing or invalid key, or missing value for array";
                return;
            }
            vret = unserialize(kret[1], 1);
            if (error) {
                errormsg = "invalid value for array";
                return;
            }
            val[kret[0]] = vret[0];
            cont = vret[1];
        }
        if (cont.charAt(0) != "}") {
            errormsg = "missing ending }, or too many values for array";
            return;
        }
        rest = cont.substring(1);
        break;
    case "O": // object
        divpos = cont.indexOf(":");
        if (divpos == -1) {
            errormsg = "missing : for object";
            return;
        }
        size = parseInt(cont.substring(0, divpos));
        var objname = cont.substring(divpos + 2, divpos + 2 + size);
        if (cont.substring(divpos + 2 + size, divpos + 4 + size) != "\":") {
            errormsg = "object name is too long, or missing \":";
            return;
        }
        var objprops = unserialize("a:" + cont.substring(divpos + 4 + size), 1);
        if (error) {
            errormsg = "invalid object properties";
            return;
        }
        rest = objprops[1];
        var objout = "function " + objname + "(){";
        for (key in objprops[0]) {
            objout += "this['" + key + "']=objprops[0]['" + key + "'];";
        }
        objout += "}val=new " + objname + "();";
        eval(objout);
        break;
    default:
        errormsg = "invalid input type";
    }
    return (arguments.length == 1 ? val : [val, rest]);
}