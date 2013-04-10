function unset () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var arr = ['a', 'b', 'c'];
    // *     example 1: unset('arr[1]');
    // *     returns 1: undefined

    // Must pass in a STRING to indicate the variable, not the variable itself (whether or not that evaluates to a string)
    // Works only on globals
    var i=0, arg = '', win='', winRef=/^(?:this)?window[.[]/, arr=[], accessor='', bracket=/\[['"]?(\d+)['"]?\]$/;
    for (i=0; i < arguments.length; i++) {
        arg = arguments[i];
        winRef.lastIndex = 0, bracket.lastIndex = 0;
        win = winRef.test(arg) ? '' : 'this.window.';
        if (bracket.test(arg)) {
            accessor = arg.match(bracket)[1];
            arr = eval(win+arg.replace(bracket, ''));
            arr.splice(accessor, 1); // We remove from the array entirely, rather than leaving a gap
        }
        else {
            eval('delete '+win+arg);
        }
    }
}
