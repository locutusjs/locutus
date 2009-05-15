function register_shutdown_function (cb) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: register_shutdown_function(function(first, middle, last) {alert('Goodbye '+first+' '+middle+' '+last+'!');}, 'Kevin', 'van', 'Zonneveld');
    // *     returns 1: 'Goodbye Kevin van Zonneveld!'
    var args=[];

    args = Array.prototype.slice.call(arguments, 1);
    this.window.addEventListener('unload', function () {
        cb.apply(null, args);
    }, false);
}