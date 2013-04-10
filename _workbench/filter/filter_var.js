function filter_var(input, filter, options) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Rafał Kukawski (http://kukawski.pl)
    // -    depends on: addslashes
    // -    depends on: htmlspecialchars
    // -    depends on: strip_tags
    // *     example 1: filter_var('true', 'FILTER_VALIDATE_BOOLEAN');
    // *     returns 1: true

    function is(val, type) {
        if (val == null) {
            return type === "null";
        }

        if (type === "primitive") {
            return val !== Object(val);
        }

        var actual = typeof val;

        if (actual === "object") {
            return {
                "[object Array]": "array",
                "[object RegExp]": "regex"
            } [Object.prototype.toString.call(val)] || "object";
        }

        if (actual === "number") {
            if (isNaN(val)) {
                return type === "nan";
            }

            if (!isFinite(val)) {
                return "inf";
            }
        }

        return type === actual;
    }

    function str2regex(str) {}

    function isPrimitive(val) {
        return val !== Object(val);
    }

    var supportedFilters = {
        FILTER_VALIDATE_INT: 257,
        FILTER_VALIDATE_BOOLEAN: 258,
        FILTER_VALIDATE_FLOAT: 259,
        FILTER_VALIDATE_REGEXP: 272,
        FILTER_VALIDATE_URL: 273,
        FILTER_VALIDATE_EMAIL: 274,
        FILTER_VALIDATE_IP: 275,

        FILTER_SANITIZE_STRING: 513,
        FILTER_SANITIZE_STRIPPED: 513,
        FILTER_SANITIZE_ENCODED: 514,
        FILTER_SANITIZE_SPECIAL_CHARS: 515,
        FILTER_UNSAFE_RAW: 516,
        FILTER_DEFAULT: 516,
        FILTER_SANITIZE_EMAIL: 517,
        FILTER_SANITIZE_URL: 518,
        FILTER_SANITIZE_NUMBER_INT: 519,
        FILTER_SANITIZE_NUMBER_FLOAT: 520,
        FILTER_SANITIZE_MAGIC_QUOTES: 521,
        // TODO: doesn't exist on my server. Add constant value
        FILTER_SANITIZE_FULL_SPECIAL_CHARS: -1,
        FILTER_CALLBACK: 1024
    };

    var supportedFlags = {
        FILTER_FLAG_ALLOW_OCTAL: 1,
        FILTER_FLAG_ALLOW_HEX: 2,
        FILTER_FLAG_STRIP_LOW: 4,
        FILTER_FLAG_STRIP_HIGH: 8,
        FILTER_FLAG_ENCODE_LOW: 16,
        FILTER_FLAG_ENCODE_HIGH: 32,
        FILTER_FLAG_ENCODE_AMP: 64,
        FILTER_FLAG_NO_ENCODE_QUOTES: 128,
        FILTER_FLAG_ALLOW_FRACTION: 4096,
        FILTER_FLAG_ALLOW_THOUSAND: 8192,
        FILTER_FLAG_ALLOW_SCIENTIFIC: 16384,
        FILTER_FLAG_PATH_REQUIRED: 262144,
        FILTER_FLAG_QUERY_REQUIRED: 524288,
        FILTER_FLAG_IPV4: 1048576,
        FILTER_FLAG_IPV6: 2097152,
        FILTER_FLAG_NO_RES_RANGE: 4194304,
        FILTER_FLAG_NO_PRIV_RANGE: 8388608,
        FILTER_NULL_ON_FAILURE: 134217728
    };

    if (is(filter, "null")) {
        filter = supportedFilters.FILTER_DEFAULT;
    } else if (is(filter, "string")) {
        filter = supportedFilters[filter];
    }

    var flags = 0;
    if (is(options, "number")) {
        flags = options;
    } else if (is(options, "string")) {
        flags = supportedFlags[options] || 0;
    } else if (is(options, "object") && is(options.flags, "number")) {
        flags = options.flags;
    }

    var opts = {};

    if (is(options, "object")) {
        opts = options.options || {};
    }

    // it looks like the FILTER_NULL_ON_FAILURE is used across all filters, not only FILTER_VALIDATE_BOOLEAN
    // thus the failure var
    var failure = (flags & supportedFlags.FILTER_NULL_ON_FAILURE) ? null: false;

    if (!is(filter, "number")) {
        // no numeric filter, return
        return failure;
    }

    // Shortcut for non-primitive values. All are failures
    if (!isPrimitive(input)) {
        return failure;
    }

    // if input is string, trim whitespace TODO: make a dependency on trim()?
    var data = is(input, "string") ? input.replace(/(^\s+)|(\s+$)/g, '') : input;

    switch (filter) {
    case supportedFilters.FILTER_VALIDATE_BOOLEAN:
        return /^(?:1|true|yes|on)$/i.test(data) || (/^(?:0|false|no|off)$/i.test(data) ? false: failure);

    case supportedFilters.FILTER_VALIDATE_INT:
        var numValue = +data;

        if (!/^(?:0|[+\-]?[1-9]\d*)$/.test(data)) {
            if ((flags & supportedFlags.FILTER_FLAG_ALLOW_HEX) && /^0x[\da-f]+$/i.test(data)) {
                numValue = parseInt(data, 16);
            } else if ((flags & supportedFlags.FILTER_FLAG_ALLOW_OCTAL) && /^0[0-7]+$/.test(data)) {
                numValue = parseInt(data, 8);
            } else {
                return failure;
            }
        }

        var minValue = is(opts.min_range, "number") ? opts.min_range: -Infinity;
        var maxValue = is(opts.max_range, "number") ? opts.max_range: Infinity;

        if (!is(numValue, "number") || numValue % 1 || numValue < minValue || numValue > maxValue) {
            return failure;
        }

        return numValue;

    case supportedFilters.FILTER_VALIDATE_REGEXP:
        if (is(options.regexp, "regex")) {
            // FIXME: we are passing pre-processed input data (trimmed data).
            // check whether PHP also passess trimmed input
            var matches = options.regexp(data)
            return matches ? matches[0] : failure;
        }
        // TODO: support passing regexes as strings "#regex#is"
    case supportedFilters.FILTER_VALIDATE_IP:
        var ipv4 = /^(25[0-5]|2[0-4]\d|[01]?\d?\d)\.(25[0-5]|2[0-4]\d|[01]?\d?\d)\.(25[0-5]|2[0-4]\d|[01]?\d?\d)\.(25[0-5]|2[0-4]\d|[01]?\d?\d)$/
        var ipv4privrange = /^(?:0?10|172\.0?(?:1[6-9]|2\d|3[01])|192\.168)\./;
        var ipv4resrange = /^(?:0?0?0\.|127\.0?0?0\.0?0?0\.0?0?1|128\.0?0?0\.|169\.254\.|191\.255\.|192\.0?0?0\.0?0?2\.|25[0-5]\.|2[34]\d\.|22[4-9]\.)/;
        // IPv6 regex taken from here: http://forums.intermapper.com/viewtopic.php?t=452
        var ipv6 = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/;

        var mode = (supportedFlags.FILTER_FLAG_IPV4 | supportedFlags.FILTER_FLAG_IPV6);

        if (flags !== 0) {
            mode &= flags;
        }

        if (mode & supportedFlags.FILTER_FLAG_IPV4) {
            var ip = ipv4.test(input);

            if (ip) {
                if ((flags & supportedFlags.FILTER_FLAG_NO_PRIV_RANGE) && privrange.test(data)) {
                    return failure;
                }

                if ((flags & supportedFlags.FILTER_FLAG_NO_RES_RANGE) && resrange.test(data)) {
                    return failure;
                }

                return input;
            }
        }

        if (mode & supportedFlags.FILTER_FLAG_IPV6) {
            var ip = ipv6.test(input);

            if (ip) {
                // TODO: check ipv6 ranges
                return input;
            }
        }

        return failure;

    case supportedFilters.FILTER_CALLBACK:
        var fn = opts;

        if (is(fn, "string")) {
            fn = this.window[fn];
        }

        if (is(fn, "function")) {
            return fn(input);
        }

        return failure;

    case supportedFilters.FILTER_SANITIZE_NUMBER_INT:
        return ("" + input).replace(/[^\d+\-]/g, "");

    case supportedFilters.FILTER_SANITIZE_NUMBER_FLOAT:
        return ('' + input).replace(/[^\deE.,+\-]/g, '').replace(/[eE.,]/g,
        function(m) {
            return {
                '.': (filter & supportedFilters.FILTER_FLAG_ALLOW_FRACTION) ? '.': '',
                ',': (filter & supportedFilters.FILTER_FLAG_ALLOW_THOUSAND) ? ',': '',
                'e': (filter & supportedFilters.FILTER_FLAG_ALLOW_SCIENTIFIC) ? 'e': '',
                'E': (filter & supportedFilters.FILTER_FLAG_ALLOW_SCIENTIFIC) ? 'e': ''
            } [m];
        });

        /*case supportedFilters.FILTER_SANITIZE_MAGIC_QUOTES:
            return this.addslashes(input); // ('' + input).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')*/

    case supportedFilters.FILTER_SANITIZE_URL:
        return ("" + data).replace(/[^a-zA-Z\d$\-_.+!*'(),{}|\\\^~\[\]`<>#%";\/?:@&=]/g, '');

    case supportedFilters.FILTER_SANITIZE_EMAIL:
        return ("" + data).replace(/[^a-zA-Z\d!#$%&'*+\-\/=?\^_`{|}~@.\[\]]/g, '');

    case supportedFilters.FILTER_DEFAULT:
        // is alias of FILTER_UNSAFE_RAW
        // fall-through
    case supportedFilters.FILTER_UNSAFE_RAW:
        data = input + "";

        if (flags & supportedFlags.FILTER_FLAG_ENCODE_AMP) {
            data = data.replace(/&/g, "&#38");
        }

        if ((supportedFlags.FILTER_FLAG_ENCODE_LOW |
        supportedFlags.FILTER_FLAG_STRIP_LOW |
        supportedFlags.FILTER_FLAG_ENCODE_HIGH |
        supportedFlags.FILTER_FLAG_STRIP_HIGH) &
        flags) {

            data = data.replace(/[\s\S]/g,
            function(c) {
                var charCode = c.charCodeAt(0);

                if (charCode < 32) {
                    return (flags & supportedFlags.FILTER_FLAG_STRIP_LOW) ? "":
                    (flags & supportedFlags.FILTER_FLAG_ENCODE_LOW) ? "&#" + charCode: c;
                } else if (charCode > 127) {
                    return (flags & supportedFlags.FILTER_FLAG_STRIP_HIGH) ? "": (flags & supportedFlags.FILTER_FLAG_ENCODE_HIGH) ? "&#" + charCode: c;
                }

                return c;
            });
        }

        return data;
    default:
        return false;
    }

    return false;
}
