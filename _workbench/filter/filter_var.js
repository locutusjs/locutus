function filter_var (v, filter, options) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: filter_var('true', 'FILTER_VALIDATE_BOOLEAN');
    // *     returns 1: true

    var OPTS = {
            FILTER_VALIDATE_BOOLEAN: 1,
            
        }, 
        FLAGS = {
            FILTER_NULL_ON_FAILURE: 1,
        },
        getOption = function (option, OPTIONS) {
            var optionNames = 0, fl = 0;
            if (typeof option === 'number') { // Allow for a single string or an array of string option
                optionNames = option;
            } else {
                option = [].concat(option);
                for (i = 0, fl = option.length; i < fl; i++) {
                    if (OPTIONS[option[i]]) {
                        optionNames = optionNames | OPTIONS[option[i]];
                    }
                }
            }
            return optionNames;
        };
    filter = getOption(filter, OPTS);
    options = getOption(options, FLAGS);
    
    if (filter & OPTS.option_VALIDATE_BOOLEAN) {
        return (/^(?:1|true|on|yes)$/).test(v) || 
            (
                ((options & FLAGS.option_NULL_ON_FAILURE) && 
                    !(/^(?:0|false|off|no)?$/).test(v)) ? null : false
            );
    }
    
}