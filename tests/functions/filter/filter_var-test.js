buster.testCase("FILTER_VALIDATE_BOOLEAN", {
    "it should recognize some obvious values": function () {
        var FILTER = "FILTER_VALIDATE_BOOLEAN";
        
        assert.same(true, filter_var("true", FILTER));
        assert.same(true, filter_var("1", FILTER));
        assert.same(true, filter_var("on", FILTER));
        assert.same(true, filter_var("yes", FILTER));
        
        assert.same(false, filter_var("false", FILTER));
        assert.same(false, filter_var("0", FILTER));
        assert.same(false, filter_var("off", FILTER));
        assert.same(false, filter_var("no", FILTER));
    },
    
    "it should return false or null on failure depending on FILTER_NULL_ON_FAILURE flag": function () {
        var FILTER = "FILTER_VALIDATE_BOOLEAN";
        
        // should return true, because "1" is treated as true
        assert.same(true, filter_var("1", FILTER, "FILTER_NULL_ON_FAILURE"));
        
        // these should fail the test, so null is expected
        assert.same(null, filter_var("", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(null, filter_var("foo", FILTER, "FILTER_NULL_ON_FAILURE"));

        // these will fail and return false, cause no FILTER_NULL_ON_FAILURE is set
        assert.same(false, filter_var("", FILTER));
        assert.same(false, filter_var("foo", FILTER));

        // these should pass the boolean test, so no null expected
        assert.same(false, filter_var("false", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var("0", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var("no", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var("off", FILTER, "FILTER_NULL_ON_FAILURE"));
    },

    "it should handle some non-string types": function () {
        var FILTER = "FILTER_VALIDATE_BOOLEAN";
        
        assert.same(true, filter_var(true, FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var(false, FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var(1, FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var(0, FILTER, "FILTER_NULL_ON_FAILURE"));
    },

    "it should ignore leading and trailing white-space characters": function () {
        var FILTER = "FILTER_VALIDATE_BOOLEAN", FLAGS = "FILTER_NULL_ON_FAILURE";
        
        assert.same(true, filter_var(" true", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var(" false", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var("\ttrue", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var("\ntrue", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var("true ", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var("true\t", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var("true\n", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(true, filter_var(" \t\r\ntrue\r\n\t ", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(false, filter_var(" \t\r\nfalse\r\n\t ", FILTER, "FILTER_NULL_ON_FAILURE"));
        assert.same(null, filter_var("tr ue", FILTER, "FILTER_NULL_ON_FAILURE"));
        // assuming the same works for on|off|yes|no
    },

    "it should be case insensitive": function () {
        assert.same(true, filter_var("TrUe", "FILTER_VALIDATE_BOOLEAN"));
        assert.same(false, filter_var("fAlSe", "FILTER_VALIDATE_BOOLEAN"));
    },

    "it should respond with null to strange data types": function () {
        var FILTER = "FILTER_VALIDATE_BOOLEAN", FLAGS = "FILTER_NULL_ON_FAILURE";
        
        assert.same(null, filter_var(null, FILTER, FLAGS));
        assert.same(null, filter_var(undefined, FILTER, FLAGS));
        assert.same(null, filter_var([], FILTER, FLAGS));
        assert.same(null, filter_var([0], FILTER, FLAGS));
        assert.same(null, filter_var([1], FILTER, FLAGS));
        assert.same(null, filter_var([false], FILTER, FLAGS));
        assert.same(null, filter_var([true], FILTER, FLAGS));
        assert.same(null, filter_var(["on"], FILTER, FLAGS));
        assert.same(null, filter_var({}, FILTER, FLAGS));
    },

    "it should accept numeric values for filter argument": function () {
        assert.same(true, filter_var("1", 258));
        assert.same(false, filter_var("0", 258));
        assert.same(null, filter_var("foo", 258, "FILTER_NULL_ON_FAILURE"));
    }
});

buster.testCase("FILTER_VALIDATE_INT", {
    "it should recognize numeric strings": function () {
        var FILTER = "FILTER_VALIDATE_INT";
        
        assert.same(0, filter_var("0", FILTER));
        assert.same(1, filter_var("1", FILTER));
        assert.same(1, filter_var("+1", FILTER));
        assert.same(-1, filter_var("-1", FILTER));
        assert.same(12, filter_var("+12", FILTER));
    },
    
    "it shouldn't treat some numeric strings as ints": function () {
        var FILTER = "FILTER_VALIDATE_INT";
        
        assert.same(false, filter_var("+0", FILTER));
        assert.same(false, filter_var("-0", FILTER));
        assert.same(false, filter_var("01", FILTER));
        assert.same(false, filter_var("2.5", FILTER));
    },
    
    "it should check if value is within a range": function () {
        var FILTER = "FILTER_VALIDATE_INT";
        
        assert.same(7, filter_var("7", FILTER, {options: {min_range: 0}}));
        assert.same(7, filter_var("7", FILTER, {options: {min_range: 7}}));
        assert.same(7, filter_var("7", FILTER, {options: {max_range: 7}}));
        assert.same(false, filter_var("7", FILTER, {options: {min_range: 10}}));
        assert.same(false, filter_var("7", FILTER, {options: {max_range: 6}}));
        assert.same(7, filter_var("7", FILTER, {options: {min_range: 0, max_range: 10}}));
        assert.same(7, filter_var("7", FILTER, {options: {min_range: 7, max_range: 7}}));
        assert.same(false, filter_var("7", FILTER, {options: {min_range: 8, max_range: 6}}));
    },
    
    "it should allow to pass hex and octal strings": function () {
        var FILTER = "FILTER_VALIDATE_INT";
        assert.same(255, filter_var("0xff", FILTER, "FILTER_FLAG_ALLOW_HEX"));
        assert.same(8, filter_var("010", FILTER, "FILTER_FLAG_ALLOW_OCTAL"));
    },
    
    "it should allow trailing white spaces": function () {
        var FILTER = "FILTER_VALIDATE_INT";
        
        assert.same(123, filter_var(" \t\r\n123 \t\r\n", FILTER));
    }
});

buster.testCase("FILTER_VALIDATE_FLOAT", {
    
});

buster.testCase("FILTER_VALIDATE_REGEXP", {
    
});

buster.testCase("FILTER_VALIDATE_URL", {
    
});

buster.testCase("FILTER_VALIDATE_EMAIL", {
    
});

buster.testCase("FILTER_VALIDATE_IP", {
    "it should recognize some values as valid IPv4": function () {
        var FILTER = "FILTER_VALIDATE_IP";
        
        assert.same("127.0.0.1", filter_var("127.0.0.1", FILTER));
        assert.same("87.233.214.186", filter_var("87.233.214.186", FILTER));
    },
    
    "it should recognize some values as valid IPv6": function () {
        var FILTER = "FILTER_VALIDATE_IP";
        
        assert.same("::1", filter_var("::1", FILTER));
    },
    
    "it should allow up to 2 leading zeros": function () {
        var FILTER = "FILTER_VALIDATE_IP";
        
        assert.same("127.0.00.001", filter_var("127.0.00.001", FILTER));
        assert.same(false, filter_var("127.00000000.0.1", FILTER));
    },
    
    "it shouldn't allow trailing white spaces": function () {
        var FILTER = "FILTER_VALIDATE_IP";
        
        assert.same(false, filter_var(" 127.0.0.1 ", FILTER));
        assert.same(false, filter_var(" \t\r\n127.0.0.1\r\n\t ", FILTER));
    }
});

buster.testCase("FILTER_SANITIZE_STRING", {
    
});

buster.testCase("FILTER_SANITIZE_STRIPPED", {
    
});

buster.testCase("FILTER_SANITIZE_ENCODED", {
    
});

buster.testCase("FILTER_SANITIZE_SPECIAL_CHARS", {
    
});

buster.testCase("FILTER_UNSAFE_RAW", {
    
});

buster.testCase("FILTER_SANITIZE_EMAIL", {
    "it should remove invalid characters": function () {
        var FILTER = "FILTER_SANITIZE_EMAIL";
        
        assert.same(filter_var("<>\\,", FILTER), "");
        assert.same(filter_var("ąęśćńźżół", FILTER), "");
    },
    
    "it shouldn't touch valid characters": function () {
        var FILTER = "FILTER_SANITIZE_EMAIL";
        
        assert.same("!#$%&'*+-/=?^_`{|}~@.[]", filter_var("!#$%&'*+-/=?^_`{|}~@.[]", FILTER));
        assert.same("0123456789", filter_var("0123456789", FILTER));
        assert.same("abcdefghijklmnopqrstuvwxyz", filter_var("abcdefghijklmnopqrstuvwxyz", FILTER));
        assert.same("ABCDEFGHIJKLMNOPQRSTUVWXYZ", filter_var("ABCDEFGHIJKLMNOPQRSTUVWXYZ", FILTER));
    }
});

buster.testCase("FILTER_SANITIZE_URL", {
    "it shouldn't touch valid characters": function () {
        var FILTER = "FILTER_SANITIZE_URL";
        
        assert.same(filter_var("0123456789", FILTER), "0123456789");
        assert.same("abcdefghijklmnopqrstuvwxyz", filter_var("abcdefghijklmnopqrstuvwxyz", FILTER));
        assert.same("ABCDEFGHIJKLMNOPQRSTUVWXYZ", filter_var("ABCDEFGHIJKLMNOPQRSTUVWXYZ", FILTER));
        assert.same(filter_var("$-_.+!*'(),{}|\\^~[]`<>#%\";/?:@&=", FILTER), "$-_.+!*'(),{}|\\^~[]`<>#%\";/?:@&=");
    },
    
    "it should remove invalid characters": function () {
        var FILTER = "FILTER_SANITIZE_URL";
        
        // TODO: extend
        assert.same(filter_var("ąęśćńźżół", FILTER), "");
    }
});

buster.testCase("FILTER_SANITIZE_NUMBER_INT", {
    "it should accept digits, + and - characters": function () {
        var FILTER = "FILTER_SANITIZE_NUMBER_INT";
        
        assert.same(filter_var("0123456789+-", FILTER), "0123456789+-");
    },
    
    "it should remove invalid characters": function () {
        var FILTER = "FILTER_SANITIZE_NUMBER_INT";
        
        assert.same(filter_var(" +-123.456\r\n\t ", FILTER), "+-123456");
    }
});

buster.testCase("FILTER_SANITIZE_NUMBER_FLOAT", {
    
});

buster.testCase("FILTER_SANITIZE_MAGIC_QUOTES", {
    
});

buster.testCase("FILTER_SANITIZE_FULL_SPECIAL_CHARS", {
    
});

buster.testCase("FILTER_CALLBACK", {
    "it should accept a callback function": function () {
        assert.same("bar", filter_var("foo", "FILTER_CALLBACK", {
            options: function () {
                return "bar";
            }
        }));
    }
});

buster.testCase("General function behavior", {
    "it should fall back to default when filter not given": function () {
        assert.same("    foo    ", filter_var("    foo    "));
        
    },
    
    "it should fail (return false/null) when filter is unknown": function () {
        assert.same(false, filter_var("foo", "UNKNOWN"));
    }
});