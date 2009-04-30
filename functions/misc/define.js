function define(name, value) {
    // http://kevin.vanzonneveld.net
    // +      original by: Paulo Ricardo F. Santos
    // +       revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // + reimplemented by: Brett Zamir (http://brettz9.blogspot.com)
    // *        example 1: define('IMAGINARY_CONSTANT1', 'imaginary_value1');
    // *        results 1: IMAGINARY_CONSTANT1 == 'imaginary_value1'
    
    var define, replace, script;
    var toString = function (name, value) {
        return 'const ' + name + '=' + (
            /^(null|true|false|(\+|\-)?\d+(\.\d+)?)$/.test(value = String(value)) ? value : '"' + replace(value) + '"'
            );
    };
    try {
        eval('const e=1');
        replace = function (value){
            var replace = {
                "\x08":"b",
                "\x0A":"\\n",
                "\x0B":"v",
                "\x0C":"f",
                "\x0D":"\\r",
                '"':'"',
                "\\":"\\"
            };
            return value.replace(/\x08|[\x0A-\x0D]|"|\\/g, function(value){
                return "\\"+replace[value];
            });
        };
        define = function (name, value){
            if (document.createElementNS) {
                script = document.createElementNS('http://www.w3.org/1999/xhtml', 'script');
            } else {
                script = document.createElement('script');
            }
            script.type = 'text/javascript';
            script.appendChild(document.createTextNode(toString(name, value)));
            document.documentElement.appendChild(script);
            document.documentElement.removeChild(script);
        };
    } catch (e){
        replace = function (value) {
            var replace = {
                "\x0A":"\\n",
                "\x0D":"\\r"
            };
            return value.replace(/"/g, '""').replace(/\n|\r/g, function(value){
                return replace[value];
            });
        };
        define = this.execScript ?
        function (name, value){
            execScript(toString(name, value), 'VBScript');
        }:
        function (name, value){
            eval(toString(name, value).substring(6));
        };
    }
    define(name, value);
}