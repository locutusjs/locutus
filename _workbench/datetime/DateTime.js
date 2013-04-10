function DateTime (time, timezone) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: strtotime
    // -    depends on: DateInterval
    // *     example 1: var tzo = timezone_open('Asia/Hong_Kong');
    // *     example 1: new DateTime('now', tzo);
    // *     returns 1: {}

    // Incomplete

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    if (!this.php_js.Relator) {
        this.php_js.Relator = function () {// Used this functional class for giving privacy to the class we are creating
            // Code adapted from http://www.devpro.it/code/192.html
            // Relator explained at http://webreflection.blogspot.com/2008/07/javascript-relator-object-aka.html
            // Its use as privacy technique described at http://webreflection.blogspot.com/2008/10/new-relator-object-plus-unshared.html
            // 1) At top of closure, put: var __ = Relator.$();
            // 2) In constructor, put: var _ = __.constructor(this);
            // 3) At top of each prototype method, put: var _ = __.method(this);
            // 4) Use like:  _.privateVar = 5;
            function _indexOf (value) {
                for (var i = 0, length=this.length; i < length; i++) {
                    if (this[i] === value) {
                        return i;
                    }
                }
                return -1;
            }
            function Relator () {
                var Stack = [], Array = [];
                if (!Stack.indexOf) {
                    Stack.indexOf = _indexOf;
                }
                return {
                    // create a new relator
                    $ : function () {
                        return Relator();
                    },
                    constructor : function (that) {
                        var i = Stack.indexOf(that);
                        ~i ? Array[i] : Array[Stack.push(that) - 1] = {};
                        this.method(that).that = that;
                        return this.method(that);
                    },
                    method : function (that) {
                        return Array[Stack.indexOf(that)];
                    }
                };
            }
            return Relator();
        }();
    }
    // END REDUNDANT

    var __ = this.php_js.DateTimeRelator = this.php_js.DateTimeRelator || this.php_js.Relator.$(),
        _ = __.constructor(this),
        that = this;

    // DateInterval Returned by DateTime.diff()  (cf. date_interval_create_from_date_string())

    // Redefine DateTimeZone here for use below (see timezone_open())

    if (!this.DateTime.prototype.add) {
        var DateTime = this.DateTime;
        DateTime.prototype = {
            constructor: DateTime,
            add : function (/*DateInterval*/ interval) {
                return this;
            },
            diff : function (/*DateTime*/ datetime, /*optional bool*/ absolute) {return DateInterval;},
            format : function (/*string*/ format) {return '';},
            getOffset : function () {return 0;},
            getTimestamp : function () {var _ = __.method(this);
                return that.strtotime(_.time + ' +' + $timezone_offset + ' hours');
            },
            getTimezone : function () {var _ = __.method(this);
                return that.timezone_open(_.timezone);
            },
            modify : function (/*string */ modify) {return this;},
            setDate : function (/*int*/ year, /*int*/ month , /*int*/ day) {return this;},
            setISODate : function (/*int*/ year, /*int*/ week, /*optional int*/ day) {return this;},
            setTime : function (/*int*/ hour , /*int*/ minute, /*optional int*/ second) {return this;},
            setTimestamp : function (/*int*/ unixtimestamp) {return this;},
            setTimezone : function (/*DateTimeZone*/ timezone) {return this;},
            sub : function (/*DateInterval*/ interval) {return this;},
            __wakeup : function () {
                return new DateTime();
            }
        };
        DateTime.createFromFormat = function (/*string*/ format , /*string*/ time, /*optional DateTimeZone*/ timezone) {
            return new DateTime();
        }
        DateTime.__set_state = function (/*array*/ array) {
            return new DateTime();
        }
        DateTime.getLastErrors = function () {
            return [];
        };

        DateTime.ATOM  = 'Y-m-d\\TH:i:sP';
        DateTime.COOKIE = 'l, d-M-y H:i:s T';
        DateTime.ISO8601 = 'Y-m-d\\TH:i:sO';
        DateTime.RFC822 = 'D, d M y H:i:s O';
        DateTime.RFC850 = 'l, d-M-y H:i:s T';
        DateTime.RFC1036 = 'D, d M y H:i:s O';
        DateTime.RFC1123 = 'D, d M Y H:i:s O';
        DateTime.RFC2822 = 'D, d M Y H:i:s O';
        DateTime.RFC3339 = 'Y-m-d\\TH:i:sP';
        DateTime.RSS = 'D, d M Y H:i:s O';
        DateTime.W3C = 'Y-m-d\\TH:i:sP';
    }

    // Depends on strtotime() and optionally accepts DateTimeZone object
    if (!time) {
        time = 'now';
    }
    _.time = time;

    if (!timezone) {
        _.timezone = null;
    }
    else {
        _.timezone = timezone.getName();
    }

}
