/* 
 * More info at: http://kevin.vanzonneveld.net/techblog/article/phpjs_licensing/
 * 
 * This is version: 2.19
 * php.js is copyright 2008 Kevin van Zonneveld.
 * 
 * Portions copyright Brett Zamir, Onno Marsman, Michael White
 * (http://getsprink.com), Waldo Malqui Silva, Paulo Ricardo F. Santos, Jack,
 * Jonas Raoni Soares Silva (http://www.jsfromhell.com), Philip Peterson, Ates
 * Goral (http://magnetiq.com), Legaev Andrey, Martijn Wieringa, Nate, Enrique
 * Gonzalez, Philippe Baumann, Webtoolkit.info (http://www.webtoolkit.info/),
 * Ash Searle (http://hexmen.com/blog/), Carlos R. L. Rodrigues
 * (http://www.jsfromhell.com), Jani Hartikainen, Erkekjetter, GeekFG
 * (http://geekfg.blogspot.com), Johnny Mast (http://www.phpvrouwen.nl), d3x,
 * marrtins, AJ, Alex, Alfonso Jimenez (http://www.alfonsojimenez.com), Aman
 * Gupta, Arpad Ray (mailto:arpad@php.net), Karol Kowalski, Marc Palau, Mirek
 * Slugen, Public Domain (http://www.json.org/json2.js), Sakimori, Steve
 * Hilder, Steven Levithan (http://blog.stevenlevithan.com), Thunder.m, Tyler
 * Akins (http://rumkin.com), gorthaur, mdsjack (http://www.mdsjack.bo.it),
 * 0m3r, Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), Allan Jensen
 * (http://www.winternet.no), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Andreas, Andrej Pavlovic, Anton
 * Ongson, Arno, Atli Þór, Bayron Guevara, Ben Bryan, Benjamin Lupton, Brad
 * Touesnard, Bryan Elliott, Cagri Ekin, Caio Ariede (http://caioariede.com),
 * Christian Doebler, Cord, David, David James, David Randall, Der Simon
 * (http://innerdom.sourceforge.net/), Dino, Diogo Resende, Douglas Crockford
 * (http://javascript.crockford.com), DxGx, FGFEmperor, Felix Geisendoerfer
 * (http://www.debuggable.com/felix), Francesco, Francois, FremyCompany,
 * Gabriel Paderni, Garagoth, Gilbert, Howard Yeend, Hyam Singer
 * (http://www.impact-computing.com/), J A R, Jalal Berrami, Kirk Strobeck,
 * Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre)), LH, Leslie
 * Hoare, Lincoln Ramsay, Linuxworld, Luke Godfrey, Luke Smith
 * (http://lucassmith.name), Manish, Martin Pool, Mateusz "loonquawl" Zalega,
 * Matt Bradley, MeEtc (http://yass.meetcweb.com), Mick@el, Nathan, Nick
 * Callen, Norman "zEh" Fuchs, Ozh, Paul, Pedro Tainha
 * (http://www.pedrotainha.com), Peter-Paul Koch
 * (http://www.quirksmode.org/js/beat.html), Pierre-Luc Paour, Pul, Pyerre,
 * ReverseSyntax, Robin, Sanjoy Roy, Saulo Vallory, Scott Cariss, Simon
 * Willison (http://simonwillison.net), Slawomir Kaniecki, Steve Clay,
 * Subhasis Deb, T. Wild, T.Wild, T0bsn, Thiago Mata
 * (http://thiagomata.blog.com), Tim Wiel, Tod Gentille, Valentina De Rosa,
 * Victor, XoraX (http://www.xorax.info), Yannoo, Yves Sucaet, baris ozdil,
 * booeyOH, djmix, dptr1988, duncan, echo is bad, ejsanders, gabriel paderni,
 * ger, hitwork, jakes, john (http://www.jd-tech.net), johnrembo, kenneth,
 * marc andreu, metjay, nobbler, noname, penutbutterjelly, rezna, sankai,
 * sowberry, stensi, taith
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */ 

(function() {
    if(typeof(PHP_JS) == "undefined"){
        var PHP_JS = function() {
            if(window == this || !this.init){
                return new PHP_JS();
            }else{
                return this.init();
            }
        };
    }
    
    PHP_JS.prototype = {
        // {{{ init: 
        init: function() {
            // Makes autoloading system works properly.
            // 
            // %        note 1: Not a real PHP.JS function, necessary for namespaced version, though.
        
        },// }}}
        
        // {{{ array
        array: function( ) {
            // #!#!#!#!# array::$descr1 does not contain valid 'array' at line 260
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array/
            // +       version: 809.522
            // +   original by: d3x
            // *     example 1: $P.array('Kevin', 'van', 'Zonneveld');
            // *     returns 1: ['Kevin', 'van', 'Zonneveld']
        
            return Array.prototype.slice.call(arguments);
        },// }}}
        
        // {{{ array_change_key_case
        array_change_key_case: function( array ) {
            // Changes all keys in an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_change_key_case/
            // +       version: 901.817
            // +   original by: Ates Goral (http://magnetiq.com)
            // +   improved by: marrtins
            // *     example 1: $P.array_change_key_case(42);
            // *     returns 1: false
            // *     example 2: $P.array_change_key_case([ 3, 5 ]);
            // *     returns 2: {0: 3, 1: 5}
            // *     example 3: $P.array_change_key_case({ FuBaR: 42 });
            // *     returns 3: {"fubar": 42}
            // *     example 4: $P.array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
            // *     returns 4: {"fubar": 42}
            // *     example 5: $P.array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
            // *     returns 5: {"FUBAR": 42}
            // *     example 6: $P.array_change_key_case({ FuBaR: 42 }, 2);
            // *     returns 6: {"FUBAR": 42}
        
            var case_fn, tmp_ar = new Object, argc = arguments.length, argv = arguments, key;
        
            if (array instanceof Array) {
                return array; 
            }
        
            if (array instanceof Object) {
                if( argc == 1 || argv[1] == 'CASE_LOWER' || argv[1] == 0 ){
                    case_fn = "toLowerCase";
                } else{
                    case_fn = "toUpperCase";
                }
                for (key in array) {
                    tmp_ar[key[case_fn]()] = array[key];
                }
                return tmp_ar;
            }
        
            return false;
        },// }}}
        
        // {{{ array_chunk
        array_chunk: function( input, size ) {
            // Split an array into chunks
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_chunk/
            // +       version: 809.522
            // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // *     example 1: $P.array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
            // *     returns 1: {0 : {0: 'Kevin', 1: 'van'} , 1 : {0: 'Zonneveld'}}
         
            for(var x, i = 0, c = -1, l = input.length, n = []; i < l; i++){
                (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
            }
        
            return n;
        },// }}}
        
        // {{{ array_combine
        array_combine: function( keys, values ) {
            // Creates an array by using one array for keys and another for its values
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_combine/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_combine([0,1,2], ['kevin','van','zonneveld']);
            // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
           
            var new_array = {}, keycount=keys.length, i;
        
            // input sanitation
            if( !keys || !values || keys.constructor !== Array || values.constructor !== Array ){
                return false;
            }
        
            // number of elements does not match
            if(keycount != values.length){
                return false;
            }
        
            for ( i=0; i < keycount; i++ ){
                new_array[keys[i]] = values[i];
            }
        
            return new_array;
        },// }}}
        
        // {{{ array_count_values
        array_count_values: function( array ) {
            // Counts all the values of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_count_values/
            // +       version: 810.2018
            // +   original by: Ates Goral (http://magnetiq.com)
            // + namespaced by: Michael White (http://getsprink.com)
            // +      input by: sankai
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
            // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
            // *     example 2: $P.array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
            // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
            // *     example 3: $P.array_count_values([ true, 4.2, 42, "fubar" ]);
            // *     returns 3: {42:1, "fubar":1}
        
            var tmp_arr = {}, key = '', t = '';
            
            var __getType = function(obj) {
                // Objects are php associative arrays.
                var t = typeof obj;
                t = t.toLowerCase();
                if (t == "object") {
                    t = "array";
                }
                return t;
            }    
        
            var __countValue = function (value) {
                switch (typeof(value)) {
                    case "number":
                        if (Math.floor(value) != value) {
                            return;
                        }
                    case "string":
                        if (value in this) {
                            ++this[value];
                        } else {
                            this[value] = 1;
                        }
                }
            };
            
            t = __getType(array);
            if (t == 'array') {
                for ( key in array ) {
                    __countValue.call(tmp_arr, array[key]);
                }
            } 
            return tmp_arr;
        },// }}}
        
        // {{{ array_diff
        array_diff: function() {
            // Computes the difference of arrays
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff/
            // +       version: 901.1301
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Sanjoy Roy
            // +    revised by: Brett Zamir
            // *     example 1: $P.array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
            // *     returns 1: ['Kevin']
        
            var arr1 = arguments[0], retArr = {};
            var k1 = '', i = 1, k = '', arr = {};
        
            arr1keys:
            for (k1 in arr1) {
                for (i = 1; i < arguments.length; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (arr[k] === arr1[k1]) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys; 
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_diff_assoc
        array_diff_assoc: function() {
            // Computes the difference of arrays with additional index check
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_assoc/
            // +       version: 901.1301
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: 0m3r
            // +    revised by: Brett Zamir
            // *     example 1: $P.array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
            // *     returns 1: {1: 'van', 2: 'Zonneveld'}
        
            var arr1 = arguments[0], retArr = {};
            var k1 = '', i = 1, k = '', arr = {};
        
            arr1keys:
            for (k1 in arr1) {
                for (i = 1; i < arguments.length; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (arr[k] === arr1[k1] && k === k1) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys;
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_diff_key
        array_diff_key: function() {
            // Computes the difference of arrays using keys for comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_key/
            // +       version: 901.1301
            // +   original by: Ates Goral (http://magnetiq.com)
            // +    revised by: Brett Zamir
            // *     example 1: $P.array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});
            // *     returns 1: {"green":2, "blue":3, "white":4}
            // *     example 2: $P.array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});
            // *     returns 2: {"green":2, "blue":3, "white":4}
        
            var arr1 = arguments[0], retArr = {};
            var k1 = '', i = 1, k = '', arr = {};
         
            arr1keys:
            for (k1 in arr1) {
                for (i = 1; i < arguments.length; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (k === k1) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys;
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_diff_uassoc
        array_diff_uassoc: function() {
            // Computes the difference of arrays with additional index check which is performed
            // by a user supplied callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_uassoc/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_diff_uassoc($array1, $array2, function(key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
            // *     returns 1: {b: 'brown', c: 'blue', 0: 'red'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var arr = {}, i = 1, k1 = '', k = '';
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                for (i=1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys;
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_diff_ukey
        array_diff_ukey: function() {
            // Computes the difference of arrays using a callback on: function the keys for
            // comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_ukey/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
            // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
            // *     example 1: $P.array_diff_ukey($array1, $array2, function(key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
            // *     returns 1: {red: 2, purple: 4}
        
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var arr = {}, i = 1, k1 = '', k = '';
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                for (i=1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb(k, k1) === 0) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys;
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_fill
        array_fill: function( start_index, num, mixed_val ) {
            // Fill an array with values
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_fill/
            // +       version: 811.1314
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Waldo Malqui Silva
            // *     example 1: $P.array_fill(5, 6, 'banana');
            // *     returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }
        
            var key, tmp_arr = {};
        
            if ( !isNaN ( start_index ) && !isNaN ( num ) ) {
                for( key = 0; key < num; key++ ) {
                    tmp_arr[(key+start_index)] = mixed_val;
                }
            }
        
            return tmp_arr;
        },// }}}
        
        // {{{ array_fill_keys
        array_fill_keys: function (keys, value) {
            // Fill an array with values, specifying keys
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_fill_keys/
            // +       version: 811.2517
            // +   original by: Brett Zamir
            // +   bugfixed by: Brett Zamir
            // *     example 1: $P.keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
            // *     example 1: $P.array_fill_keys(keys, 'banana')
            // *     returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
            
            var retObj = {}, key = '';
            
            for (key in keys) {
                retObj[keys[key]] = value;
            }
            
            return retObj;
        },// }}}
        
        // {{{ array_filter
        array_filter: function (arr, func) {
            // Filters elements of an array using a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_filter/
            // +       version: 811.1812
            // +   original by: Brett Zamir
            // %        note 1: Takes a as: function an argument, not a function's name
            // *     example 1: $P.var odd = function (num) {return (num & 1);}; 
            // *     example 1: $P.array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
            // *     returns 1: {"a": 1, "c": 3, "e": 5}
            // *     example 2: $P.var even = function (num) {return (!(num & 1));}
            // *     example 2: $P.array_filter([6, 7, 8, 9, 10, 11, 12], even);
            // *     returns 2: {0: 6, 2: 8, 4: 10, 6: 12} 
            
            var retObj = {}, k;
            
            for (k in arr) {
                if (func(arr[k])) {
                    retObj[k] = arr[k];
                }
            }
            
            return retObj;
        },// }}}
        
        // {{{ array_flip
        array_flip: function( trans ) {
            // Exchanges all keys with their associated values in an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_flip/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_flip( {a: 1, b: 1, c: 2} );
            // *     returns 1: {1: 'b', 2: 'c'}
        
            var key, tmp_ar = {};
        
            for( key in trans ) {
                tmp_ar[trans[key]] = key;
            }
        
            return tmp_ar;
        },// }}}
        
        // {{{ array_intersect
        array_intersect: function() {
            // Computes the intersection of arrays
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_intersect/
            // +       version: 901.1301
            // +   original by: Brett Zamir
            // %        note 1: These only output associative arrays (would need to be
            // %        note 1: all numeric and counting from zero to be numeric)
            // *     example 1: $array1 = {'a' : 'green', 0:'red', 1: 'blue'};
            // *     example 1: $array2 = {'b' : 'green', 0:'yellow', 1:'red'};
            // *     example 1: $array3 = ['green', 'red'];
            // *     example 1: $result = array_intersect($array1, $array2, $array3);
            // *     returns 1: {0: 'red', a: 'green'}
        
            var arr1 = arguments[0], retArr = {};
            var k1 = '', arr = {}, i = 0, k = '';
            
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i=1; i < arguments.length; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (arr[k] === arr1[k1]) {
                            if (i === arguments.length-1) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_intersect_assoc
        array_intersect_assoc: function() {
            // Computes the intersection of arrays with additional index check
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_intersect_assoc/
            // +       version: 901.1301
            // +   original by: Brett Zamir
            // %        note 1: These only output associative arrays (would need to be
            // %        note 1: all numeric and counting from zero to be numeric)
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_intersect_assoc($array1, $array2)
            // *     returns 1: {a: 'green'}
        
        
            var arr1 = arguments[0], retArr = {};
            var k1 = '', arr = {}, i = 0, k = '';
        
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i=1; i < arguments.length; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (arr[k] === arr1[k1] && k === k1) {
                            if (i === arguments.length-1) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_intersect_key
        array_intersect_key: function() {
            // Computes the intersection of arrays using keys for comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_intersect_key/
            // +       version: 901.1301
            // +   original by: Brett Zamir
            // %        note 1: These only output associative arrays (would need to be
            // %        note 1: all numeric and counting from zero to be numeric)
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_intersect_key($array1, $array2)
            // *     returns 1: {0: 'red', a: 'green'}
        
            var arr1 = arguments[0], retArr = {};
            var k1 = '', arr = {}, i = 0, k = '';
        
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i=1; i < arguments.length; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (k === k1) {
                            if (i === arguments.length-1) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_intersect_uassoc
        array_intersect_uassoc: function () {
            // Computes the intersection of arrays with additional index check, compares
            // indexes by a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_intersect_uassoc/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_intersect_uassoc($array1, $array2, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {b: 'brown'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var k1 = '', i = 1, arr = {}, k = '';
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i = 1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (arr[k] === arr1[k1] && cb(k, k1) === 0 ) {
                            if (i === arguments.length-2) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_intersect_ukey
        array_intersect_ukey: function  () {
            // Computes the intersection of arrays using a callback on: function the keys for
            // comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_intersect_ukey/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
            // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
            // *     example 1: $P.array_intersect_ukey ($array1, $array2, function(key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
            // *     returns 1: {blue: 1, green: 3}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var k1 = '', i = 1, arr = {}, k = '';
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i = 1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb(k, k1) === 0 ) {
                            if (i === arguments.length-2) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
            
        },// }}}
        
        // {{{ array_key_exists
        array_key_exists: function ( key, search ) {
            // Checks if the given key or index exists in the array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_key_exists/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
            // *     example 1: $P.array_key_exists('kevin', {'kevin': 'van Zonneveld'});
            // *     returns 1: true
        
            // input sanitation
            if( !search || (search.constructor !== Array && search.constructor !== Object) ){
                return false;
            }
        
            return key in search;
        },// }}}
        
        // {{{ array_keys
        array_keys: function( input, search_value, strict ) {
            // Return all the keys of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_keys/
            // +       version: 810.2018
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
            // *     returns 1: {0: 'firstname', 1: 'surname'}
            
            var tmp_arr = {}, strict = !!strict, include = true, cnt = 0;
            
            for ( key in input ){
                include = true;
                if ( search_value != undefined ) {
                    if( strict && input[key] !== search_value ){
                        include = false;
                    } else if( input[key] != search_value ){
                        include = false;
                    }
                }
                
                if( include ) {
                    tmp_arr[cnt] = key;
                    cnt++;
                }
            }
            
            return tmp_arr;
        },// }}}
        
        // {{{ array_map
        array_map: function( callback ) {
            // Applies the callback to the elements of the given arrays
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_map/
            // +       version: 811.1812
            // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: Takes a as: function an argument, not a function's name
            // *     example 1: $P.array_map( function(a){return (a * a * a)}, [1, 2, 3, 4, 5] );
            // *     returns 1: [ 1, 8, 27, 64, 125 ]
        
            var argc = arguments.length, argv = arguments;
            var j = argv[1].length, i = 0, k = 1, m = 0;
            var tmp = [], tmp_ar = [];
        
            while (i < j) {
                while (k < argc){
                    tmp[m++] = argv[k++][i];
                }
        
                m = 0;
                k = 1;
        
                if( callback ){
                    tmp_ar[i++] = callback.apply(null, tmp);
                } else{
                    tmp_ar[i++] = tmp;
                }
        
                tmp = [];
            }
        
            return tmp_ar;
        },// }}}
        
        // {{{ array_merge
        array_merge: function() {
            // Merge one or more arrays
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_merge/
            // +       version: 811.2517
            // +   original by: Brett Zamir
            // +   bugfixed by: Nate
            // -    depends on: is_int
            // %          note: Relies on is_int because !isNaN accepts floats     
            // *     example 1: $P.arr1 = {"color": "red", 0: 2, 1: 4}
            // *     example 1: $P.arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
            // *     example 1: $P.array_merge(arr1, arr2)
            // *     returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
            // *     example 2: $P.arr1 = []
            // *     example 2: $P.arr2 = {1: "data"}
            // *     example 2: $P.array_merge(arr1, arr2)
            // *     returns 2: {1: "data"}
            
            var args = Array.prototype.slice.call(arguments);
            var retObj = {}, k, j = 0, i = 0;
            var retArr;
            
            for (i=0, retArr=true; i < args.length; i++) {
                if (!(args[i] instanceof Array)) {
                    retArr=false;
                    break;
                }
            }
            
            if (retArr) {
                return args;
            }
            var ct = 0;
            
            for (i=0, ct=0; i < args.length; i++) {
                if (args[i] instanceof Array) {
                    for (j=0; j < args[i].length; j++) {
                        retObj[ct++] = args[i][j];
                    }
                } else {
                    for (k in args[i]) {
                        if (this.is_int(k)) {
                            retObj[ct++] = args[i][k];
                        } else {
                            retObj[k] = args[i][k];
                        }
                    }
                }
            }
            
            return retObj;
        },// }}}
        
        // {{{ array_merge_recursive
        array_merge_recursive: function (arr1, arr2){
            // Merge two or more arrays recursively
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_merge_recursive/
            // +       version: 812.114
            // +   original by: Subhasis Deb
            // -    depends on: array_merge
            // *     example 1: $P.arr1 = {'color': {'favourite': 'read'}, 0: 5}
            // *     example 1: $P.arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
            // *     example 1: $P.array_merge_recursive(arr1, arr2)
            // *     returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
        
            if ((arr1 && (arr1 instanceof Array)) && (arr2 && (arr2 instanceof Array))) {
                for (var idx in arr2) {
                    arr1.push(arr2[idx]);
                }
            } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
                for (var idx in arr2) {
                    if (idx in arr1) {
                        if (typeof arr1[idx] == 'object' && typeof arr2 == 'object') {
                            arr1[idx] = this.array_merge(arr1[idx], arr2[idx]);
                        } else {
                            arr1[idx] = arr2[idx];
                        }
                    } else {
                        arr1[idx] = arr2[idx];
                    }
                }
            }
            
            return arr1;
        },// }}}
        
        // {{{ array_pad
        array_pad: function ( input, pad_size, pad_value ) {
            // Pad array to the specified length with a value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_pad/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // *     example 1: $P.array_pad([ 7, 8, 9 ], 2, 'a');
            // *     returns 1: [ 7, 8, 9]
            // *     example 2: $P.array_pad([ 7, 8, 9 ], 5, 'a');
            // *     returns 2: [ 7, 8, 9, 'a', 'a']
            // *     example 3: $P.array_pad([ 7, 8, 9 ], 5, 2);
            // *     returns 3: [ 7, 8, 9, 2, 2]
            // *     example 4: $P.array_pad([ 7, 8, 9 ], -5, 'a');
            // *     returns 4: [ 'a', 'a', 7, 8, 9 ]
        
            var pad = [], newArray = [], newLength, i=0;
        
            if ( input instanceof Array && !isNaN ( pad_size ) ) {
                newLength = ( ( pad_size < 0 ) ? ( pad_size * -1 ) : pad_size );
                if ( newLength > input.length ) {
                    for ( i = 0; i < ( newLength - input.length ); i++ ) { newArray [ i ] = pad_value; }
                    pad = ( ( pad_size < 0 ) ? newArray.concat ( input ) : input.concat ( newArray ) );
                } else {
                    pad = input;
                }
            }
        
            return pad;
        },// }}}
        
        // {{{ array_pop
        array_pop: function( array ) {
            // Pop the element off the end of array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_pop/
            // +       version: 902.210
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_pop([0,1,2]);
            // *     returns 1: 2
            // *     example 2: $P.data = {firstName: 'Kevin', surName: 'van Zonneveld'};
            // *     example 2: $P.lastElem = array_pop(data);
            // *     returns 2: 'van Zonneveld'
            // *     results 2: data == {firstName: 'Kevin'}
        
            var key = '', cnt = 0;
        
            if (array.hasOwnProperty('length')) {
                // Indexed
                if( !array.length ){
                    // Done popping, are we?
                    return null;
                }
                return array.pop();
            } else {
                // Associative
                for (key in array) {
                    cnt++;
                }
                if (cnt) {
                    return array[key];
                    delete(array[key]);
                }
            }
        },// }}}
        
        // {{{ array_product
        array_product: function ( input ) {
            // Calculate the product of values in an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_product/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // *     example 1: $P.array_product([ 2, 4, 6, 8 ]);
            // *     returns 1: 384
        
            var Index = 0, Product = 1;
            if ( input instanceof Array ) {
                while ( Index < input.length ) {
                    Product *= ( !isNaN ( input [ Index ] ) ? input [ Index ] : 0 );
                    Index++;
                }
            } else {
                Product = null;
            }
        
            return Product;
        },// }}}
        
        // {{{ array_push
        array_push: function ( array ) {
            // Push one or more elements onto the end of array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_push/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_push(['kevin','van'], 'zonneveld');
            // *     returns 1: 3
        
            var i, argv = arguments, argc = argv.length;
        
            for (i=1; i < argc; i++){
                array[array.length++] = argv[i];
            }
        
            return array.length;
        },// }}}
        
        // {{{ array_rand
        array_rand: function ( input, num_req ) {
            // Pick one or more random entries out of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_rand/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // *     example 1: $P.array_rand( ['Kevin'], 1 );
            // *     returns 1: 0
        
            var Indexes = [];
            var Ticks = num_req || 1;
            var checkDuplicate = function ( input, value ) {
                var Exist = false, Index = 0;
                while ( Index < input.length ) {
                    if ( input [ Index ] === value ) {
                        Exist = true;
                        break;
                    }
                    Index++;
                }
                return Exist;
            };
        
            if ( input instanceof Array && Ticks <= input.length ) {
                while ( true ) {
                    var Rand = Math.floor ( ( Math.random ( ) * input.length ) );
                    if ( Indexes.length === Ticks ) { break; }
                    if ( !checkDuplicate ( Indexes, Rand ) ) { Indexes.push ( Rand ); }
                }
            } else {
                Indexes = null;
            }
        
            return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
        },// }}}
        
        // {{{ array_reduce
        array_reduce: function( a_input, callback ) {
            // Iteratively reduce the array to a single value using a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_reduce/
            // +       version: 811.1812
            // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
            // %        note 1: Takes a as: function an argument, not a function's name
            // *     example 1: $P.array_reduce([1, 2, 3, 4, 5], function(v, w){v += w;return v;});
            // *     returns 1: 15
            
            var lon = a_input.length;
            var res = 0, i = 0;
            var tmp = new Array();
        
            
            for(i = 0; i < lon; i+=2 ) {
                tmp[0] = a_input[i];
                if(a_input[(i+1)]){
                    tmp[1] = a_input[(i+1)];
                } else {
                    tmp[1] = 0;
                }
                res+= callback.apply(null, tmp);
                tmp = new Array();
            }
            
            return res;
        },// }}}
        
        // {{{ array_reverse
        array_reverse: function(array, preserve_keys) {
            // Return an array with elements in reverse order
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_reverse/
            // +       version: 812.3017
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Karol Kowalski
            // *     example 1: $P.array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
            // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}
        
            var arr_len = array.length, newkey = 0, tmp_arr = {}, key = '';
            preserve_keys = !!preserve_keys;
            
            for (key in array) {
                newkey = arr_len - key - 1;
                tmp_arr[preserve_keys ? key : newkey] = array[key];
            }
        
            return tmp_arr;
        },// }}}
        
        // {{{ array_search
        array_search: function( needle, haystack, strict ) {
            // Searches the array for a given value and returns the corresponding key if
            // successful
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_search/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
            // *     returns 1: 'surname'
        
            var strict = !!strict;
        
            for(var key in haystack){
                if( (strict && haystack[key] === needle) || (!strict && haystack[key] == needle) ){
                    return key;
                }
            }
        
            return false;
        },// }}}
        
        // {{{ array_shift
        array_shift: function( array ) {
            // Shift an element off the beginning of array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_shift/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Martijn Wieringa
            // *     example 1: $P.array_shift(['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: 'Kevin'
        
            if (array.length > 0) {
                return array.shift();
            }
            
            return null;
        },// }}}
        
        // {{{ array_slice
        array_slice: function(arr, offst, lgth, preserve_keys) {
            // Extract a slice of the array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_slice/
            // +       version: 812.1017
            // +   original by: Brett Zamir
            // -    depends on: is_int
            // %          note: Relies on is_int because !isNaN accepts floats 
            // *     example 1: $P.array_slice(["a", "b", "c", "d", "e"], 2, -1);
            // *     returns 1: {0: 'c', 1: 'd'}
            // *     example 2: $P.array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
            // *     returns 2: {2: 'c', 3: 'd'}
        
            /*
            if ('callee' in arr && 'length' in arr) {
                arr = Array.prototype.slice.call(arr);
            }
            */
        
            if (!(arr instanceof Array) || (preserve_keys && offst != 0)) { // Assoc. array as input or if required as output
                var lgt =0, newAssoc = {};
                for (var key in arr) {
                    //if (key !== 'length') {
                        lgt += 1;
                        newAssoc[key] = arr[key];
                    //}
                }
                arr = newAssoc;
                
                offst = (offst < 0) ? lgt + offst : offst;
                lgth  = lgth == undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth;
                
                var assoc = {};
                var start = false, it=-1, arrlgth=0, no_pk_idx=0;
                for (var key in arr) {
                    ++it;
                    if (arrlgth >= lgth) {
                      break;
                    }
                    if (it == offst){
                      start = true;
                    }
                    if (!start) {
                       continue;
                    }
                    ++arrlgth;
                    if (this.is_int(key) && !preserve_keys) {
                        assoc[no_pk_idx++] = arr[key];
                    } else {
                        assoc[key] = arr[key];
                    }
                }
                //assoc.length = arrlgth; // Make as array-like object (though length will not be dynamic)
                return assoc;
            }
            
            if (lgth === undefined) {
                return arr.slice(offst);    
            } else if (lgth >= 0) {
                return arr.slice(offst, offst + lgth);
            } else {
                return arr.slice(offst, lgth);
            }
            
        },// }}}
        
        // {{{ array_splice
        array_splice: function (arr, offst, lgth, replacement) {
            // Remove a portion of the array and replace it with something else
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_splice/
            // +       version: 812.1714
            // +   original by: Brett Zamir
            // %        note 1: Order does get shifted in associative array input with numeric indices,
            // %        note 1: since PHP behavior doesn't preserve keys, but I understand order is not reliable anyways
            // -    depends on: is_int
            // *     example 1: $P.input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"};
            // *     example 1: $P.array_splice(input, 2);
            // *     returns 1: {0: "blue", 'dud': "yellow"}
            // *     results 1: input == {'abc':"green", 0:"red"}
            // *     example 2: $P.input = ["red", "green", "blue", "yellow"];
            // *     example 2: $P.array_splice(input, 3, 0, "purple");
            // *     returns 2: []
            // *     results 2: input == ["red", "green", "blue", "purple", "yellow"]
            // *     example 3: $P.input = ["red", "green", "blue", "yellow"]
            // *     example 3: $P.array_splice(input, -1, 1, ["black", "maroon"]);
            // *     returns 3: ["yellow"]
            // *     results 3: input == ["red", "green", "blue", "black", "maroon"]
            
            var checkToUpIndices = function (arr, ct, key) {
                // Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
                // increment all subsequent (skipping current key, since we need its value below) until find unused)
                if (arr[ct] !== undefined) {
                    var tmp = ct;
                    ct += 1;
                    if (ct === key) {
                        ct += 1;
                    }
                    ct = checkToUpIndices(arr, ct, key);
                    arr[ct] = arr[tmp];
                    delete arr[tmp];
                }
                return ct;
            }
        
            if (replacement && !(typeof replacement === 'object')) {
                replacement = [replacement];
            }
            if (lgth === undefined) {
                lgth = offst >= 0 ? arr.length - offst : -offst;
            } else if (lgth < 0) {
                lgth = (offst >= 0 ? arr.length - offst : -offst)  + lgth;
            }
        
            if (!(arr instanceof Array)) {
                /*if (arr.length !== undefined) { // Deal with array-like objects as input
                delete arr.length;
                }*/
                var lgt = 0, ct = -1, rmvd = [], rmvdObj = {}, repl_ct=-1, int_ct=-1;
                var returnArr = true, rmvd_ct = 0, rmvd_lgth = 0, key = '';
                // rmvdObj.length = 0;
                for (key in arr) { // Can do arr.__count__ in some browsers
                    lgt += 1;
                }
                offst = (offst >= 0) ? offst : lgt + offst;
                for (key in arr) {
                    ct += 1;
                    if (ct < offst) {
                        if (this.is_int(key)) {
                            int_ct += 1;
                            if (parseInt(key, 10) === int_ct) { // Key is already numbered ok, so don't need to change key for value
                                continue;
                            }
                            checkToUpIndices(arr, int_ct, key); // Deal with situation, e.g.,
                            // if encounter index 4 and try to set it to 0, but 0 exists later in loop
                            arr[int_ct] = arr[key];
                            delete arr[key];
                        }
                        continue;
                    }
                    if (returnArr && this.is_int(key)) {
                        rmvd.push(arr[key]);
                        rmvdObj[rmvd_ct++] = arr[key]; // PHP starts over here too
                    } else {
                        rmvdObj[key] = arr[key];
                        returnArr    = false;
                    }
                    rmvd_lgth += 1;
                    // rmvdObj.length += 1;
        
                    if (replacement && replacement[++repl_ct]) {
                        arr[key] = replacement[repl_ct]
                    } else {
                        delete arr[key];
                    }
                }
                // arr.length = lgt - rmvd_lgth + (replacement ? replacement.length : 0); // Make (back) into an array-like object
                return returnArr ? rmvd : rmvdObj;
            }
        
            if (replacement) {
                replacement.unshift(offst, lgth);
                return Array.prototype.splice.apply(arr, replacement);
            }
            return arr.splice(offst, lgth);
        },// }}}
        
        // {{{ array_sum
        array_sum: function( array ) {
            // Calculate the sum of values in an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_sum/
            // +       version: 901.617
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Nate
            // +   bugfixed by: Gilbert
            // *     example 1: $P.array_sum([4, 9, 182.6]);
            // *     returns 1: 195.6
            // *     example 2: $P.total = []; index = 0.1; for(y=0; y < 12; y++){total[y] = y + index;}
            // *     example 2: $P.array_sum(total);
            // *     returns 2: 67.2
        
            var key, sum = 0;
            
            // input sanitation
            if (typeof array !== 'object') {
                return null;
            }
            
            for (key in array) {
                //tester_print_r(typeof sum);
                sum += (array[key] * 1);
            }
        
            return sum;
        },// }}}
        
        // {{{ array_udiff
        array_udiff: function() {
            // Computes the difference of arrays by using a callback for: function data
            // comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_udiff/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_udiff($array1, $array2, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {c: 'blue'}
        
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var arr = '', i = 1, k1 = '', k = '';
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                for (i=1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb(arr[k], arr1[k1]) === 0) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys;
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_udiff_assoc
        array_udiff_assoc: function() {
            // Computes the difference of arrays with additional index check, compares data by
            // a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_udiff_assoc/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $P.array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {1: 'van', 2: 'Zonneveld'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var arr = {}, i = 1, k1 = '', k = '';
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                for (i=1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys;
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_udiff_uassoc
        array_udiff_uassoc: function () {
            // Computes the difference of arrays with additional index check, compares data and
            // indexes by a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_udiff_uassoc/
            // +       version: 901.1415
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_udiff_uassoc($array1, $array2, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;}, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {0: 'red', c: 'blue'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1], cb0 = arguments[arguments.length-2];
            var k1 = '', i = 1, k = '', arr = {};
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
            cb0 = (typeof cb0 === 'string') ? window[cb0] : (cb0 instanceof Array) ? window[cb0[0]][cb0[1]] : cb0;
        
            arr1keys:
            for (k1 in arr1) {
                for (i=1; i < arguments.length-2; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
                            // If it reaches here, it was found in at least one array, so try next value
                            continue arr1keys; 
                        }
                    }
                    retArr[k1] = arr1[k1];
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_uintersect
        array_uintersect: function () {
            // Computes the intersection of arrays, compares data by a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_uintersect/
            // +       version: 901.1301
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_uintersect($array1, $array2, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {a: 'green', b: 'brown', 0: 'red'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var k1 = '', i = 1, arr = {}, k = '';
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:  
            for (k1 in arr1) {
                arrs:
                for (i = 1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb(arr[k], arr1[k1]) === 0 ) {
                            if (i === arguments.length-2) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_uintersect_assoc
        array_uintersect_assoc: function () {
            // Computes the intersection of arrays with additional index check, compares data
            // by a callback function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_uintersect_assoc/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_uintersect_assoc($array1, $array2, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {a: 'green', b: 'brown'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
            var k1 = '', i = 1, arr = {}, k = '';
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
        
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i = 1; i < arguments.length-1; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
                            if (i === arguments.length-2) {
                                retArr[k1] = arr1[k1];
                            }
                            // If the innermost loop always leads at least once to an equal value, continue the loop until done
                            continue arrs;
                        }
                    }
                    // If it reaches here, it wasn't found in at least one array, so try next value
                    continue arr1keys;
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_uintersect_uassoc
        array_uintersect_uassoc: function () {
            // Computes the intersection of arrays with additional index check, compares data
            // and indexes by a callback s: function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_uintersect_uassoc/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
            // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
            // *     example 1: $P.array_uintersect_uassoc($array1, $array2, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;}, function(f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if(string1 > string2) return 1; if(string1 == string2) return 0; return -1;});
            // *     returns 1: {a: 'green', b: 'brown'}
        
            var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1], cb0 = arguments[arguments.length-2];
            var k1 = '', i = 1, k = '', arr = {};
        
            cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;
            cb0 = (typeof cb0 === 'string') ? window[cb0] : (cb0 instanceof Array) ? window[cb0[0]][cb0[1]] : cb0;
        
            arr1keys:
            for (k1 in arr1) {
                arrs:
                for (i = 1; i < arguments.length-2; i++) {
                    arr = arguments[i];
                    for (k in arr) {
                        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
                            if (i === arguments.length-3) {
                                retArr[k1] = arr1[k1];
                            }
                            continue arrs; // If the innermost loop always leads at least once to an equal value, continue the loop until done
                        }
                    }
                    continue arr1keys; // If it reaches here, it wasn't found in at least one array, so try next value
                }
            }
        
            return retArr;
        },// }}}
        
        // {{{ array_unique
        array_unique: function( array ) {
            // Removes duplicate values from an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unique/
            // +       version: 811.1314
            // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // +      input by: duncan
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Nate
            // *     example 1: $P.array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
            // *     returns 1: ['Kevin','van','Zonneveld']
            // *     example 2: $P.array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
            // *     returns 2: {'a': 'green', 0: 'red', 1: 'blue'}
            
            var key = '', tmp_arr1 = {}, tmp_arr2 = {};
            var val = '';
            tmp_arr1 = array;
            
            var __array_search = function (needle, haystack, strict) {
                var fkey = '';
                var strict = !!strict;
                for (fkey in haystack) {
                    if ((strict && haystack[fkey] === needle) || (!strict && haystack[fkey] == needle) ) {
                        return fkey;
                    }
                }
                return false;
            }    
            
            for (key in tmp_arr1) {
                val = tmp_arr1[key];
                if (false === __array_search(val, tmp_arr2)) {
                    tmp_arr2[key] = val;
                }
                
                delete tmp_arr1[key];
            }
            
            return tmp_arr2;
        },// }}}
        
        // {{{ array_unshift
        array_unshift: function( array ) {
            // Prepend one or more elements to the beginning of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unshift/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Martijn Wieringa
            // *     example 1: $P.array_unshift(['van', 'Zonneveld'], 'Kevin');
            // *     returns 1: 3
        
            var argc = arguments.length, argv = arguments, i;
            
            for (i = 1; i < argc; i++) {
                array.unshift(argv[i]);
            }
            
            return (array.length);
        },// }}}
        
        // {{{ array_values
        array_values: function( input ) {
            // Return all the values of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_values/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
            // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
        
            var tmp_arr = new Array(), cnt = 0;
        
            for ( key in input ){
                tmp_arr[cnt] = input[key];
                cnt++;
            }
        
            return tmp_arr;
        },// }}}
        
        // {{{ array_walk
        array_walk: function (array, funcname, userdata) {
            // Apply a user to: function every member of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_walk/
            // +       version: 811.1812
            // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
            // *     example 1: $P.array_walk ({'a':'b'}, 'void', 'userdata');
            // *     returns 1: true
            // *     example 2: $P.array_walk ('a', 'void', 'userdata');
            // *     returns 2: false
            
            var key; 
            
            if (typeof array != 'object') {
                return false;
            }
            
            for (key in array) {
                if (typeof (userdata) != 'undefined') {
                    eval (funcname + '( array [key] , key , userdata  )' );
                } else {
                    eval (funcname + '(  userdata ) ');
                }
            }
            
            return true;
        },// }}}
        
        // {{{ array_walk_recursive
        array_walk_recursive: function (array, funcname, userdata) {
            // Apply a user recursively: function to every member of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_walk_recursive/
            // +       version: 811.1812
            // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
            // *     example 1: $P.array_walk_recursive ({'a': 'b', 'c': {'d': 'e'}}, 'void', 'userdata');
            // *     returns 1: true
            // *     example 2: $P.array_walk_recursive ('a', 'void', 'userdata');
            // *     returns 2: false
            
            var key;
            
            if (typeof array != 'object'){
                return false;
            }
         
            for (key in array) {            
                if (typeof array[key] == 'object') { 
                    return this.array_walk_recursive (array [key], funcname, userdata);
                }
                
                if (typeof (userdata) != 'undefined') {
                    eval (funcname + '( array [key] , key , userdata  )');
                } else {
                    eval (funcname + '(  userdata ) ');
                }
            }
            
            return true;
        },// }}}
        
        // {{{ arsort
        arsort: function(inputArr, sort_flags) {
            // Sort an array in reverse order and maintain index association
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_arsort/
            // +       version: 901.2514
            // +   original by: Brett Zamir
            // +   improved by: Brett Zamir
            // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
            // %        note 1: integrated into all of these s: function by adapting the code at
            // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
            // %        note 2: The examples are correct, this is a new way
            // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
            // *     example 1: $P.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
            // *     example 1: $P.asort(data);
            // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
            // *     returns 1: true
        
            var valArr=[], keyArr=[], k, i, ret, sorter;
        
            switch (sort_flags) {
                case 'SORT_STRING': // compare items as strings
                    sorter = function (a, b) {
                        return strnatcmp(b, a);
                    };
                    break;
                case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
                    sorter = function (a, b) {
                        return(b.localeCompare(a));
                    };
                    break;
                case 'SORT_NUMERIC': // compare items numerically
                    sorter = function (a, b) {
                        return(a - b);
                    };
                    break;
                case 'SORT_REGULAR': // compare items normally (don't change types)
                default:
                    sorter = function (a, b) {
                        if (a > b)
                            return 1;
                        if (a < b)
                            return -1;
                        return 0;
                    };
                    break;
            }
        
            var bubbleSort = function(keyArr, inputArr) {
                var i, j, tempValue, tempKeyVal;
                for (i = inputArr.length-2; i >= 0; i--) {
                    for (j = 0; j <= i; j++) {
                        ret = sorter(inputArr[j+1], inputArr[j]);
                        if (ret > 0) {
                            tempValue = inputArr[j];
                            inputArr[j] = inputArr[j+1];
                            inputArr[j+1] = tempValue;
                            tempKeyVal = keyArr[j];
                            keyArr[j] = keyArr[j+1];
                            keyArr[j+1] = tempKeyVal;
                        }
                    }
                }
            };
        
            // Get key and value arrays
            for (k in inputArr) {
                valArr.push(inputArr[k]);
                keyArr.push(k);
                delete inputArr[k] ;
            }
            try {
                // Sort our new temporary arrays
                bubbleSort(keyArr, valArr);
            } catch(e) {
                return false;
            }
        
            // Repopulate the old array
            for (i = 0; i < valArr.length; i++) {
                inputArr[keyArr[i]] = valArr[i];
            }
        
            return true;
        },// }}}
        
        // {{{ asort
        asort: function(inputArr, sort_flags) {
            // Sort an array and maintain index association
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_asort/
            // +       version: 901.2514
            // +   original by: Brett Zamir
            // +   improved by: Brett Zamir
            // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
            // %        note 1: integrated into all of these s: function by adapting the code at
            // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
            // %        note 2: The examples are correct, this is a new way
            // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
            // -    depends on: strnatcmp
            // *     example 1: $P.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
            // *     example 1: $P.asort(data);
            // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
            // *     returns 1: true
        
            var valArr=[], keyArr=[], k, i, ret, sorter;
        
            switch (sort_flags) {
                case 'SORT_STRING': // compare items as strings
                    sorter = function (a, b) {
                        return this.strnatcmp(a, b);
                    };
                    break;
                case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
                    sorter = function (a, b) {
                        return(a.localeCompare(b));
                    };
                    break;
                case 'SORT_NUMERIC': // compare items numerically
                    sorter = function (a, b) {
                        return(a - b);
                    };
                    break;
                case 'SORT_REGULAR': // compare items normally (don't change types)
                default:
                    sorter = function (a, b) {
                        if (a > b)
                            return 1;
                        if (a < b)
                            return -1;
                        return 0;
                    };
                    break;
            }
        
            var bubbleSort = function(keyArr, inputArr) {
                var i, j, tempValue, tempKeyVal;
                for (i = inputArr.length-2; i >= 0; i--) {
                    for (j = 0; j <= i; j++) {
                        ret = sorter(inputArr[j+1], inputArr[j]);
                        if (ret < 0) {
                            tempValue = inputArr[j];
                            inputArr[j] = inputArr[j+1];
                            inputArr[j+1] = tempValue;
                            tempKeyVal = keyArr[j];
                            keyArr[j] = keyArr[j+1];
                            keyArr[j+1] = tempKeyVal;
                        }
                    }
                }
            };
        
            // Get key and value arrays
            for (k in inputArr) {
                valArr.push(inputArr[k]);
                keyArr.push(k);
                delete inputArr[k] ;
            }
            try {
                // Sort our new temporary arrays
                bubbleSort(keyArr, valArr);
            } catch(e) {
                return false;
            }
        
            // Repopulate the old array
            for (i = 0; i < valArr.length; i++) {
                inputArr[keyArr[i]] = valArr[i];
            }
        
            return true;
        },// }}}
        
        // {{{ chunk_split
        chunk_split: function(body, chunklen, end) {
            // Split a string into smaller chunks
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_chunk_split/
            // +       version: 812.115
            // +   original by: Paulo Ricardo F. Santos
            // *     example 1: $P.chunk_split('Hello world!', 1, '*');
            // *     returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
            // *     example 2: $P.chunk_split('Hello world!', 10, '*');
            // *     returns 2: 'Hello worl*d!*'
            
            if (chunklen < 1) {
                return false;
            }
        
            var result = '', chunklen = chunklen || 76, end = end || '\r\n';
        
            while (body.length > chunklen) {
                result += body.substring(0, chunklen) + end;
                body = body.substring(chunklen);
            }
        
            return result + body + end;
        },// }}}
        
        // {{{ compact
        compact: function ( var_names ) {
            // Create array containing variables and their values
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_compact/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // +    tweaked by: Jack
            // *     example 1: $P.var1 = 'Kevin'; var2 = 'van'; var3 = 'Zonneveld';  
            // *     example 1: $P.compact('var1', 'var2', 'var3');
            // *     returns 1: {'var1': 'Kevin', 'var2': 'van', 'var3': 'Zonneveld'}    
        
            var Index = 0, Matrix = {};
            var process = function ( value ) {
                var i = 0, l = value.length, key_value = '';
                for (i = 0; i < l; i++ ) {
                    var key_value = value [ i ];
                    if ( key_value instanceof Array ) {
                        process ( key_value );
                    } else {
                        if ( typeof window [ key_value ] !== 'undefined' ) {
                            Matrix [ key_value ] = window [ key_value ];
                        }
                    }
                }
                return true;
            };
        
            process ( arguments );
            return Matrix;
        },// }}}
        
        // {{{ count
        count: function( mixed_var, mode ) {
            // Count elements in an array, or properties in an object
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count/
            // +       version: 811.1314
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: Waldo Malqui Silva
            // *     example 1: $P.count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
            // *     returns 1: 6
            // *     example 2: $P.count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
            // *     returns 2: 6
        
            var key, cnt = 0;
        
            if( mode == 'COUNT_RECURSIVE' ) mode = 1;
            if( mode != 1 ) mode = 0;
        
            for (key in mixed_var){
                cnt++;
                if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
                    cnt += this.count(mixed_var[key], 1);
                }
            }
        
            return cnt;
        },// }}}
        
        // {{{ current
        current: function(arr) {
            // Return the current element in an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_current/
            // +       version: 901.617
            // +   original by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.transport = ['foot', 'bike', 'car', 'plane'];
            // *     example 1: $P.current(transport); 
            // *     returns 1: 'foot'
        
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            }
            var arrpos = pointers.indexOf(arr);
            var cursor = pointers[arrpos+1];
            if (arr instanceof Array) {
                return arr[cursor] || false;
            }
            var ct = 0;
            for (var k in arr) {
                if (ct === cursor) {
                    return arr[k];
                }
                ct++;
            }
            return false; // Empty
        },// }}}
        
        // {{{ each
        each: function(arr) {
            // Return the current key and value pair from an array and advance the array cursor
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_each/
            // +       version: 901.617
            // +   original by: Ates Goral (http://magnetiq.com) 
            // +    revised by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.each({a: "apple", b: "balloon"});
            // *     returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}
        
            //  Will return a 4-item object unless a class property 'returnArrayOnly'
            //  is set to true on this if: function want to only receive a two-item
            //  numerically-indexed array (for the sake of array destructuring in
            //  JavaScript 1.7+ (similar to list() in PHP, but as PHP does it automatically
            //  in that context and JavaScript cannot, we needed something to allow that option)
            //  See https://developer.mozilla.org/en/New_in_JavaScript_1.7#Destructuring_assignment
            
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            }
            var arrpos = pointers.indexOf(arr);
            var cursor = pointers[arrpos+1];
            if (!(arr instanceof Array)) {
                var ct = 0;
                for (var k in arr) {
                    if (ct === cursor) {
                        pointers[arrpos+1] += 1;
                        if (this.each.returnArrayOnly) {
                            return [k, arr[k]];
                        } else {
                            return {
                                1:arr[k],
                                value:arr[k],
                                0:k,
                                key:k
                            };
                        }
                    }
                    ct++;
                }
                return false; // Empty
            }
            if (arr.length === 0 || cursor === arr.length) {
                return false;
            }
            pos = cursor;
            pointers[arrpos+1] += 1;
            if (this.each.returnArrayOnly) {
                return [pos, arr[pos]];
            } else {
                return {
                    1:arr[pos],
                    value:arr[pos],
                    0:pos,
                    key:pos
                };
            }
        },// }}}
        
        // {{{ end
        end: function ( arr ) {
            // Set the internal pointer of an array to its last element
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_end/
            // +       version: 901.617
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Legaev Andrey
            // +    revised by: J A R
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   restored by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
            // *     returns 1: 'Zonneveld'
            // *     example 2: $P.end(['Kevin', 'van', 'Zonneveld']);
            // *     returns 2: 'Zonneveld'
            
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            }
            var arrpos = pointers.indexOf(arr);
            if (!(arr instanceof Array)) {
                var ct = 0;
                for (var k in arr) {
                    ct++;
                    var val = arr[k];
                }
                if (ct === 0) {
                    return false; // Empty
                }
                pointers[arrpos+1] = ct - 1;
                return val;
            }
            if (arr.length === 0) {
                return false;
            }
            pointers[arrpos+1] = arr.length - 1;
            return arr[pointers[arrpos+1]];
        },// }}}
        
        // {{{ extract
        extract: function (arr, type, prefix) {
            // Import variables into the current symbol table from an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_extract/
            // +       version: 901.714
            // +   original by: Brett Zamir
            // %        note 1: Only works by extracting into global context (whether called in the global scope or
            // %        note 1: within a function); also, the EXTR_REFS flag I believe can't be made to work
            // *     example 1: $P.size = 'large';
            // *     example 1: $P.var_array = {'color' : 'blue', 'size' : 'medium', 'shape' : 'sphere'};
            // *     example 1: $P.extract(var_array, 'EXTR_PREFIX_SAME', 'wddx');
            // *     example 1: $P.color+'-'+size+'-'+shape+'-'+wddx_size;
            // *     returns 1: 'blue-large-sphere-medium'
        
            if (arr instanceof Array && (type !== 'EXTR_PREFIX_ALL' && type !== 'EXTR_PREFIX_INVALID')) {
                return 0;
            }
            var chng = 0;
        
            for (var i in arr) {
                var validIdent = /^[_a-zA-Z$][\w|$]*$/; // TODO: Refine regexp to allow JS 1.5+ Unicode identifiers
                var prefixed = prefix+'_'+i;
                try {
                    switch (type) {
                        case 'EXTR_PREFIX_SAME' || 2:
                            if (this[i] !== undefined) {
                                if (prefixed.match(validIdent) != null) {
                                    this[prefixed] = arr[i];
                                    ++chng;
                                }
                            }
                            else {
                                this[i] = arr[i];
                                ++chng;
                            }
                            break;
                        case 'EXTR_SKIP' || 1:
                            if (this[i] === undefined) {
                                this[i] = arr[i];
                                ++chng;
                            }
                            break;
                        case 'EXTR_PREFIX_ALL' || 3:
                            if (prefixed.match(validIdent) != null) {
                                this[prefixed] = arr[i];
                                ++chng;
                            }
                            break;
                        case 'EXTR_PREFIX_INVALID' || 4:
                            if(i.match(validIdent) != null) {
                                if (prefixed.match(validIdent) != null) {
                                    this[prefixed] = arr[i];
                                    ++chng;
                                }
                            }
                            else {
                                this[i] = arr[i];
                                ++chng;
                            }
                            break;
                        case 'EXTR_IF_EXISTS' || 6:
                            if (this[i] !== undefined) {
                                this[i] = arr[i];
                                ++chng;
                            }
                            break;
                        case 'EXTR_PREFIX_IF_EXISTS' || 5:
                            if (this[i] !== undefined && prefixed.match(validIdent) != null) {
                                this[prefixed] = arr[i];
                                ++chng;
                            }
                            break;
                        case 'EXTR_REFS' || 256:
                            throw 'The EXTR_REFS type will not work in JavaScript';
                            break;
                        case 'EXTR_OVERWRITE' || 0:
                        // Fall-through
                        default:
                            this[i] = arr[i];
                            ++chng;
                            break;
                    }
                }
                catch (e) { // Just won't increment for problem assignments
                    
                }
            }
            return chng;
        },// }}}
        
        // {{{ in_array
        in_array: function(needle, haystack, strict) {
            // Checks if a value exists in an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_in_array/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.in_array('van', ['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: true
        
            var found = false, key, strict = !!strict;
        
            for (key in haystack) {
                if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
                    found = true;
                    break;
                }
            }
        
            return found;
        },// }}}
        
        // {{{ key
        key: function(arr) {
            // Fetch a key from an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_key/
            // +       version: 901.617
            // +   original by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.array = {fruit1: 'apple', 'fruit2': 'orange'}
            // *     example 1: $P.key(array);
            // *     returns 1: 'fruit1'
        
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            }
            var cursor = pointers[pointers.indexOf(arr)+1];
            if (!(arr instanceof Array)) {
                var ct = 0;
                for (var k in arr) {
                    if (ct === cursor) {
                        return k;
                    }
                    ct++;
                }
                return false; // Empty
            }
            if (arr.length === 0) {
                return false;
            }
            return cursor;
        },// }}}
        
        // {{{ krsort
        krsort: function(array, sort_flags) {
            // Sort an array by key in reverse order
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_krsort/
            // +       version: 901.2514
            // +   original by: GeekFG (http://geekfg.blogspot.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Brett Zamir
            // %          note: The examples are correct, this is a new way
            // *     example 1: $P.data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
            // *     example 1: $P.krsort(data);
            // *     results 1: data == {3: 'Kevin', 2: 'van', 1: 'Zonneveld'}
            // *     returns 1: true
        
            var tmp_arr={}, keys=[], sorter, i, key;
        
            switch (sort_flags) {
                case 'SORT_STRING': // compare items as strings
                    sorter = function (a, b) {
                        return strnatcmp(b, a);
                    };
                    break;
                case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
                    sorter = function (a, b) {
                        return(b.localeCompare(a));
                    };
                    break;
                case 'SORT_NUMERIC': // compare items numerically
                    sorter = function (a, b) {
                        return(b - a);
                    };
                    break;
                case 'SORT_REGULAR': // compare items normally (don't change types)
                default:
                    sorter = function (a, b) {
                        if (a < b)
                            return 1;
                        if (a > b)
                            return -1;
                        return 0;
                    };
                    break;
            }
        
            // Make a list of key names
            for (key in array) {
                keys.push(key);
            }
        
            keys.sort(sorter);
        
            // Rebuild array with sorted key names
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                tmp_arr[key] = array[key];
                delete array[key];
            }
            for (i in tmp_arr) {
                array[i] = tmp_arr[i]
            }
        
            return true;
        },// }}}
        
        // {{{ ksort
        ksort: function(array, sort_flags) {
            // Sort an array by key
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ksort/
            // +       version: 901.2514
            // +   original by: GeekFG (http://geekfg.blogspot.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Brett Zamir
            // %          note: The examples are correct, this is a new way
            // *     example 1: $P.data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
            // *     example 1: $P.ksort(data);
            // *     results 1: data == {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}
            // *     returns 1: true
        
            var tmp_arr={}, keys=[], sorter, i, key;
        
            switch (sort_flags) {
                case 'SORT_STRING': // compare items as strings
                    sorter = function (a, b) {
                        return strnatcmp(a, b);
                    };
                    break;
                case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
                    sorter = function (a, b) {
                        return(a.localeCompare(b));
                    };
                    break;
                case 'SORT_NUMERIC': // compare items numerically
                    sorter = function (a, b) {
                        return(a - b);
                    };
                    break;
                case 'SORT_REGULAR': // compare items normally (don't change types)
                default:
                    sorter = function (a, b) {
                        if (a > b)
                            return 1;
                        if (a < b)
                            return -1;
                        return 0;
                    };
                    break;
            }
        
            // Make a list of key names
            for (key in array) {
                keys.push(key);
            }
        
            keys.sort(sorter);
        
            // Rebuild array with sorted key names
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                tmp_arr[key] = array[key];
                delete array[key];
            }
            for (i in tmp_arr) {
                array[i] = tmp_arr[i]
            }
        
            return true;
        },// }}}
        
        // {{{ natcasesort
        natcasesort: function(inputArr) {
            // Sort an array using a case insensitive &quot;natural order&quot; algorithm
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_natcasesort/
            // +       version: 901.2514
            // +   original by: Brett Zamir
            // +   improved by: Brett Zamir
            // -    depends on: strnatcasecmp
            // *     example 1: $array1 = {0:'IMG0.png', 1:'img12.png', 2:'img10.png', 3:'img2.png', 4:'img1.png', 5:'IMG3.png'};
            // *     example 1: $P.natcasesort($array1);
            // *     returns 1: {0: 'IMG0.png', 4: 'img1.png', 3: 'img2.png', 5: 'IMG3.png', 2: 'img10.png', 1: 'img12.png'}
        
            var valArr=[], keyArr=[], k, i, ret;
        
            var bubbleSort = function(keyArr, inputArr) {
                var i, j, tempValue, tempKeyVal;
                for (i = inputArr.length-2; i >= 0; i--) {
                    for (j = 0; j <= i; j++) {
                        ret = this.strnatcasecmp(inputArr[j+1], inputArr[j]);
                        if (ret < 0) {
                            tempValue = inputArr[j];
                            inputArr[j] = inputArr[j+1];
                            inputArr[j+1] = tempValue;
                            tempKeyVal = keyArr[j];
                            keyArr[j] = keyArr[j+1];
                            keyArr[j+1] = tempKeyVal;
                        }
                    }
                }
            };
        
            // Get key and value arrays
            for (k in inputArr) {
                valArr.push(inputArr[k]);
                keyArr.push(k);
                delete inputArr[k] ;
            }
            try {
                // Sort our new temporary arrays
                bubbleSort(keyArr, valArr);
            } catch(e) {
                return false;
            }
        
            // Repopulate the old array
            for (i = 0; i < valArr.length; i++) {
                inputArr[keyArr[i]] = valArr[i];
            }
        
            return true;
        },// }}}
        
        // {{{ natsort
        natsort: function(inputArr) {
            // Sort an array using a &quot;natural order&quot; algorithm
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_natsort/
            // +       version: 901.2514
            // +   original by: Brett Zamir
            // +   improved by: Brett Zamir
            // -    depends on: strnatcmp
            // *     example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
            // *     example 1: $P.natcasesort($array1);
            // *     returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
        
            var valArr=[], keyArr=[], k, i, ret;
        
            var bubbleSort = function(keyArr, inputArr) {
                var i, j, tempValue, tempKeyVal;
                for (i = inputArr.length-2; i >= 0; i--) {
                    for (j = 0; j <= i; j++) {
                        ret = this.strnatcmp(inputArr[j+1], inputArr[j]);
                        if (ret < 0) {
                            tempValue = inputArr[j];
                            inputArr[j] = inputArr[j+1];
                            inputArr[j+1] = tempValue;
                            tempKeyVal = keyArr[j];
                            keyArr[j] = keyArr[j+1];
                            keyArr[j+1] = tempKeyVal;
                        }
                    }
                }
            };
        
            // Get key and value arrays
            for (k in inputArr) {
                valArr.push(inputArr[k]);
                keyArr.push(k);
                delete inputArr[k] ;
            }
            try {
                // Sort our new temporary arrays
                bubbleSort(keyArr, valArr);
            } catch(e) {
                return false;
            }
        
            // Repopulate the old array
            for (i = 0; i < valArr.length; i++) {
                inputArr[keyArr[i]] = valArr[i];
            }
        
            return true;
        },// }}}
        
        // {{{ next
        next: function (arr) {
            // Advance the internal array pointer of an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_next/
            // +       version: 901.617
            // +   original by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.transport = ['foot', 'bike', 'car', 'plane'];
            // *     example 1: $P.next(transport);
            // *     example 1: $P.next(transport);
            // *     returns 1: 'car'
        
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            }
            var arrpos = pointers.indexOf(arr);
            var cursor = pointers[arrpos+1];
            if (!(arr instanceof Array)) {
                var ct = 0;
                for (var k in arr) {
                    if (ct === cursor+1) {
                        pointers[arrpos+1] += 1;
                        return arr[k];
                    }
                    ct++;
                }
                return false; // End
            }
            if (arr.length === 0 || cursor === (arr.length-1)) {
                return false;
            }
            pointers[arrpos+1] += 1;
            return arr[pointers[arrpos+1]];
        },// }}}
        
        // {{{ pos
        pos: function(arr) {
            // Alias of current()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_pos/
            // +       version: 901.617
            // +   original by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // -    depends on: current
            // *     example 1: $P.transport = ['foot', 'bike', 'car', 'plane'];
            // *     example 1: $P.pos(transport);
            // *     returns 1: 'foot'
            
            return this.current(arr);
        },// }}}
        
        // {{{ prev
        prev: function (arr) {
            // Rewind the internal array pointer
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_prev/
            // +       version: 901.617
            // +   original by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.transport = ['foot', 'bike', 'car', 'plane'];
            // *     example 1: $P.prev(transport);
            // *     returns 1: false
        
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            var arrpos = pointers.indexOf(arr);
            var cursor = pointers[arrpos+1];
            if (pointers.indexOf(arr) === -1 || cursor === 0) {
                return false;
            }
            if (!(arr instanceof Array)) {
                var ct = 0;
                for (var k in arr) {
                    if (ct === cursor-1) {
                        pointers[arrpos+1] -= 1;
                        return arr[k];
                    }
                    ct++;
                }
            // Shouldn't reach here
            }
            if (arr.length === 0) {
                return false;
            }
            pointers[arrpos+1] -= 1;
            return arr[pointers[arrpos+1]];
        },// }}}
        
        // {{{ range
        range: function ( low, high, step ) {
            // Create an array containing a range of elements
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_range/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // *     example 1: $P.range ( 0, 12 );
            // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            // *     example 2: $P.range( 0, 100, 10 );
            // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            // *     example 3: $P.range( 'a', 'i' );
            // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
            // *     example 4: $P.range( 'c', 'a' );
            // *     returns 4: ['c', 'b', 'a']
        
            var matrix = [];
            var inival, endval, plus;
            var walker = step || 1;
            var chars  = false;
        
            if ( !isNaN ( low ) && !isNaN ( high ) ) {
                inival = low;
                endval = high;
            } else if ( isNaN ( low ) && isNaN ( high ) ) {
                chars = true;
                inival = low.charCodeAt ( 0 );
                endval = high.charCodeAt ( 0 );
            } else {
                inival = ( isNaN ( low ) ? 0 : low );
                endval = ( isNaN ( high ) ? 0 : high );
            }
        
            plus = ( ( inival > endval ) ? false : true );
            if ( plus ) {
                while ( inival <= endval ) {
                    matrix.push ( ( ( chars ) ? String.fromCharCode ( inival ) : inival ) );
                    inival += walker;
                }
            } else {
                while ( inival >= endval ) {
                    matrix.push ( ( ( chars ) ? String.fromCharCode ( inival ) : inival ) );
                    inival -= walker;
                }
            }
        
            return matrix;
        },// }}}
        
        // {{{ reset
        reset: function ( arr ) {
            // Set the internal pointer of an array to its first element
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_reset/
            // +       version: 901.617
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Legaev Andrey
            // +    revised by: Brett Zamir
            // %        note 1: Uses global: window.php_js to store the array pointer
            // *     example 1: $P.reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
            // *     returns 1: 'Kevin' 
            
            if (!window.php_js) window.php_js = {
                pointers:[]
            };
            var pointers = window.php_js.pointers;
            if (pointers.indexOf(arr) === -1) {
                pointers.push(arr, 0);
            }
            var arrpos = pointers.indexOf(arr);
            if (!(arr instanceof Array)) {
                for (var k in arr) {
                    if (pointers.indexOf(arr) === -1) {
                        pointers.push(arr, 0);
                    } else {
                        pointers[arrpos+1] = 0;
                    }
                    return arr[k];
                }
                return false; // Empty
            }
            if (arr.length === 0) {
                return false;
            }
            pointers[arrpos+1] = 0;
            return arr[pointers[arrpos+1]];
        },// }}}
        
        // {{{ rsort
        rsort: function (inputArr, sort_flags) {
            // Sort an array in reverse order
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rsort/
            // +       version: 901.2514
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Brett Zamir
            // +   improved by: Brett Zamir
            // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
            // %        note 1: integrated into all of these s: function by adapting the code at
            // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
            // *     example 1: $P.rsort(['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: true
            // *     example 2: $P.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
            // *     example 2: $P.rsort(fruits);
            // *     returns 2: true
            // *     results 2: fruits == {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
        
            var valArr = [], keyArr=[];
            var k = '', i = 0, sorter = false;
            
            for (k in inputArr) { // Get key and value arrays
                valArr.push(inputArr[k]);
                delete inputArr[k] ;
            }
        
            switch (sort_flags) {
                case 'SORT_STRING': // compare items as strings
                     sorter = function (a, b) {
                        return strnatcmp(b, a);
                    };
                    break;
                case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
                    sorter = function (a, b) {
                        return(b.localeCompare(a));
                    };
                    break;
                case 'SORT_NUMERIC': // compare items numerically
                    sorter = function (a, b) {
                        return(b - a);
                    };
                    break;
                case 'SORT_REGULAR': // compare items normally (don't change types)
                default:
                    sorter = function (a, b) {
                        if (a < b)
                            return 1;
                        if (a > b)
                            return -1;
                        return 0;
                    };
                    break;
            }
            valArr.sort(sorter);
        
            for (i = 0; i < valArr.length; i++) { // Repopulate the old array
                inputArr[i] = valArr[i];
            }
            return true;
        },// }}}
        
        // {{{ shuffle
        shuffle: function( inputArr ) {
            // Shuffle an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_shuffle/
            // +       version: 902.123
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Brett Zamir
            // *     example 1: $P.shuffle({5:'a', 2:'3', 3:'c', 4:5, 'q':5});
            // *     returns 1: true
        
            var valArr = [];
            var k = '', i = 0;
        
            for (k in inputArr) { // Get key and value arrays
                valArr.push(inputArr[k]);
                delete inputArr[k] ;
            }
            valArr.sort(function() {return 0.5 - Math.random();});
        
            for (i = 0; i < valArr.length; i++) { // Repopulate the old array
                inputArr[i] = valArr[i];
            }
            
            return true;
        },// }}}
        
        // {{{ sizeof
        sizeof: function ( mixed_var, mode ) {
            // Alias of count()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sizeof/
            // +       version: 809.522
            // +   original by: Philip Peterson
            // -    depends on: count
            // *     example 1: $P.sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
            // *     returns 1: 6
            // *     example 2: $P.sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
            // *     returns 2: 6
         
            return this.count( mixed_var, mode );
        },// }}}
        
        // {{{ sort
        sort: function (inputArr, sort_flags) {
            // Sort an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sort/
            // +       version: 901.2514
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Brett Zamir
            // +   improved by: Brett Zamir
            // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
            // %        note 1: integrated into all of these s: function by adapting the code at
            // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
            // *     example 1: $P.sort(['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: true
            // *     example 2: $P.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
            // *     example 2: $P.sort(fruits);
            // *     returns 2: true
            // *     results 2: fruits == {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
        
            var valArr = [], keyArr=[];
            var k = '', i = 0, sorter = false;
            
            for (k in inputArr) { // Get key and value arrays
                valArr.push(inputArr[k]);
                delete inputArr[k] ;
            }
        
            switch (sort_flags) {
                case 'SORT_STRING': // compare items as strings
                    sorter = function (a, b) {
                        return strnatcmp(a, b);
                    };
                    break;
                case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
                    sorter = function (a, b) {
                        return(a.localeCompare(b));
                    };
                    break;
                case 'SORT_NUMERIC': // compare items numerically
                    sorter = function (a, b) {
                        return(a - b);
                    };
                    break;
                case 'SORT_REGULAR': // compare items normally (don't change types)
                default:
                    sorter = function (a, b) {
                        if (a > b)
                            return 1;
                        if (a < b)
                            return -1;
                        return 0;
                    };
                    break;
            }
            valArr.sort(sorter);
        
            for (i = 0; i < valArr.length; i++) { // Repopulate the old array
                inputArr[i] = valArr[i];
            }
            return true;
        },// }}}
        
        // {{{ uasort
        uasort: function (inputArr, sorter) {
            // Sort an array with a user-defined comparison and: function maintain index
            // association
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_uasort/
            // +       version: 901.1714
            // +   original by: Brett Zamir
            // +   improved by: Brett Zamir
            // *     example 1: $P.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
            // *     example 1: $P.uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
            // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
        
            if (typeof sorter === 'string') {
                sorter = this[sorter];
            } else if (sorter instanceof Array) {
                sorter = this[sorter[0]][sorter[1]];
            }
            
            var valArr = [], keyArr=[], tempKeyVal, tempValue, ret;
            var k = '', i = 0;
        
            var sorterNew = function (keyArr, valArr) {
                for (var i=valArr.length-2; i >=0; i--) {
                    for (var j=0; j <= i; j++) {
                        ret = sorter(valArr[j+1], valArr[j]);
                        if (ret < 0) {
                            tempValue = valArr[j];
                            valArr[j] = valArr[j+1];
                            valArr[j+1] = tempValue;
                            tempKeyVal = keyArr[j];
                            keyArr[j] = keyArr[j+1];
                            keyArr[j+1] = tempKeyVal;
                        }
                    }
                }
            }
        
            for (k in inputArr) { // Get key and value arrays
                valArr.push(inputArr[k]);
                keyArr.push(k);
                delete inputArr[k] ;
            }
            try {
                sorterNew(keyArr, valArr); // Sort our new temporary arrays
            } catch(e) {
                return false;
            }
            for (i = 0; i < valArr.length; i++) { // Repopulate the old array
                inputArr[keyArr[i]] = valArr[i];
            }
            
            return true;
        },// }}}
        
        // {{{ uksort
        uksort: function(array, sorter) {
            // Sort an array by keys using a user-defined comparison function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_uksort/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // %          note: The examples are correct, this is a new way
            // *     example 1: $P.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
            // *     example 1: $P.uksort(data, function(key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
            // *     results 1: data == {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
            // *     returns 1: true
        
            if (typeof sorter === 'string') {
                sorter = window[sorter];
            }
        
            var tmp_arr = {}, keys = [], i = 0, key = '';
        
            // Make a list of key names
            for (key in array) {
                keys.push(key);
            }
        
            // Sort key names
            try {
                if (sorter) {
                    keys.sort(sorter);
                } else {
                    keys.sort();
                }
            } catch (e) {
                return false;
            }
        
            // Rebuild array with sorted key names
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                tmp_arr[key] = array[key];
                delete array[key];
            }
            for (i in tmp_arr) {
                array[i] = tmp_arr[i]
            }
            return true;
        },// }}}
        
        // {{{ usort
        usort: function (inputArr, sorter) {
            // Sort an array by values using a user-defined comparison function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_usort/
            // +       version: 901.1623
            // +   original by: Brett Zamir
            // *     example 1: $P.stuff = {d: '3', a: '1', b: '11', c: '4'};
            // *     example 1: $P.usort(stuff, function (a, b) {return(a-b);});
            // *     results 1: stuff = {0: '1', 1: '3', 2: '4', 3: '11'};
        
            var valArr = [], keyArr=[];
            var k = '', i = 0;
        
            if (typeof sorter === 'string') {
                sorter = this[sorter];
            } else if (sorter instanceof Array) {
                sorter = this[sorter[0]][sorter[1]];
            }
            for (k in inputArr) { // Get key and value arrays
                valArr.push(inputArr[k]);
                delete inputArr[k] ;
            }
            try {
                valArr.sort(sorter);
            } catch (e) {
                return false;
            }
            for (i = 0; i < valArr.length; i++) { // Repopulate the old array
                inputArr[i] = valArr[i];
            }
        
            return true;
        },// }}}
        
        // {{{ class_exists
        class_exists: function (cls) {
            // Checks if the class has been defined
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_class_exists/
            // +       version: 812.3015
            // +   original by: Brett Zamir
            // *     example 1: $P.class_a: function() {this.meth1 = function() {return true;}};
            // *     example 1: $P.var instance_a = new class_a();
            // *     example 1: $P.class_exists('class_a');
            // *     returns 1: true
        
            var i;
            cls = window[cls]; // Note: will prevent inner classes
        
            if (typeof cls !== 'function') {return false;}
        
            for (i in cls.prototype) {
                return true;
            }
            for (i in cls) { // If static members exist, then consider a "class"
                if (i !== 'prototype') {
                    return true;
                }
            }
            if (cls.toSource && cls.toSource().match(/this\./)) { 
                // Hackish and non-standard but can probably detect if setting
                // a property (we don't want to test by instantiating as that
                // may have side-effects)
                return true;
            }
            
            return false;
        },// }}}
        
        // {{{ get_class
        get_class: function(obj) {
            // Returns the name of the class of an object
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_class/
            // +       version: 809.522
            // +   original by: Ates Goral (http://magnetiq.com)
            // +   improved by: David James
            // *     example 1: $P.get_class(new (function MyClass() {}));
            // *     returns 1: "MyClass"
            // *     example 2: $P.get_class({});
            // *     returns 2: "Object"
            // *     example 3: $P.get_class([]);
            // *     returns 3: false
            // *     example 4: $P.get_class(42);
            // *     returns 4: false
            // *     example 5: $P.get_class(window);
            // *     returns 5: false
            // *     example 6: $P.get_class(function MyFunction() {});
            // *     returns 6: false
        
            if (obj instanceof Object && !(obj instanceof Array) 
                && !(obj instanceof Function) && obj.constructor
                && obj != window) {
                var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        
                if (arr && arr.length == 2) {
                    return arr[1];
                }
            }
        
            return false;
        },// }}}
        
        // {{{ get_class_methods
        get_class_methods: function (name) {
            // Gets the class methods&#039; names
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_class_methods/
            // +       version: 902.123
            // +   original by: Brett Zamir
            // *     example 1: $P.function Myclass () {this.privMethod = function(){}}
            // *     example 1: Myclass.classMethod = function () {}
            // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
            // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
            // *     example 1: $P.get_class_methods('MyClass')
            // *     returns 1: {}
        
            var constructor, retArr={}, method = '';
        
            if (typeof name === 'function') {
                constructor = name;
            } else if (typeof name === 'string') {
                constructor = window[name];
            } else if (typeof name === 'object') {
                constructor = name;
                for (method in constructor.constructor) { // Get class methods of object's constructor
                    if (typeof constructor.constructor[method] === 'function') {
                        retArr[method] = constructor.constructor[method];
                    }
                }
                // return retArr; // Uncomment to behave as "class" is usually defined in JavaScript convention (and see comment below)
            }
            for (method in constructor) {
                if (typeof constructor[method] === 'function') {
                    retArr[method] = constructor[method];
                }
            }
             // Comment out this block to behave as "class" is usually defined in JavaScript convention (and see comment above)
            for (method in constructor.prototype) {
                if (typeof constructor.prototype[method] === 'function') {
                    retArr[method] = constructor.prototype[method];
                }
            }
            
            return retArr;
        },// }}}
        
        // {{{ get_class_vars
        get_class_vars: function (name) {
            // Get the default properties of the class
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_class_vars/
            // +       version: 902.123
            // +   original by: Brett Zamir
            // *     example 1: $P.function Myclass(){privMethod = function(){};}
            // *     example 1: Myclass.classMethod = function () {}
            // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
            // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
            // *     example 1: $P.get_class_vars('MyClass')
            // *     returns 1: {}
        
            
            var constructor, retArr={}, prop = '';
            
            if (typeof name === 'function') {
                constructor = name;
            } else if (typeof name === 'string') {
                constructor = window[name];
            }
            
            for (prop in constructor) {
                if (typeof constructor[prop] !== 'function' && prop !== 'prototype') {
                    retArr[prop] = constructor[prop];
                }
            }
             // Comment out this block to behave as "class" is usually defined in JavaScript convention
            if (constructor.prototype) {
                for (prop in constructor.prototype) {
                    if (typeof constructor.prototype[prop] !== 'function') {
                        retArr[prop] = constructor.prototype[prop];
                    }
                }
            }
            
            return retArr;
        },// }}}
        
        // {{{ get_declared_classes
        get_declared_classes: function() {
            // Returns an array with the name of the defined classes
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_declared_classes/
            // +       version: 902.821
            // +   original by: Brett Zamir
            //  -   depends on: class_exists
            // *     example 1: $P.function A (z) {this.z=z} // Assign 'this' in constructor, making it class-like
            // *     example 1: $P.function B () {}
            // *     example 1: B.c = function () {}; // Add a static method, making it class-like
            // *     example 1: $P.function C () {}
            // *     example 1: C.prototype.z = function () {}; // Add to prototype, making it behave as a "class"
            // *     results 1: alert(get_declared_classes()); // [C, B, A]
        
            var i = '', arr = [], already = {};
        
            for (i in window) {
                try {
                    if (typeof window[i] === 'function') {
                        if (!already[i] && this.class_exists(i)) {
                            already[i] = 1;
                            arr.push(i);
                        }
                    }
                    else if (typeof window[i] === 'object') {
                        for (var j in window[i]) {
                            if (typeof window[j] === 'function' && window[j] && !already[j] && this.class_exists(j)) {
                                already[j] = 1;
                                arr.push(j);
                            }
                        }
                    }
                }
                catch (e) {
        
                }
            }
        
            return arr;
        },// }}}
        
        // {{{ get_object_vars
        get_object_vars: function (obj) {
            // Gets the properties of the given object
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_object_vars/
            // +       version: 902.123
            // +   original by: Brett Zamir
            // *     example 1: $P.function Myclass () {this.privMethod = function(){}}
            // *     example 1: Myclass.classMethod = function () {}
            // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
            // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
            // *     example 1: $P.get_object_vars('MyClass')
            // *     returns 1: {}
        
            var retArr = {}, prop = '';
        
            for (prop in obj) {
                if (typeof obj[prop] !== 'function' && prop !== 'prototype') {
                    retArr[prop] = obj[prop];
                }
            }
            for (prop in obj.prototype) {
                if (typeof obj.prototype[prop] !== 'function') {
                    retArr[prop] = obj.prototype[prop];
                }
            }
            
            return retArr;
        },// }}}
        
        // {{{ method_exists
        method_exists: function (obj, method) {
            // Checks if the class method exists
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_method_exists/
            // +       version: 812.3015
            // +   original by: Brett Zamir
            // *     example 1: $P.class_a: function() {this.meth1 = function() {return true;}};
            // *     example 1: $P.var instance_a = new class_a();
            // *     example 1: $P.method_exists(instance_a, 'meth1');
            // *     returns 1: true
            // *     example 2: $P.class_a: function() {this.meth1 = function() {return true;}};
            // *     example 2: $P.var instance_a = new class_a();
            // *     example 2: $P.method_exists(instance_a, 'meth2');
            // *     returns 2: false
        
            if (typeof obj === 'string') {
                return window[obj] && typeof window[obj][method] === 'function'
            }
        
            return typeof obj[method] === 'function';
        },// }}}
        
        // {{{ property_exists
        property_exists: function (cls, prop) {
            // Checks if the object or class has a property
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_property_exists/
            // +       version: 812.3015
            // +   original by: Brett Zamir
            // *     example 1: $P.class_a: function() {this.prop1 = 'one'};
            // *     example 1: $P.var instance_a = new class_a();
            // *     example 1: $P.property_exists(instance_a, 'prop1');
            // *     returns 1: true
            // *     example 2: $P.class_a: function() {this.prop1 = 'one'};
            // *     example 2: $P.var instance_a = new class_a();
            // *     example 2: $P.property_exists(instance_a, 'prop2');
            // *     returns 2: false
        
            cls = (typeof cls === 'string') ? window[cls] : cls;
            
            if (typeof cls === 'function' && cls.toSource &&
                cls.toSource().match(new RegExp('this\\.'+prop+'\\s'))
            ) {
                // Hackish and non-standard but can probably detect if setting
                // the property (we don't want to test by instantiating as that
                // may have side-effects)
                return true;
            }
        
            return (cls[prop] !== undefined && typeof cls[prop] !== 'function')
                || (cls.prototype !== undefined && cls.prototype[prop] !== undefined && typeof cls.prototype[prop] !== 'function')
                || (cls.constructor && cls.constructor[prop] !== undefined && typeof cls.constructor[prop] !== 'function');
        },// }}}
        
        // {{{ checkdate
        checkdate: function( month, day, year ) {
            // Validate a Gregorian date
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_checkdate/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Pyerre
            // *     example 1: $P.checkdate(12, 31, 2000);
            // *     returns 1: true
            // *     example 2: $P.checkdate(2, 29, 2001);
            // *     returns 2: false
            // *     example 3: $P.checkdate(03, 31, 2008);
            // *     returns 3: true
            // *     example 4: $P.checkdate(1, 390, 2000);
            // *     returns 4: false
        
            var myDate = new Date();
            myDate.setFullYear( year, (month - 1), day );
        
            return ((myDate.getMonth()+1) == month && day<32); 
        },// }}}
        
        // {{{ date
        date: function ( format, timestamp ) {
            // Format a local time/date
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_date/
            // +       version: 901.1301
            // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: MeEtc (http://yass.meetcweb.com)
            // +   improved by: Brad Touesnard
            // +   improved by: Tim Wiel
            // +   improved by: Bryan Elliott
            // +   improved by: Brett Zamir
            // +   improved by: David Randall
            // *     example 1: $P.date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
            // *     returns 1: '09:09:40 m is month'
            // *     example 2: $P.date('F j, Y, g:i a', 1062462400);
            // *     returns 2: 'September 2, 2003, 2:26 am'
            // *     example 3: $P.date('Y W o', 1062462400);
            // *     returns 3: '2003 36 2003'
            // *     example 4: x = date('Y m d', (new Date()).getTime()/1000); // 2009 01 09
            // *     example 4: (x+'').length == 10
            // *     returns 4: true
        
            var a, jsdate=(
                (typeof(timestamp) == 'undefined') ? new Date() : // Not provided
                (typeof(timestamp) == 'number') ? new Date(timestamp*1000) : // UNIX timestamp
                new Date(timestamp) // Javascript Date()
            );
            var pad = function(n, c){
                if( (n = n + "").length < c ) {
                    return new Array(++c - n.length).join("0") + n;
                } else {
                    return n;
                }
            };
            var txt_weekdays = ["Sunday","Monday","Tuesday","Wednesday",
                "Thursday","Friday","Saturday"];
            var txt_ordin = {1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};
            var txt_months =  ["", "January", "February", "March", "April",
                "May", "June", "July", "August", "September", "October", "November",
                "December"];
        
            var f = {
                // Day
                    d: function(){
                        return pad(f.j(), 2);
                    },
                    D: function(){
                        var t = f.l();
                        return t.substr(0,3);
                    },
                    j: function(){
                        return jsdate.getDate();
                    },
                    l: function(){
                        return txt_weekdays[f.w()];
                    },
                    N: function(){
                        return f.w() + 1;
                    },
                    S: function(){
                        return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
                    },
                    w: function(){
                        return jsdate.getDay();
                    },
                    z: function(){
                        return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
                    },
        
                // Week
                    W: function(){
                        var a = f.z(), b = 364 + f.L() - a;
                        var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
        
                        if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                            return 1;
                        } else{
        
                            if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                                nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                                return this.date("W", Math.round(nd2.getTime()/1000));
                            } else{
                                return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                            }
                        }
                    },
        
                // Month
                    F: function(){
                        return txt_months[f.n()];
                    },
                    m: function(){
                        return pad(f.n(), 2);
                    },
                    M: function(){
                        t = f.F(); return t.substr(0,3);
                    },
                    n: function(){
                        return jsdate.getMonth() + 1;
                    },
                    t: function(){
                        var n;
                        if( (n = jsdate.getMonth() + 1) == 2 ){
                            return 28 + f.L();
                        } else{
                            if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                                return 31;
                            } else{
                                return 30;
                            }
                        }
                    },
        
                // Year
                    L: function(){
                        var y = f.Y();
                        return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
                    },
                    o: function(){
                        if (f.n() === 12 && f.W() === 1) {
                            return jsdate.getFullYear()+1;
                        }
                        if (f.n() === 1 && f.W() >= 52) {
                            return jsdate.getFullYear()-1;
                        }
                        return jsdate.getFullYear();
                    },
                    Y: function(){
                        return jsdate.getFullYear();
                    },
                    y: function(){
                        return (jsdate.getFullYear() + "").slice(2);
                    },
        
                // Time
                    a: function(){
                        return jsdate.getHours() > 11 ? "pm" : "am";
                    },
                    A: function(){
                        return f.a().toUpperCase();
                    },
                    B: function(){
                        // peter paul koch:
                        var off = (jsdate.getTimezoneOffset() + 60)*60;
                        var theSeconds = (jsdate.getHours() * 3600) +
                                         (jsdate.getMinutes() * 60) +
                                          jsdate.getSeconds() + off;
                        var beat = Math.floor(theSeconds/86.4);
                        if (beat > 1000) beat -= 1000;
                        if (beat < 0) beat += 1000;
                        if ((String(beat)).length == 1) beat = "00"+beat;
                        if ((String(beat)).length == 2) beat = "0"+beat;
                        return beat;
                    },
                    g: function(){
                        return jsdate.getHours() % 12 || 12;
                    },
                    G: function(){
                        return jsdate.getHours();
                    },
                    h: function(){
                        return pad(f.g(), 2);
                    },
                    H: function(){
                        return pad(jsdate.getHours(), 2);
                    },
                    i: function(){
                        return pad(jsdate.getMinutes(), 2);
                    },
                    s: function(){
                        return pad(jsdate.getSeconds(), 2);
                    },
                    u: function(){
                        return pad(jsdate.getMilliseconds()*1000, 6);
                    },
        
                // Timezone
                    //e not supported yet
                    I: function(){
                        var DST = (new Date(jsdate.getFullYear(),6,1,0,0,0));
                        DST = DST.getHours()-DST.getUTCHours();
                        var ref = jsdate.getHours()-jsdate.getUTCHours();
                        return ref != DST ? 1 : 0;
                    },
                    O: function(){
                       var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
                       if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
                       return t;
                    },
                    P: function(){
                        var O = f.O();
                        return (O.substr(0, 3) + ":" + O.substr(3, 2));
                    },
                    //T not supported yet
                    Z: function(){
                       var t = -jsdate.getTimezoneOffset()*60;
                       return t;
                    },
        
                // Full Date/Time
                    c: function(){
                        return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
                    },
                    r: function(){
                        return f.D()+', '+f.d()+' '+f.M()+' '+f.Y()+' '+f.H()+':'+f.i()+':'+f.s()+' '+f.O();
                    },
                    U: function(){
                        return Math.round(jsdate.getTime()/1000);
                    }
            };
        
            return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
                if( t!=s ){
                    // escaped
                    ret = s;
                } else if( f[s] ){
                    // a this.date exists: function
                    ret = f[s]();
                } else{
                    // nothing special
                    ret = s;
                }
        
                return ret;
            });
        },// }}}
        
        // {{{ getdate
        getdate: function(timestamp) {
            // Get date/time information
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_getdate/
            // +       version: 812.313
            // +   original by: Paulo Ricardo F. Santos
            // *     example 1: $P.getdate(1055901520);
            // *     returns 1: {'seconds': 40, 'minutes': 58, 'hours': 21, 'mday': 17, 'wday': 2, 'mon': 6, 'year': 2003, 'yday': 167, 'weekday': 'Tuesday', 'month': 'June', '0': 1055901520}
        
            var _w = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var _m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var d = (typeof timestamp == 'number') ? new Date(timestamp * 1000) : new Date();
            var w = d.getDay();
            var m = d.getMonth();
            var y = d.getFullYear();
            var r = {};
        
            r['seconds'] = d.getSeconds();
            r['minutes'] = d.getMinutes();
            r['hours'] = d.getHours();
            r['mday'] = d.getDate();
            r['wday'] = w;
            r['mon'] = m + 1;
            r['year'] = y;
            r['yday'] = Math.floor((d - (new Date(y, 0, 1))) / 86400000);
            r['weekday'] = _w[w];
            r['month'] = _m[m];
            r['0'] = parseInt(d.getTime() / 1000);
        
            return r;
        },// }}}
        
        // {{{ microtime
        microtime: function(get_as_float) {
            // Return current Unix timestamp with microseconds
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_microtime/
            // +       version: 812.313
            // +   original by: Paulo Ricardo F. Santos
            // *     example 1: $P.timeStamp = microtime(true);
            // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
        
            var now = new Date().getTime() / 1000;
            var s = parseInt(now);
        
            return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
        },// }}}
        
        // {{{ mktime
        mktime: function() {
            // Get Unix timestamp for a date
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_mktime/
            // +       version: 901.2514
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: baris ozdil
            // +      input by: gabriel paderni 
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: FGFEmperor
            // +      input by: Yannoo
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: jakes
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Marc Palau
            // *     example 1: $P.mktime(14, 10, 2, 2, 1, 2008);
            // *     returns 1: 1201871402
            // *     example 2: $P.mktime(0, 0, 0, 0, 1, 2008);
            // *     returns 2: 1196463600
            // *     example 3: $P.make = mktime();
            // *     example 3: $P.td = new Date();
            // *     example 3: $P.real = Math.floor(td.getTime()/1000);
            // *     example 3: $P.diff = (real - make);
            // *     results 3: diff < 5
            // *     example 4: $P.mktime(0, 0, 0, 13, 1, 1997)
            // *     returns 4: 883609200
            // *     example 5: $P.mktime(0, 0, 0, 1, 1, 1998)
            // *     returns 5: 883609200
            // *     example 6: $P.mktime(0, 0, 0, 1, 1, 98)
            // *     returns 6: 883609200
            
            var no, ma = 0, mb = 0, i = 0, d = new Date(), argv = arguments, argc = argv.length;
        
            if (argc > 0){
                d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1972);
            }
         
            var dateManip = {
                0: function(tt){ return d.setHours(tt); },
                1: function(tt){ return d.setMinutes(tt); },
                2: function(tt){ var set = d.setSeconds(tt); mb = d.getDate() - 1; return set; },
                3: function(tt){ var set = d.setMonth(parseInt(tt)-1); ma = d.getFullYear() - 1972; return set; },
                4: function(tt){ return d.setDate(tt+mb); },
                5: function(tt){ return d.setYear(tt+ma); }
            };
            
            for( i = 0; i < argc; i++ ){
                no = parseInt(argv[i]*1);
                if (isNaN(no)) {
                    return false;
                } else {
                    // arg is number, let's manipulate date object
                    if(!dateManip[i](no)){
                        // failed
                        return false;
                    }
                }
            }
        
            return Math.floor(d.getTime()/1000);
        },// }}}
        
        // {{{ strtotime
        strtotime: function(str, now) {
            // Parse about any English textual datetime description into a Unix timestamp
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtotime/
            // +       version: 812.3015
            // +   original by: Caio Ariede (http://caioariede.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
            // *     example 1: $P.strtotime('+1 day', 1129633200);
            // *     returns 1: 1129719600
            // *     example 2: $P.strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
            // *     returns 2: 1130425202
            // *     example 3: $P.strtotime('last month', 1129633200);
            // *     returns 3: 1127041200
        
            var i, match, s;
            
            str = str.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
            str = str.replace(/[\t\r\n]/g, ''); // unecessary chars
        
            if (str == 'now') return (new Date()).getTime();
            else if (!isNaN(parse = Date.parse(str))) return parse/1000;
            else if (now) now = new Date(now);
            else now = new Date();
        
            str = str.toLowerCase();
        
           var process = function (m) {
                var ago = (m[2] && m[2] == 'ago');
                var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);
        
                switch (m[0]) {
                    case 'last':
                    case 'next':
                        switch (m[1].substring(0, 3)) {
                            case 'yea':
                                now.setFullYear(now.getFullYear() + num);
                                break;
                            case 'mon':
                                now.setMonth(now.getMonth() + num);
                                break;
                            case 'wee':
                                now.setDate(now.getDate() + (num * 7));
                                break;
                            case 'day':
                                now.setDate(now.getDate() + num);
                                break;
                            case 'hou':
                                now.setHours(now.getHours() + num);
                                break;
                            case 'min':
                                now.setMinutes(now.getMinutes() + num);
                                break;
                            case 'sec':
                                now.setSeconds(now.getSeconds() + num);
                                break;
                            default:
                                var day;
                                if (typeof (day = __is_day[m[1].substring(0, 3)]) != 'undefined') {
                                    var diff = day - now.getDay();
                                    if (diff == 0) {
                                        diff = 7 * num;
                                    } else if (diff > 0) {
                                        if (m[0] == 'last') diff -= 7;
                                    } else {
                                        if (m[0] == 'next') diff += 7;
                                    }
        
                                    now.setDate(now.getDate() + diff);
                                }
                        }
        
                        break;
        
                    default:
                        if (/\d+/.test(m[0])) {
                            num *= parseInt(m[0]);
        
                            switch (m[1].substring(0, 3)) {
                                case 'yea':
                                    now.setFullYear(now.getFullYear() + num);
                                    break;
                                case 'mon':
                                    now.setMonth(now.getMonth() + num);
                                    break;
                                case 'wee':
                                    now.setDate(now.getDate() + (num * 7));
                                    break;
                                case 'day':
                                    now.setDate(now.getDate() + num);
                                    break;
                                case 'hou':
                                    now.setHours(now.getHours() + num);
                                    break;
                                case 'min':
                                    now.setMinutes(now.getMinutes() + num);
                                    break;
                                case 'sec':
                                    now.setSeconds(now.getSeconds() + num);
                                    break;
                            }
                        } else {
                            return false;
                        }
        
                        break;
                }
        
                return true;
            }
            
            var __is =
            {
                day:
                {
                    'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3,
                    'thu': 4, 'fri': 5, 'sat': 6
                },
                mon:
                {
                    'jan': 0, 'feb': 1, 'mar': 2, 'may': 3, 'apr': 4,  'jun': 5,
                    'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
                }
            }
        
            match = str.match(/^(\d{2,4}-\d{2}-\d{2})(\s\d{1,2}:\d{1,2}(:\d{1,2})?)?$/);
        
            if (match != null) {
                if (!match[2]) {
                    match[2] = '00:00:00';
                } else if (!match[3]) {
                    match[2] += ':00';
                }
        
                s = match[1].split(/-/g);
        
                for (i in __is.mon) {
                    if (__is.mon[i] == s[1] - 1) {
                        s[1] = i;
                    }
                }
        
                return this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]);
            }
         
            var regex = '([+-]?\\d+\\s'
                      + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'
                      + '|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'
                      + '|thu\.?|thursday|fri\.?|friday|sat\.?|saturday)'
                      + '|(last|next)\\s'
                      + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'
                      + '|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'
                      + '|thu\.?|thursday|fri\.?|friday|sat\.?|saturday))'
                      + '(\\sago)?';
        
            match = str.match(new RegExp(regex, 'g'));
        
            if (match == null) {
                return false;
            }
        
            for (i in match) {
                if (!process(match[i].split(' '))) {
                    return false;
                }
            }
        
            return (now);
        },// }}}
        
        // {{{ time
        time: function() {
            // Return current Unix timestamp
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_time/
            // +       version: 809.522
            // +   original by: GeekFG (http://geekfg.blogspot.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: metjay
            // *     example 1: $P.timeStamp = time();
            // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
            
            return Math.round(new Date().getTime()/1000);
        },// }}}
        
        // {{{ timezone_abbreviations_list
        var timezone_abbreviations_list = function () {
            // Alias of  DateTimeZone::listAbbreviations
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_timezone_abbreviations_list/
            // +       version: 902.821
            // +   original by: Brett Zamir
            // %        note 1: Based on list returned by PHP 5.2.6 (Windows)
            // %        note 2: We build the timezones as a private static variable (and then return a which: function returns this variable) to avoid recreating the object upon each call to this function
            // *     example 1: $P.var list = timezone_abbreviations_list();
            // *     example 1: $P.alert(  list.acst[0].timezone_id  ); // 'America/Porto_Acre'
        
            var timezone_abbreviations = {
              'acst' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Porto_Acre',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Eirunepe',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Rio_Branco',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Brazil/Acre'
                }
              ],
              'act' :
              [
                {'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Porto_Acre',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Eirunepe',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rio_Branco',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'Brazil/Acre'
                }
              ],
              'addt' :
              [
                {'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Pangnirtung'
                }
              ],
              'adt' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Halifax',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Barbados',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Blanc-Sablon',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Glace_Bay',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Martinique',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Moncton',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Thule',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Atlantic/Bermuda',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Canada/Atlantic',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Baghdad'
                }
              ],
              'aft' :
              [
                {'dst' : false,
                  'offset' : 16200,
                  'timezone_id' : 'Asia/Kabul'
                }
              ],
              'ahdt' :
              [
                {'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'US/Alaska'
                }
              ],
              'ahst' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'US/Alaska',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'US/Aleutian'
                }
              ],
              'akdt' :
              [
                {'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Yakutat',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'US/Alaska'
                }
              ],
              'akst' :
              [
                {'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Yakutat',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'US/Alaska'
                }
              ],
              'aktst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Aqtobe'
                }
              ],
              'aktt' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Aqtobe',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Aqtobe',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Aqtobe'
                }
              ],
              'almst' :
              [
                {'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Almaty'
                }
              ],
              'almt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Almaty',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Almaty'
                }
              ],
              'amst' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Yerevan',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Yerevan',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Boa_Vista',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Campo_Grande',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Cuiaba',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Manaus',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Porto_Velho',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Brazil/West'
                }
              ],
              'amt' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Yerevan',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Yerevan',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Boa_Vista',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Campo_Grande',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Cuiaba',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Manaus',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Porto_Velho',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Brazil/West',
                },{
                  'dst' : false,
                  'offset' : 1172,
                  'timezone_id' : 'Europe/Amsterdam'
                }
              ],
              'anast' :
              [
                {'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Asia/Anadyr',
                },{
                  'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'Asia/Anadyr',
                },{
                  'dst' : true,
                  'offset' : 50400,
                  'timezone_id' : 'Asia/Anadyr'
                }
              ],
              'anat' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Anadyr',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Asia/Anadyr',
                },{
                  'dst' : false,
                  'offset' : 46800,
                  'timezone_id' : 'Asia/Anadyr'
                }
              ],
              'ant' :
              [
                {'dst' : false,
                  'offset' : -16200,
                  'timezone_id' : 'America/Curacao',
                },{
                  'dst' : false,
                  'offset' : -16200,
                  'timezone_id' : 'America/Aruba'
                }
              ],
              'apt' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Halifax',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Blanc-Sablon',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Glace_Bay',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Moncton',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Puerto_Rico',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Canada/Atlantic'
                }
              ],
              'aqtst' :
              [
                {'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Aqtau',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Aqtau',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Aqtobe'
                }
              ],
              'aqtt' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Aqtau',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Aqtau',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Aqtobe'
                }
              ],
              'arst' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Buenos_Aires',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Buenos_Aires',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Buenos_Aires',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Catamarca',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/ComodRivadavia',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Cordoba',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Jujuy',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/La_Rioja',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Mendoza',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Rio_Gallegos',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/San_Juan',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Tucuman',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Ushuaia',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Catamarca',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Cordoba',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Jujuy',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Mendoza',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Rosario',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Antarctica/Palmer',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Buenos_Aires',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Catamarca',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/ComodRivadavia',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Cordoba',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Jujuy',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/La_Rioja',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Mendoza',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Rio_Gallegos',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/San_Juan',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Tucuman',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Argentina/Ushuaia',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Catamarca',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Cordoba',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Jujuy',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Mendoza',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Rosario',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'Antarctica/Palmer'
                }
              ],
              'art' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Buenos_Aires',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Buenos_Aires',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Buenos_Aires',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Catamarca',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/ComodRivadavia',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Cordoba',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Jujuy',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/La_Rioja',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Mendoza',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Rio_Gallegos',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/San_Juan',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Tucuman',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Ushuaia',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Catamarca',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Cordoba',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Jujuy',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Mendoza',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Rosario',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'Antarctica/Palmer',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Buenos_Aires',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Catamarca',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/ComodRivadavia',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Cordoba',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Jujuy',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/La_Rioja',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Mendoza',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Rio_Gallegos',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/San_Juan',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Tucuman',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Ushuaia',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Catamarca',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Cordoba',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Jujuy',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Mendoza',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Rosario',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Antarctica/Palmer'
                }
              ],
              'ashst' :
              [
                {'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Ashkhabad',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Ashkhabad',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Ashgabat',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Ashgabat'
                }
              ],
              'asht' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Ashkhabad',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Ashkhabad',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Ashgabat',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Ashgabat'
                }
              ],
              'ast' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Riyadh',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Anguilla',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Antigua',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Aruba',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Barbados',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Blanc-Sablon',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Curacao',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Dominica',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Glace_Bay',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Grenada',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Guadeloupe',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Halifax',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Martinique',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Miquelon',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Moncton',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Montserrat',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Port_of_Spain',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Puerto_Rico',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Santo_Domingo',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/St_Kitts',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/St_Lucia',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/St_Thomas',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/St_Vincent',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Thule',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Tortola',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Virgin',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Atlantic/Bermuda',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Canada/Atlantic',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Aden',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Baghdad',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Bahrain',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Kuwait',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Qatar'
                }
              ],
              'awt' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Halifax',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Blanc-Sablon',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Glace_Bay',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Moncton',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Puerto_Rico',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Canada/Atlantic'
                }
              ],
              'azomt' :
              [
                {'dst' : true,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Azores'
                }
              ],
              'azost' :
              [
                {'dst' : true,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Azores',
                },{
                  'dst' : true,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Azores'
                }
              ],
              'azot' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Azores',
                },{
                  'dst' : false,
                  'offset' : -7200,
                  'timezone_id' : 'Atlantic/Azores'
                }
              ],
              'azst' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Baku',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Baku'
                }
              ],
              'azt' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Baku',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Baku'
                }
              ],
              'bakst' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Baku',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Baku'
                }
              ],
              'bakt' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Baku',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Baku'
                }
              ],
              'bdst' :
              [
                {'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/London',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Belfast',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Gibraltar',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Guernsey',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Isle_of_Man',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Jersey',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'GB',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'GB-Eire'
                }
              ],
              'bdt' :
              [
                {'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'US/Aleutian',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Dacca',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Dhaka'
                }
              ],
              'beat' :
              [
                {'dst' : false,
                  'offset' : 9000,
                  'timezone_id' : 'Africa/Mogadishu',
                },{
                  'dst' : false,
                  'offset' : 9000,
                  'timezone_id' : 'Africa/Kampala',
                },{
                  'dst' : false,
                  'offset' : 9000,
                  'timezone_id' : 'Africa/Nairobi'
                }
              ],
              'beaut' :
              [
                {'dst' : false,
                  'offset' : 9885,
                  'timezone_id' : 'Africa/Nairobi',
                },{
                  'dst' : false,
                  'offset' : 9885,
                  'timezone_id' : 'Africa/Dar_es_Salaam',
                },{
                  'dst' : false,
                  'offset' : 9885,
                  'timezone_id' : 'Africa/Kampala'
                }
              ],
              'bmt' :
              [
                {'dst' : false,
                  'offset' : -14308,
                  'timezone_id' : 'America/Barbados',
                },{
                  'dst' : false,
                  'offset' : -3996,
                  'timezone_id' : 'Africa/Banjul',
                },{
                  'dst' : false,
                  'offset' : 6264,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : false,
                  'offset' : 6264,
                  'timezone_id' : 'Europe/Chisinau'
                }
              ],
              'bnt' :
              [
                {'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Brunei',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Brunei'
                }
              ],
              'bortst' :
              [
                {'dst' : true,
                  'offset' : 30000,
                  'timezone_id' : 'Asia/Kuching'
                }
              ],
              'bort' :
              [
                {'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Kuching',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Kuching'
                }
              ],
              'bost' :
              [
                {'dst' : true,
                  'offset' : -12756,
                  'timezone_id' : 'America/La_Paz'
                }
              ],
              'bot' :
              [
                {'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/La_Paz'
                }
              ],
              'brst' :
              [
                {'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Sao_Paulo',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Araguaina',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Bahia',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Belem',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Fortaleza',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Maceio',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Recife',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'Brazil/East'
                }
              ],
              'brt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Sao_Paulo',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Araguaina',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Bahia',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Belem',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Fortaleza',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Maceio',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Recife',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'Brazil/East'
                }
              ],
              'bst' :
              [
                {'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/London',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/London',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Midway',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Pago_Pago',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Samoa',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'US/Aleutian',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'US/Samoa',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Belfast',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Guernsey',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Isle_of_Man',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Jersey',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'GB',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'GB-Eire',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Eire',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Belfast',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Dublin',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Gibraltar',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Guernsey',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Isle_of_Man',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Jersey',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'GB',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'GB-Eire'
                }
              ],
              'btt' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Thimbu',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Thimphu'
                }
              ],
              'burt' :
              [
                {'dst' : false,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Calcutta',
                },{
                  'dst' : false,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Dacca',
                },{
                  'dst' : false,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Dhaka',
                },{
                  'dst' : false,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Rangoon'
                }
              ],
              'cant' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Canary'
                }
              ],
              'capt' :
              [
                {'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'US/Alaska'
                }
              ],
              'cast' :
              [
                {'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/Adelaide',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Gaborone',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Khartoum'
                }
              ],
              'cat' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'US/Alaska',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Khartoum',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Blantyre',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Gaborone',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Harare',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Kigali',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Lusaka',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Maputo',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Windhoek'
                }
              ],
              'cawt' :
              [
                {'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'US/Alaska'
                }
              ],
              'cddt' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Rankin_Inlet'
                }
              ],
              'cdt' :
              [
                {'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Chicago',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Havana',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Cuba',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Atikokan',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Belize',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Cancun',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Chihuahua',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Coral_Harbour',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Costa_Rica',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/El_Salvador',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Fort_Wayne',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Guatemala',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Knox',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Marengo',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Petersburg',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vevay',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vincennes',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Winamac',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Iqaluit',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Louisville',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Monticello',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Knox_IN',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Louisville',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Managua',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Menominee',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Merida',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Mexico_City',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Monterrey',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/North_Dakota/Center',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/North_Dakota/New_Salem',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rainy_River',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rankin_Inlet',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Tegucigalpa',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Winnipeg',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Canada/Central',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'CST6CDT',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Mexico/General',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/Central',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/East-Indiana',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/Indiana-Starke',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Shanghai',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Chongqing',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Chungking',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Harbin',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Kashgar',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Taipei',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Urumqi',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'PRC',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'ROC'
                }
              ],
              'cemt' :
              [
                {'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Berlin',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'CET'
                }
              ],
              'cest' :
              [
                {'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Berlin',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Algiers',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Ceuta',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Tripoli',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Tunis',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Arctic/Longyearbyen',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Atlantic/Jan_Mayen',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'CET',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Amsterdam',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Andorra',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Athens',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Belgrade',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Bratislava',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Brussels',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Budapest',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Chisinau',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Copenhagen',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Gibraltar',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Kiev',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Lisbon',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Ljubljana',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Luxembourg',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Madrid',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Malta',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Minsk',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Monaco',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Oslo',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Paris',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Podgorica',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Prague',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Riga',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Rome',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/San_Marino',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Sarajevo',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Simferopol',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Skopje',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Sofia',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Stockholm',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Tallinn',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Tirane',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Uzhgorod',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Vaduz',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Vatican',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Vienna',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Vilnius',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Warsaw',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Zagreb',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Zaporozhye',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Zurich',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Libya',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Poland',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Portugal',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'WET'
                }
              ],
              'cet' :
              [
                {'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Berlin',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Algiers',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Casablanca',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Ceuta',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Tripoli',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Tunis',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Arctic/Longyearbyen',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Atlantic/Jan_Mayen',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'CET',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Amsterdam',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Andorra',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Athens',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Belgrade',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Bratislava',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Brussels',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Budapest',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Chisinau',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Copenhagen',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Gibraltar',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Kiev',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Lisbon',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Ljubljana',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Luxembourg',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Madrid',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Malta',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Minsk',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Monaco',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Oslo',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Paris',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Podgorica',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Prague',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Riga',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Rome',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/San_Marino',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Sarajevo',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Simferopol',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Skopje',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Sofia',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Stockholm',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Tallinn',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Tirane',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Uzhgorod',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Vaduz',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Vatican',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Vienna',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Vilnius',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Warsaw',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Zagreb',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Zaporozhye',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Zurich',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Libya',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Poland',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Portugal',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'WET',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Kaliningrad'
                }
              ],
              'cgst' :
              [
                {'dst' : true,
                  'offset' : -3600,
                  'timezone_id' : 'America/Scoresbysund'
                }
              ],
              'cgt' :
              [
                {'dst' : false,
                  'offset' : -7200,
                  'timezone_id' : 'America/Scoresbysund'
                }
              ],
              'chadt' :
              [
                {'dst' : true,
                  'offset' : 49500,
                  'timezone_id' : 'Pacific/Chatham',
                },{
                  'dst' : true,
                  'offset' : 49500,
                  'timezone_id' : 'NZ-CHAT'
                }
              ],
              'chast' :
              [
                {'dst' : false,
                  'offset' : 45900,
                  'timezone_id' : 'Pacific/Chatham',
                },{
                  'dst' : false,
                  'offset' : 45900,
                  'timezone_id' : 'NZ-CHAT'
                }
              ],
              'chat' :
              [
                {'dst' : false,
                  'offset' : 30600,
                  'timezone_id' : 'Asia/Harbin',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Harbin'
                }
              ],
              'chdt' :
              [
                {'dst' : true,
                  'offset' : -19800,
                  'timezone_id' : 'America/Belize'
                }
              ],
              'chost' :
              [
                {'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Choibalsan'
                }
              ],
              'chot' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Choibalsan'
                }
              ],
              'cit' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Dili',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Makassar',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Pontianak',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Ujung_Pandang'
                }
              ],
              'cjt' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Sakhalin'
                }
              ],
              'ckhst' :
              [
                {'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'Pacific/Rarotonga'
                }
              ],
              'ckt' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'Pacific/Rarotonga'
                }
              ],
              'clst' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Santiago',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Santiago',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Antarctica/Palmer',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Chile/Continental',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Chile/Continental'
                }
              ],
              'clt' :
              [
                {'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Santiago',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Santiago',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Antarctica/Palmer',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Chile/Continental',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'Chile/Continental'
                }
              ],
              'cost' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Bogota'
                }
              ],
              'cot' :
              [
                {'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Bogota'
                }
              ],
              'cpt' :
              [
                {'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Chicago',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Atikokan',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Coral_Harbour',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Fort_Wayne',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Knox',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Marengo',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Petersburg',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vevay',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vincennes',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Winamac',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Louisville',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Monticello',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Knox_IN',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Louisville',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Menominee',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rainy_River',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rankin_Inlet',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Winnipeg',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Canada/Central',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'CST6CDT',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/Central',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/East-Indiana',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/Indiana-Starke'
                }
              ],
              'cst' :
              [
                {'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Chicago',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Havana',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'Cuba',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Atikokan',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Belize',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Cancun',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Chihuahua',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Coral_Harbour',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Costa_Rica',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Detroit',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/El_Salvador',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Fort_Wayne',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Guatemala',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Hermosillo',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Indianapolis',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Knox',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Marengo',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Petersburg',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Vevay',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Vincennes',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indiana/Winamac',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Indianapolis',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Iqaluit',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Kentucky/Louisville',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Kentucky/Monticello',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Knox_IN',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Louisville',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Managua',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Mazatlan',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Menominee',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Merida',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Mexico_City',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Monterrey',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/Center',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/New_Salem',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Rainy_River',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Rankin_Inlet',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Regina',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Swift_Current',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Tegucigalpa',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'America/Winnipeg',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Central',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/East-Saskatchewan',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Saskatchewan',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'CST6CDT',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Mexico/BajaSur',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Mexico/General',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'US/Central',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'US/East-Indiana',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'US/Indiana-Starke',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'US/Michigan',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Chongqing',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Chungking',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Harbin',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Kashgar',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Macao',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Macau',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Shanghai',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Taipei',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Urumqi',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'PRC',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'ROC',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Asia/Jayapura',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/Adelaide',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/Broken_Hill',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/Darwin',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/North',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/South',
                },{
                  'dst' : false,
                  'offset' : 34200,
                  'timezone_id' : 'Australia/Yancowinna',
                },{
                  'dst' : true,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/Adelaide',
                },{
                  'dst' : true,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/Broken_Hill',
                },{
                  'dst' : true,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/Darwin',
                },{
                  'dst' : true,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/North',
                },{
                  'dst' : true,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/South',
                },{
                  'dst' : true,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/Yancowinna'
                }
              ],
              'cvst' :
              [
                {'dst' : true,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Cape_Verde'
                }
              ],
              'cvt' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Cape_Verde',
                },{
                  'dst' : false,
                  'offset' : -7200,
                  'timezone_id' : 'Atlantic/Cape_Verde'
                }
              ],
              'cwst' :
              [
                {'dst' : false,
                  'offset' : 31500,
                  'timezone_id' : 'Australia/Eucla',
                },{
                  'dst' : true,
                  'offset' : 35100,
                  'timezone_id' : 'Australia/Eucla'
                }
              ],
              'cwt' :
              [
                {'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Chicago',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Atikokan',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Coral_Harbour',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Fort_Wayne',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Knox',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Marengo',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Petersburg',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vevay',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vincennes',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Winamac',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Louisville',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Monticello',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Knox_IN',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Louisville',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Menominee',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Mexico_City',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rainy_River',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rankin_Inlet',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Winnipeg',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Canada/Central',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'CST6CDT',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Mexico/General',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/Central',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/East-Indiana',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'US/Indiana-Starke'
                }
              ],
              'chst' :
              [
                {'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Pacific/Guam',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Pacific/Saipan'
                }
              ],
              'dact' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Dacca',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Dhaka'
                }
              ],
              'davt' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Antarctica/Davis'
                }
              ],
              'ddut' :
              [
                {'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Antarctica/DumontDUrville'
                }
              ],
              'dusst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Dushanbe',
                },{
                  'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Dushanbe'
                }
              ],
              'dust' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Dushanbe',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Dushanbe'
                }
              ],
              'easst' :
              [
                {'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Chile/EasterIsland',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Chile/EasterIsland',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'Pacific/Easter',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Pacific/Easter'
                }
              ],
              'east' :
              [
                {'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Chile/EasterIsland',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Chile/EasterIsland',
                },{
                  'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Pacific/Easter',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Pacific/Easter',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Indian/Antananarivo'
                }
              ],
              'eat' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Khartoum',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Addis_Ababa',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Asmara',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Asmera',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Dar_es_Salaam',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Djibouti',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Kampala',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Mogadishu',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Nairobi',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Indian/Antananarivo',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Indian/Comoro',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Indian/Mayotte'
                }
              ],
              'ect' :
              [
                {'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Guayaquil',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'Pacific/Galapagos'
                }
              ],
              'eddt' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Iqaluit'
                }
              ],
              'edt' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/New_York',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Cancun',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Detroit',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Fort_Wayne',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Grand_Turk',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Indiana/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Indiana/Marengo',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Indiana/Vevay',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Indiana/Vincennes',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Indiana/Winamac',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Indianapolis',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Iqaluit',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Jamaica',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Kentucky/Louisville',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Kentucky/Monticello',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Louisville',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Montreal',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Nassau',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Nipigon',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Port-au-Prince',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Santo_Domingo',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Thunder_Bay',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Toronto',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Canada/Eastern',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'EST',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'EST5EDT',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Jamaica',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/East-Indiana',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/Eastern',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/Michigan'
                }
              ],
              'eest' :
              [
                {'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Helsinki',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Cairo',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Amman',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Beirut',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Damascus',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Gaza',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Istanbul',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Nicosia',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'EET',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Egypt',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Athens',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Bucharest',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Chisinau',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Istanbul',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Kiev',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Mariehamn',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Minsk',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Nicosia',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Riga',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Simferopol',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Sofia',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Tallinn',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Uzhgorod',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Vilnius',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Warsaw',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Zaporozhye',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Poland',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Turkey',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'W-SU'
                }
              ],
              'eet' :
              [
                {'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Helsinki',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Gaza',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Cairo',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Tripoli',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Amman',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Beirut',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Damascus',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Gaza',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Istanbul',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Nicosia',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'EET',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Egypt',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Athens',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Bucharest',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Chisinau',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Istanbul',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Kiev',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Mariehamn',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Minsk',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Nicosia',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Riga',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Simferopol',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Sofia',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Tallinn',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Uzhgorod',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Vilnius',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Warsaw',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Zaporozhye',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Libya',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Poland',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Turkey',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'W-SU'
                }
              ],
              'egst' :
              [
                {'dst' : true,
                  'offset' : 0,
                  'timezone_id' : 'America/Scoresbysund'
                }
              ],
              'egt' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'America/Scoresbysund'
                }
              ],
              'ehdt' :
              [
                {'dst' : true,
                  'offset' : -16200,
                  'timezone_id' : 'America/Santo_Domingo'
                }
              ],
              'eit' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Jayapura'
                }
              ],
              'ept' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/New_York',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Detroit',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Iqaluit',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Montreal',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Nipigon',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Thunder_Bay',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Toronto',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Canada/Eastern',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'EST',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'EST5EDT',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/Eastern',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/Michigan'
                }
              ],
              'est' :
              [
                {'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/New_York',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Antigua',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Atikokan',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Cancun',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Cayman',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Chicago',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Coral_Harbour',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Detroit',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Fort_Wayne',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Grand_Turk',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Indianapolis',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Knox',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Marengo',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Petersburg',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vevay',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Vincennes',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indiana/Winamac',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Indianapolis',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Iqaluit',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Jamaica',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Louisville',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Kentucky/Monticello',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Knox_IN',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Louisville',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Managua',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Menominee',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Merida',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Montreal',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Nassau',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Nipigon',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Panama',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Pangnirtung',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Port-au-Prince',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Rankin_Inlet',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Santo_Domingo',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Thunder_Bay',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Toronto',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'Canada/Eastern',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'EST',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'EST5EDT',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'Jamaica',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'US/Central',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'US/East-Indiana',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'US/Eastern',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'US/Indiana-Starke',
                },{
                  'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'US/Michigan',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/ACT',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Brisbane',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Canberra',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Currie',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Hobart',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Lindeman',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Melbourne',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/NSW',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Queensland',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Sydney',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Tasmania',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Australia/Victoria',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Melbourne',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/ACT',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Brisbane',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Canberra',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Currie',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Hobart',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Lindeman',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/NSW',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Queensland',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Sydney',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Tasmania',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Victoria'
                }
              ],
              'ewt' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/New_York',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Detroit',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Iqaluit',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Montreal',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Nipigon',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Thunder_Bay',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Toronto',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'Canada/Eastern',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'EST',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'EST5EDT',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/Eastern',
                },{
                  'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'US/Michigan'
                }
              ],
              'fjst' :
              [
                {'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'Pacific/Fiji'
                }
              ],
              'fjt' :
              [
                {'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Fiji'
                }
              ],
              'fkst' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'Atlantic/Stanley',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'Atlantic/Stanley'
                }
              ],
              'fkt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'Atlantic/Stanley',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'Atlantic/Stanley'
                }
              ],
              'fnst' :
              [
                {'dst' : true,
                  'offset' : -3600,
                  'timezone_id' : 'America/Noronha',
                },{
                  'dst' : true,
                  'offset' : -3600,
                  'timezone_id' : 'Brazil/DeNoronha'
                }
              ],
              'fnt' :
              [
                {'dst' : false,
                  'offset' : -7200,
                  'timezone_id' : 'America/Noronha',
                },{
                  'dst' : false,
                  'offset' : -7200,
                  'timezone_id' : 'Brazil/DeNoronha'
                }
              ],
              'fort' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Aqtau',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Aqtau'
                }
              ],
              'frust' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Bishkek',
                },{
                  'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Bishkek'
                }
              ],
              'frut' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Bishkek',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Bishkek'
                }
              ],
              'galt' :
              [
                {'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : 'Pacific/Galapagos'
                }
              ],
              'gamt' :
              [
                {'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'Pacific/Gambier'
                }
              ],
              'gbgt' :
              [
                {'dst' : false,
                  'offset' : -13500,
                  'timezone_id' : 'America/Guyana'
                }
              ],
              'gest' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Tbilisi',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Tbilisi'
                }
              ],
              'get' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Tbilisi',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Tbilisi'
                }
              ],
              'gft' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Cayenne',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Cayenne'
                }
              ],
              'ghst' :
              [
                {'dst' : true,
                  'offset' : 1200,
                  'timezone_id' : 'Africa/Accra'
                }
              ],
              'gmt' :
              [
                {'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Abidjan',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Accra',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Bamako',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Banjul',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Bissau',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Conakry',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Dakar',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Freetown',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Malabo',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Monrovia',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Niamey',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Nouakchott',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Ouagadougou',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Porto-Novo',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Sao_Tome',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Timbuktu',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'America/Danmarkshavn',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Reykjavik',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/St_Helena',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Eire',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Belfast',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Dublin',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Gibraltar',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Guernsey',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Isle_of_Man',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Jersey',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/London',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'GB',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'GB-Eire',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Iceland'
                }
              ],
              'gst' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Dubai',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Bahrain',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Muscat',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Qatar'
                }
              ],
              'gyt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Guyana',
                },{
                  'dst' : false,
                  'offset' : -13500,
                  'timezone_id' : 'America/Guyana',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Guyana'
                }
              ],
              'hadt' :
              [
                {'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : true,
                  'offset' : -32400,
                  'timezone_id' : 'US/Aleutian'
                }
              ],
              'hast' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'US/Aleutian'
                }
              ],
              'hdt' :
              [
                {'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'Pacific/Honolulu',
                },{
                  'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'HST',
                },{
                  'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'US/Hawaii'
                }
              ],
              'hkst' :
              [
                {'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Hong_Kong',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Hongkong'
                }
              ],
              'hkt' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Hong_Kong',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Hongkong'
                }
              ],
              'hovst' :
              [
                {'dst' : true,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Hovd'
                }
              ],
              'hovt' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Hovd',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Hovd'
                }
              ],
              'hpt' :
              [
                {'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'Pacific/Honolulu',
                },{
                  'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'HST',
                },{
                  'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'US/Hawaii'
                }
              ],
              'hst' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'Pacific/Honolulu',
                },{
                  'dst' : false,
                  'offset' : -37800,
                  'timezone_id' : 'Pacific/Honolulu',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'HST',
                },{
                  'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'US/Hawaii',
                },{
                  'dst' : false,
                  'offset' : -37800,
                  'timezone_id' : 'HST',
                },{
                  'dst' : false,
                  'offset' : -37800,
                  'timezone_id' : 'US/Hawaii'
                }
              ],
              'hwt' :
              [
                {'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'Pacific/Honolulu',
                },{
                  'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'HST',
                },{
                  'dst' : true,
                  'offset' : -34200,
                  'timezone_id' : 'US/Hawaii'
                }
              ],
              'ict' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Bangkok',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Phnom_Penh',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Saigon',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Vientiane',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Phnom_Penh',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Saigon',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Vientiane'
                }
              ],
              'iddt' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Jerusalem',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Tel_Aviv',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Israel'
                }
              ],
              'idt' :
              [
                {'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Jerusalem',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Gaza',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Tel_Aviv',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Israel'
                }
              ],
              'ihst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Colombo'
                }
              ],
              'iot' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Indian/Chagos',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Indian/Chagos'
                }
              ],
              'irdt' :
              [
                {'dst' : true,
                  'offset' : 16200,
                  'timezone_id' : 'Asia/Tehran',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Tehran',
                },{
                  'dst' : true,
                  'offset' : 16200,
                  'timezone_id' : 'Iran',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Iran'
                }
              ],
              'irkst' :
              [
                {'dst' : true,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Irkutsk',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Irkutsk'
                }
              ],
              'irkt' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Irkutsk',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Irkutsk'
                }
              ],
              'irst' :
              [
                {'dst' : false,
                  'offset' : 12600,
                  'timezone_id' : 'Asia/Tehran',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Tehran',
                },{
                  'dst' : false,
                  'offset' : 12600,
                  'timezone_id' : 'Iran',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Iran'
                }
              ],
              'isst' :
              [
                {'dst' : true,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Reykjavik',
                },{
                  'dst' : true,
                  'offset' : 0,
                  'timezone_id' : 'Iceland'
                }
              ],
              'ist' :
              [
                {'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Jerusalem',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Reykjavik',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Iceland',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Calcutta',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Colombo',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Dacca',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Dhaka',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Karachi',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Katmandu',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Thimbu',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Thimphu',
                },{
                  'dst' : true,
                  'offset' : 2079,
                  'timezone_id' : 'Eire',
                },{
                  'dst' : true,
                  'offset' : 2079,
                  'timezone_id' : 'Europe/Dublin',
                },{
                  'dst' : true,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Calcutta',
                },{
                  'dst' : true,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Colombo',
                },{
                  'dst' : true,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Karachi',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Eire',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Dublin',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Eire',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Dublin',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Gaza',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Asia/Tel_Aviv',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Israel'
                }
              ],
              'javt' :
              [
                {'dst' : false,
                  'offset' : 26400,
                  'timezone_id' : 'Asia/Jakarta'
                }
              ],
              'jdt' :
              [
                {'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Tokyo',
                },{
                  'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'Japan'
                }
              ],
              'jst' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Tokyo',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Dili',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Jakarta',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Kuala_Lumpur',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Kuching',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Makassar',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Manila',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Pontianak',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Rangoon',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Sakhalin',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Ujung_Pandang',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Japan',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Pacific/Nauru',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Singapore'
                }
              ],
              'kart' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Karachi'
                }
              ],
              'kast' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Kashgar',
                },{
                  'dst' : false,
                  'offset' : 19800,
                  'timezone_id' : 'Asia/Kashgar'
                }
              ],
              'kdt' :
              [
                {'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Seoul',
                },{
                  'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Seoul',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'ROK',
                },{
                  'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'ROK'
                }
              ],
              'kgst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Bishkek'
                }
              ],
              'kgt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Bishkek',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Bishkek'
                }
              ],
              'kizst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Qyzylorda'
                }
              ],
              'kizt' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Qyzylorda',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Qyzylorda',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Qyzylorda'
                }
              ],
              'kmt' :
              [
                {'dst' : false,
                  'offset' : 5736,
                  'timezone_id' : 'Europe/Vilnius'
                }
              ],
              'kost' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Pacific/Kosrae',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Kosrae'
                }
              ],
              'krast' :
              [
                {'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Krasnoyarsk',
                },{
                  'dst' : true,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Krasnoyarsk'
                }
              ],
              'krat' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Krasnoyarsk',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Krasnoyarsk'
                }
              ],
              'kst' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Seoul',
                },{
                  'dst' : false,
                  'offset' : 30600,
                  'timezone_id' : 'Asia/Seoul',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Seoul',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Pyongyang',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'ROK',
                },{
                  'dst' : false,
                  'offset' : 30600,
                  'timezone_id' : 'Asia/Pyongyang',
                },{
                  'dst' : false,
                  'offset' : 30600,
                  'timezone_id' : 'ROK',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Pyongyang',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'ROK'
                }
              ],
              'kuyst' :
              [
                {'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Samara',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Samara',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Europe/Samara'
                }
              ],
              'kuyt' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Samara',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Samara'
                }
              ],
              'kwat' :
              [
                {'dst' : false,
                  'offset' : -43200,
                  'timezone_id' : 'Pacific/Kwajalein',
                },{
                  'dst' : false,
                  'offset' : -43200,
                  'timezone_id' : 'Kwajalein'
                }
              ],
              'lhst' :
              [
                {'dst' : false,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/Lord_Howe',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/Lord_Howe',
                },{
                  'dst' : true,
                  'offset' : 41400,
                  'timezone_id' : 'Australia/Lord_Howe',
                },{
                  'dst' : false,
                  'offset' : 37800,
                  'timezone_id' : 'Australia/LHI',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Australia/LHI',
                },{
                  'dst' : true,
                  'offset' : 41400,
                  'timezone_id' : 'Australia/LHI'
                }
              ],
              'lint' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'Pacific/Kiritimati',
                },{
                  'dst' : false,
                  'offset' : 50400,
                  'timezone_id' : 'Pacific/Kiritimati'
                }
              ],
              'lkt' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Colombo',
                },{
                  'dst' : false,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Colombo'
                }
              ],
              'lont' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Chongqing',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Chungking'
                }
              ],
              'lrt' :
              [
                {'dst' : false,
                  'offset' : -2670,
                  'timezone_id' : 'Africa/Monrovia'
                }
              ],
              'lst' :
              [
                {'dst' : true,
                  'offset' : 9384,
                  'timezone_id' : 'Europe/Riga'
                }
              ],
              'madmt' :
              [
                {'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Atlantic/Madeira'
                }
              ],
              'madst' :
              [
                {'dst' : true,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Madeira'
                }
              ],
              'madt' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Atlantic/Madeira'
                }
              ],
              'magst' :
              [
                {'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Magadan',
                },{
                  'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Asia/Magadan'
                }
              ],
              'magt' :
              [
                {'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Magadan',
                },{
                  'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Magadan'
                }
              ],
              'malst' :
              [
                {'dst' : true,
                  'offset' : 26400,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : true,
                  'offset' : 26400,
                  'timezone_id' : 'Asia/Kuala_Lumpur',
                },{
                  'dst' : true,
                  'offset' : 26400,
                  'timezone_id' : 'Singapore'
                }
              ],
              'malt' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : false,
                  'offset' : 26400,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Kuala_Lumpur',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Singapore',
                },{
                  'dst' : false,
                  'offset' : 26400,
                  'timezone_id' : 'Asia/Kuala_Lumpur',
                },{
                  'dst' : false,
                  'offset' : 26400,
                  'timezone_id' : 'Singapore',
                },{
                  'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Kuala_Lumpur',
                },{
                  'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Singapore'
                }
              ],
              'mart' :
              [
                {'dst' : false,
                  'offset' : -34200,
                  'timezone_id' : 'Pacific/Marquesas'
                }
              ],
              'mawt' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Antarctica/Mawson'
                }
              ],
              'mddt' :
              [
                {'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : true,
                  'offset' : -18000,
                  'timezone_id' : 'America/Yellowknife'
                }
              ],
              'mdst' :
              [
                {'dst' : true,
                  'offset' : 16248,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : true,
                  'offset' : 16248,
                  'timezone_id' : 'W-SU'
                }
              ],
              'mdt' :
              [
                {'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Denver',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Boise',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Chihuahua',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Edmonton',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Hermosillo',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Inuvik',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Mazatlan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/Center',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/New_Salem',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Phoenix',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Regina',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Shiprock',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Swift_Current',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Yellowknife',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/East-Saskatchewan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Mountain',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Saskatchewan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Mexico/BajaSur',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'MST',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'MST7MDT',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Navajo',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'US/Arizona',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'US/Mountain'
                }
              ],
              'mest' :
              [
                {'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'MET'
                }
              ],
              'met' :
              [
                {'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'MET'
                }
              ],
              'mht' :
              [
                {'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Kwajalein',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Kwajalein',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Majuro'
                }
              ],
              'mmt' :
              [
                {'dst' : false,
                  'offset' : 9048,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : false,
                  'offset' : 23400,
                  'timezone_id' : 'Asia/Rangoon',
                },{
                  'dst' : false,
                  'offset' : 28656,
                  'timezone_id' : 'Asia/Makassar',
                },{
                  'dst' : false,
                  'offset' : 28656,
                  'timezone_id' : 'Asia/Ujung_Pandang',
                },{
                  'dst' : false,
                  'offset' : 9048,
                  'timezone_id' : 'W-SU'
                }
              ],
              'most' :
              [
                {'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Macao',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Macau'
                }
              ],
              'mot' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Macao',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Macau'
                }
              ],
              'mpt' :
              [
                {'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Denver',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Boise',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Edmonton',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/Center',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/New_Salem',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Regina',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Shiprock',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Swift_Current',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Yellowknife',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/East-Saskatchewan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Mountain',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Saskatchewan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'MST',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'MST7MDT',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Navajo',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'US/Mountain',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Pacific/Saipan'
                }
              ],
              'msd' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Chisinau',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Kiev',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Minsk',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Riga',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Simferopol',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Tallinn',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Uzhgorod',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Vilnius',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Zaporozhye',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'W-SU',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'W-SU'
                }
              ],
              'msk' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Chisinau',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Kaliningrad',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Kiev',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Minsk',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Riga',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Simferopol',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Tallinn',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Tiraspol',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Uzhgorod',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Vilnius',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Zaporozhye',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'W-SU'
                }
              ],
              'mst' :
              [
                {'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Denver',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Boise',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Chihuahua',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Dawson_Creek',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Edmonton',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Ensenada',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Hermosillo',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Inuvik',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Mazatlan',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Mexico_City',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/North_Dakota/Center',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/North_Dakota/New_Salem',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Phoenix',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Regina',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Shiprock',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Swift_Current',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Tijuana',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'America/Yellowknife',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/East-Saskatchewan',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Mountain',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Saskatchewan',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Mexico/BajaNorte',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Mexico/BajaSur',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Mexico/General',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'MST',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'MST7MDT',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'Navajo',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'US/Arizona',
                },{
                  'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : 'US/Mountain',
                },{
                  'dst' : true,
                  'offset' : 12648,
                  'timezone_id' : 'Europe/Moscow',
                },{
                  'dst' : true,
                  'offset' : 12648,
                  'timezone_id' : 'W-SU'
                }
              ],
              'mut' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Indian/Mauritius'
                }
              ],
              'mvt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Indian/Maldives'
                }
              ],
              'mwt' :
              [
                {'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Denver',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Boise',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Cambridge_Bay',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Edmonton',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/Center',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/North_Dakota/New_Salem',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Phoenix',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Regina',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Shiprock',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Swift_Current',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Yellowknife',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/East-Saskatchewan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Mountain',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Canada/Saskatchewan',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'MST',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'MST7MDT',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'Navajo',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'US/Arizona',
                },{
                  'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'US/Mountain'
                }
              ],
              'myt' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Kuala_Lumpur',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Kuching'
                }
              ],
              'ncst' :
              [
                {'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Noumea'
                }
              ],
              'nct' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Pacific/Noumea'
                }
              ],
              'nddt' :
              [
                {'dst' : true,
                  'offset' : -5400,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : true,
                  'offset' : -5400,
                  'timezone_id' : 'Canada/Newfoundland'
                }
              ],
              'ndt' :
              [
                {'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : true,
                  'offset' : -9052,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'Pacific/Midway',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'Canada/Newfoundland',
                },{
                  'dst' : true,
                  'offset' : -9052,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : true,
                  'offset' : -9052,
                  'timezone_id' : 'Canada/Newfoundland'
                }
              ],
              'negt' :
              [
                {'dst' : false,
                  'offset' : -12600,
                  'timezone_id' : 'America/Paramaribo'
                }
              ],
              'nest' :
              [
                {'dst' : true,
                  'offset' : 4800,
                  'timezone_id' : 'Europe/Amsterdam'
                }
              ],
              'net' :
              [
                {'dst' : false,
                  'offset' : 1200,
                  'timezone_id' : 'Europe/Amsterdam'
                }
              ],
              'nft' :
              [
                {'dst' : false,
                  'offset' : 41400,
                  'timezone_id' : 'Pacific/Norfolk'
                }
              ],
              'novst' :
              [
                {'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Novosibirsk',
                },{
                  'dst' : true,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Novosibirsk'
                }
              ],
              'novt' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Novosibirsk',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Novosibirsk'
                }
              ],
              'npt' :
              [
                {'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'US/Aleutian',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'Canada/Newfoundland',
                },{
                  'dst' : false,
                  'offset' : 20700,
                  'timezone_id' : 'Asia/Katmandu'
                }
              ],
              'nrt' :
              [
                {'dst' : false,
                  'offset' : 41400,
                  'timezone_id' : 'Pacific/Nauru',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Nauru'
                }
              ],
              'nst' :
              [
                {'dst' : false,
                  'offset' : -12600,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : false,
                  'offset' : -12652,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : false,
                  'offset' : -12600,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : false,
                  'offset' : -12600,
                  'timezone_id' : 'Canada/Newfoundland',
                },{
                  'dst' : false,
                  'offset' : -12652,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : false,
                  'offset' : -12652,
                  'timezone_id' : 'Canada/Newfoundland',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Midway',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Pago_Pago',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Samoa',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'US/Aleutian',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'US/Samoa',
                },{
                  'dst' : true,
                  'offset' : 4772,
                  'timezone_id' : 'Europe/Amsterdam'
                }
              ],
              'nut' :
              [
                {'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Niue',
                },{
                  'dst' : false,
                  'offset' : -41400,
                  'timezone_id' : 'Pacific/Niue'
                }
              ],
              'nwt' :
              [
                {'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/St_Johns',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Adak',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Atka',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : true,
                  'offset' : -36000,
                  'timezone_id' : 'US/Aleutian',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/Goose_Bay',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'Canada/Newfoundland'
                }
              ],
              'nzdt' :
              [
                {'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'Pacific/Auckland',
                },{
                  'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'Antarctica/McMurdo',
                },{
                  'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'Antarctica/South_Pole',
                },{
                  'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'NZ'
                }
              ],
              'nzmt' :
              [
                {'dst' : false,
                  'offset' : 41400,
                  'timezone_id' : 'Pacific/Auckland',
                },{
                  'dst' : false,
                  'offset' : 41400,
                  'timezone_id' : 'NZ'
                }
              ],
              'nzst' :
              [
                {'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Auckland',
                },{
                  'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Auckland',
                },{
                  'dst' : true,
                  'offset' : 45000,
                  'timezone_id' : 'Pacific/Auckland',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Antarctica/McMurdo',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Antarctica/South_Pole',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'NZ',
                },{
                  'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'NZ',
                },{
                  'dst' : true,
                  'offset' : 45000,
                  'timezone_id' : 'NZ'
                }
              ],
              'omsst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Omsk',
                },{
                  'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Omsk'
                }
              ],
              'omst' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Omsk',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Omsk'
                }
              ],
              'orast' :
              [
                {'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Oral'
                }
              ],
              'orat' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Oral',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Oral'
                }
              ],
              'pddt' :
              [
                {'dst' : true,
                  'offset' : -21600,
                  'timezone_id' : 'America/Inuvik'
                }
              ],
              'pdt' :
              [
                {'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Los_Angeles',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Boise',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Dawson_Creek',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Ensenada',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Inuvik',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Tijuana',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Vancouver',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Pacific',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Yukon',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Mexico/BajaNorte',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'PST8PDT',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'US/Pacific',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'US/Pacific-New'
                }
              ],
              'pest' :
              [
                {'dst' : true,
                  'offset' : -14400,
                  'timezone_id' : 'America/Lima'
                }
              ],
              'petst' :
              [
                {'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Asia/Kamchatka',
                },{
                  'dst' : true,
                  'offset' : 46800,
                  'timezone_id' : 'Asia/Kamchatka'
                }
              ],
              'pett' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Kamchatka',
                },{
                  'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : 'Asia/Kamchatka'
                }
              ],
              'pet' :
              [
                {'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : 'America/Lima'
                }
              ],
              'phot' :
              [
                {'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Enderbury',
                },{
                  'dst' : false,
                  'offset' : 46800,
                  'timezone_id' : 'Pacific/Enderbury'
                }
              ],
              'phst' :
              [
                {'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Manila'
                }
              ],
              'pht' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Manila'
                }
              ],
              'pkst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Karachi'
                }
              ],
              'pkt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Karachi'
                }
              ],
              'pmdt' :
              [
                {'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Miquelon'
                }
              ],
              'pmst' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Miquelon'
                }
              ],
              'pmt' :
              [
                {'dst' : false,
                  'offset' : -13236,
                  'timezone_id' : 'America/Paramaribo',
                },{
                  'dst' : false,
                  'offset' : -13252,
                  'timezone_id' : 'America/Paramaribo',
                },{
                  'dst' : false,
                  'offset' : 26240,
                  'timezone_id' : 'Asia/Pontianak',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Antarctica/DumontDUrville'
                }
              ],
              'ppt' :
              [
                {'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Los_Angeles',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Dawson_Creek',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Ensenada',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Inuvik',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Tijuana',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Vancouver',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Pacific',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Mexico/BajaNorte',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'PST8PDT',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'US/Pacific',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'US/Pacific-New'
                }
              ],
              'pst' :
              [
                {'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Los_Angeles',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Boise',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Dawson_Creek',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Ensenada',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Hermosillo',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Inuvik',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Mazatlan',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Tijuana',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Vancouver',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'Canada/Pacific',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'Canada/Yukon',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'Mexico/BajaNorte',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'Mexico/BajaSur',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'Pacific/Pitcairn',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'PST8PDT',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'US/Pacific',
                },{
                  'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : 'US/Pacific-New'
                }
              ],
              'pwt' :
              [
                {'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Los_Angeles',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Dawson_Creek',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Ensenada',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Inuvik',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Tijuana',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Vancouver',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Pacific',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Mexico/BajaNorte',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'PST8PDT',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'US/Pacific',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'US/Pacific-New'
                }
              ],
              'pyst' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Asuncion'
                }
              ],
              'pyt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Asuncion',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Asuncion'
                }
              ],
              'qyzst' :
              [
                {'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Qyzylorda'
                }
              ],
              'qyzt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Qyzylorda',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Qyzylorda'
                }
              ],
              'ret' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Indian/Reunion'
                }
              ],
              'rmt' :
              [
                {'dst' : false,
                  'offset' : 5784,
                  'timezone_id' : 'Europe/Riga'
                }
              ],
              'rott' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'Antarctica/Rothera'
                }
              ],
              'sakst' :
              [
                {'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Sakhalin',
                },{
                  'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Asia/Sakhalin'
                }
              ],
              'sakt' :
              [
                {'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Sakhalin',
                },{
                  'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Sakhalin'
                }
              ],
              'samst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Europe/Samara'
                }
              ],
              'samt' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : false,
                  'offset' : -41400,
                  'timezone_id' : 'Pacific/Apia',
                },{
                  'dst' : false,
                  'offset' : -41400,
                  'timezone_id' : 'Pacific/Pago_Pago',
                },{
                  'dst' : false,
                  'offset' : -41400,
                  'timezone_id' : 'Pacific/Samoa',
                },{
                  'dst' : false,
                  'offset' : -41400,
                  'timezone_id' : 'US/Samoa',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Samara',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Samara'
                }
              ],
              'sast' :
              [
                {'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Johannesburg',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Johannesburg',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Maseru',
                },{
                  'dst' : true,
                  'offset' : 10800,
                  'timezone_id' : 'Africa/Windhoek',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Maseru',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Mbabane',
                },{
                  'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Windhoek'
                }
              ],
              'sbt' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Pacific/Guadalcanal'
                }
              ],
              'sct' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Indian/Mahe'
                }
              ],
              'sgt' :
              [
                {'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Singapore',
                },{
                  'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Singapore',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Singapore'
                }
              ],
              'shest' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Aqtau'
                }
              ],
              'shet' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Aqtau',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Aqtau'
                }
              ],
              'slst' :
              [
                {'dst' : true,
                  'offset' : -1200,
                  'timezone_id' : 'Africa/Freetown',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Freetown'
                }
              ],
              'smt' :
              [
                {'dst' : false,
                  'offset' : 25580,
                  'timezone_id' : 'Asia/Saigon',
                },{
                  'dst' : false,
                  'offset' : -16966,
                  'timezone_id' : 'America/Santiago',
                },{
                  'dst' : false,
                  'offset' : -16966,
                  'timezone_id' : 'Chile/Continental',
                },{
                  'dst' : false,
                  'offset' : 25580,
                  'timezone_id' : 'Asia/Phnom_Penh',
                },{
                  'dst' : false,
                  'offset' : 25580,
                  'timezone_id' : 'Asia/Vientiane'
                }
              ],
              'srt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Paramaribo',
                },{
                  'dst' : false,
                  'offset' : -12600,
                  'timezone_id' : 'America/Paramaribo'
                }
              ],
              'sst' :
              [
                {'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Samoa',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Midway',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Pago_Pago',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'US/Samoa'
                }
              ],
              'stat' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Volgograd',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Volgograd'
                }
              ],
              'svest' :
              [
                {'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Yekaterinburg',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Yekaterinburg'
                }
              ],
              'svet' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Yekaterinburg',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Yekaterinburg'
                }
              ],
              'syot' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Antarctica/Syowa'
                }
              ],
              'taht' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : 'Pacific/Tahiti'
                }
              ],
              'tasst' :
              [
                {'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Tashkent',
                },{
                  'dst' : true,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Tashkent'
                }
              ],
              'tast' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Tashkent',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Tashkent'
                }
              ],
              'tbist' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Tbilisi',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Tbilisi'
                }
              ],
              'tbit' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Tbilisi',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Tbilisi'
                }
              ],
              'tft' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Indian/Kerguelen'
                }
              ],
              'tjt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Dushanbe'
                }
              ],
              'tlt' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Dili',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Dili'
                }
              ],
              'tmt' :
              [
                {'dst' : false,
                  'offset' : 12344,
                  'timezone_id' : 'Asia/Tehran',
                },{
                  'dst' : false,
                  'offset' : 12344,
                  'timezone_id' : 'Iran',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Ashgabat',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Ashkhabad',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Ashgabat',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Ashkhabad',
                },{
                  'dst' : false,
                  'offset' : 5940,
                  'timezone_id' : 'Europe/Tallinn'
                }
              ],
              'tost' :
              [
                {'dst' : true,
                  'offset' : 50400,
                  'timezone_id' : 'Pacific/Tongatapu'
                }
              ],
              'tot' :
              [
                {'dst' : false,
                  'offset' : 46800,
                  'timezone_id' : 'Pacific/Tongatapu'
                }
              ],
              'trst' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Istanbul',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Istanbul',
                },{
                  'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Turkey'
                }
              ],
              'trt' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Istanbul',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Istanbul',
                },{
                  'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Turkey'
                }
              ],
              'tsat' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Volgograd'
                }
              ],
              'ulast' :
              [
                {'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Ulaanbaatar',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Ulan_Bator'
                }
              ],
              'ulat' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Ulaanbaatar',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Ulaanbaatar',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Choibalsan',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Ulan_Bator',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Choibalsan',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Ulan_Bator'
                }
              ],
              'urast' :
              [
                {'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Oral',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Oral'
                }
              ],
              'urat' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Oral',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Oral',
                },{
                  'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Oral'
                }
              ],
              'urut' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Urumqi'
                }
              ],
              'uyhst' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Montevideo',
                },{
                  'dst' : true,
                  'offset' : -9000,
                  'timezone_id' : 'America/Montevideo'
                }
              ],
              'uyst' :
              [
                {'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Montevideo'
                }
              ],
              'uyt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Montevideo',
                },{
                  'dst' : false,
                  'offset' : -12600,
                  'timezone_id' : 'America/Montevideo'
                }
              ],
              'uzst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Tashkent'
                }
              ],
              'uzt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Samarkand',
                },{
                  'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Tashkent'
                }
              ],
              'vet' :
              [
                {'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Caracas',
                },{
                  'dst' : false,
                  'offset' : -16200,
                  'timezone_id' : 'America/Caracas'
                }
              ],
              'vlasst' :
              [
                {'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Vladivostok'
                }
              ],
              'vlast' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Vladivostok',
                },{
                  'dst' : true,
                  'offset' : 39600,
                  'timezone_id' : 'Asia/Vladivostok'
                }
              ],
              'vlat' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Vladivostok',
                },{
                  'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Vladivostok'
                }
              ],
              'volst' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Volgograd',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Europe/Volgograd'
                }
              ],
              'volt' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Europe/Volgograd',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Europe/Volgograd'
                }
              ],
              'vost' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : 'Antarctica/Vostok'
                }
              ],
              'vust' :
              [
                {'dst' : true,
                  'offset' : 43200,
                  'timezone_id' : 'Pacific/Efate'
                }
              ],
              'vut' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : 'Pacific/Efate'
                }
              ],
              'warst' :
              [
                {'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Mendoza',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Jujuy',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Argentina/Mendoza',
                },{
                  'dst' : true,
                  'offset' : -10800,
                  'timezone_id' : 'America/Jujuy'
                }
              ],
              'wart' :
              [
                {'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Mendoza',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Catamarca',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/ComodRivadavia',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Cordoba',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Jujuy',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/La_Rioja',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Mendoza',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Rio_Gallegos',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/San_Juan',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Tucuman',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Argentina/Ushuaia',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Catamarca',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Cordoba',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Jujuy',
                },{
                  'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : 'America/Rosario'
                }
              ],
              'wast' :
              [
                {'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Windhoek',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Africa/Ndjamena'
                }
              ],
              'wat' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Dakar',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Bamako',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Banjul',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Bissau',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Conakry',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/El_Aaiun',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Freetown',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Niamey',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Nouakchott',
                },{
                  'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : 'Africa/Timbuktu',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Freetown',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Brazzaville',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Bangui',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Douala',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Lagos',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Libreville',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Luanda',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Malabo',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Ndjamena',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Niamey',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Porto-Novo',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Windhoek'
                }
              ],
              'wemt' :
              [
                {'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Lisbon',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Madrid',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Monaco',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Paris',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Portugal',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'WET'
                }
              ],
              'west' :
              [
                {'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Paris',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Algiers',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Casablanca',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Africa/Ceuta',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Atlantic/Canary',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Atlantic/Faeroe',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Atlantic/Faroe',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Atlantic/Madeira',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Brussels',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Lisbon',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Luxembourg',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Madrid',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Monaco',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'Portugal',
                },{
                  'dst' : true,
                  'offset' : 3600,
                  'timezone_id' : 'WET',
                },{
                  'dst' : true,
                  'offset' : 7200,
                  'timezone_id' : 'Europe/Luxembourg'
                }
              ],
              'wet' :
              [
                {'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Paris',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Algiers',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Casablanca',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/Ceuta',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Africa/El_Aaiun',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Azores',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Canary',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Faeroe',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Faroe',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Atlantic/Madeira',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Brussels',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Lisbon',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Luxembourg',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Madrid',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Europe/Monaco',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Portugal',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'WET',
                },{
                  'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : 'Europe/Luxembourg'
                }
              ],
              'wgst' :
              [
                {'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Godthab',
                },{
                  'dst' : true,
                  'offset' : -7200,
                  'timezone_id' : 'America/Danmarkshavn'
                }
              ],
              'wgt' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Godthab',
                },{
                  'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : 'America/Danmarkshavn'
                }
              ],
              'wit' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Jakarta',
                },{
                  'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Jakarta',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Jakarta',
                },{
                  'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : 'Asia/Pontianak',
                },{
                  'dst' : false,
                  'offset' : 27000,
                  'timezone_id' : 'Asia/Pontianak',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Pontianak'
                }
              ],
              'wst' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Australia/Perth',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Australia/Perth',
                },{
                  'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : 'Pacific/Apia',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Antarctica/Casey',
                },{
                  'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Australia/West',
                },{
                  'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Australia/West'
                }
              ],
              'yakst' :
              [
                {'dst' : true,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Yakutsk',
                },{
                  'dst' : true,
                  'offset' : 36000,
                  'timezone_id' : 'Asia/Yakutsk'
                }
              ],
              'yakt' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : 'Asia/Yakutsk',
                },{
                  'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : 'Asia/Yakutsk'
                }
              ],
              'yddt' :
              [
                {'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : true,
                  'offset' : -25200,
                  'timezone_id' : 'Canada/Yukon'
                }
              ],
              'ydt' :
              [
                {'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Yakutat',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'Canada/Yukon'
                }
              ],
              'yekst' :
              [
                {'dst' : true,
                  'offset' : 21600,
                  'timezone_id' : 'Asia/Yekaterinburg'
                }
              ],
              'yekt' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Yekaterinburg'
                }
              ],
              'yerst' :
              [
                {'dst' : true,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Yerevan',
                },{
                  'dst' : true,
                  'offset' : 18000,
                  'timezone_id' : 'Asia/Yerevan'
                }
              ],
              'yert' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : 'Asia/Yerevan',
                },{
                  'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : 'Asia/Yerevan'
                }
              ],
              'ypt' :
              [
                {'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Yakutat',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'Canada/Yukon'
                }
              ],
              'yst' :
              [
                {'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Anchorage',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Juneau',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Nome',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'America/Yakutat',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'Canada/Yukon',
                },{
                  'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : 'US/Alaska'
                }
              ],
              'ywt' :
              [
                {'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Dawson',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Whitehorse',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'America/Yakutat',
                },{
                  'dst' : true,
                  'offset' : -28800,
                  'timezone_id' : 'Canada/Yukon'
                }
              ],
              'a' :
              [
                {'dst' : false,
                  'offset' : 3600,
                  'timezone_id' : null,
                },
              ],
              'b' :
              [
                {'dst' : false,
                  'offset' : 7200,
                  'timezone_id' : null,
                },
              ],
              'c' :
              [
                {'dst' : false,
                  'offset' : 10800,
                  'timezone_id' : null,
                },
              ],
              'd' :
              [
                {'dst' : false,
                  'offset' : 14400,
                  'timezone_id' : null,
                },
              ],
              'e' :
              [
                {'dst' : false,
                  'offset' : 18000,
                  'timezone_id' : null,
                },
              ],
              'f' :
              [
                {'dst' : false,
                  'offset' : 21600,
                  'timezone_id' : null,
                },
              ],
              'g' :
              [
                {'dst' : false,
                  'offset' : 25200,
                  'timezone_id' : null,
                },
              ],
              'h' :
              [
                {'dst' : false,
                  'offset' : 28800,
                  'timezone_id' : null,
                },
              ],
              'i' :
              [
                {'dst' : false,
                  'offset' : 32400,
                  'timezone_id' : null,
                },
              ],
              'k' :
              [
                {'dst' : false,
                  'offset' : 36000,
                  'timezone_id' : null,
                },
              ],
              'l' :
              [
                {'dst' : false,
                  'offset' : 39600,
                  'timezone_id' : null,
                },
              ],
              'm' :
              [
                {'dst' : false,
                  'offset' : 43200,
                  'timezone_id' : null,
                },
              ],
              'n' :
              [
                {'dst' : false,
                  'offset' : -3600,
                  'timezone_id' : null,
                },
              ],
              'o' :
              [
                {'dst' : false,
                  'offset' : -7200,
                  'timezone_id' : null,
                },
              ],
              'p' :
              [
                {'dst' : false,
                  'offset' : -10800,
                  'timezone_id' : null,
                },
              ],
              'q' :
              [
                {'dst' : false,
                  'offset' : -14400,
                  'timezone_id' : null,
                },
              ],
              'r' :
              [
                {'dst' : false,
                  'offset' : -18000,
                  'timezone_id' : null,
                },
              ],
              's' :
              [
                {'dst' : false,
                  'offset' : -21600,
                  'timezone_id' : null,
                },
              ],
              't' :
              [
                {'dst' : false,
                  'offset' : -25200,
                  'timezone_id' : null,
                },
              ],
              'utc' :
              [
                {'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'UTC'
                }
              ],
              'u' :
              [
                {'dst' : false,
                  'offset' : -28800,
                  'timezone_id' : null,
                },
              ],
              'v' :
              [
                {'dst' : false,
                  'offset' : -32400,
                  'timezone_id' : null,
                },
              ],
              'w' :
              [
                {'dst' : false,
                  'offset' : -36000,
                  'timezone_id' : null,
                },
              ],
              'x' :
              [
                {'dst' : false,
                  'offset' : -39600,
                  'timezone_id' : null,
                },
              ],
              'y' :
              [
                {'dst' : false,
                  'offset' : -43200,
                  'timezone_id' : null,
                },
              ],
              'zzz' :
              [
                {'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Antarctica/Davis',
                },{
                  'dst' : false,
                  'offset' : 0,
                  'timezone_id' : 'Antarctica/DumontDUrville'
                }
              ],
              'z' :
              [
                {'dst' : false,
                  'offset' : 0,
                  'timezone_id' : null,
                },
              ]
            };
        
            return function (){
                return timezone_abbreviations;
            };
        
        }();,// }}}
        
        // {{{ basename
        basename: function(path, suffix) {
            // Returns filename component of path
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_basename/
            // +       version: 811.1414
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Ash Searle (http://hexmen.com/blog/)
            // +   improved by: Lincoln Ramsay
            // +   improved by: djmix
            // *     example 1: $P.basename('/www/site/home.htm', '.htm');
            // *     returns 1: 'home'
        
            var b = path.replace(/^.*[\/\\]/g, '');
            
            if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
                b = b.substr(0, b.length-suffix.length);
            }
            
            return b;
        },// }}}
        
        // {{{ dirname
        dirname: function(path) {
            // Returns directory name component of path
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_dirname/
            // +       version: 809.522
            // +   original by: Ozh
            // +   improved by: XoraX (http://www.xorax.info)
            // *     example 1: $P.dirname('/etc/passwd');
            // *     returns 1: '/etc'
            // *     example 2: $P.dirname('c:/Temp/x');
            // *     returns 2: 'c:/Temp'
            // *     example 3: $P.dirname('/dir/test/');
            // *     returns 3: '/dir'
            
            return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
        },// }}}
        
        // {{{ file
        file: function( url ) {
            // Reads entire file into an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file/
            // +       version: 811.1812
            // +   original by: Legaev Andrey
            // +      input by: Jani Hartikainen
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
            // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
            // *     example 1: $P.file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: {0: '123'}
        
            var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            if (!req) throw new Error('XMLHttpRequest not supported');
               
            req.open("GET", url, false);
            req.send(null);
            
            return req.responseText.split('\n');
        },// }}}
        
        // {{{ file_exists
        file_exists: function (url) {
            // Checks whether a file or directory exists
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file_exists/
            // +       version: 812.311
            // +   original by: Enrique Gonzalez
            // +      input by: Jani Hartikainen
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
            // *     example 1: $P.file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '123'
            
            var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            if (!req) throw new Error('XMLHttpRequest not supported');
              
            // HEAD Results are usually shorter (faster) than GET
            req.open('HEAD', url, false);
            req.send(null);
            if (req.status == 200){
                return true;
            }
            
            return false;
        },// }}}
        
        // {{{ file_get_contents
        file_get_contents: function( url ) {
            // Reads entire file into a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file_get_contents/
            // +       version: 811.1812
            // +   original by: Legaev Andrey
            // +      input by: Jani Hartikainen
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
            // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
            // *     example 1: $P.file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '123'
        
            var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            if (!req) throw new Error('XMLHttpRequest not supported');
            
            req.open("GET", url, false);
            req.send(null);
            
            return req.responseText;
        },// }}}
        
        // {{{ filesize
        filesize: function (url) {
            // Gets file size
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_filesize/
            // +       version: 812.1017
            // +   original by: Enrique Gonzalez
            // +      input by: Jani Hartikainen
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: T. Wild
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes. 
            // *     example 1: $P.filesize('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '3'
        
            var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            if (!req) throw new Error('XMLHttpRequest not supported');
            
            req.open ('HEAD', url, false);
            req.send (null);
            
            if (!req.getResponseHeader) {
                try {
                    throw new Error('No getResponseHeader!');
                } catch(e){
                    return false;
                }
            } else if (!req.getResponseHeader('Content-Length')) {
                try {
                    throw new Error('No Content-Length!');
                } catch(e){
                    return false;
                }
            } else {
                return req.getResponseHeader('Content-Length'); 
            }
        },// }}}
        
        // {{{ pathinfo
        pathinfo: function (path, options) {
            // +   original by: Nate
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: Inspired by actual PHP source: php5-5.2.6/ext/standard/string.c line #1559
            // %        note 1: The way the bitwise arguments are handled allows for greater flexibility
            // %        note 1: & compatability. We might even standardize this code and use a similar approach for
            // %        note 1: other bitwise PHP s: function
            // %        note 2: PHP.JS tries to stay away from a core.js file with global dependencies, because we like
            // %        note 2: that you can just take a couple of s: function.
            // %        note 2: But by way we implemented this function, you can always declare the PATHINFO_*
            // %        note 2: constants in your scope, and then you can use: pathinfo('/www/index.html', PATHINFO_BASENAME | PATHINFO_EXTENSION);
            // %        note 2: which makes it fully compliant with PHP syntax.
            // -    depends on: dirname
            // -    depends on: basename
            // *     example 1: $P.pathinfo('/www/htdocs/index.html', 1);
            // *     returns 1: '/www/htdocs'
            // *     example 2: $P.pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
            // *     returns 2: 'index.html'
            // *     example 3: $P.pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
            // *     returns 3: 'html'
            // *     example 4: $P.pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
            // *     returns 4: 'index'
            // *     example 5: $P.pathinfo('/www/htdocs/index.html', 2 | 4);
            // *     returns 5: {basename: 'index.html', extension: 'html'}
            // *     example 6: $P.pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
            // *     returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
            // *     example 7: $P.pathinfo('/www/htdocs/index.html');
            // *     returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
        
            // Working vars
            var key = '', tmp_arr = {}, cnt = 0;
            var have_basename = false, have_extension = false, have_filename = false;
            
            // Init binary arguments
            var def = {
                'PATHINFO_DIRNAME': 1,
                'PATHINFO_BASENAME': 2,
                'PATHINFO_EXTENSION': 4,
                'PATHINFO_FILENAME': 8,
                'PATHINFO_ALL': 0
            };
            for (key in def) {
                def['PATHINFO_ALL'] = def['PATHINFO_ALL'] | def[key];
            }
        
            // Input defaulting & sanitation
            if (!path)    return false;
            if (!options) options = 'PATHINFO_ALL';
        
            // Resolve string input to bitwise e.g. 'PATHINFO_DIRNAME' => 1
            if (def[options]) {
                options = def[options];
            }
        
            // Internal Functions
            var __getExt = function(path) {
                var str  = path+'';
                var dotP = str.lastIndexOf('.')+1;
                return str.substr(dotP);
            }
        
        
            // Gather path infos
            if ((options & def['PATHINFO_DIRNAME']) == def['PATHINFO_DIRNAME']) {
                tmp_arr['this.dirname'] = this.dirname(path);
            }
        
            if ((options & def['PATHINFO_BASENAME']) == def['PATHINFO_BASENAME']) {
                if (false === have_basename) {
                    have_basename = this.basename(path);
                }
                tmp_arr['this.basename'] = have_basename;
            }
        
            if ((options & def['PATHINFO_EXTENSION']) == def['PATHINFO_EXTENSION']) {
                if (false === have_basename) {
                    have_basename = this.basename(path);
                }
                if (false === have_extension) {
                    have_extension = __getExt(have_basename);
                }
                tmp_arr['extension'] = have_extension;
            }
            
            if ((options & def['PATHINFO_FILENAME']) == def['PATHINFO_FILENAME']) {
                if (false === have_basename) {
                    have_basename = this.basename(path);
                }
                if (false === have_extension) {
                    have_extension = __getExt(have_basename);
                }
                if (false === have_filename) {
                    have_filename  = have_basename.substr(0, (have_basename.length - have_extension.length)-1);
                }
        
                tmp_arr['filename'] = have_filename;
            }
        
        
            // If array contains only 1 element: return string
            cnt = 0;
            for (key in tmp_arr){
                cnt++;
            }
            if (cnt == 1) {
                return tmp_arr[key];
            }
        
            // Return full-blown array
            return tmp_arr;
        },// }}}
        
        // {{{ call_user_func
        call_user_func: function(cb, parameters) {
            // Call a user given: function by the first parameter
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_call_user_func/
            // +       version: 812.3015
            // +   original by: Brett Zamir
            // *     example 1: $P.call_user_func('isNaN', 'a');
            // *     returns 1: true
        
            var func;
         
            if (typeof cb == 'string') {
                if (typeof this[cb] == 'function') {
                    func = this[cb];
                } else {
                    func = (new Function(null, 'return ' + cb))();
                }
            } else if (cb instanceof Array) {
                func = eval(cb[0]+"['"+cb[1]+"']");
            }
            
            if (typeof func != 'function') {
                throw new Exception(func + ' is not a valid function');
            }
        
            return func.apply(null, Array.prototype.slice.call(parameters, 1));
        },// }}}
        
        // {{{ call_user_func_array
        call_user_func_array: function(cb, parameters) {
            // Call a user given: function with an array of parameters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_call_user_func_array/
            // +       version: 812.3015
            // +   original by: Thiago Mata (http://thiagomata.blog.com)
            // +   revised  by: Jon Hohle
            // +   improved by: Brett Zamir
            // *     example 1: $P.call_user_func_array('isNaN', ['a']);
            // *     returns 1: true
            // *     example 2: $P.call_user_func_array('isNaN', [1]);
            // *     returns 2: false
        
            var func;
        
            if (typeof cb == 'string') {
                if (typeof this[cb] == 'function') {
                    func = this[cb];
                } else {
                    func = (new Function(null, 'return ' + cb))();
                }
            } else if (cb instanceof Array) {
                func = eval(cb[0]+"['"+cb[1]+"']");
            }
            
            if (typeof func != 'function') {
                throw new Exception(func + ' is not a valid function');
            }
        
            return func.apply(null, parameters);
        },// }}}
        
        // {{{ create_function: function create_function (args, code) {
            // Create an anonymous (lambda-style) function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_create_function/
            // +       version: 809.522
            // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
            // *     example 1: f = create_function('a, b', "return (a + b);");
            // *     example 1: f(1, 2);
            // *     returns 1: 3
            
        
        // {{{ func_get_arg
        func_get_arg: function(num) {
            // Return an item from the argument list
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_func_get_arg/
            // +       version: 812.1714
            // +   original by: Brett Zamir
            // %        note 1: May not work in all JS implementations
            // *     example 1: $P.tmp_a: function() {return func_get_arg(1);}
            // *     example 1: $P.tmp_a('a', 'b');
            // *     returns 1: 'a'
        
            if (!arguments.callee.caller) {
                try {
                    throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
                    return false;
                } catch(e){
                    return false;
                }
            }
        
            if (num > arguments.callee.caller.arguments.length - 1) {
                try {
                    throw new Error('Argument number is greater than the number of arguments actually passed');
                    return false;
                } catch(e){
                    return false;
                }
            }
        
            return arguments.callee.caller.arguments[num];
        },// }}}
        
        // {{{ func_get_args
        func_get_args: function() {
            // Returns an array comprising a function&#039;s argument list
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_func_get_args/
            // +       version: 812.1714
            // +   original by: Brett Zamir
            // %        note 1: May not work in all JS implementations
            // *     example 1: $P.tmp_a: function() {return func_get_args();}
            // *     example 1: $P.tmp_a('a', 'b');
            // *     returns 1: ['a', 'b']
        
            if (!arguments.callee.caller) {
                try {
                    throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
                    return false;
                } catch(e){
                    return false;
                }
            }
        
            return Array.prototype.slice.call(arguments.callee.caller.arguments);
        },// }}}
        
        // {{{ func_num_args
        func_num_args: function() {
            // Returns the number of arguments passed to the function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_func_num_args/
            // +       version: 812.1714
            // +   original by: Brett Zamir
            // %        note 1: May not work in all JS implementations
            // *     example 1: $P.tmp_a: function() {return func_num_args();}
            // *     example 1: $P.tmp_a('a', 'b');
            // *     returns 1: 2
        
            if (!arguments.callee.caller) {
                try {
                    throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
                    return false;
                } catch(e){
                    return false;
                }
            }
        
            return arguments.callee.caller.arguments.length;
        },// }}}
        
        // {{{ function_exists
        function_exists: function( function_name ) {
            // Return TRUE if the given has: function been defined
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_function_exists/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Steve Clay
            // +   improved by: Legaev Andrey
            // *     example 1: $P.function_exists('isFinite');
            // *     returns 1: true
        
        
            if (typeof function_name == 'string'){
                return (typeof window[function_name] == 'function');
            } else{
                return (function_name instanceof Function);
            }
        },// }}}
        
        // {{{ get_defined_s: function
        get_defined_functions: function() {
            // Returns an array of all defined s: function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_defined_s: function/
            // +       version: 812.3015
            // +   original by: Brett Zamir
            // +   improved by: Brett Zamir
            // %        note 1: Test case 1: If get_defined_s: function can find itself in the defined s: function, it worked :)
            // *     example 1: $P.test_in_array: function(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
            // *     example 1: $P.funcs = get_defined_s: function();
            // *     example 1: $P.found = test_in_array(funcs, 'get_defined_s: function');
            // *     results 1: found == true
        
            var i = '', arr = [], already = {};
        
            for (i in window) {
                try {
                    if (typeof window[i] === 'function') {
                        if (!already[i]) {
                            already[i] = 1;
                            arr.push(i);
                        }
                    }
                    else if (typeof window[i] === 'object') {
                        for (var j in window[i]) {
                            if (typeof window[j] === 'function' && window[j] && !already[j]) {
                                already[j] = 1;
                                arr.push(j);
                            }
                        }
                    }
                }
                catch (e) {
        
                }
            }
        
            return arr;
        },// }}}
        
        // {{{ get_included_files
        get_included_files: function() {
            // Returns an array with the names of included or required files
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_included_files/
            // +       version: 809.2915
            // +   original by: Michael White (http://getsprink.com)
            // *     example 1: $P.get_included_files();
            // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
        
            var cur_file = {};
            cur_file[window.location.href] = 1;
            if(!this.__php_js) this.__php_js = {};
            if(!this.__php_js.includes) this.__php_js.includes = cur_file;
        
            var includes = new Array();
            var i = 0;
            for(var key in this.__php_js.includes){
                includes[i] = key;
                i++;
            }
        
            return includes;
        },// }}}
        
        // {{{ json_decode
        json_decode: function(str_json) {
            // Decodes a JSON string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_json_decode/
            // +       version: 901.2515
            // +      original by: Public Domain (http://www.json.org/json2.js)
            // + reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.json_decode('[\n    "e",\n    {\n    "pluribus": "unum"\n}\n]');
            // *     returns 1: ['e', {pluribus: 'unum'}]
        
            /*
                http://www.JSON.org/json2.js
                2008-11-19
                Public Domain.
                NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
                See http://www.JSON.org/js.html
            */
        
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            var j;
            var text = str_json;
        
            var walk = function(holder, key) {
                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
        
            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
        
            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.
        
            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
            if (/^[\],:{}\s]*$/.
                test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        
                // In the third stage we use the eval to: function compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.
        
                j = eval('(' + text + ')');
        
                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver for: function possible transformation.
        
                return typeof reviver === 'function' ?
                walk({
                    '': j
                }, '') : j;
            }
        
            // If the text is not JSON parseable, then a SyntaxError is thrown.
            throw new SyntaxError('this.json_decode');
        },// }}}
        
        // {{{ json_encode
        json_encode: function(mixed_val) {
            // Returns the JSON representation of a value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_json_encode/
            // +       version: 901.2515
            // +      original by: Public Domain (http://www.json.org/json2.js)
            // + reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.json_encode(['e', {pluribus: 'unum'}]);
            // *     returns 1: '[\n    "e",\n    {\n    "pluribus": "unum"\n}\n]'
        
            /*
                http://www.JSON.org/json2.js
                2008-11-19
                Public Domain.
                NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
                See http://www.JSON.org/js.html
            */
            
            var indent;
            var value = mixed_val;
            var i;
        
            var quote = function (string) {
                var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                var meta = {    // table of character substitutions
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"' : '\\"',
                    '\\': '\\\\'
                };
        
                escapable.lastIndex = 0;
                return escapable.test(string) ?
                '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
            }
        
            var str = function(key, holder) {
                var gap = '';
                var indent = '    ';
                var i = 0;          // The loop counter.
                var k = '';          // The member key.
                var v = '';          // The member value.
                var length = 0;
                var mind = gap;
                var partial = [];
                var value = holder[key];
        
                // If the value has a toJSON method, call it to obtain a replacement value.
                if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }
                
                // What happens next depends on the value's type.
                switch (typeof value) {
                    case 'string':
                        return quote(value);
        
                    case 'number':
                        // JSON numbers must be finite. Encode non-finite numbers as null.
                        return isFinite(value) ? String(value) : 'null';
        
                    case 'boolean':
                    case 'null':
                        // If the value is a boolean or null, convert it to a string. Note:
                        // typeof null does not produce 'null'. The case is included here in
                        // the remote chance that this gets fixed someday.
        
                        return String(value);
        
                    case 'object':
                        // If the type is 'object', we might be dealing with an object or an array or
                        // null.
                        // Due to a specification blunder in ECMAScript, typeof null is 'object',
                        // so watch out for that case.
                        if (!value) {
                            return 'null';
                        }
        
                        // Make an array to hold the partial results of stringifying this object value.
                        gap += indent;
                        partial = [];
        
                        // Is the value an array?
                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            // The value is an array. Stringify every element. Use null as a placeholder
                            // for non-JSON values.
        
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || 'null';
                            }
        
                            // Join all of the elements together, separated with commas, and wrap them in
                            // brackets.
                            v = partial.length === 0 ? '[]' :
                            gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                            mind + ']' :
                            '[' + partial.join(',') + ']';
                            gap = mind;
                            return v;
                        }
        
                        // Iterate through all of the keys in the object.
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
        
                        // Join all of the member texts together, separated with commas,
                        // and wrap them in braces.
                        v = partial.length === 0 ? '{}' :
                        gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
                        gap = mind;
                        return v;
                }
            };
        
            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.
            return str('', {
                '': value
            });
        },// }}}
        
        // {{{ include
        include: function( filename ) {
            // The include() statement includes and evaluates the specified file.
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_include/
            // +       version: 809.2411
            // +   original by: mdsjack (http://www.mdsjack.bo.it)
            // +   improved by: Legaev Andrey
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Michael White (http://getsprink.com)
            // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
            // %        note 2: The included file does not come available until a second script block, so typically use this in the header.
            // *     example 1: $P.include('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
            // *     returns 1: 1
        
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', filename);
            js.setAttribute('defer', 'defer');
            document.getElementsByTagName('HEAD')[0].appendChild(js);
        
            // save this.include state for reference by include_once
            var cur_file = {};
            cur_file[window.location.href] = 1;
        
            if (!window.php_js) window.php_js = {};
            if (!window.php_js.includes) window.php_js.includes = cur_file;
            if (!window.php_js.includes[filename]) {
                window.php_js.includes[filename] = 1;
            } else {
                window.php_js.includes[filename]++;
            }
        
            return window.php_js.includes[filename];
        },// }}}
        
        // {{{ include_once
        include_once: function( filename ) {
            // The include_once() statement includes and evaluates the specified file during
            // the execution of the script. This is a behavior similar to the include()
            // statement, with the only difference being that if the code from a file has
            // already been included, it will not be included again.  As the name suggests, it
            // will be included just once.
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_include_once/
            // +       version: 809.2411
            // +   original by: Legaev Andrey
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Michael White (http://getsprink.com)
            // -    depends on: include
            // *     example 1: $P.include_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
            // *     returns 1: true
        
            var cur_file = {};
            cur_file[window.location.href] = 1;
        
            if (!window.php_js) window.php_js = {};
            if (!window.php_js.includes) window.php_js.includes = cur_file;
            if (!window.php_js.includes[filename]) {
                if(this.include(filename)){
                    return true;
                }
            } else{
                return true;
            }
        },// }}}
        
        // {{{ require
        require: function( filename ) {
            // The require() statement includes and evaluates the specific file.
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_require/
            // +       version: 809.2411
            // +   original by: Michael White (http://getsprink.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
            // -    depends on: file_get_contents
            // *     example 1: $P.require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
            // *     returns 1: 2
        
            var js_code = this.file_get_contents(filename);
            var script_block = document.createElement('script');
            script_block.type = 'text/javascript';
            var client_pc = navigator.userAgent.toLowerCase();
            if((client_pc.indexOf("msie") != -1) && (client_pc.indexOf("opera") == -1)) {
                script_block.text = js_code;
            } else {
                script_block.appendChild(document.createTextNode(js_code));
            }
        
            if(typeof(script_block) != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(script_block);
        
                // save include state for reference by include_once and require_once()
                var cur_file = {};
                cur_file[window.location.href] = 1;
        
                if (!window.php_js) window.php_js = {};
                if (!window.php_js.includes) window.php_js.includes = cur_file;
        
                if (!window.php_js.includes[filename]) {
                    window.php_js.includes[filename] = 1;
                } else {
                    // Use += 1 because ++ waits until AFTER the original value is returned to increment the value.
                    return window.php_js.includes[filename] += 1;
                }
            }
        },// }}}
        
        // {{{ require_once
        require_once: function(filename) {
            // The require_once() statement includes and evaluates the specified file during
            // the execution of the script. This is a behavior similar to the require()
            // statement, with the only difference being that if the code from a file has
            // already been included, it will not be included again.  See the documentation for
            // require() for more information on how this statement works.
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_require_once/
            // +       version: 809.2411
            // +   original by: Michael White (http://getsprink.com)
            // -    depends on: require
            // *     example 1: $P.require_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
            // *     returns 1: true
        
            var cur_file = {};
            cur_file[window.location.href] = 1;
        
            // save include state for reference by include_once and this.require_once()
            if (!window.php_js) window.php_js = {};
            if (!window.php_js.includes) window.php_js.includes = cur_file;
            if (!window.php_js.includes[filename]) {
                if (this.require(filename)) {
                    return true;
                }
            } else {
                return true;
            }
        },// }}}
        
        // {{{ abs
        abs: function( mixed_number )  {
            // Absolute value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_abs/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // +   improved by: Karol Kowalski
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // *     example 1: $P.abs(4.2);
            // *     returns 1: 4.2
            // *     example 2: $P.abs(-4.2);
            // *     returns 2: 4.2
            // *     example 3: $P.abs(-5);
            // *     returns 3: 5
            // *     example 4: $P.abs('_argos');
            // *     returns 4: 0
        
            return Math.abs(mixed_number) || 0;
        },// }}}
        
        // {{{ acos
        acos: function(arg) {
            // Arc cosine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_acos/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.acos(0.3);
            // *     returns 1: 1.2661036727794992
        
            return Math.acos(arg);
        },// }}}
        
        // {{{ acosh
        acosh: function(arg) {
            // Inverse hyperbolic cosine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_acosh/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.acosh(8723321.4);
            // *     returns 1: 16.674657798418625
        
            return Math.log(arg + Math.sqrt(arg*arg-1));
        },// }}}
        
        // {{{ asin
        asin: function(arg) {
            // Arc sine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_asin/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.asin(0.3);
            // *     returns 1: 0.3046926540153975
        
            return Math.asin(arg);
        },// }}}
        
        // {{{ asinh
        asinh: function(arg) {
            // Inverse hyperbolic sine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_asinh/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.asinh(8723321.4);
            // *     returns 1: 16.67465779841863
        
            return Math.log(arg + Math.sqrt(arg*arg+1));
        },// }}}
        
        // {{{ atan
        atan: function(arg) {
            // Arc tangent
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_atan/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.atan(8723321.4);
            // *     returns 1: 1.5707962121596615
        
            return Math.atan(arg);
        },// }}}
        
        // {{{ atanh
        atanh: function(arg) {
            // Inverse hyperbolic tangent
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_atanh/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.atanh(0.3);
            // *     returns 1: 0.3095196042031118
        
            return 0.5 * Math.log((1+arg)/(1-arg));
        },// }}}
        
        // {{{ base_convert
        base_convert: function(number, frombase, tobase) {
            // Convert a number between arbitrary bases
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base_convert/
            // +       version: 810.612
            // +   original by: Philippe Baumann
            // *     example 1: $P.base_convert('A37334', 16, 2);
            // *     returns 1: '101000110111001100110100'
        
            return parseInt(number+'', frombase+0).toString(tobase+0);
        },// }}}
        
        // {{{ bindec
        bindec: function (binary_string) {
            // Binary to decimal
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_bindec/
            // +       version: 810.612
            // +   original by: Philippe Baumann
            // *     example 1: $P.bindec('110011');
            // *     returns 1: 51
            // *     example 2: $P.bindec('000110011');
            // *     returns 2: 51
            // *     example 3: $P.bindec('111');
            // *     returns 3: 7
        
            binary_string = (binary_string+'').replace(/[^01]/gi, '');
            return parseInt(binary_string, 2);
        },// }}}
        
        // {{{ ceil
        ceil: function(value) {
            // Round fractions up
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ceil/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.ceil(8723321.4);
            // *     returns 1: 8723322
        
            return Math.ceil(value);
        },// }}}
        
        // {{{ cos
        cos: function(arg) {
            // Cosine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_cos/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.cos(8723321.4);
            // *     returns 1: -0.18127180117607017
        
            return Math.cos(arg);
        },// }}}
        
        // {{{ cosh
        cosh: function(arg) {
            // Hyperbolic cosine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_cosh/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.cosh(-0.18127180117607017);
            // *     returns 1: 1.0164747716114113
        
            return (Math.exp(arg) + Math.exp(-arg))/2;
        },// }}}
        
        // {{{ decbin
        decbin: function(number) {
            // Decimal to binary
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_decbin/
            // +       version: 811.1314
            // +   original by: Enrique Gonzalez
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.decbin(12);
            // *     returns 1: '1100'
            // *     example 2: $P.decbin(26);
            // *     returns 2: '11010'
            // *     example 3: $P.decbin('26');
            // *     returns 3: '11010'
            
            return parseInt(number).toString(2);
        },// }}}
        
        // {{{ dechex
        dechex: function(number) {
            // Decimal to hexadecimal
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_dechex/
            // +       version: 810.612
            // +   original by: Philippe Baumann
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.dechex(10);
            // *     returns 1: 'a'
            // *     example 2: $P.dechex(47);
            // *     returns 2: '2f'
            
            return parseInt(number).toString(16);
        },// }}}
        
        // {{{ decoct
        decoct: function(number) {
            // Decimal to octal
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_decoct/
            // +       version: 810.612
            // +   original by: Enrique Gonzalez
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.decoct(15);
            // *     returns 1: '17'
            // *     example 2: $P.decoct(264); 
            // *     returns 2: '410'
            
            return parseInt(number).toString(8);
        },// }}}
        
        // {{{ deg2rad
        deg2rad: function(angle) {
            // Converts the number in degrees to the radian equivalent
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_deg2rad/
            // +       version: 810.115
            // +   original by: Enrique Gonzalez
            // *     example 1: $P.deg2rad(45);
            // *     returns 1: 0.7853981633974483
            
            return (angle/180)*Math.PI;
        },// }}}
        
        // {{{ exp
        exp: function(arg) {
            // Calculates the exponent of e
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_exp/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.exp(0.3);
            // *     returns 1: 1.3498588075760032
        
            return Math.exp(arg);
        },// }}}
        
        // {{{ floor
        floor: function(value) {
            // Round fractions down
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_floor/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.floor(8723321.4);
            // *     returns 1: 8723321
            
            return Math.floor(value);
        },// }}}
        
        // {{{ fmod
        fmod: function(x, y) {
            // Returns the floating point remainder (modulo) of the division  of the arguments
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_fmod/
            // +       version: 810.612
            // +   original by: Onno Marsman
            // *     example 1: $P.fmod(5.7, 1.3);
            // *     returns 1: 0.5
            
            var tmp, tmp2, p = 0, pY = 0, l = 0.0, l2 = 0.0;
            
            tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
            p = parseInt(tmp[2])-(tmp[1]+'').length;
            tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
            pY = parseInt(tmp[2])-(tmp[1]+'').length;
            
            if (pY > p) {
                p = pY;
            }
            
            tmp2 = (x%y);
            
            if (p < -100 || p > 20) {
                // toFixed will give an out of bound error so we fix it like this:
                var l = Math.round(Math.log(tmp2)/Math.log(10));
                var l2 = Math.pow(10, l);
                
                return (tmp2/l2).toFixed(l-p)*l2;
            } else {
                return parseFloat(tmp2.toFixed(-p));
            }
        },// }}}
        
        // {{{ getrandmax
        getrandmax: function()
        {
            // Show largest possible random value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_getrandmax/
            // +       version: 810.915
            // +   original by: Onno Marsman
            // *     example 1: $P.getrandmax();
            // *     returns 1: 2147483647
            return 2147483647;
        },// }}}
        
        // {{{ hexdec
        hexdec: function(hex_string) {
            // Hexadecimal to decimal
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_hexdec/
            // +       version: 810.300
            // +   original by: Philippe Baumann
            // *     example 1: $P.hexdec('that');
            // *     returns 1: 10
            // *     example 2: $P.hexdec('a0');
            // *     returns 2: 160
            
            hex_string = (hex_string+'').replace(/[^a-f0-9]/gi, '');
            return parseInt(hex_string, 16);
        },// }}}
        
        // {{{ hypot
        hypot: function(x, y) {
            // Calculate the length of the hypotenuse of a right-angle triangle
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_hypot/
            // +       version: 810.819
            // +   original by: Onno Marsman
            // *     example 1: $P.hypot(3, 4);
            // *     returns 1: 5
            // *     example 2: $P.hypot([], 'a');
            // *     returns 2: 0
        
            return Math.sqrt(x*x + y*y) || 0;
        },// }}}
        
        // {{{ is_finite
        is_finite: function(val) {
            // Finds whether a value is a legal finite number
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_finite/
            // +       version: 810.1310
            // +   original by: Onno Marsman
            // *     example 1: $P.is_finite(Infinity);
            // *     returns 1: false
            // *     example 2: $P.is_finite(-Infinity);
            // *     returns 2: false
            // *     example 3: $P.is_finite(0);
            // *     returns 3: true
        
            var warningType = '';
        
            if (val===Infinity || val===-Infinity) {
                return false;
            }
        
            //Some warnings for maximum PHP compatibility
            if (typeof val=='object') {
                warningType = (val instanceof Array ? 'array' : 'object');
            } else if (typeof val=='string' && !val.match(/^[\+\-]?\d/)) {
                //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
                warningType = 'string';
            }
            if (warningType) {
                throw new Error('Warning: this.is_finite() expects parameter 1 to be double, '+warningType+' given');
            }
        
            return true;
        },// }}}
        
        // {{{ is_infinite
        is_infinite: function(val) {
            // Finds whether a value is infinite
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_infinite/
            // +       version: 810.1310
            // +   original by: Onno Marsman
            // *     example 1: $P.is_infinite(Infinity);
            // *     returns 1: true
            // *     example 2: $P.is_infinite(-Infinity);
            // *     returns 2: true
            // *     example 3: $P.is_infinite(0);
            // *     returns 3: false
        
            var warningType = '';
        
            if (val===Infinity || val===-Infinity) {
                return true;
            }
        
            //Some warnings for maximum PHP compatibility
            if (typeof val=='object') {
                warningType = (val instanceof Array ? 'array' : 'object');
            } else if (typeof val=='string' && !val.match(/^[\+\-]?\d/)) {
                //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
                warningType = 'string';
            }
            if (warningType) {
                throw new Error('Warning: this.is_infinite() expects parameter 1 to be double, '+warningType+' given');
            }
        
            return false;
        },// }}}
        
        // {{{ is_nan
        is_nan: function(val) {
            // Finds whether a value is not a number
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_nan/
            // +       version: 810.1310
            // +   original by: Onno Marsman
            // +      input by: Robin
            // *     example 1: $P.is_nan(NaN);
            // *     returns 1: true
            // *     example 2: $P.is_nan(0);
            // *     returns 2: false
        
            var warningType = '';
        
            if (typeof val=='number' && isNaN(val)) {
                return true;
            }
        
            //Some errors for maximum PHP compatibility
            if (typeof val=='object') {
                warningType = (val instanceof Array ? 'array' : 'object');
            } else if (typeof val=='string' && !val.match(/^[\+\-]?\d/)) {
                //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
                warningType = 'string';
            }
            if (warningType) {
                throw new Error('Warning: this.is_nan() expects parameter 1 to be double, '+warningType+' given');
            }
        
            return false;
        },// }}}
        
        // {{{ lcg_value
        lcg_value: function() {
            // Combined linear congruential generator
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_lcg_value/
            // +       version: 810.819
            // +   original by: Onno Marsman
        
            return Math.random();
        },// }}}
        
        // {{{ log
        log: function(arg, base) {
            // Natural logarithm
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_log/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.log(8723321.4, 7);
            // *     returns 1: 8.212871815082147
        
            if (base === undefined) {
                return Math.log(arg);
            } else {
                return Math.log(arg)/Math.log(base);
            }
        },// }}}
        
        // {{{ log10
        log10: function(arg) {
            // Base-10 logarithm
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_log10/
            // +       version: 811.1323
            // +   original by: Philip Peterson
            // +   improved by: Onno Marsman
            // +   improved by: Tod Gentille
            // *     example 1: $P.log10(10);
            // *     returns 1: 1
            // *     example 2: $P.log10(1);
            // *     returns 2: 0
        
            return Math.log(arg)/Math.LN10;
        },// }}}
        
        // {{{ max
        max: function() {
            // Find highest value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_max/
            // +       version: 810.112
            // +   original by: Onno Marsman
            // +    revised by: Onno Marsman
            // +    tweaked by: Jack
            // %          note: Long code cause we're aiming for maximum PHP compatibility
            // *     example 1: $P.max(1, 3, 5, 6, 7);
            // *     returns 1: 7
            // *     example 2: $P.max([2, 4, 5]);
            // *     returns 2: 5
            // *     example 3: $P.max(0, 'hello');
            // *     returns 3: 0
            // *     example 4: $P.max('hello', 0);
            // *     returns 4: 'hello'
            // *     example 5: $P.max(-1, 'hello');
            // *     returns 5: 'hello'
            // *     example 6: $P.max([2, 4, 8], [2, 5, 7]);
            // *     returns 6: [2, 5, 7]
        
            var ar, retVal, i = 0, n = 0;
            var argv = arguments, argc = argv.length;
        
            var _obj2Array = function(obj) {
                if (obj instanceof Array) {
                    return obj;
                } else {
                    var ar = [];
                    for (var i in obj) {
                        ar.push(obj[i]);
                    }
                    return ar;
                }
            } //function _obj2Array
            
            var _compare = function(current, next) {
                var i = 0, n = 0, tmp = 0;
                var nl = 0, cl = 0;
                
                if (current === next) {
                    return 0;
                } else if (typeof current == 'object') {
                    if (typeof next == 'object') {
                       current = _obj2Array(current);
                       next    = _obj2Array(next);
                       cl      = current.length;
                       nl      = next.length;
                       if (nl > cl) {
                           return 1;
                       } else if (nl < cl) {
                           return -1;
                       } else {
                           for (i = 0, n = cl; i<n; ++i) {
                               tmp = _compare(current[i], next[i]);
                               if (tmp == 1) {
                                   return 1;
                               } else if (tmp == -1) {
                                   return -1;
                               }
                           }
                           return 0;
                       }
                    } else {
                       return -1;
                    }
                } else if (typeof next == 'object') {
                    return 1;
                } else if (isNaN(next) && !isNaN(current)) {
                    if (current == 0) {
                       return 0;
                    } else {
                       return (current<0 ? 1 : -1);
                    }
                } else if (isNaN(current) && !isNaN(next)) {
                    if (next==0) {
                       return 0;
                    } else {
                       return (next>0 ? 1 : -1);
                    }
                } else {
                    if (next==current) {
                       return 0;
                    } else {
                       return (next>current ? 1 : -1);
                    }
                }
            } //function _compare
            
            if (argc == 0) {
                throw new Error('At least one value should be passed to this.max()');
            } else if (argc == 1) {
                if (typeof argv[0]=='object') {
                    ar = _obj2Array(argv[0]);
                } else {
                    throw new Error('Wrong parameter count for this.max()');
                }
                if (ar.length == 0) {
                    throw new Error('Array must contain at least one element for this.max()');
                }
            } else {
                ar = argv;
            }
            
            retVal = ar[0];
            for (i=1, n=ar.length; i<n; ++i) {
                if (_compare(retVal, ar[i])==1) {
                    retVal = ar[i];
                }
            }
            
            return retVal;
        },// }}}
        
        // {{{ min
        min: function() {
            // Find lowest value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_min/
            // +       version: 810.112
            // +   original by: Onno Marsman
            // +    revised by: Onno Marsman
            // +    tweaked by: Jack
            // %          note: Long code cause we're aiming for maximum PHP compatibility
            // *     example 1: $P.min(1, 3, 5, 6, 7);
            // *     returns 1: 1
            // *     example 2: $P.min([2, 4, 5]);
            // *     returns 2: 2
            // *     example 3: $P.min(0, 'hello');
            // *     returns 3: 0
            // *     example 4: $P.min('hello', 0);
            // *     returns 4: 'hello'
            // *     example 5: $P.min(-1, 'hello');
            // *     returns 5: -1
            // *     example 6: $P.min([2, 4, 8], [2, 5, 7]);
            // *     returns 6: [2, 4, 8]
            
            var ar, retVal, i = 0, n = 0;
            var argv = arguments, argc = argv.length;
        
            var _obj2Array = function(obj) {
                if (obj instanceof Array) {
                    return obj;
                } else {
                    var ar = [];
                    for (var i in obj) {
                        ar.push(obj[i]);
                    }
                    return ar;
                }
            } //function _obj2Array
            
            var _compare = function(current, next) {
                var i = 0, n = 0, tmp = 0;
                var nl = 0, cl = 0;
                
                if (current === next) {
                    return 0;
                } else if (typeof current == 'object') {
                    if (typeof next == 'object') {
                       current = _obj2Array(current);
                       next    = _obj2Array(next);
                       cl      = current.length;
                       nl      = next.length;
                       if (nl > cl) {
                           return 1;
                       } else if (nl < cl) {
                           return -1;
                       } else {
                           for (i = 0, n = cl; i<n; ++i) {
                               tmp = _compare(current[i], next[i]);
                               if (tmp == 1) {
                                   return 1;
                               } else if (tmp == -1) {
                                   return -1;
                               }
                           }
                           return 0;
                       }
                    } else {
                       return -1;
                    }
                } else if (typeof next == 'object') {
                    return 1;
                } else if (isNaN(next) && !isNaN(current)) {
                    if (current == 0) {
                       return 0;
                    } else {
                       return (current<0 ? 1 : -1);
                    }
                } else if (isNaN(current) && !isNaN(next)) {
                    if (next==0) {
                       return 0;
                    } else {
                       return (next>0 ? 1 : -1);
                    }
                } else {
                    if (next==current) {
                       return 0;
                    } else {
                       return (next>current ? 1 : -1);
                    }
                }
            } //function _compare
            
            if (argc == 0) {
                throw new Error('At least one value should be passed to this.min()');
            } else if (argc == 1) {
                if (typeof argv[0]=='object') {
                    ar = _obj2Array(argv[0]);
                } else {
                    throw new Error('Wrong parameter count for this.min()');
                }
                if (ar.length == 0) {
                    throw new Error('Array must contain at least one element for this.min()');
                }
            } else {
                ar = argv;
            }
            
            retVal = ar[0];
            for (i=1, n=ar.length; i<n; ++i) {
                if (_compare(retVal, ar[i])==-1) {
                    retVal = ar[i];
                }
            }
            
            return retVal;
        },// }}}
        
        // {{{ mt_getrandmax
        mt_getrandmax: function()
        {
            // Show largest possible random value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_mt_getrandmax/
            // +       version: 810.915
            // +   original by: Onno Marsman
            // *     example 1: $P.mt_getrandmax();
            // *     returns 1: 2147483647
            return 2147483647;
        },// }}}
        
        // {{{ mt_rand
        mt_rand: function( min, max ) {
            // Generate a better random value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_mt_rand/
            // +       version: 810.915
            // +   original by: Onno Marsman
            // *     example 1: $P.mt_rand(1, 1);
            // *     returns 1: 1
            var argc = arguments.length;
            if (argc == 0) {
                min = 0;
                max = 2147483647;
            } else if (argc == 1) {
                throw new Error('Warning: this.mt_rand() expects exactly 2 parameters, 1 given');
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },// }}}
        
        // {{{ octdec
        octdec: function (oct_string) {
            // Octal to decimal
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_octdec/
            // +       version: 810.612
            // +   original by: Philippe Baumann
            // *     example 1: $P.octdec('77');
            // *     returns 1: 63
        
            oct_string = (oct_string+'').replace(/[^0-7]/gi, '');
            return parseInt(oct_string, 8);
        },// }}}
        
        // {{{ pi
        pi: function() {
            // Get value of pi
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_pi/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.pi(8723321.4);
            // *     returns 1: 3.141592653589793
        
            return Math.PI;
        },// }}}
        
        // {{{ pow
        pow: function(base, exp) {
            // Exponential expression
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_pow/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.pow(8723321.4, 7);
            // *     returns 1: 3.843909168077899e+48
        
            return Math.pow(base, exp);
        },// }}}
        
        // {{{ rad2deg
        rad2deg: function(angle) {
            // Converts the radian number to the equivalent number in degrees
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rad2deg/
            // +       version: 810.115
            // +   original by: Enrique Gonzalez
            // *     example 1: $P.rad2deg(3.141592653589793);
            // *     returns 1: 180
            
            return (angle/Math.PI) * 180;
        },// }}}
        
        // {{{ rand
        rand: function( min, max ) {
            // Generate a random integer
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rand/
            // +       version: 810.915
            // +   original by: Leslie Hoare
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.rand(1, 1);
            // *     returns 1: 1
            var argc = arguments.length;
            if (argc == 0) {
                min = 0;
                max = 2147483647;
            } else if (argc == 1) {
                throw new Error('Warning: this.rand() expects exactly 2 parameters, 1 given');
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },// }}}
        
        // {{{ round
        round: function ( val, precision ) {
            // Rounds a float
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_round/
            // +       version: 809.2411
            // +   original by: Philip Peterson
            // +    revised by: Onno Marsman
            // *     example 1: $P.round(1241757, -3);
            // *     returns 1: 1242000
            // *     example 2: $P.round(3.6);
            // *     returns 2: 4
         
            return parseFloat(parseFloat(val).toFixed(precision));
        },// }}}
        
        // {{{ sin
        sin: function(arg) {
            // Sine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sin/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.sin(8723321.4);
            // *     returns 1: -0.9834330348825909
        
            return Math.sin(arg);
        },// }}}
        
        // {{{ sinh
        sinh: function(arg) {
            // Hyperbolic sine
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sinh/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.sinh(-0.9834330348825909);
            // *     returns 1: -1.1497971402636502
        
            return (Math.exp(arg) - Math.exp(-arg))/2;
        },// }}}
        
        // {{{ sqrt
        sqrt: function(arg) {
            // Square root
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sqrt/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.sqrt(8723321.4);
            // *     returns 1: 2953.5269424875746
            
            return Math.sqrt(arg);
        },// }}}
        
        // {{{ tan
        tan: function(arg) {
            // Tangent
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_tan/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.tan(8723321.4);
            // *     returns 1: 5.4251848798444815
        
            return Math.tan(arg);
        },// }}}
        
        // {{{ tanh
        tanh: function(arg) {
            // Hyperbolic tangent
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_tanh/
            // +       version: 809.2411
            // +   original by: Onno Marsman
            // *     example 1: $P.tanh(5.4251848798444815);
            // *     returns 1: 0.9999612058841574
        
            return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
        },// }}}
        
        // {{{ constant
        constant: function(name) {
            // Returns the value of a constant
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_constant/
            // +       version: 812.311
            // +   original by: Paulo Ricardo F. Santos
            // *     example 1: $P.constant('IMAGINARY_CONSTANT1');
            // *     returns 1: null
        
            if (window[name] === undefined) {
                return null;
            }
        
            return window[name];
        },// }}}
        
        // define() is not available in the namespaced version of php.js
        
        // {{{ defined
        defined: function( constant_name )  {
            // Checks whether a given named constant exists
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_defined/
            // +       version: 901.2514
            // +   original by: Waldo Malqui Silva
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Brett Zamir
            // *     example 1: $P.defined('IMAGINARY_CONSTANT1');
            // *     returns 1: false
        
            var tmp = window[constant];
            
            window[constant] = window[constant] ? 'changed'+window[constant].toString() : 'changed';
            var returnval = window[constant] === tmp;
            if (!returnval) { // Reset
                window[constant] = tmp;
            }
        
            return returnval;
        },// }}}
        
        // {{{ die
        die: function( status ) {
            // Equivalent to exit()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_die/
            // +       version: 901.617
            // +   original by: Brett Zamir
            //  -   depends on: exit
            // %        note 1: Should be considered expirimental. Please comment on this function.
            // *     example 1: $P.die();
            // *     returns 1: null
        
            return this.exit(status);
        },// }}}
        
        // {{{ exit
        exit: function( status ) {
            // Output a message and terminate the current script
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_exit/
            // +       version: 901.1520
            // +   original by: Brett Zamir
            // +      input by: Paul
            // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
            // %        note 1: Should be considered expirimental. Please comment on this function.
            // *     example 1: $P.exit();
            // *     returns 1: null
        
            var i;
        
            if (typeof status === 'string') {
                alert(status);
            }
        
            window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);
        
            var handlers = [
                'copy', 'cut', 'paste',
                'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
                'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
                'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
            ];
            
            stop: functionPropagation (e) {
                e.stopPropagation();
                // e.preventDefault(); // Stop for the form controls, etc., too?
            }
            for (i=0; i < handlers.length; i++) {
                window.addEventListener(handlers[i], function (e) {e.stopPropagation();}, true);
            }
            
            throw '';
        },// }}}
        
        // {{{ php_strip_whitespace
        php_strip_whitespace: function (file) {
            // Return source with stripped comments and whitespace
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_php_strip_whitespace/
            // +       version: 901.2514
            // +   original by: Brett Zamir
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
            // %        note 1: To avoid browser blocking issues's consider using jQuery's: $('#divId').load('http://url') instead.
            // -    depends on: file_get_contents
            // *     example 1: $P.php_strip_whitespace('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '123'
        
            try {
                var str = this.file_get_contents(file);
            } catch (e) {
                return '';
            }
            // Strip comments (both styles), reduce non-newline whitespace to one, reduce multiple
            // newlines (preceded by any whitespace) to a newline, remove WS at beginning of line,
            // and at end of line
            return str.replace(/\/\/.*?\n/g, '').replace(/\/\*[^]*?\*\//g, '').replace(/[ \f\r\t\v\u00A0\u2028\u2029]+/g, ' ').replace(/\s*\n+/g, '\n').replace(/^\s+/gm, '').replace(/\s*$/gm, '');
        },// }}}
        
        // {{{ sleep
        sleep: function(seconds) {
            // Delay execution
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sleep/
            // +       version: 901.2514
            // +   original by: Christian Doebler
            // +   bugfixed by: Brett Zamir
            // %          note: For study purposes. Current implementation could lock up the user's browser. 
            // %          note: Consider using setTimeout() instead.
            // *     example 1: $P.sleep(1);
            // *     returns 1: 0
            
            var start = new Date().getTime();
            while (new Date() < start + seconds*1000);
            return 0;
        },// }}}
        
        // {{{ time_nanosleep
        time_nanosleep: function(seconds, nanosecs) {
            // Delay for a number of seconds and nanoseconds
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_time_nanosleep/
            // +       version: 902.122
            // +   original by: Brett Zamir
            // %        note 1: For study purposes. Current implementation could lock up the user's browser.
            // %        note 1: Consider using setTimeout() instead.
            // %        note 2: Note that the following function's argument, contrary to the reference to
            // %        note 2: nanoseconds, does not start being significant until 1,000,000 nanoseconds (milliseconds),
            // %        note 2: since that is the smallest unit handled by JavaScript's Date function.
            // *     example 1: $P.time_nanosleep(1, 2000000000); // delays for 3 seconds
            // *     returns 1: true
        
            var start = new Date().getTime();
            while (new Date() < (start + seconds*1000+nanosecs/1000000));
            return true;
        },// }}}
        
        // {{{ time_sleep_until
        time_sleep_until: function(timestamp) {
            // Make the script sleep until the specified time
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_time_sleep_until/
            // +       version: 902.210
            // +   original by: Brett Zamir
            // %          note: For study purposes. Current implementation could lock up the user's browser.
            // %          note: Expects a timestamp in seconds, so DO NOT pass in a JavaScript timestamp which are in milliseconds (e.g., new Date()) or otherwise the will: function lock up the browser 1000 times longer than probably intended.
            // %          note: Consider using setTimeout() instead.
            // *     example 1: $P.time_sleep_until(1233146501) // delays until the time indicated by the given timestamp is reached
            // *     returns 1: true
        
            while (new Date() < timestamp*1000);
            return true;
        },// }}}
        
        // {{{ usleep
        usleep: function(microseconds) {
            // #!#!#!#!# usleep::$descr1 does not contain valid 'usleep' at line 260
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_usleep/
            // +       version: 902.122
            // // +   original by: Brett Zamir
            // %        note 1: For study purposes. Current implementation could lock up the user's browser.
            // %        note 1: Consider using setTimeout() instead.
            // %        note 2: Note that this function's argument, contrary to the PHP name, does not
            // %        note 2: start being significant until 1,000 microseconds (1 millisecond)
            // *     example 1: $P.usleep(2000000); // delays for 2 seconds
            // *     returns 1: true
        
            var start = new Date().getTime();
            while (new Date() < (start + microseconds/1000));
            return true;
        },// }}}
        
        // {{{ ip2long
        ip2long: function ( ip_address ) {
            // Converts a string containing an (IPv4) Internet Protocol dotted address into a
            // proper address
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ip2long/
            // +       version: 901.714
            // +   original by: Waldo Malqui Silva
            // +   improved by: Victor
            // *     example 1: $P.ip2long( '192.0.34.166' );
            // *     returns 1: 3221234342
            
            var output = false;
            var parts = [];
            if (ip_address.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
                parts  = ip_address.split('.');
                output = ( parts[0] * 16777216 +
                ( parts[1] * 65536 ) +
                ( parts[2] * 256 ) +
                ( parts[3] * 1 ) );
            }
             
            return output;
        },// }}}
        
        // {{{ long2ip
        long2ip: function ( proper_address ) {
            // Converts an (IPv4) Internet network address into a string in Internet standard
            // dotted format
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_long2ip/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // *     example 1: $P.long2ip( 3221234342 );
            // *     returns 1: '192.0.34.166'
            
            var output = false;
            
            if ( !isNaN ( proper_address ) && ( proper_address >= 0 || proper_address <= 4294967295 ) ) {
                output = Math.floor (proper_address / Math.pow ( 256, 3 ) ) + '.' +
                    Math.floor ( ( proper_address % Math.pow ( 256, 3 ) ) / Math.pow ( 256, 2 ) ) + '.' +
                    Math.floor ( ( ( proper_address % Math.pow ( 256, 3 ) )  % Math.pow ( 256, 2 ) ) / Math.pow ( 256, 1 ) ) + '.' +
                    Math.floor ( ( ( ( proper_address % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) % Math.pow ( 256, 1 ) ) / Math.pow ( 256, 0 ) );
            }
            
            return output;
        },// }}}
        
        // {{{ setcookie
        setcookie: function(name, value, expires, path, domain, secure) {
            // Send a cookie
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_setcookie/
            // +       version: 901.810
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   bugfixed by: Andreas
            // +   bugfixed by: Onno Marsman
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: setrawcookie
            // *     example 1: $P.setcookie('author_name', 'Kevin van Zonneveld');
            // *     returns 1: true
        
            return this.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure)
        },// }}}
        
        // {{{ setrawcookie
        setrawcookie: function(name, value, expires, path, domain, secure) {
            // Send a cookie without urlencoding the cookie value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_setrawcookie/
            // +       version: 901.810
            // +   original by: Brett Zamir
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.setcookie('author_name', 'Kevin van Zonneveld');
            // *     returns 1: true
        
            if (expires instanceof Date) {
                expires = expires.toGMTString();
            } else if(typeof(expires) == 'number') {
                expires = (new Date(+(new Date) + expires * 1e3)).toGMTString();
            }
        
            var r = [name + "=" + value], s, i;
            for(i in s = {expires: expires, path: path, domain: domain}){
                s[i] && r.push(i + "=" + s[i]);
            }
            
            return secure && r.push("secure"), document.cookie = r.join(";"), true;
        },// }}}
        
        // {{{ preg_quote
        preg_quote: function( str ) {
            // Quote regular expression characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_preg_quote/
            // +       version: 810.819
            // +   original by: booeyOH
            // +   improved by: Ates Goral (http://magnetiq.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.preg_quote("$40");
            // *     returns 1: '\$40'
            // *     example 2: $P.preg_quote("*RRRING* Hello?");
            // *     returns 2: '\*RRRING\* Hello\?'
            // *     example 3: $P.preg_quote("\\.+*?[^]$(){}=!<>|:");
            // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
        
            return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
        },// }}}
        
        // {{{ addslashes
        addslashes: function( str ) {
            // Quote string with slashes
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_addslashes/
            // +       version: 809.2122
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Ates Goral (http://magnetiq.com)
            // +   improved by: marrtins
            // +   improved by: Nate
            // +   improved by: Onno Marsman
            // *     example 1: $P.addslashes("kevin's birthday");
            // *     returns 1: 'kevin\'s birthday'
         
            return (str+'').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
        },// }}}
        
        // {{{ bin2hex
        bin2hex: function(s){
            // Convert binary data into hexadecimal representation
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_bin2hex/
            // +       version: 811.2517
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // +   bugfixed by: Linuxworld
            // *     example 1: $P.bin2hex('Kev');
            // *     returns 1: '4b6576'
            // *     example 2: $P.bin2hex(String.fromCharCode(0x00));
            // *     returns 2: '00'
        
            var v,i, f = 0, a = [];
            s += '';
            f = s.length;
            
            for (i = 0; i<f; i++) {
                a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");
            }
            
            return a.join('');
        },// }}}
        
        // {{{ chop
        chop: function ( str, charlist ) {
            // Alias of rtrim()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_chop/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            // -    depends on: rtrim
            // *     example 1: $P.rtrim('    Kevin van Zonneveld    ');
            // *     returns 1: '    Kevin van Zonneveld'
        
            return this.rtrim(str, charlist);
        },// }}}
        
        // {{{ chr
        chr: function( ascii ) {
            // Return a specific character
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_chr/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.chr(75);
            // *     returns 1: 'K'
        
            return String.fromCharCode(ascii);
        },// }}}
        
        // {{{ count_chars
        count_chars: function( str, mode ) {
            // Return information about characters used in a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count_chars/
            // +       version: 810.621
            // +   original by: Ates Goral (http://magnetiq.com)
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.count_chars("Hello World!", 1);
            // *     returns 1: "Hd e!lWor"
        
            var histogram = new Object(), tmp_arr = new Array();
            var key, i, code, mode, strl = 0;
            var argc = arguments.length;
        
            if (argc == 1) {
                mode = 0;
            }
        
            mode_even = (mode & 1) == 0;
            if (mode_even) {
                for (i = 1; i < 256; ++i) {
                    histogram[i] = 0;
                }
            }
        
            str += '';
        
            strl = str.length;
            for (i = 0; i < strl; ++i) {
                code = str.charCodeAt(i);
                if (code in histogram) {
                    ++histogram[code];
                } else {
                    histogram[code] = 1;
                }
            }
        
            if (mode > 0) {
                for (key in histogram) {
                    if (histogram[key] == 0 != mode_even) {
                        delete histogram[key];
                    }
                }
            }
        
            if (mode < 3) {
                return histogram;
            } else {
                for (key in histogram) {
                    tmp_arr.push(String.fromCharCode(key));
                }
                return tmp_arr.join("");
            }
        },// }}}
        
        // {{{ crc32
        crc32: function ( str ) {
            // Calculates the crc32 polynomial of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_crc32/
            // +       version: 809.522
            // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // +   improved by: T0bsn
            // -    depends on: utf8_encode
            // *     example 1: $P.crc32('Kevin van Zonneveld');
            // *     returns 1: 1249991249
        
            str = this.utf8_encode(str);
            var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
        
            var crc = 0;
            var x = 0;
            var y = 0;
        
            crc = crc ^ (-1);
            for( var i = 0, iTop = str.length; i < iTop; i++ ) {
                y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
                x = "0x" + table.substr( y * 9, 8 );
                crc = ( crc >>> 8 ) ^ x;
            }
        
            return crc ^ (-1);
        },// }}}
        
        // {{{ echo
        echo: function ( ) {
            // Output one or more strings
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_echo/
            // +       version: 901.2514
            // +   original by: Philip Peterson
            // +   improved by: echo is bad
            // +   improved by: Nate
            // +    revised by: Der Simon (http://innerdom.sourceforge.net/)
            // +   improved by: Brett Zamir
            // %        note 1: There are a few unsolved issues with this function. Summarizing:
            // %        note 1: converts all the special characters (e.g. tags) to HTML entities, 
            // %        note 1: thus reducing the usability of HTML formatting in echo().
            // %        note 1: 
            // %        note 1: InnerHTML() is better because it works (and it's fast),   
            // %        note 1: but using innerHTML on the BODY is very dangerous because
            // %        note 1: you will break all references to HTMLElements that were done before
            // %        note 1: 
            // %        note 1: There's no good place for a package like http://innerdom.sourceforge.net/
            // %        note 1: inside php.js
            // %        note 1:
            // *     example 1: $P.echo('Hello', 'World');
            // *     returns 1: null
            
            var arg = '', argc = arguments.length, argv = arguments, i = 0;
        
            var stringToDOM = function (q){
                var d = document;
                var r = function(a){
                    return a.replace(/\r/g,' ').replace(/\n/g,' ');
                };
                var s = function(a){
                    return a.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"');
                };
                var t = function(a){
                    return a.replace(/ /g,'');
                };
                var u = function(a){
                    var b,c,e,f,g,h,i;
                    b=d.createDocumentFragment();
                    c=a.indexOf(' ');
                    if (c === -1) {
                        b.appendChild(d.createElement(a.toLowerCase()))
                    } else {
                        i = t(a.substring(0,c)).toLowerCase();
                        a = a.substr(c+1);
                        b.appendChild(d.createElement(i));
                        while(a.length){
                            e=a.indexOf('=');
                            if(e>=0){
                                f=t(a.substring(0,e)).toLowerCase();
                                g=a.indexOf('"');
                                a=a.substr(g+1);
                                g=a.indexOf('"');
                                h=s(a.substring(0,g));
                                a=a.substr(g+2);
                                b.lastChild.setAttribute(f,h)
                            }else{
                                break
                            }
                        }
                    }
                    return b
                }
                var v = function(a,b,c){
                    var e,f;
                    e=b;
                    c=c.toLowerCase();
                    f=e.indexOf('</'+c+'>');
                    a=a.concat(e.substring(0,f));
                    e=e.substr(f);
                    while(a.indexOf('<'+c)!=-1){
                        a=a.substr(a.indexOf('<'+c));
                        a=a.substr(a.indexOf('>')+1);
                        e=e.substr(e.indexOf('>')+1);
                        f=e.indexOf('</'+c+'>');
                        a=a.concat(e.substring(0,f));
                        e=e.substr(f)
                    }
                    return b.length-e.length
                };
                var w = function(a){
                    var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q;
                    b=d.createDocumentFragment();
                    while(a&&a.length){
                        c=a.indexOf('<');
                        if(c===-1){
                            a=s(a);
                            b.appendChild(d.createTextNode(a));
                            a=null
                        } else if(c){
                            q=s(a.substring(0,c));
                            b.appendChild(d.createTextNode(q));
                            a=a.substr(c)
                        } else{
                            e=a.indexOf('<!--');
                            if(!e){
                                f=a.indexOf('-->');
                                g=a.substring(4,f);
                                g=s(g);
                                b.appendChild(d.createComment(g));
                                a=a.substr(f+3)
                            } else{
                                h=a.indexOf('>');
                                if(a.substring(h-1,h)==='/'){
                                    i=a.indexOf('/>');
                                    j=a.substring(1,i);
                                    b.appendChild(u(j));
                                    a=a.substr(i+2)
                                } else{
                                    k=a.indexOf('>');
                                    l=a.substring(1,k);
                                    m=d.createDocumentFragment();
                                    m.appendChild(u(l));
                                    a=a.substr(k+1);
                                    n=a.substring(0,a.indexOf('</'));
                                    a=a.substr(a.indexOf('</'));
                                    if(n.indexOf('<')!=-1){
                                        o=m.lastChild.nodeName;
                                        p=v(n,a,o);
                                        n=n.concat(a.substring(0,p));
                                        a=a.substr(p)
                                    }
                                    a=a.substr(a.indexOf('>')+1);
                                    m.lastChild.appendChild(w(n));
                                    b.appendChild(m)
                                }
                            }
                        }
                    }
                    return b
                };
                return w(q)
            }
        
            for (i = 0; i < argc; i++ ) {
                arg = argv[i];
                if (document.createDocumentFragment && document.createTextNode && document.appendChild) {
                    if (document.body) {
                        document.body.appendChild(stringToDOM(arg));
                    } else {
                        document.documentElement.appendChild(stringToDOM(arg));
                    }
                    document.body.appendChild(stringToDOM(arg));
                } else if (document.write) {
                    document.write(arg);
                } else {
                    print(arg);
                }
            }
        },// }}}
        
        // {{{ explode
        explode: function( delimiter, string, limit ) {
            // Split a string by string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_explode/
            // +       version: 809.522
            // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +     improved by: kenneth
            // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +     improved by: d3x
            // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.explode(' ', 'Kevin van Zonneveld');
            // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
            // *     example 2: $P.explode('=', 'a=bc=d', 2);
            // *     returns 2: ['a', 'bc=d']
         
            var emptyArray = { 0: '' };
            
            // third argument is not required
            if ( arguments.length < 2
                || typeof arguments[0] == 'undefined'
                || typeof arguments[1] == 'undefined' )
            {
                return null;
            }
         
            if ( delimiter === ''
                || delimiter === false
                || delimiter === null )
            {
                return false;
            }
         
            if ( typeof delimiter == 'function'
                || typeof delimiter == 'object'
                || typeof string == 'function'
                || typeof string == 'object' )
            {
                return emptyArray;
            }
         
            if ( delimiter === true ) {
                delimiter = '1';
            }
            
            if (!limit) {
                return string.toString().split(delimiter.toString());
            } else {
                // support for limit argument
                var splitted = string.toString().split(delimiter.toString());
                var partA = splitted.splice(0, limit - 1);
                var partB = splitted.join(delimiter.toString());
                partA.push(partB);
                return partA;
            }
        },// }}}
        
        // {{{ get_html_translation_table
        get_html_translation_table: function(table, quote_style) {
            // Returns the translation table used by htmlspecialchars() and htmlentities()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_html_translation_table/
            // +       version: 901.714
            // +   original by: Philip Peterson
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: noname
            // %          note: It has been decided that we're not going to add global
            // %          note: dependencies to php.js. Meaning the constants are not
            // %          note: real constants, but strings instead. integers are also supported if someone
            // %          note: chooses to create the constants themselves.
            // %          note: Table from http://www.the-art-of-web.com/html/character-codes/
            // *     example 1: $P.get_html_translation_table('HTML_SPECIALCHARS');
            // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
            
            var entities = {}, histogram = {}, decimal = 0, symbol = '';
            var constMappingTable = {}, constMappingQuoteStyle = {};
            var useTable = {}, useQuoteStyle = {};
            
            useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
            useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
            
            // Translate arguments
            constMappingTable[0]      = 'HTML_SPECIALCHARS';
            constMappingTable[1]      = 'HTML_ENTITIES';
            constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
            constMappingQuoteStyle[2] = 'ENT_COMPAT';
            constMappingQuoteStyle[3] = 'ENT_QUOTES';
            
            // Map numbers to strings for compatibilty with PHP constants
            if (!isNaN(useTable)) {
                useTable = constMappingTable[useTable];
            }
            if (!isNaN(useQuoteStyle)) {
                useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
            }
            
            if (useQuoteStyle != 'ENT_NOQUOTES') {
                entities['34'] = '&quot;';
            }
        
            if (useQuoteStyle == 'ENT_QUOTES') {
                entities['39'] = '&#039;';
            }
        
            if (useTable == 'HTML_SPECIALCHARS') {
                // ascii decimals for better compatibility
                entities['38'] = '&amp;';
                entities['60'] = '&lt;';
                entities['62'] = '&gt;';
            } else if (useTable == 'HTML_ENTITIES') {
                // ascii decimals for better compatibility
                entities['38']  = '&amp;';
                entities['60']  = '&lt;';
                entities['62']  = '&gt;';
                entities['160'] = '&nbsp;';
                entities['161'] = '&iexcl;';
                entities['162'] = '&cent;';
                entities['163'] = '&pound;';
                entities['164'] = '&curren;';
                entities['165'] = '&yen;';
                entities['166'] = '&brvbar;';
                entities['167'] = '&sect;';
                entities['168'] = '&uml;';
                entities['169'] = '&copy;';
                entities['170'] = '&ordf;';
                entities['171'] = '&laquo;';
                entities['172'] = '&not;';
                entities['173'] = '&shy;';
                entities['174'] = '&reg;';
                entities['175'] = '&macr;';
                entities['176'] = '&deg;';
                entities['177'] = '&plusmn;';
                entities['178'] = '&sup2;';
                entities['179'] = '&sup3;';
                entities['180'] = '&acute;';
                entities['181'] = '&micro;';
                entities['182'] = '&para;';
                entities['183'] = '&middot;';
                entities['184'] = '&cedil;';
                entities['185'] = '&sup1;';
                entities['186'] = '&ordm;';
                entities['187'] = '&raquo;';
                entities['188'] = '&frac14;';
                entities['189'] = '&frac12;';
                entities['190'] = '&frac34;';
                entities['191'] = '&iquest;';
                entities['192'] = '&Agrave;';
                entities['193'] = '&Aacute;';
                entities['194'] = '&Acirc;';
                entities['195'] = '&Atilde;';
                entities['196'] = '&Auml;';
                entities['197'] = '&Aring;';
                entities['198'] = '&AElig;';
                entities['199'] = '&Ccedil;';
                entities['200'] = '&Egrave;';
                entities['201'] = '&Eacute;';
                entities['202'] = '&Ecirc;';
                entities['203'] = '&Euml;';
                entities['204'] = '&Igrave;';
                entities['205'] = '&Iacute;';
                entities['206'] = '&Icirc;';
                entities['207'] = '&Iuml;';
                entities['208'] = '&ETH;';
                entities['209'] = '&Ntilde;';
                entities['210'] = '&Ograve;';
                entities['211'] = '&Oacute;';
                entities['212'] = '&Ocirc;';
                entities['213'] = '&Otilde;';
                entities['214'] = '&Ouml;';
                entities['215'] = '&times;';
                entities['216'] = '&Oslash;';
                entities['217'] = '&Ugrave;';
                entities['218'] = '&Uacute;';
                entities['219'] = '&Ucirc;';
                entities['220'] = '&Uuml;';
                entities['221'] = '&Yacute;';
                entities['222'] = '&THORN;';
                entities['223'] = '&szlig;';
                entities['224'] = '&agrave;';
                entities['225'] = '&aacute;';
                entities['226'] = '&acirc;';
                entities['227'] = '&atilde;';
                entities['228'] = '&auml;';
                entities['229'] = '&aring;';
                entities['230'] = '&aelig;';
                entities['231'] = '&ccedil;';
                entities['232'] = '&egrave;';
                entities['233'] = '&eacute;';
                entities['234'] = '&ecirc;';
                entities['235'] = '&euml;';
                entities['236'] = '&igrave;';
                entities['237'] = '&iacute;';
                entities['238'] = '&icirc;';
                entities['239'] = '&iuml;';
                entities['240'] = '&eth;';
                entities['241'] = '&ntilde;';
                entities['242'] = '&ograve;';
                entities['243'] = '&oacute;';
                entities['244'] = '&ocirc;';
                entities['245'] = '&otilde;';
                entities['246'] = '&ouml;';
                entities['247'] = '&divide;';
                entities['248'] = '&oslash;';
                entities['249'] = '&ugrave;';
                entities['250'] = '&uacute;';
                entities['251'] = '&ucirc;';
                entities['252'] = '&uuml;';
                entities['253'] = '&yacute;';
                entities['254'] = '&thorn;';
                entities['255'] = '&yuml;';
            } else {
                throw Error("Table: "+useTable+' not supported');
                return false;
            }
            
            // ascii decimals to real symbols
            for (decimal in entities) {
                symbol = String.fromCharCode(decimal)
                histogram[symbol] = entities[decimal];
            }
            
            return histogram;
        },// }}}
        
        // {{{ html_entity_decode
        html_entity_decode: function( string, quote_style ) {
            // Convert all HTML entities to their applicable characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_html_entity_decode/
            // +       version: 901.714
            // +   original by: john (http://www.jd-tech.net)
            // +      input by: ger
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // +   improved by: marc andreu
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: get_html_translation_table
            // *     example 1: $P.html_entity_decode('Kevin &amp; van Zonneveld');
            // *     returns 1: 'Kevin & van Zonneveld'
            // *     example 2: $P.html_entity_decode('&amp;lt;');
            // *     returns 2: '&lt;'
        
            var histogram = {}, symbol = '', tmp_str = '', entity = '';
            tmp_str = string.toString();
            
            if (false === (histogram = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
                return false;
            }
        
            // &amp; must be the last character when decoding!
            delete(histogram['&']);
            histogram['&'] = '&amp;';
        
            for (symbol in histogram) {
                entity = histogram[symbol];
                tmp_str = tmp_str.split(entity).join(symbol);
            }
            
            return tmp_str;
        },// }}}
        
        // {{{ htmlentities
        htmlentities: function (string, quote_style) {
            // Convert all applicable characters to HTML entities
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_htmlentities/
            // +       version: 812.3017
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: nobbler
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: get_html_translation_table
            // *     example 1: $P.htmlentities('Kevin & van Zonneveld');
            // *     returns 1: 'Kevin &amp; van Zonneveld'
        
            var histogram = {}, symbol = '', tmp_str = '', entity = '';
            tmp_str = string.toString();
            
            if (false === (histogram = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
                return false;
            }
            
            for (symbol in histogram) {
                entity = histogram[symbol];
                tmp_str = tmp_str.split(symbol).join(entity);
            }
            
            return tmp_str;
        },// }}}
        
        // {{{ htmlspecialchars
        htmlspecialchars: function (string, quote_style) {
            // Convert special characters to HTML entities
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_htmlspecialchars/
            // +       version: 812.3017
            // +   original by: Mirek Slugen
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Nathan
            // +   bugfixed by: Arno
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: get_html_translation_table
            // *     example 1: $P.htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
            // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
        
            var histogram = {}, symbol = '', tmp_str = '', entity = '';
            tmp_str = string.toString();
            
            if (false === (histogram = this.get_html_translation_table('HTML_SPECIALCHARS', quote_style))) {
                return false;
            }
            
            for (symbol in histogram) {
                entity = histogram[symbol];
                tmp_str = tmp_str.split(symbol).join(entity);
            }
            
            return tmp_str;
        },// }}}
        
        // {{{ htmlspecialchars_decode
        htmlspecialchars_decode: function(string, quote_style) {
            // Convert special HTML entities back to characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_htmlspecialchars_decode/
            // +       version: 901.714
            // +   original by: Mirek Slugen
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Mateusz "loonquawl" Zalega
            // +      input by: ReverseSyntax
            // +      input by: Slawomir Kaniecki
            // +      input by: Scott Cariss
            // +      input by: Francois
            // +   bugfixed by: Onno Marsman
            // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: get_html_translation_table
            // *     example 1: $P.htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES');
            // *     returns 1: '<p>this -> &quot;</p>'
        
            var histogram = {}, symbol = '', tmp_str = '', entity = '';
            tmp_str = string.toString();
            
            if (false === (histogram = this.get_html_translation_table('HTML_SPECIALCHARS', quote_style))) {
                return false;
            }
        
            // &amp; must be the last character when decoding!
            delete(histogram['&']);
            histogram['&'] = '&amp;';
        
            for (symbol in histogram) {
                entity = histogram[symbol];
                tmp_str = tmp_str.split(entity).join(symbol);
            }
            
            return tmp_str;
        },// }}}
        
        // {{{ implode
        implode: function( glue, pieces ) {
            // Join array elements with a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_implode/
            // +       version: 811.1314
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Waldo Malqui Silva
            // *     example 1: $P.implode(' ', ['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: 'Kevin van Zonneveld'
        
            return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
        },// }}}
        
        // {{{ join
        join: function( glue, pieces ) {
            // Alias of implode()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_join/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: implode
            // *     example 1: $P.join(' ', ['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: 'Kevin van Zonneveld'
        
            return this.implode( glue, pieces );
        },// }}}
        
        // {{{ lcfirst
        lcfirst: function( str ) {
            // Make a string&#039;s first character lowercase
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_lcfirst/
            // +       version: 901.1301
            // +   original by: Brett Zamir
            // *     example 1: $P.lcfirst('Kevin Van Zonneveld');
            // *     returns 1: 'kevin Van Zonneveld'
        
            str += '';
            var f = str.charAt(0).toLowerCase();
            return f + str.substr(1);
        },// }}}
        
        // {{{ levenshtein
        levenshtein: function( str1, str2 ) {
            // Calculate Levenshtein distance between two strings
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_levenshtein/
            // +       version: 810.621
            // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
            // *     returns 1: 3
        
            var s, l = (s = (str1+'').split("")).length, t = (str2 = (str2+'').split("")).length, i, j, m, n;
            if(!(l || t)) return Math.max(l, t);
            for(var a = [], i = l + 1; i; a[--i] = [i]);
            for(i = t + 1; a[0][--i] = i;);
            for(i = -1, m = s.length; ++i < m;){
                for(j = -1, n = str2.length; ++j < n;){
                    a[(i *= 1) + 1][(j *= 1) + 1] = Math.min(a[i][j + 1] + 1, a[i + 1][j] + 1, a[i][j] + (s[i] != str2[j]));
                }
            }
            return a[l][t];
        },// }}}
        
        // {{{ ltrim
        ltrim: function ( str, charlist ) {
            // Strip whitespace (or other characters) from the beginning of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ltrim/
            // +       version: 810.621
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: Erkekjetter
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.ltrim('    Kevin van Zonneveld    ');
            // *     returns 1: 'Kevin van Zonneveld    '
        
            charlist = !charlist ? ' \s\xA0' : (charlist+'').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
            var re = new RegExp('^[' + charlist + ']+', 'g');
            return (str+'').replace(re, '');
        },// }}}
        
        // {{{ md5
        md5: function ( str ) {
            // Calculate the md5 hash of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_md5/
            // +       version: 810.112
            // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // + namespaced by: Michael White (http://getsprink.com)
            // +    tweaked by: Jack
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: utf8_encode
            // *     example 1: $P.md5('Kevin van Zonneveld');
            // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
        
            var RotateLeft = function(lValue, iShiftBits) {
                return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
            };
        
            var AddUnsigned = function(lX,lY) {
                var lX4,lY4,lX8,lY8,lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            };
        
            var F = function(x,y,z) { return (x & y) | ((~x) & z); };
            var G = function(x,y,z) { return (x & z) | (y & (~z)); };
            var H = function(x,y,z) { return (x ^ y ^ z); };
            var I = function(x,y,z) { return (y ^ (x | (~z))); };
        
            var FF = function(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };
        
            var GG = function(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };
        
            var HH = function(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };
        
            var II = function(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };
        
            var ConvertToWordArray = function(str) {
                var lWordCount;
                var lMessageLength = str.length;
                var lNumberOfWords_temp1=lMessageLength + 8;
                var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                var lWordArray=Array(lNumberOfWords-1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                return lWordArray;
            };
        
            var WordToHex = function(lValue) {
                var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                for (lCount = 0;lCount<=3;lCount++) {
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                }
                return WordToHexValue;
            };
        
            var x=Array();
            var k,AA,BB,CC,DD,a,b,c,d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;
        
            str = this.utf8_encode(str);
            x = ConvertToWordArray(str);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            
            xl = x.length;
            for (k=0;k<xl;k+=16) {
                AA=a; BB=b; CC=c; DD=d;
                a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
                b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
                b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
                a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
                d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
                d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
                c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
                b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
                a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
                c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                d=GG(d,a,b,c,x[k+10],S22,0x2441453);
                c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
                c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
                a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                a=II(a,b,c,d,x[k+0], S41,0xF4292244);
                d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
                c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
                a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
                d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
                a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                c=II(c,d,a,b,x[k+6], S43,0xA3014314);
                b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
                d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
                a=AddUnsigned(a,AA);
                b=AddUnsigned(b,BB);
                c=AddUnsigned(c,CC);
                d=AddUnsigned(d,DD);
            }
        
            var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
        
            return temp.toLowerCase();
        },// }}}
        
        // {{{ md5_file
        md5_file: function ( str_filename ) {
            // Calculates the md5 hash of a given file
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_md5_file/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: file_get_contents
            // -    depends on: md5
            // *     example 1: $P.md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '202cb962ac59075b964b07152d234b70'
        
            buf = this.file_get_contents(str_filename);
            
            if (!buf) {
                return false;
            }
            
            return this.md5(buf);
        },// }}}
        
        // {{{ nl2br
        nl2br: function (str, is_xhtml) {
            // Inserts HTML line breaks before all newlines in a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_nl2br/
            // +       version: 810.1417
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Philip Peterson
            // +   improved by: Onno Marsman
            // +   improved by: Atli Þór
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.nl2br('Kevin\nvan\nZonneveld');
            // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
            // *     example 2: $P.nl2br("\nOne\nTwo\n\nThree\n", false);
            // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
            // *     example 3: $P.nl2br("\nOne\nTwo\n\nThree\n", true);
            // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
        
            breakTag = '<br />';
            if (typeof is_xhtml != 'undefined' && !is_xhtml) {
                breakTag = '<br>';
            }
        
            return (str + '').replace(/([^>]?)\n/g, '$1'+ breakTag +'\n');
        },// }}}
        
        // {{{ number_format
        number_format: function( number, decimals, dec_point, thousands_sep ) {
            // Format a number with grouped thousands
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
            // +       version: 902.223
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +     bugfix by: Michael White (http://getsprink.com)
            // +     bugfix by: Benjamin Lupton
            // +     bugfix by: Allan Jensen (http://www.winternet.no)
            // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +     bugfix by: Howard Yeend
            // +    revised by: Luke Smith (http://lucassmith.name)
            // +     bugfix by: Diogo Resende
            // *     example 1: $P.number_format(1234.56);
            // *     returns 1: '1,235'
            // *     example 2: $P.number_format(1234.56, 2, ',', ' ');
            // *     returns 2: '1 234,56'
            // *     example 3: $P.number_format(1234.5678, 2, '.', '');
            // *     returns 3: '1234.57'
            // *     example 4: $P.number_format(67, 2, ',', '.');
            // *     returns 4: '67,00'
        
            var n = number, prec = decimals, dec = dec_point, sep = thousands_sep;
            n = !isFinite(+n) ? 0 : +n;
            prec = !isFinite(+prec) ? 0 : Math.abs(prec);
            sep = sep == undefined ? ',' : sep;
        
            var s = n.toFixed(prec),
                abs = Math.abs(n).toFixed(prec),
                _, i;
        
            if (abs > 1000) {
                _ = abs.split(/\D/);
                i = _[0].length % 3 || 3;
        
                _[0] = s.slice(0,i + (n < 0)) +
                      _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
        
                s = _.join(dec || '.');
            } else {
                s = abs.replace('.', dec_point);
            }
        
            return s;
        },// }}}
        
        // {{{ ord
        ord: function( string ) {
            // Return ASCII value of character
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ord/
            // +       version: 810.621
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.ord('K');
            // *     returns 1: 75
        
            return (string+'').charCodeAt(0);
        },// }}}
        
        // {{{ parse_str
        parse_str: function(str, array){
            // Parses the string into variables
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_parse_str/
            // +       version: 810.621
            // +   original by: Cagri Ekin
            // +   improved by: Michael White (http://getsprink.com)
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.parse_str('first=foo&second=bar');
            // *     returns 1: { first: 'foo', second: 'bar' }
            // *     example 2: $P.parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.');
            // *     returns 2: { str_a: "Jack and Jill didn't see the well." }
        
            var glue1 = '=';
            var glue2 = '&';
        
            var array2 = (str+'').split(glue2);
            var array3 = [];
            var array2l = 0, tmp = '', x = 0;
        
            array2l = array2.length;
            for (x = 0; x<array2l; x++) {
                tmp = array2[x].split(glue1);
                array3[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' ');
            }
        
            if (array) {
                array = array3;
            } else {
                return array3;
            }
        },// }}}
        
        // {{{ printf
        printf: function( ) {
            // Output a formatted string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_printf/
            // +       version: 902.122
            // +   original by: Ash Searle (http://hexmen.com/blog/)
            // +   improved by: Michael White (http://getsprink.com)
            // +   improved by: Brett Zamir
            // -    depends on: sprintf
            // *     example 1: $P.printf("%01.2f", 123.1);
            // *     returns 1: 6
        
            var body, elmt;
            var ret = '';
            
            var HTMLNS = 'http://www.w3.org/1999/xhtml';
            body = document.getElementsByTagNameNS ?
              (document.getElementsByTagNameNS(HTMLNS, 'body')[0] ?
                document.getElementsByTagNameNS(HTMLNS, 'body')[0] :
                document.documentElement.lastChild) :
              document.getElementsByTagName('body')[0];
        
            if (!body) {
                return false;
            }
            
            ret = this.sprintf.apply(this, arguments);
        
            elmt = document.createTextNode(ret);
            body.appendChild(elmt);
            
            return ret.length;
        },// }}}
        
        // {{{ quotemeta
        quotemeta: function(str) {
            // Quote meta characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_quotemeta/
            // +       version: 812.311
            // +   original by: Paulo Ricardo F. Santos
            // *     example 1: $P.quotemeta(". + * ? ^ ( $ )");
            // *     returns 1: '\. \+ \* \? \^ \( \$ \)'
        
            return (str+'').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
        },// }}}
        
        // {{{ rtrim
        rtrim: function ( str, charlist ) {
            // Strip whitespace (or other characters) from the end of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rtrim/
            // +       version: 810.621
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: Erkekjetter
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.rtrim('    Kevin van Zonneveld    ');
            // *     returns 1: '    Kevin van Zonneveld'
        
            charlist = !charlist ? ' \s\xA0' : (charlist+'').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
            var re = new RegExp('[' + charlist + ']+$', 'g');
            return (str+'').replace(re, '');
        },// }}}
        
        // {{{ sha1
        sha1: function ( str ) {
            // Calculate the sha1 hash of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sha1/
            // +       version: 810.112
            // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // + namespaced by: Michael White (http://getsprink.com)
            // -    depends on: utf8_encode
            // *     example 1: $P.sha1('Kevin van Zonneveld');
            // *     returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
        
            var rotate_left = function(n,s) {
                var t4 = ( n<<s ) | (n>>>(32-s));
                return t4;
            };
        
            var lsb_hex = function(val) {
                var str="";
                var i;
                var vh;
                var vl;
        
                for( i=0; i<=6; i+=2 ) {
                    vh = (val>>>(i*4+4))&0x0f;
                    vl = (val>>>(i*4))&0x0f;
                    str += vh.toString(16) + vl.toString(16);
                }
                return str;
            };
        
            var cvt_hex = function(val) {
                var str="";
                var i;
                var v;
        
                for( i=7; i>=0; i-- ) {
                    v = (val>>>(i*4))&0x0f;
                    str += v.toString(16);
                }
                return str;
            };
        
            var blockstart;
            var i, j;
            var W = new Array(80);
            var H0 = 0x67452301;
            var H1 = 0xEFCDAB89;
            var H2 = 0x98BADCFE;
            var H3 = 0x10325476;
            var H4 = 0xC3D2E1F0;
            var A, B, C, D, E;
            var temp;
        
            str = this.utf8_encode(str);
            var str_len = str.length;
        
            var word_array = new Array();
            for( i=0; i<str_len-3; i+=4 ) {
                j = str.charCodeAt(i)<<24 | str.charCodeAt(i+1)<<16 |
                str.charCodeAt(i+2)<<8 | str.charCodeAt(i+3);
                word_array.push( j );
            }
        
            switch( str_len % 4 ) {
                case 0:
                    i = 0x080000000;
                break;
                case 1:
                    i = str.charCodeAt(str_len-1)<<24 | 0x0800000;
                break;
                case 2:
                    i = str.charCodeAt(str_len-2)<<24 | str.charCodeAt(str_len-1)<<16 | 0x08000;
                break;
                case 3:
                    i = str.charCodeAt(str_len-3)<<24 | str.charCodeAt(str_len-2)<<16 | str.charCodeAt(str_len-1)<<8    | 0x80;
                break;
            }
        
            word_array.push( i );
        
            while( (word_array.length % 16) != 14 ) word_array.push( 0 );
        
            word_array.push( str_len>>>29 );
            word_array.push( (str_len<<3)&0x0ffffffff );
        
            for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
                for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
                for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
        
                A = H0;
                B = H1;
                C = H2;
                D = H3;
                E = H4;
        
                for( i= 0; i<=19; i++ ) {
                    temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotate_left(B,30);
                    B = A;
                    A = temp;
                }
        
                for( i=20; i<=39; i++ ) {
                    temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotate_left(B,30);
                    B = A;
                    A = temp;
                }
        
                for( i=40; i<=59; i++ ) {
                    temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotate_left(B,30);
                    B = A;
                    A = temp;
                }
        
                for( i=60; i<=79; i++ ) {
                    temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotate_left(B,30);
                    B = A;
                    A = temp;
                }
        
                H0 = (H0 + A) & 0x0ffffffff;
                H1 = (H1 + B) & 0x0ffffffff;
                H2 = (H2 + C) & 0x0ffffffff;
                H3 = (H3 + D) & 0x0ffffffff;
                H4 = (H4 + E) & 0x0ffffffff;
            }
        
            var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
            return temp.toLowerCase();
        },// }}}
        
        // {{{ sha1_file
        sha1_file: function ( str_filename ) {
            // Calculate the sha1 hash of a file
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sha1_file/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: file_get_contents
            // -    depends on: sha1
            // *     example 1: $P.sha1_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '40bd001563085fc35165329ea1ff5c5ecbdbbeef'
        
            var buf = this.file_get_contents(str_filename);
            return this.sha1(buf);
        },// }}}
        
        // {{{ soundex
        soundex: function(str) {
            // Calculate the soundex key of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_soundex/
            // +       version: 810.621
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +    tweaked by: Jack
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.soundex('Kevin');
            // *     returns 1: 'K150'
            // *     example 2: $P.soundex('Ellery');
            // *     returns 2: 'E460'
            // *     example 3: $P.soundex('Euler');
            // *     returns 3: 'E460'
        
            var i, j, l, r, p = isNaN(p) ? 4 : p > 10 ? 10 : p < 4 ? 4 : p;
            var m = {BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6};
            var r = (s = (str+'').toUpperCase().replace(/[^A-Z]/g, "").split("")).splice(0, 1);
            var sl = 0;
        
            sl = s.length;
            for (i = -1, l = sl; ++i < l;) {
                for (j in m) {
                    if (j.indexOf(s[i]) + 1 && r[r.length-1] != m[j] && r.push(m[j])) {
                        break;
                    }
                }
            }
        
            return r.length > p && (r.length = p), r.join("") + (new Array(p - r.length + 1)).join("0");
        },// }}}
        
        // {{{ split
        split: function( delimiter, string ) {
            // Split string into array by regular expression
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_split/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: explode
            // *     example 1: $P.split(' ', 'Kevin van Zonneveld');
            // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
        
            return this.explode( delimiter, string );
        },// }}}
        
        // {{{ sprintf
        sprintf: function( ) {
            // Return a formatted string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sprintf/
            // +       version: 812.114
            // +   original by: Ash Searle (http://hexmen.com/blog/)
            // + namespaced by: Michael White (http://getsprink.com)
            // +    tweaked by: Jack
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: Paulo Ricardo F. Santos
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.sprintf("%01.2f", 123.1);
            // *     returns 1: 123.10
            // *     example 2: $P.sprintf("[%10s]", 'monkey');
            // *     returns 2: '[    monkey]'
            // *     example 3: $P.sprintf("[%'#10s]", 'monkey');
            // *     returns 3: '[####monkey]'
        
            var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
            var a = arguments, i = 0, format = a[i++];
        
            // pad()
            var pad = function(str, len, chr, leftJustify) {
                if (!chr) chr = ' ';
                var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
                return leftJustify ? str + padding : padding + str;
            };
        
            // justify()
            var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
                var diff = minWidth - value.length;
                if (diff > 0) {
                    if (leftJustify || !zeroPad) {
                        value = pad(value, minWidth, customPadChar, leftJustify);
                    } else {
                        value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
                    }
                }
                return value;
            };
        
            // formatBaseX()
            var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
                // Note: casts negative numbers to positive ones
                var number = value >>> 0;
                prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
                value = prefix + pad(number.toString(base), precision || 0, '0', false);
                return justify(value, prefix, leftJustify, minWidth, zeroPad);
            };
        
            // formatString()
            var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
                if (precision != null) {
                    value = value.slice(0, precision);
                }
                return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
            };
        
            // finalFormat()
            var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type) {
                if (substring == '%%') return '%';
        
                // parse flags
                var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false, customPadChar = ' ';
                var flagsl = flags.length;
                for (var j = 0; flags && j < flagsl; j++) switch (flags.charAt(j)) {
                    case ' ': positivePrefix = ' '; break;
                    case '+': positivePrefix = '+'; break;
                    case '-': leftJustify = true; break;
                    case "'": customPadChar = flags.charAt(j+1); break;
                    case '0': zeroPad = true; break;
                    case '#': prefixBaseX = true; break;
                }
        
                // parameters may be null, undefined, empty-string or real valued
                // we want to ignore null, undefined and empty-string values
                if (!minWidth) {
                    minWidth = 0;
                } else if (minWidth == '*') {
                    minWidth = +a[i++];
                } else if (minWidth.charAt(0) == '*') {
                    minWidth = +a[minWidth.slice(1, -1)];
                } else {
                    minWidth = +minWidth;
                }
        
                // Note: undocumented perl feature:
                if (minWidth < 0) {
                    minWidth = -minWidth;
                    leftJustify = true;
                }
        
                if (!isFinite(minWidth)) {
                    throw new Error('this.sprintf: (minimum-)width must be finite');
                }
        
                if (!precision) {
                    precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : void(0);
                } else if (precision == '*') {
                    precision = +a[i++];
                } else if (precision.charAt(0) == '*') {
                    precision = +a[precision.slice(1, -1)];
                } else {
                    precision = +precision;
                }
        
                // grab value using valueIndex if required?
                var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
        
                switch (type) {
                    case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
                    case 'c': return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                    case 'b': return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'o': return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'x': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'X': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
                    case 'u': return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                    case 'i':
                    case 'd': {
                        var number = parseInt(+value);
                        var prefix = number < 0 ? '-' : positivePrefix;
                        value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                        return justify(value, prefix, leftJustify, minWidth, zeroPad);
                    }
                    case 'e':
                    case 'E':
                    case 'f':
                    case 'F':
                    case 'g':
                    case 'G': {
                        var number = +value;
                        var prefix = number < 0 ? '-' : positivePrefix;
                        var method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                        var textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                        value = prefix + Math.abs(number)[method](precision);
                        return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                    }
                    default: return substring;
                }
            };
        
            return format.replace(regex, doFormat);
        },// }}}
        
        // {{{ str_ireplace
        str_ireplace: function ( search, replace, subject ) {
            // Case-insensitive version of str_replace().
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_ireplace/
            // +       version: 810.621
            // +   original by: Martijn Wieringa
            // +      input by: penutbutterjelly
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    tweaked by: Jack
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.str_ireplace('l', 'l', 'HeLLo');
            // *     returns 1: 'Hello'
        
            var i, k = '';
            var searchl = 0;
        
            search += '';
            searchl = search.length;
            if (!(replace instanceof Array)) {
                replace = new Array(replace);
                if (search instanceof Array) {
                    // If search is an array and replace is a string,
                    // then this replacement string is used for every value of search
                    while (searchl > replace.length) {
                        replace[replace.length] = replace[0];
                    }
                }
            }
        
            if (!(search instanceof Array)) {
                search = new Array(search);
            }
            while (search.length>replace.length) {
                // If replace has fewer values than search,
                // then an empty string is used for the rest of replacement values
                replace[replace.length] = '';
            }
        
            if (subject instanceof Array) {
                // If subject is an array, then the search and replace is performed
                // with every entry of subject , and the return value is an array as well.
                for (k in subject) {
                    subject[k] = this.str_ireplace(search, replace, subject[k]);
                }
                return subject;
            }
        
            searchl = search.length;
            for (i = 0; i < searchl; i++) {
                reg = new RegExp(search[i], 'gi');
                subject = subject.replace(reg, replace[i]);
            }
        
            return subject;
        },// }}}
        
        // {{{ str_pad
        str_pad: function( input, pad_length, pad_string, pad_type ) {
            // Pad a string to a certain length with another string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_pad/
            // +       version: 810.819
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // + namespaced by: Michael White (http://getsprink.com)
            // *     example 1: $P.str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
            // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
            // *     example 2: $P.str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
            // *     returns 2: '------Kevin van Zonneveld-----'
        
            var half = '', pad_to_go;
        
            var str_pad_repeater = function(s, len) {
                var collect = '', i;
        
                while(collect.length < len) collect += s;
                collect = collect.substr(0,len);
        
                return collect;
            };
        
            input += '';
        
            if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') { pad_type = 'STR_PAD_RIGHT'; }
            if ((pad_to_go = pad_length - input.length) > 0) {
                if (pad_type == 'STR_PAD_LEFT') { input = str_pad_repeater(pad_string, pad_to_go) + input; }
                else if (pad_type == 'STR_PAD_RIGHT') { input = input + str_pad_repeater(pad_string, pad_to_go); }
                else if (pad_type == 'STR_PAD_BOTH') {
                    half = str_pad_repeater(pad_string, Math.ceil(pad_to_go/2));
                    input = half + input + half;
                    input = input.substr(0, pad_length);
                }
            }
        
            return input;
        },// }}}
        
        // {{{ str_repeat
        str_repeat: function ( input, multiplier ) {
            // Repeat a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_repeat/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // *     example 1: $P.str_repeat('-=', 10);
            // *     returns 1: '-=-=-=-=-=-=-=-=-=-='
            
            
            return new Array(multiplier+1).join(input); 
        },// }}}
        
        // {{{ str_replace
        str_replace: function(search, replace, subject) {
            // Replace all occurrences of the search string with the replacement string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_replace/
            // +       version: 812.1017
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Gabriel Paderni
            // +   improved by: Philip Peterson
            // +   improved by: Simon Willison (http://simonwillison.net)
            // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   bugfixed by: Anton Ongson
            // +      input by: Onno Marsman
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    tweaked by: Onno Marsman
            // *     example 1: $P.str_replace(' ', '.', 'Kevin van Zonneveld');
            // *     returns 1: 'Kevin.van.Zonneveld'
            // *     example 2: $P.str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
            // *     returns 2: 'hemmo, mars'
        
            var f = search, r = replace, s = subject;
            var ra = r instanceof Array, sa = s instanceof Array, f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;
        
            while (j = 0, i--) {
                if (s[i]) {
                    while (s[i] = (s[i]+'').split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
                }
            };
        
            return sa ? s : s[0];
        },// }}}
        
        // {{{ str_rot13
        str_rot13: function( str ) {
            // Perform the rot13 transform on a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_rot13/
            // +       version: 810.621
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Ates Goral (http://magnetiq.com)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.str_rot13('Kevin van Zonneveld');
            // *     returns 1: 'Xriva ina Mbaariryq'
            // *     example 2: $P.str_rot13('Xriva ina Mbaariryq');
            // *     returns 2: 'Kevin van Zonneveld'
        
            return (str+'').replace(/[A-Za-z]/g, function (c) {
                return String.fromCharCode((((c = c.charCodeAt(0)) & 223) - 52) % 26 + (c & 32) + 65);
            });
        },// }}}
        
        // {{{ str_shuffle
        str_shuffle: function (str) {
            // Randomly shuffles a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_shuffle/
            // +       version: 901.810
            // +   original by: Brett Zamir
            // *     example 1: $P.shuffled = str_shuffle("abcdef");
            // *     results 1: shuffled.length == 6
            
            if (str == undefined) {
                throw 'Wrong parameter count for this.str_shuffle()';
            }
            
            var getRandomInt = function (max) {
                return Math.floor(Math.random() * (max + 1));
            };
            var newStr = '', rand = 0;
            
            while (str.length) {
                rand = getRandomInt(str.length-1);
                newStr += str[rand];
                str = str.substring(0, rand)+str.substr(rand+1);
            }
            
            return newStr;
        },// }}}
        
        // {{{ str_split
        str_split: function ( f_string, f_split_length){
            // Convert a string to an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_split/
            // +       version: 810.621
            // +     original by: Martijn Wieringa
            // +     improved by: Brett Zamir
            // +     bugfixed by: Onno Marsman
            // *         example 1: $P.str_split('Hello Friend', 3);
            // *         returns 1: ['Hel', 'lo ', 'Fri', 'end']
        
            f_string += '';
        
            if (f_split_length == undefined) {
                f_split_length = 1;
            }
            if(f_split_length > 0){
                var result = [];
                while(f_string.length > f_split_length) {
                    result[result.length] = f_string.substring(0, f_split_length);
                    f_string = f_string.substring(f_split_length);
                }
                result[result.length] = f_string;
                return result;
            }
            return false;
        },// }}}
        
        // {{{ strcasecmp
        strcasecmp: function (f_string1, f_string2){
            // Binary safe case-insensitive string comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strcasecmp/
            // +       version: 810.621
            // +     original by: Martijn Wieringa
            // +     bugfixed by: Onno Marsman
            // *         example 1: $P.strcasecmp('Hello', 'hello');
            // *         returns 1: 0
        
            var string1 = (f_string1+'').toLowerCase();
            var string2 = (f_string2+'').toLowerCase();
        
            if(string1 > string2) {
              return 1;
            }
            else if(string1 == string2) {
              return 0;
            }
        
            return -1;
        },// }}}
        
        // {{{ strchr
        strchr: function ( haystack, needle, bool ) {
            // Alias of strstr()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strchr/
            // +       version: 809.522
            // +   original by: Philip Peterson
            // -    depends on: strstr
            // *     example 1: $P.strchr('Kevin van Zonneveld', 'van');
            // *     returns 1: 'van Zonneveld'
            // *     example 2: $P.strchr('Kevin van Zonneveld', 'van', true);
            // *     returns 2: 'Kevin '
         
            return this.strstr( haystack, needle, bool );
        },// }}}
        
        // {{{ strcmp
        strcmp: function ( str1, str2 ) {
            // Binary safe string comparison
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strcmp/
            // +       version: 811.1314
            // +   original by: Waldo Malqui Silva
            // +      input by: Steve Hilder
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: gorthaur
            // *     example 1: $P.strcmp( 'waldo', 'owald' );
            // *     returns 1: 1
            // *     example 2: $P.strcmp( 'owald', 'waldo' );
            // *     returns 2: -1
        
            return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
        },// }}}
        
        // {{{ strcspn
        strcspn: function (str, mask, start, length) {
            // Find length of initial segment not matching mask
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strcspn/
            // +       version: 901.1301
            // +   original by: Brett Zamir
            // *     example 1: $P.strcspn('abcdefg123', '1234567890');
            // *     returns 1: 7
            // *     example 2: $P.strcspn('123abc', '1234567890');
            // *     returns 2: 3
        
            start = start ? start : 0;
            var count = (length && ((start + length) < str.length)) ? start + length : str.length;
            strct:
            for (var i=start, lgth=0; i < count; i++) {
                for (var j=0; j < mask.length; j++) {
                    if (str[i].indexOf(mask[j]) !== -1) {
                        continue strct;
                    }
                }
                ++lgth;
            }
            
            return lgth;
        },// }}}
        
        // {{{ strip_tags
        strip_tags: function(str, allowed_tags) {
            // Strip HTML and PHP tags from a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strip_tags/
            // +       version: 811.1812
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Luke Godfrey
            // +      input by: Pul
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // +      input by: Alex
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: Marc Palau
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
            // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
            // *     example 2: $P.strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
            // *     returns 2: '<p>Kevin van Zonneveld</p>'
            // *     example 3: $P.strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
            // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
        
            var key = '', tag = '', allowed = false;
            var matches = allowed_array = [];
        
            var replacer = function(search, replace, str) {
                return str.split(search).join(replace);
            };
        
            // Build allowes tags associative array
            if (allowed_tags) {
                allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi);
            }
            
            str += '';
        
            // Match tags
            matches = str.match(/(<\/?[^>]+>)/gi);
        
            // Go through all HTML tags
            for (key in matches) {
                if (isNaN(key)) {
                    // IE7 Hack
                    continue;
                }
        
                // Save HTML tag
                html = matches[key].toString();
        
                // Is tag not in allowed list? Remove from str!
                allowed = false;
        
                // Go through all allowed tags
                for (k in allowed_array) {
                    // Init
                    allowed_tag = allowed_array[k];
                    i = -1;
        
                    if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
                    if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
                    if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}
        
                    // Determine
                    if (i == 0) {
                        allowed = true;
                        break;
                    }
                }
        
                if (!allowed) {
                    str = replacer(html, "", str); // Custom replace. No regexing
                }
            }
        
            return str;
        },// }}}
        
        // {{{ stripos
        stripos: function ( f_haystack, f_needle, f_offset ){
            // Find position of first occurrence of a case-insensitive string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stripos/
            // +       version: 810.617
            // +     original by: Martijn Wieringa
            // +      revised by: Onno Marsman
            // *         example 1: $P.stripos('ABC', 'a');
            // *         returns 1: 0
        
            var haystack = (f_haystack+'').toLowerCase();
            var needle = (f_needle+'').toLowerCase();
            var index = 0;
         
            if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
                return index;
            }
            return false;
        },// }}}
        
        // {{{ stripslashes
        stripslashes: function( str ) {
            // Un-quote string quoted with addslashes()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stripslashes/
            // +       version: 812.1714
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Ates Goral (http://magnetiq.com)
            // +      fixed by: Mick@el
            // +   improved by: marrtins
            // +   bugfixed by: Onno Marsman
            // +   improved by: rezna
            // *     example 1: $P.stripslashes('Kevin\'s code');
            // *     returns 1: "Kevin's code"
            // *     example 2: $P.stripslashes('Kevin\\\'s code');
            // *     returns 2: "Kevin\'s code"
        
            return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
        },// }}}
        
        // {{{ stristr
        stristr: function( haystack, needle, bool ) {
            // Case-insensitive strstr()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stristr/
            // +       version: 810.819
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfxied by: Onno Marsman
            // *     example 1: $P.stristr('Kevin van Zonneveld', 'Van');
            // *     returns 1: 'van Zonneveld'
            // *     example 2: $P.stristr('Kevin van Zonneveld', 'VAN', true);
            // *     returns 2: 'Kevin '
        
            var pos = 0;
        
            haystack += '';
            pos = haystack.toLowerCase().indexOf( (needle+'').toLowerCase() );
            if( pos == -1 ){
                return false;
            } else{
                if( bool ){
                    return haystack.substr( 0, pos );
                } else{
                    return haystack.slice( pos );
                }
            }
        },// }}}
        
        // {{{ strlen
        strlen: function (string) {
            // Get string length
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strlen/
            // +       version: 901.1520
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Sakimori
            // +      input by: Kirk Strobeck
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // +    revised by: Brett Zamir
            // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
            // %        note 1: characters and to this in: function PHP which does not count the number of bytes
            // %        note 1: but counts the number of characters, something like this is really necessary.
            // *     example 1: $P.strlen('Kevin van Zonneveld');
            // *     returns 1: 19
            // *     example 2: $P.strlen('A\ud87e\udc04Z');
            // *     returns 2: 3
        
            var str = string+'';
            var i = 0, chr = '', lgth = 0;
        
            var getWholeChar = function (str, i) {
                var code = str.charCodeAt(i);
                var next = '', prev = '';
                if (0xD800 <= code && code <= 0xDBFF) { // High surrogate(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                    if (str.length <= (i+1))  {
                        throw 'High surrogate without following low surrogate';
                    }
                    next = str.charCodeAt(i+1);
                    if (0xDC00 > next || next > 0xDFFF) {
                        throw 'High surrogate without following low surrogate';
                    }
                    return str[i]+str[i+1];
                } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
                    if (i === 0) {
                        throw 'Low surrogate without preceding high surrogate';
                    }
                    prev = str.charCodeAt(i-1);
                    if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                        throw 'Low surrogate without preceding high surrogate';
                    }
                    return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
                }
                return str[i];
            };
        
            for (i=0, lgth=0; i < str.length; i++) {
                if ((chr = getWholeChar(str, i)) === false) {
                    continue;
                } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
                lgth++;
            }
            return lgth;
        },// }}}
        
        // {{{ strnatcasecmp
        strnatcasecmp: function(str1, str2) {
            // Case insensitive string comparisons using a &quot;natural order&quot; algorithm
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strnatcasecmp/
            // +       version: 901.2514
            // +      original by: Martin Pool
            // + reimplemented by: Pierre-Luc Paour
            // + reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
            // + reimplemented by: Brett Zamir
            // +      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.strnatcasecmp(10, 1);
            // *     returns 1: 1
            // *     example 1: $P.strnatcasecmp('1', '10');
            // *     returns 1: -1
        
            a = (str1+'').toLowerCase();
            b = (str2+'').toLowerCase();
        
            var isWhitespaceChar = function(a) {
                return a.charCodeAt(0) <= 32;
            }
        
            var isDigitChar = function (a) {
                var charCode = a.charCodeAt(0);
                return ( charCode >= 48  && charCode <= 57 );
            }
        
            var compareRight = function(a,b) {
                var bias = 0;
                var ia = 0;
                var ib = 0;
        
                var ca;
                var cb;
        
                // The longest run of digits wins.  That aside, the greatest
                // value wins, but we can't know that it will until we've scanned
                // both numbers to know that they have the same magnitude, so we
                // remember it in BIAS.
                for (;; ia++, ib++) {
                    ca = a.charAt(ia);
                    cb = b.charAt(ib);
        
                    if (!isDigitChar(ca)
                        && !isDigitChar(cb)) {
                        return bias;
                    } else if (!isDigitChar(ca)) {
                        return -1;
                    } else if (!isDigitChar(cb)) {
                        return +1;
                    } else if (ca < cb) {
                        if (bias == 0) {
                            bias = -1;
                        }
                    } else if (ca > cb) {
                        if (bias == 0)
                            bias = +1;
                    } else if (ca == 0 && cb == 0) {
                        return bias;
                    }
                }
            }
        
            var ia = 0, ib = 0;
            var nza = 0, nzb = 0;
            var ca, cb;
            var result;
        
            while (true) {
                // only count the number of zeroes leading the last number compared
                nza = nzb = 0;
        
                ca = a.charAt(ia);
                cb = b.charAt(ib);
        
                // skip over leading spaces or zeros
                while ( isWhitespaceChar( ca ) || ca =='0' ) {
                    if (ca == '0') {
                        nza++;
                    } else {
                        // only count consecutive zeroes
                        nza = 0;
                    }
        
                    ca = a.charAt(++ia);
                }
        
                while ( isWhitespaceChar( cb ) || cb == '0') {
                    if (cb == '0') {
                        nzb++;
                    } else {
                        // only count consecutive zeroes
                        nzb = 0;
                    }
        
                    cb = b.charAt(++ib);
                }
        
                // process run of digits
                if (isDigitChar(ca) && isDigitChar(cb)) {
                    if ((result = compareRight(a.substring(ia), b.substring(ib))) != 0) {
                        return result;
                    }
                }
        
                if (ca == 0 && cb == 0) {
                    // The strings compare the same.  Perhaps the caller
                    // will want to call strcmp to break the tie.
                    return nza - nzb;
                }
        
                if (ca < cb) {
                    return -1;
                } else if (ca > cb) {
                    return +1;
                }
        
                ++ia; ++ib;
            }
        },// }}}
        
        // {{{ strnatcmp
        strnatcmp: function ( f_string1, f_string2, f_version ) {
            // String comparisons using a &quot;natural order&quot; algorithm
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strnatcmp/
            // +       version: 810.819
            // +   original by: Martijn Wieringa
            // + namespaced by: Michael White (http://getsprink.com)
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // -    depends on: strcmp
            // %          note: Added f_version argument against code guidelines, because it's so neat
            // *     example 1: $P.strnatcmp('Price 12.9', 'Price 12.15');
            // *     returns 1: 1
            // *     example 2: $P.strnatcmp('Price 12.09', 'Price 12.15');
            // *     returns 2: -1
            // *     example 3: $P.strnatcmp('Price 12.90', 'Price 12.15');
            // *     returns 3: 1
            // *     example 4: $P.strnatcmp('Version 12.9', 'Version 12.15', true);
            // *     returns 4: -6
            // *     example 5: $P.strnatcmp('Version 12.15', 'Version 12.9', true);
            // *     returns 5: 6
        
            if (f_version == undefined) {
                f_version = false;
            }
        
            var __strnatcmp_split = function( f_string ) {
                var result = new Array();
                var buffer = '';
                var chr = '';
                var i = 0, f_stringl = 0;
        
                var text = true;
        
                f_stringl = f_string.length;
                for (i = 0; i < f_stringl; i++) {
                    chr = f_string.substring(i, i + 1);
                    if (chr.match(/[0-9]/)) {
                        if (text) {
                            if(buffer.length > 0){
                                result[result.length] = buffer;
                                buffer = '';
                            }
        
                            text = false;
                        }
                        buffer += chr;
                    } else if ((text == false) && (chr == '.') && (i < (f_string.length - 1)) && (f_string.substring(i + 1, i + 2).match(/[0-9]/))) {
                        result[result.length] = buffer;
                        buffer = '';
                    } else {
                        if (text == false) {
                            if (buffer.length > 0) {
                                result[result.length] = parseInt(buffer);
                                buffer = '';
                            }
                            text = true;
                        }
                        buffer += chr;
                    }
                }
        
                if (buffer.length > 0) {
                    if (text) {
                        result[result.length] = buffer;
                    } else {
                        result[result.length] = parseInt(buffer);
                    }
                }
        
                return result;
            };
        
            var array1 = __strnatcmp_split(f_string1+'');
            var array2 = __strnatcmp_split(f_string2+'');
        
            var len = array1.length;
            var text = true;
        
            var result = -1;
            var r = 0;
        
            if (len > array2.length) {
                len = array2.length;
                result = 1;
            }
        
            for (i = 0; i < len; i++) {
                if (isNaN(array1[i])) {
                    if (isNaN(array2[i])) {
                        text = true;
        
                        if ((r = this.strcmp(array1[i], array2[i])) != 0) {
                            return r;
                        }
                    } else if (text){
                        return 1;
                    } else {
                        return -1;
                    }
                } else if (isNaN(array2[i])) {
                    if(text) {
                        return -1;
                    } else{
                        return 1;
                    }
                } else {
                    if(text || f_version){
                        if ((r = (array1[i] - array2[i])) != 0) {
                            return r;
                        }
                    } else {
                        if ((r = this.strcmp(array1[i].toString(), array2[i].toString())) != 0) {
                            return r;
                        }
                    }
        
                    text = false;
                }
            }
        
            return result;
        },// }}}
        
        // {{{ strncasecmp
        strncasecmp: function (str1, str2, len) {
            // Binary safe case-insensitive string comparison of the first n characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strncasecmp/
            // +       version: 810.819
            // +   original by: Saulo Vallory
            // +      input by: Nate
            // +   bugfixed by: Onno Marsman
            // %          note: Returns < 0 if str1 is less than str2 ; > 0 if str1 is greater than str2 , and 0 if they are equal.
            // *     example 1: $P.strncasecmp('Price 12.9', 'Price 12.15', 2);
            // *     returns 1: 0
            // *     example 2: $P.strncasecmp('Price 12.09', 'Price 12.15', 10);
            // *     returns 2: -1
            // *     example 3: $P.strncasecmp('Price 12.90', 'Price 12.15', 30);
            // *     returns 3: 8
            // *     example 4: $P.strncasecmp('Version 12.9', 'Version 12.15', 20);
            // *     returns 4: 8
            // *     example 5: $P.strncasecmp('Version 12.15', 'Version 12.9', 20);
            // *     returns 5: -8
        
            var diff;
            str1 = (str1+'').toLowerCase().substr(0,len);
            str2 = (str2+'').toLowerCase().substr(0,len);
        
            if(str1.length !== str2.length) {
                if(str1.length < str2.length) {
                    len = str1.length;
                    if(str2.substr(0, str1.length) == str1) {
                        return str1.length - str2.length; // return the difference of chars
                    }
                } else {
                    len = str2.length;
                    // str1 is longer than str2
                    if(str1.substr(0, str2.length) == str2) {
                        return str1.length - str2.length; // return the difference of chars
                    }
                }
            } else {
                // Avoids trying to get a char that does not exist
                len = str1.length;
            }
        
            for(diff = 0, i=0; i < len; i++) {
                diff = str1.charCodeAt(i) - str2.charCodeAt(i);
                if(diff !== 0) {
                    return diff;
                }
            }
        
            return 0;
        },// }}}
        
        // {{{ strncmp
        strncmp: function ( str1, str2, lgth ) {
            // Binary safe string comparison of the first n characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strncmp/
            // +       version: 902.122
            // +      original by: Waldo Malqui Silva
            // +         input by: Steve Hilder
            // +      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +       revised by: gorthaur
            // + reimplemented by: Brett Zamir
            // *     example 1: $P.strncmp('aaa', 'aab', 2);
            // *     returns 1: 0
            // *     example 2: $P.strncmp('aaa', 'aab', 3 );
            // *     returns 2: -1
        
            var s1 = (str1+'').substr(0, lgth);
            var s2 = (str2+'').substr(0, lgth);
            
            return ( ( s1 == s2 ) ? 0 : ( ( s1 > s2 ) ? 1 : -1 ) );
        },// }}}
        
        // {{{ strpbrk
        strpbrk: function( haystack, char_list ) {
            // Search a string for any of a set of characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpbrk/
            // +       version: 810.819
            // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.strpbrk('This is a Simple text.', 'is');
            // *     returns 1: 'is is a Simple text.'
        
            haystack += '';
            char_list += '';
            var lon = haystack.length;
            var lon_search = char_list.length;
            var ret = false;
            var stack = '';
        
            if (lon >= lon_search) {
                if (lon == lon_search) {
                    if (haystack == char_list){
                        ret = haystack;
                    }
                } else {
                    j = 0;
                    i = 0;
                    while (i < lon_search && j < lon && !ret) {
                        if (char_list[i] == haystack[j]) {
                            i++;
                            if (i == lon_search) {
                                ret = true;
                            }
                        }
                        j++;
                    }
                    if (ret) {
                        for(i = (j-lon_search); i < lon; i++){
                            stack += haystack[i];
                        }
                    }
                    if (stack != '') {
                        ret = stack;
                    }
                }
            }
            return ret;
        },// }}}
        
        // {{{ strpos
        strpos: function( haystack, needle, offset){
            // Find position of first occurrence of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpos/
            // +       version: 810.612
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Onno Marsman    
            // *     example 1: $P.strpos('Kevin van Zonneveld', 'e', 5);
            // *     returns 1: 14
        
            var i = (haystack+'').indexOf( needle, offset ); 
            return i===-1 ? false : i;
        },// }}}
        
        // {{{ strrchr
        strrchr: function (haystack, needle) {
            // Find the last occurrence of a character in a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrchr/
            // +       version: 901.810
            // +   original by: Brett Zamir
            // *     example 1: $P.strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
            // *     returns 1: 'Line 3'
        
            var pos = 0;
        
            if (typeof needle !== 'string') {
                needle = String.fromCharCode(parseInt(needle, 10));
            }
            needle = needle[0];
            pos = haystack.lastIndexOf(needle);
            if (pos === -1) {
                return false;
            }
        
            return haystack.substr(pos);
        },// }}}
        
        // {{{ strrev
        strrev: function( string ){
            // Reverse a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrev/
            // +       version: 810.819
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.strrev('Kevin van Zonneveld');
            // *     returns 1: 'dlevennoZ nav niveK'
        
            var ret = '', i = 0;
        
            string += '';
            for ( i = string.length-1; i >= 0; i-- ){
               ret += string.charAt(i);
            }
        
            return ret;
        },// }}}
        
        // {{{ strripos
        strripos: function( haystack, needle, offset){
            // Find position of last occurrence of a case-insensitive string in a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strripos/
            // +       version: 810.620
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.strripos('Kevin van Zonneveld', 'E');
            // *     returns 1: 16
        
            var i = (haystack+'').toLowerCase().lastIndexOf( (needle+'').toLowerCase(), offset ); // returns -1
            return i >= 0 ? i : false;
        },// }}}
        
        // {{{ strrpos
        strrpos: function( haystack, needle, offset){
            // Find position of last occurrence of a char in a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrpos/
            // +       version: 810.819
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.strrpos('Kevin van Zonneveld', 'e');
            // *     returns 1: 16
        
            var i = (haystack+'').lastIndexOf( needle, offset ); // returns -1
            return i >= 0 ? i : false;
        },// }}}
        
        // {{{ strspn
        strspn: function(str1, str2, start, lgth){
            // Find length of initial segment matching mask
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strspn/
            // +       version: 812.3015
            // +   original by: Valentina De Rosa
            // +   improved by: Brett Zamir
            // *     example 1: $P.strspn('42 is the answer, what is the question ...', '1234567890');
            // *     returns 1: 2
            // *     example 2: $P.strspn('foo', 'o', 1, 2);
            // *     returns 2: 2
        
            var found;
            var stri;
            var strj;
            var j = 0;
            var i = 0;
        
            start = start ? (start < 0 ? (str1.length+start) : start) : 0;
            lgth = lgth ? ((lgth < 0) ? (str1.length+lgth-start) : lgth) : str1.length-start;
            str1 = str1.substr(start, lgth);
        
            for(i = 0; i < str1.length; i++){
                found = 0;
                stri  = str1.substring(i,i+1);
                for (j = 0; j <= str2.length; j++) {
                    strj = str2.substring(j,j+1);
                    if (stri == strj) {
                        found = 1;
                        break;
                    }
                }
                if (found != 1) {
                    return i;
                }
            }
        
            return i;
        },// }}}
        
        // {{{ strstr
        strstr: function( haystack, needle, bool ) {
            // Find first occurrence of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strstr/
            // +       version: 810.819
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.strstr('Kevin van Zonneveld', 'van');
            // *     returns 1: 'van Zonneveld'
            // *     example 2: $P.strstr('Kevin van Zonneveld', 'van', true);
            // *     returns 2: 'Kevin '
        
            var pos = 0;
        
            haystack += '';
            pos = haystack.indexOf( needle );
            if( pos == -1 ){
                return false;
            } else{
                if( bool ){
                    return haystack.substr( 0, pos );
                } else{
                    return haystack.slice( pos );
                }
            }
        },// }}}
        
        // {{{ strtok
        strtok: function (str, tokens) {
            // Tokenize string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtok/
            // +       version: 901.810
            // +   original by: Brett Zamir
            // %        note 1: Use tab and newline as tokenizing characters as well
            // *     example 1: $string = "\t\t\t\nThis is\tan example\nstring\n";
            // *     example 1: $tok = strtok($string, " \n\t");
            // *     example 1: $b = '';
            // *     example 1: $P.while($tok !== false) {$b += "Word="+$tok+"\n"; $tok = strtok(" \n\t");}
            // *     example 1: $b
            // *     returns 1: "Word=This\nWord=is\nWord=an\nWord=example\nWord=string\n"
        
            if (tokens === undefined) {
                tokens = str;
                str = this.strtok.leftOver;
            }
            if (str.length === 0) {
                return false;
            }
            if (tokens.indexOf(str[0]) !== -1) {
                return this.strtok(str.substr(1), tokens);
            }
            for (var i=0; i < str.length; i++) {
                if (tokens.indexOf(str[i]) !== -1) {
                    break;
                }
            }
            this.strtok.leftOver = str.substr(i+1);
            return str.substring(0, i);
        },// }}}
        
        // {{{ strtolower
        strtolower: function( str ) {
            // Make a string lowercase
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtolower/
            // +       version: 809.2912
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Onno Marsman
            // *     example 1: $P.strtolower('Kevin van Zonneveld');
            // *     returns 1: 'kevin van zonneveld'
        
            return (str+'').toLowerCase();
        },// }}}
        
        // {{{ strtoupper
        strtoupper: function( str ) {
            // Make a string uppercase
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtoupper/
            // +       version: 809.2912
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Onno Marsman
            // *     example 1: $P.strtoupper('Kevin van Zonneveld');
            // *     returns 1: 'KEVIN VAN ZONNEVELD'
        
            return (str+'').toUpperCase();
        },// }}}
        
        // {{{ strtr
        strtr: function (str, from, to) {
            // Translate certain characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtr/
            // +       version: 901.810
            // +   original by: Brett Zamir
            // *     example 1: $trans = {"hello" : "hi", "hi" : "hello"};
            // *     example 1: $P.strtr("hi all, I said hello", $trans)
            // *     returns 1: 'hello all, I said hi'
            // *     example 2: $P.strtr('äaabaåccasdeöoo', 'äåö','aao');
            // *     returns 2: 'aaabaaccasdeooo'
        
            var fr = '', i = 0, lgth = 0;
        
            if (typeof from === 'object') {
                for (fr in from) {
                    str = str.replace(fr, from[fr]);
                }
                return str;
            }
            
            lgth = to.length;
            if (from.length < to.length) {
                lgth = from.length;
            }
            for (i = 0; i < lgth; i++) {
                str = str.replace(from[i], to[i]);
            }
            
            return str;
        },// }}}
        
        // {{{ substr
        substr: function( f_string, f_start, f_length ) {
            // Return part of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr/
            // +       version: 810.819
            // +     original by: Martijn Wieringa
            // +     bugfixed by: T.Wild
            // +      tweaked by: Onno Marsman
            // *       example 1: $P.substr('abcdef', 0, -1);
            // *       returns 1: 'abcde'
            // *       example 2: $P.substr(2, 0, -6);
            // *       returns 2: ''
        
            f_string += '';
        
            if(f_start < 0) {
                f_start += f_string.length;
            }
        
            if(f_length == undefined) {
                f_length = f_string.length;
            } else if(f_length < 0){
                f_length += f_string.length;
            } else {
                f_length += f_start;
            }
        
            if(f_length < f_start) {
                f_length = f_start;
            }
        
            return f_string.substring(f_start, f_length);
        },// }}}
        
        // {{{ substr_count
        substr_count: function( haystack, needle, offset, length ) {
            // Count the number of substring occurrences
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr_count/
            // +       version: 810.819
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.substr_count('Kevin van Zonneveld', 'e');
            // *     returns 1: 3
            // *     example 2: $P.substr_count('Kevin van Zonneveld', 'K', 1);
            // *     returns 2: 0
            // *     example 3: $P.substr_count('Kevin van Zonneveld', 'Z', 0, 10);
            // *     returns 3: false
        
            var pos = 0, cnt = 0;
        
            haystack += '';
            needle += '';
            if(isNaN(offset)) offset = 0;
            if(isNaN(length)) length = 0;
            offset--;
        
            while( (offset = haystack.indexOf(needle, offset+1)) != -1 ){
                if(length > 0 && (offset+needle.length) > length){
                    return false;
                } else{
                    cnt++;
                }
            }
        
            return cnt;
        },// }}}
        
        // {{{ trim
        trim: function (str, charlist) {
            // Strip whitespace (or other characters) from the beginning and end of a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_trim/
            // +       version: 810.2018
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: mdsjack (http://www.mdsjack.bo.it)
            // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
            // +      input by: Erkekjetter
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: DxGx
            // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.trim('    Kevin van Zonneveld    ');
            // *     returns 1: 'Kevin van Zonneveld'
            // *     example 2: $P.trim('Hello World', 'Hdle');
            // *     returns 2: 'o Wor'
            // *     example 3: $P.trim(16, 1);
            // *     returns 3: 6
        
            var whitespace, l = 0, i = 0;
            str += '';
            
            if (!charlist) {
                // default list
                whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
            } else {
                // preg_quote custom list
                charlist += '';
                whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
            }
            
            l = str.length;
            for (i = 0; i < l; i++) {
                if (whitespace.indexOf(str.charAt(i)) === -1) {
                    str = str.substring(i);
                    break;
                }
            }
            
            l = str.length;
            for (i = l - 1; i >= 0; i--) {
                if (whitespace.indexOf(str.charAt(i)) === -1) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            
            return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
        },// }}}
        
        // {{{ ucfirst
        ucfirst: function( str ) {
            // Make a string&#039;s first character uppercase
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ucfirst/
            // +       version: 901.1301
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // +   improved by: Brett Zamir
            // *     example 1: $P.ucfirst('kevin van zonneveld');
            // *     returns 1: 'Kevin van zonneveld'
        
            str += '';
            var f = str.charAt(0).toUpperCase();
            return f + str.substr(1);
        },// }}}
        
        // {{{ ucwords
        ucwords: function( str ) {
            // Uppercase the first character of each word in a string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ucwords/
            // +       version: 811.1314
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Waldo Malqui Silva
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.ucwords('kevin van zonneveld');
            // *     returns 1: 'Kevin Van Zonneveld'
            // *     example 2: $P.ucwords('HELLO WORLD');
            // *     returns 2: 'HELLO WORLD'
        
            return (str+'').replace(/^(.)|\s(.)/g, function ( $1 ) { return $1.toUpperCase ( ); } );
        },// }}}
        
        // {{{ vprintf
        vprintf: function(format, args) {
            // Output a formatted string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_vprintf/
            // +       version: 902.122
            // +   original by: Ash Searle (http://hexmen.com/blog/)
            // +   improved by: Michael White (http://getsprink.com)
            // + reimplemented by: Brett Zamir
            // -    depends on: sprintf
            // *     example 1: $P.printf("%01.2f", 123.1);
            // *     returns 1: 6
        
            var body, elmt;
            var ret = '';
        
            // .shift() does not work to get first item in bodies
        
            var HTMLNS = 'http://www.w3.org/1999/xhtml';
            body = document.getElementsByTagNameNS ?
              (document.getElementsByTagNameNS(HTMLNS, 'body')[0] ?
                document.getElementsByTagNameNS(HTMLNS, 'body')[0] :
                document.documentElement.lastChild) :
              document.getElementsByTagName('body')[0];
        
            if (!body) {
                return false;
            }
        
            ret = this.sprintf.apply(this, [format].concat(args));
        
            elmt = document.createTextNode(ret);
            body.appendChild(elmt);
        
            return ret.length;
        },// }}}
        
        // {{{ vsprintf
        vsprintf: function(format, args) {
            // Return a formatted string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_vsprintf/
            // +       version: 901.817
            // +   original by: ejsanders
            // -    depends on: sprintf
            // *     example 1: $P.vsprintf('%04d-%02d-%02d', [1988, 8, 1]);
            // *     returns 1: '1988-08-01'
        
            return this.sprintf.apply(this, [format].concat(args));
        },// }}}
        
        // {{{ wordwrap
        wordwrap: function( str, int_width, str_break, cut ) {
            // Wraps a string to a given number of characters
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_wordwrap/
            // +       version: 810.819
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Nick Callen
            // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Sakimori
            // *     example 1: $P.wordwrap('Kevin van Zonneveld', 6, '|', true);
            // *     returns 1: 'Kevin |van |Zonnev|eld'
            // *     example 2: $P.wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
            // *     returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
            // *     example 3: $P.wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
            // *     returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'
        
            // PHP Defaults
            var m = ((arguments.length >= 2) ? arguments[1] : 75   );
            var b = ((arguments.length >= 3) ? arguments[2] : "\n" );
            var c = ((arguments.length >= 4) ? arguments[3] : false);
        
            var i, j, l, s, r;
        
            str += '';
        
            if (m < 1) {
                return str;
            }
        
            for (i = -1, l = (r = str.split("\n")).length; ++i < l; r[i] += s) {
                for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
                    j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
                }
            }
        
            return r.join("\n");
        },// }}}
        
        // {{{ base64_decode
        base64_decode: function( data ) {
            // Decodes data encoded with MIME base64
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base64_decode/
            // +       version: 810.819
            // +   original by: Tyler Akins (http://rumkin.com)
            // +   improved by: Thunder.m
            // +      input by: Aman Gupta
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // -    depends on: utf8_decode
            // *     example 1: $P.base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
            // *     returns 1: 'Kevin van Zonneveld'
        
            // mozilla has this native
            // - but breaks in 2.0.0.12!
            //if (typeof window['btoa'] == 'function') {
            //    return btoa(data);
            //}
        
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, dec = "", tmp_arr = [];
        
            data += '';
        
            do {  // unpack four hexets into three octets using index points in b64
                h1 = b64.indexOf(data.charAt(i++));
                h2 = b64.indexOf(data.charAt(i++));
                h3 = b64.indexOf(data.charAt(i++));
                h4 = b64.indexOf(data.charAt(i++));
        
                bits = h1<<18 | h2<<12 | h3<<6 | h4;
        
                o1 = bits>>16 & 0xff;
                o2 = bits>>8 & 0xff;
                o3 = bits & 0xff;
        
                if (h3 == 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1);
                } else if (h4 == 64) {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2);
                } else {
                    tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
                }
            } while (i < data.length);
        
            dec = tmp_arr.join('');
            dec = this.utf8_decode(dec);
        
            return dec;
        },// }}}
        
        // {{{ base64_encode
        base64_encode: function( data ) {
            // Encodes data with MIME base64
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base64_encode/
            // +       version: 809.522
            // +   original by: Tyler Akins (http://rumkin.com)
            // +   improved by: Bayron Guevara
            // +   improved by: Thunder.m
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)        
            // -    depends on: utf8_encode
            // *     example 1: $P.base64_encode('Kevin van Zonneveld');
            // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
        
            // mozilla has this native
            // - but breaks in 2.0.0.12!
            //if (typeof window['atob'] == 'function') {
            //    return atob(data);
            //}
                
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, enc="", tmp_arr = [];
            data = this.utf8_encode(data);
            
            do { // pack three octets into four hexets
                o1 = data.charCodeAt(i++);
                o2 = data.charCodeAt(i++);
                o3 = data.charCodeAt(i++);
        
                bits = o1<<16 | o2<<8 | o3;
        
                h1 = bits>>18 & 0x3f;
                h2 = bits>>12 & 0x3f;
                h3 = bits>>6 & 0x3f;
                h4 = bits & 0x3f;
        
                // use hexets to index into b64, and append result to encoded string
                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < data.length);
            
            enc = tmp_arr.join('');
            
            switch( data.length % 3 ){
                case 1:
                    enc = enc.slice(0, -2) + '==';
                break;
                case 2:
                    enc = enc.slice(0, -1) + '=';
                break;
            }
        
            return enc;
        },// }}}
        
        // {{{ get_headers
        get_headers: function(url, format) {
            // Fetches all the headers sent by the server in response to a HTTP request
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_headers/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
            // *     example 1: $P.get_headers('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
            // *     returns 1: '123'
            
            var req = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            if (!req) throw new Error('XMLHttpRequest not supported');
            var tmp, headers, pair, i;
        
            req.open('HEAD', url, false);
            req.send(null);
        
            if (req.readyState < 3) {
                return false;
            }
        
            tmp = req.getAllResponseHeaders();alert(tmp);
            tmp = tmp.split('\n');
            tmp = array_filter(tmp, function (value) { return value.substring(1) != ''; });
            headers = [req.status + ' ' + req.statusText];
        
            for (i in tmp) {
                if (format) {
                    pair = tmp[i].split(':');
                    headers[pair.splice(0, 1)] = pair.join(':').substring(1);
                } else {
                    headers[headers.length] = tmp[i];
                }
            }
        
            return headers;
        },// }}}
        
        // {{{ get_meta_tags
        get_meta_tags: function(file) {
            // Extracts all meta tag content attributes from a file and returns an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_meta_tags/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // %        note 1: This uses: function XmlHttpRequest and cannot retrieve resource from different domain.
            // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
            // -    depends on: file_get_contents
            // *     example 1: $P.get_meta_tags('http://kevin.vanzonneveld.net/pj_test_supportfile_2.htm');
            // *     returns 1: {description: 'a php manual', author: 'name', keywords: 'php documentation', 'geo_position': '49.33;-86.59'}
        
            var fulltxt = '';
        
            if (false) {
                // Use this for testing instead of the line above:
                fulltxt = '<meta name="author" content="name">'+
                '<meta name="keywords" content="php documentation">'+
                '<meta name="DESCRIPTION" content="a php manual">'+
                '<meta name="geo.position" content="49.33;-86.59">'+
                '</head>';
            } else {
                fulltxt = this.file_get_contents(file).match(/^[^]*<\/head>/i);
            }
            
            var patt = /<meta[^>]*?>/gim;
            var patt1 = /<meta\s+.*?name\s*=\s*(['"]?)(.*?)\1\s+.*?content\s*=\s*(['"]?)(.*?)\3/gim;
            var patt2 = /<meta\s+.*?content\s*=\s*(['"?])(.*?)\1\s+.*?name\s*=\s*(['"]?)(.*?)\3/gim;
            var txt, match, name, arr={};
        
            while ((txt = patt.exec(fulltxt)) != null) {
                while ((match = patt1.exec(txt)) != null) {
                    name = match[2].replace(/\W/g, '_').toLowerCase();
                    arr[name] = match[4];
                }
                while ((match = patt2.exec(txt)) != null) {
                    name = match[4].replace(/\W/g, '_').toLowerCase();
                    arr[name] = match[2];
                }
            }
            return arr;
        },// }}}
        
        // {{{ http_build_query
        http_build_query: function( formdata, numeric_prefix, arg_separator ) {
            // Generate URL-encoded query string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_http_build_query/
            // +       version: 809.2411
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Legaev Andrey
            // +   improved by: Michael White (http://getsprink.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // -    depends on: urlencode
            // *     example 1: $P.http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
            // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
            // *     example 2: $P.http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
            // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
        
            var key, use_val, use_key, i = 0, j=0, tmp_arr = [];
        
            if (!arg_separator) {
                arg_separator = '&';
            }
        
            for (key in formdata) {
                use_val = this.urlencode(formdata[key].toString());
                use_key = this.urlencode(key);
        
                if (numeric_prefix && !isNaN(key)) {
                    use_key = numeric_prefix + j;
                    j++;
                }
                tmp_arr[i++] = use_key + '=' + use_val;
            }
        
            return tmp_arr.join(arg_separator);
        },// }}}
        
        // {{{ parse_url
        parse_url: function (str, component) {
            // Parse a URL and return its components
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_parse_url/
            // +       version: 901.2514
            // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
            // + reimplemented by: Brett Zamir
            // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
            // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
            // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
            // %          note: Does not replace invaild characters with '_' as in PHP, nor does it return false with
            // %          note: a seriously malformed URL.
            // %          note: Besides name: function, is the same as parseUri besides the commented out portion
            // %          note: and the additional section following, as well as our allowing an extra slash after
            // %          note: the scheme/protocol (to allow file:/// as in PHP)
            // *     example 1: $P.parse_url('http://username:password@hostname/path?arg=value#anchor');
            // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
        
            var  o   = {
                strictMode: false,
                key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
                q:   {
                    name:   "queryKey",
                    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-protocol to catch file:/// (should restrict this)
                }
            };
            
            var m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            uri = {},
            i   = 14;
            while (i--) uri[o.key[i]] = m[i] || "";
            // Uncomment the following to use the original more detailed (non-PHP) script
            /*
                uri[o.q.name] = {};
                uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
                if ($1) uri[o.q.name][$1] = $2;
                });
                return uri;
            */
        
            switch (component) {
                case 'PHP_URL_SCHEME':
                    return uri.protocol;
                case 'PHP_URL_HOST':
                    return uri.host;
                case 'PHP_URL_PORT':
                    return uri.port;
                case 'PHP_URL_USER':
                    return uri.user;
                case 'PHP_URL_PASS':
                    return uri.password;
                case 'PHP_URL_PATH':
                    return uri.path;
                case 'PHP_URL_QUERY':
                    return uri.query;
                case 'PHP_URL_FRAGMENT':
                    return uri.anchor;
                default:
                    var retArr = {};
                    if (uri.protocol !== '') retArr.scheme=uri.protocol;
                    if (uri.host !== '') retArr.host=uri.host;
                    if (uri.port !== '') retArr.port=uri.port;
                    if (uri.user !== '') retArr.user=uri.user;
                    if (uri.password !== '') retArr.pass=uri.password;
                    if (uri.path !== '') retArr.path=uri.path;
                    if (uri.query !== '') retArr.query=uri.query;
                    if (uri.anchor !== '') retArr.fragment=uri.anchor;
                    return retArr;
            }
        },// }}}
        
        // {{{ rawurldecode
        rawurldecode: function( str ) {
            // Decode URL-encoded strings
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rawurldecode/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $P.rawurldecode('Kevin+van+Zonneveld%21');
            // *     returns 1: 'Kevin+van+Zonneveld!'
            // *     example 2: $P.rawurldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
            // *     returns 2: 'http://kevin.vanzonneveld.net/'
            // *     example 3: $P.rawurldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
            // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
        
            var histogram = {};
            var ret = str.toString(); 
        
            var replacer = function(search, replace, str) {
                var tmp_arr = [];
                tmp_arr = str.split(search);
                return tmp_arr.join(replace);
            };
        
            // The histogram is identical to the one in urlencode.
            histogram["'"]   = '%27';
            histogram['(']   = '%28';
            histogram[')']   = '%29';
            histogram['*']   = '%2A';
            histogram['~']   = '%7E';
            histogram['!']   = '%21';
        
            for (replace in histogram) {
                search = histogram[replace]; // Switch order when decoding
                ret = replacer(search, replace, ret) // Custom replace. No regexing
            }
        
            // End with decodeURIComponent, which most resembles PHP's encoding s: function
            ret = decodeURIComponent(ret);
        
            return ret;
        },// }}}
        
        // {{{ rawurlencode
        rawurlencode: function( str ) {
            // URL-encode according to RFC 1738
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rawurlencode/
            // +       version: 901.1411
            // +   original by: Brett Zamir
            // *     example 1: $P.rawurlencode('Kevin van Zonneveld!');
            // *     returns 1: 'Kevin van Zonneveld%21'
            // *     example 2: $P.rawurlencode('http://kevin.vanzonneveld.net/');
            // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
            // *     example 3: $P.rawurlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
            // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
         
            var histogram = {}, tmp_arr = [];
            var ret = str.toString();
        
            var replacer = function(search, replace, str) {
                var tmp_arr = [];
                tmp_arr = str.split(search);
                return tmp_arr.join(replace);
            };
        
            // The histogram is identical to the one in urldecode.
            histogram["'"]   = '%27';
            histogram['(']   = '%28';
            histogram[')']   = '%29';
            histogram['*']   = '%2A'; 
            histogram['~']   = '%7E';
            histogram['!']   = '%21';
        
            // Begin with encodeURIComponent, which most resembles PHP's encoding s: function
            ret = encodeURIComponent(ret);
        
            // Restore spaces, converted by encodeURIComponent which is not this.rawurlencode compatible
            ret = replacer('%20', ' ', ret); // Custom replace. No regexing
        
            for (search in histogram) {
                replace = histogram[search];
                ret = replacer(search, replace, ret) // Custom replace. No regexing
            }
        
            // Uppercase for full PHP compatibility
            return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2) {
                return "%"+m2.toUpperCase();
            });
        
            return ret;
        },// }}}
        
        // {{{ urldecode
        urldecode: function( str ) {
            // Decodes URL-encoded string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_urldecode/
            // +       version: 901.1411
            // +   original by: Philip Peterson
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: AJ
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Brett Zamir
            // %          note: info on what encoding s: function to use from: http://xkr.us/articles/javascript/encode-compare/
            // *     example 1: $P.urldecode('Kevin+van+Zonneveld%21');
            // *     returns 1: 'Kevin van Zonneveld!'
            // *     example 2: $P.urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
            // *     returns 2: 'http://kevin.vanzonneveld.net/'
            // *     example 3: $P.urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
            // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
            
            var histogram = {};
            var ret = str.toString();
            
            var replacer = function(search, replace, str) {
                var tmp_arr = [];
                tmp_arr = str.split(search);
                return tmp_arr.join(replace);
            };
            
            // The histogram is identical to the one in urlencode.
            histogram["'"]   = '%27';
            histogram['(']   = '%28';
            histogram[')']   = '%29';
            histogram['*']   = '%2A';
            histogram['~']   = '%7E';
            histogram['!']   = '%21';
            histogram['%20'] = '+';
        
            for (replace in histogram) {
                search = histogram[replace]; // Switch order when decoding
                ret = replacer(search, replace, ret) // Custom replace. No regexing   
            }
            
            // End with decodeURIComponent, which most resembles PHP's encoding s: function
            ret = decodeURIComponent(ret);
        
            return ret;
        },// }}}
        
        // {{{ urlencode
        urlencode: function( str ) {
            // URL-encodes string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_urlencode/
            // +       version: 901.1411
            // +   original by: Philip Peterson
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: AJ
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Brett Zamir
            // %          note: info on what encoding s: function to use from: http://xkr.us/articles/javascript/encode-compare/
            // *     example 1: $P.urlencode('Kevin van Zonneveld!');
            // *     returns 1: 'Kevin+van+Zonneveld%21'
            // *     example 2: $P.urlencode('http://kevin.vanzonneveld.net/');
            // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
            // *     example 3: $P.urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
            // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
                                     
            var histogram = {}, tmp_arr = [];
            var ret = str.toString();
            
            var replacer = function(search, replace, str) {
                var tmp_arr = [];
                tmp_arr = str.split(search);
                return tmp_arr.join(replace);
            };
            
            // The histogram is identical to the one in urldecode.
            histogram["'"]   = '%27';
            histogram['(']   = '%28';
            histogram[')']   = '%29';
            histogram['*']   = '%2A';
            histogram['~']   = '%7E';
            histogram['!']   = '%21';
            histogram['%20'] = '+';
            
            // Begin with encodeURIComponent, which most resembles PHP's encoding s: function
            ret = encodeURIComponent(ret);
            
            for (search in histogram) {
                replace = histogram[search];
                ret = replacer(search, replace, ret) // Custom replace. No regexing
            }
            
            // Uppercase for full PHP compatibility
            return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2) {
                return "%"+m2.toUpperCase();
            });
            
            return ret;
        },// }}}
        
        // {{{ doubleval
        doubleval: function( mixed_var ) {
            // Alias of floatval()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_doubleval/
            // +       version: 901.2515
            // +   original by: Brett Zamir
            //  -   depends on: floatval
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.doubleval(186);
            // *     returns 1: 186.00
        
            return this.floatval(mixed_var);
        },// }}}
        
        // {{{ empty
        empty: function( mixed_var ) {
            // Determine whether a variable is empty
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_empty/
            // +       version: 811.1314
            // +   original by: Philippe Baumann
            // +      input by: Onno Marsman
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: LH
            // +   improved by: Onno Marsman
            // +   improved by: Francesco
            // *     example 1: $P.empty(null);
            // *     returns 1: true
            // *     example 2: $P.empty(undefined);
            // *     returns 2: true
            // *     example 3: $P.empty([]);
            // *     returns 3: true
            // *     example 4: $P.empty({});
            // *     returns 4: true
            
            var key;
            
            if (mixed_var === ""
                || mixed_var === 0
                || mixed_var === "0"
                || mixed_var === null
                || mixed_var === false
                || mixed_var === undefined
            ){
                return true;
            }
            if (typeof mixed_var == 'object') {
                for (key in mixed_var) {
                    if (typeof mixed_var[key] !== 'function' ) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },// }}}
        
        // {{{ floatval
        floatval: function(mixed_var) {
            // +   original by: Michael White (http://getsprink.com)
            // %        note 1: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
            // *     example 1: $P.floatval('150.03_page-section');
            // *     returns 1: 150.03
            // *     example 2: $P.floatval('page: 3');
            // *     returns 2: 0
            // *     example 2: $P.floatval('-50 + 8');
            // *     returns 2: -50
        
            return (parseFloat(mixed_var) || 0);
        },// }}}
        
        // {{{ get_defined_vars
        get_defined_vars: function() {
            // Returns an array of all defined variables
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_defined_vars/
            // +       version: 812.3015
            // +   original by: Brett Zamir
            // %        note 1: Test case 1: If get_defined_vars can find itself in the defined vars, it worked :)
            // *     example 1: $P.test_in_array: function(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
            // *     example 1: $P.funcs = get_defined_vars();
            // *     example 1: $P.found = test_in_array(funcs, 'get_defined_vars');
            // *     results 1: found == true
        
            var i = '', arr = [], already = {};
        
            for (i in window) {
                try {
                    if (typeof window[i] === 'function') {
                        if (!already[i]) {
                            already[i] = 1;
                            arr.push(i);
                        }
                    }
                    else if (typeof window[i] === 'object') {
                        for (var j in window[i]) {
                            if (typeof window[j] === 'function' && window[j] && !already[j]) {
                                already[j] = 1;
                                arr.push(j);
                            }
                        }
                    }
                }
                catch (e) {
        
                }
            }
        
            return arr;
        },// }}}
        
        // {{{ gettype
        gettype: function( mixed_var ) {
            // Get the type of a variable
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_gettype/
            // +       version: 812.3015
            // +   original by: Paulo Ricardo F. Santos
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Douglas Crockford (http://javascript.crockford.com)
            // -    depends on: is_float
            // -    depends on: is_array
            // -    depends on: is_object
            // %        note 1: lacks resource type
            // %        note 2: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 21: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.gettype(1);
            // *     returns 1: 'integer'
            // *     example 2: $P.gettype(undefined);
            // *     returns 2: 'undefined'
            // *     example 3: $P.gettype({0: 'Kevin van Zonneveld'});
            // *     returns 3: 'array'
            // *     example 4: $P.gettype('foo');
            // *     returns 4: 'string'
            // *     example 5: $P.gettype({0: function () {return false;}});
            // *     returns 5: 'array'
        
            var type;
        
            var typeOf = function (value) {
                // From: http://javascript.crockford.com/remedial.html
                var s = typeof value;
                if (s === 'object') {
                    if (value) {
                        if (typeof value.length === 'number' &&
                                !(value.propertyIsEnumerable('length')) &&
                                typeof value.splice === 'function') {
                            s = 'array';
                        }
                    } else {
                        s = 'null';
                    }
                }
                return s;
            }
        
            switch (type = typeOf(mixed_var)) {
                case 'number':
                    return (this.is_float(mixed_var)) ? 'double' : 'integer';
                    break;
                case 'object':
                case 'array':
                    if (this.is_array(mixed_var)) {
                        return 'array';
                    } else if (this.is_object(mixed_var)) {
                        return 'object';
                    }
                    break;
            }
        
            return type;
        },// }}}
        
        // {{{ import_request_variables
        import_request_variables: function (types, prefix) {
            // Import GET/POST/Cookie variables into the global scope
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_import_request_variables/
            // +       version: 902.123
            // +      original by: Jalal Berrami
            // + reimplemented by: Brett Zamir
            // *        example 1: $P.document.cookie = 'snack=yummy';
            // *        example 1: $P.import_request_variables('gc', 'pr_');
            // *        results 1: pr_snack == 'yummy'
        
            var i = 0, current = '', url = '', vars = '';
            prefix = prefix || '';
        
            if (/g/i.test(types)) { // GET
                for(i = 0, url = window.location.href, vars = url.substring(url.lastIndexOf("?") + 1, url.length).split("&"); i < vars.length;i++){
                    current = vars[i].split("=");
                    window[prefix+current[0]] = current[1] || null;
                }
            }
            if (/c/i.test(types)) { // COOKIE
                for(i = 0, vars = document.cookie.split("&"); i < vars.length;i++){
                    current = vars[i].split("=");
                    window[prefix+current[0]] = current[1].split(";")[0] || null;
                }
            }
        },// }}}
        
        // {{{ intval
        intval: function( mixed_var, base ) {
            // Get the integer value of a variable
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_intval/
            // +       version: 812.3015
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: stensi
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.intval('Kevin van Zonneveld');
            // *     returns 1: 0
            // *     example 2: $P.intval(4.2);
            // *     returns 2: 4
            // *     example 3: $P.intval(42, 8);
            // *     returns 3: 42
            // *     example 4: $P.intval('09');
            // *     returns 4: 9
        
            var tmp;
        
            var type = typeof( mixed_var );
        
            if(type == 'boolean'){
                if (mixed_var == true) {
                    return 1;
                } else {
                    return 0;
                }
            } else if(type == 'string'){
                tmp = parseInt(mixed_var * 1);
                if(isNaN(tmp) || !isFinite(tmp)){
                    return 0;
                } else{
                    return tmp.toString(base || 10);
                }
            } else if(type == 'number' && isFinite(mixed_var) ){
                return Math.floor(mixed_var);
            } else{
                return 0;
            }
        },// }}}
        
        // {{{ is_array
        is_array: function( mixed_var ) {
            // Finds whether a variable is an array
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
            // +       version: 901.1623
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Legaev Andrey
            // +   bugfixed by: Cord
            // +   bugfixed by: Manish
            // +   improved by: Onno Marsman
            // %        note 1: In php.js, javascript objects are like php associative arrays, thus JavaScript objects will also
            // %        note 1: return true
            // *     example 1: $P.is_array(['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: true
            // *     example 2: $P.is_array('Kevin van Zonneveld');
            // *     returns 2: false
            // *     example 3: $P.is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
            // *     returns 3: true
            // *     example 4: $P.is_array(tmp_a: function(){this.name = 'Kevin'});
            // *     returns 4: false
        
            var key = '';
        
            if (!mixed_var) {
                return false;
            }
        
            if (typeof mixed_var === 'object') {
        
                if (mixed_var.hasOwnProperty) {
                    for (key in mixed_var) {
                        // Checks whether the object has the specified property
                        // if not, we figure it's not an object in the sense of a php-associative-array.
                        if (false === mixed_var.hasOwnProperty(key)) {
                            return false;
                        }
                    }
                }
        
                // Uncomment to enable strict JavsScript-proof type checking
                // This will not support PHP associative arrays (JavaScript objects), however
                // Read discussion at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
                //
                //  if (mixed_var.propertyIsEnumerable('length') || typeof mixed_var.length !== 'number') {
                //      return false;
                //  }
        
                return true;
            }
        
            return false;
        },// }}}
        
        // {{{ is_bool
        is_bool: function(mixed_var)
        {
            // Finds out whether a variable is a boolean
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_bool/
            // +       version: 810.915
            // +   original by: Onno Marsman
            // *     example 1: $P.is_bool(false);
            // *     returns 1: true
            // *     example 2: $P.is_bool(0);
            // *     returns 2: false
        
            return (typeof mixed_var == 'boolean');
        },// }}}
        
        // {{{ is_callable
        is_callable: function (v, syntax_only, callable_name) {
            // Verify that the contents of a variable can be called as a function
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_callable/
            // +       version: 902.821
            // +   original by: Brett Zamir
            // %        note 1: The variable callable_name cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
            // %        note 2: When used on an object, depends on a constructor property being kept on the object prototype
            // *     example 1: $P.is_callable('is_callable');
            // *     returns 1: true
            // *     example 2: $P.is_callable('bogusFunction', true);
            // *     returns 2:true // gives true because does not do strict checking
            // *     example 3: $P.function SomeClass () {}
            // *     example 3: SomeClass.prototype.someMethod = function(){};
            // *     example 3: $P.var testObj = new SomeClass();
            // *     example 3: $P.is_callable([testObj, 'someMethod'], true, 'myVar');
            // *     example 3: $P.alert(myVar); // 'SomeClass::someMethod'
            var name='', obj={}, method='';
            if (typeof v === 'string') {
                obj = window;
                method = v;
                name = v;
            }
            else if (v instanceof Array && v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
                obj = v[0];
                method = v[1];
                name = (obj.constructor && obj.constructor.name)+'::'+method;
            }
            else {
                return false;
            }
            if (syntax_only || typeof obj[method] === 'function') {
                if (callable_name) {
                window[callable_name] = name;
                }
                return true;
            }
            return false;
        },// }}}
        
        // {{{ is_double
        is_double: function( mixed_var ) {
            // Alias of is_float()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_double/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            //  -   depends on: is_float
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.is_double(186.31);
            // *     returns 1: true
        
            return this.is_float(mixed_var);
        },// }}}
        
        // {{{ is_float
        is_float: function( mixed_var ) {
            // Finds whether the type of a variable is float
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_float/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.is_float(186.31);
            // *     returns 1: true
        
            return parseFloat(mixed_var * 1) != parseInt(mixed_var * 1);
        },// }}}
        
        // {{{ is_int
        is_int: function( mixed_var ) {
            // Find whether the type of a variable is integer
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_int/
            // +       version: 901.2514
            // +   original by: Alex
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Matt Bradley
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.is_int(23)
            // *     returns 1: true
            // *     example 2: $P.is_int('23')
            // *     returns 2: false
            // *     example 3: $P.is_int(23.5)
            // *     returns 3: false
            // *     example 4: $P.is_int(true)
            // *     returns 4: false
        
            if (typeof mixed_var !== 'number') {
                return false;
            }
        
            if (parseFloat(mixed_var) != parseInt(mixed_var)) {
                return false;
            }
            
            return true;
        },// }}}
        
        // {{{ is_integer
        is_integer: function( mixed_var ) {
            // Alias of is_int()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_integer/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            //  -   depends on: is_int
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.is_integer(186.31);
            // *     returns 1: false
            // *     example 2: $P.is_integer(12);
            // *     returns 2: true
        
            return this.is_int(mixed_var);
        },// }}}
        
        // {{{ is_long
        is_long: function( mixed_var ) {
            // Alias of is_int()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_long/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            //  -   depends on: is_float
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.is_long(186.31);
            // *     returns 1: true
        
            return this.is_float(mixed_var);
        },// }}}
        
        // {{{ is_null
        is_null: function( mixed_var ){
            // Finds whether a variable is NULL
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_null/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.is_null('23');
            // *     returns 1: false
            // *     example 2: $P.is_null(null);
            // *     returns 2: true
        
            return ( mixed_var === null );
        },// }}}
        
        // {{{ is_numeric
        is_numeric: function( mixed_var ) {
            // Finds whether a variable is a number or a numeric string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_numeric/
            // +       version: 902.223
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: David
            // +   improved by: taith
            // *     example 1: $P.is_numeric(186.31);
            // *     returns 1: true
            // *     example 2: $P.is_numeric('Kevin van Zonneveld');
            // *     returns 2: false
            // *     example 3: $P.is_numeric('+186.31e2');
            // *     returns 3: true
        
            return !isNaN(mixed_var * 1);
        },// }}}
        
        // {{{ is_object
        is_object: function( mixed_var ){
            // Finds whether a variable is an object
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_object/
            // +       version: 809.2411
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Legaev Andrey
            // +   improved by: Michael White (http://getsprink.com)
            // *     example 1: $P.is_object('23');
            // *     returns 1: false
            // *     example 2: $P.is_object({foo: 'bar'});
            // *     returns 2: true
            // *     example 3: $P.is_object(null);
            // *     returns 3: false
        
            if(mixed_var instanceof Array) {
                return false;
            } else {
                return (mixed_var !== null) && (typeof( mixed_var ) == 'object');
            }
        },// }}}
        
        // {{{ is_real
        is_real: function( mixed_var ) {
            // Alias of is_float()
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_real/
            // +       version: 901.2515
            // +   original by: Brett Zamir
            //  -   depends on: is_float
            // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
            // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
            // *     example 1: $P.is_double(186.31);
            // *     returns 1: true
        
            return this.is_float(mixed_var);
        },// }}}
        
        // {{{ is_scalar
        is_scalar: function( mixed_var ) {
            // Finds whether a variable is a scalar
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_scalar/
            // +       version: 812.1017
            // +   original by: Paulo Ricardo F. Santos
            // *     example 1: $P.is_scalar(186.31);
            // *     returns 1: true
            // *     example 2: $P.is_scalar({0: 'Kevin van Zonneveld'});
            // *     returns 2: false
        
            return /boolean|number|string/.test(typeof mixed_var);
        },// }}}
        
        // {{{ is_string
        is_string: function( mixed_var ){
            // Find whether the type of a variable is string
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_string/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: $P.is_string('23');
            // *     returns 1: true
            // *     example 2: $P.is_string(23.5);
            // *     returns 2: false
        
            return (typeof( mixed_var ) == 'string');
        },// }}}
        
        // {{{ isset
        isset: function(  ) {
            // Determine whether a variable is set
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_isset/
            // +       version: 809.522
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: FremyCompany
            // +   improved by: Onno Marsman
            // *     example 1: $P.isset( undefined, true);
            // *     returns 1: false
            // *     example 2: $P.isset( 'Kevin van Zonneveld' );
            // *     returns 2: true
            
            var a=arguments; var l=a.length; var i=0;
            
            if (l==0) { 
                throw new Error('Empty this.isset'); 
            }
            
            while (i!=l) {
                if (typeof(a[i])=='undefined' || a[i]===null) { 
                    return false; 
                } else { 
                    i++; 
                }
            }
            return true;
        },// }}}
        
        // {{{ print_r
        print_r: function( array, return_val ) {
            // Prints human-readable information about a variable
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_print_r/
            // +       version: 809.2411
            // +   original by: Michael White (http://getsprink.com)
            // +   improved by: Ben Bryan
            // *     example 1: $P.print_r(1, true);
            // *     returns 1: 1
            
            var output = "", pad_char = " ", pad_val = 4;
        
            var formatArray = function (obj, cur_depth, pad_val, pad_char) {
                if (cur_depth > 0) {
                    cur_depth++;
                }
        
                var base_pad = repeat_char(pad_val*cur_depth, pad_char);
                var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
                var str = "";
        
                if (obj instanceof Array || obj instanceof Object) {
                    str += "Array\n" + base_pad + "(\n";
                    for (var key in obj) {
                        if (obj[key] instanceof Array) {
                            str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                        } else {
                            str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                        }
                    }
                    str += base_pad + ")\n";
                } else if(obj == null || obj == undefined) {
                    str = '';
                } else {
                    str = obj.toString();
                }
        
                return str;
            };
        
            var repeat_char = function (len, pad_char) {
                var str = "";
                for(var i=0; i < len; i++) { 
                    str += pad_char; 
                };
                return str;
            };
            output = formatArray(array, 0, pad_val, pad_char);
        
            if (return_val !== true) {
                document.write("<pre>" + output + "</pre>");
                return true;
            } else {
                return output;
            }
        },// }}}
        
        // {{{ serialize
        serialize: function( mixed_value ) {
            // Generates a storable representation of a value
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_serialize/
            // +       version: 812.3015
            // +   original by: Arpad Ray (mailto:arpad@php.net)
            // +   improved by: Dino
            // +   bugfixed by: Andrej Pavlovic
            // +   bugfixed by: Garagoth
            // %          note: We feel the main purpose of this should: function be to ease the transport of data between php & js
            // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
            // *     example 1: $P.serialize(['Kevin', 'van', 'Zonneveld']);
            // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
            // *     example 2: $P.serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
            // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
        
            var _getType = function( inp ) {
                var type = typeof inp, match;
                var key;
                if (type == 'object' && !inp) {
                    return 'null';
                }
                if (type == "object") {
                    if (!inp.constructor) {
                        return 'object';
                    }
                    var cons = inp.constructor.toString();
                    if (match = cons.match(/(\w+)\(/)) {
                        cons = match[1].toLowerCase();
                    }
                    var types = ["boolean", "number", "string", "array"];
                    for (key in types) {
                        if (cons == types[key]) {
                            type = types[key];
                            break;
                        }
                    }
                }
                return type;
            };
            var type = _getType(mixed_value);
            var val, ktype = '';
            
            switch (type) {
                case "function": 
                    val = ""; 
                    break;
                case "undefined":
                    val = "N";
                    break;
                case "boolean":
                    val = "b:" + (mixed_value ? "1" : "0");
                    break;
                case "number":
                    val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
                    break;
                case "string":
                    val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";
                    break;
                case "array":
                case "object":
                    val = "a";
                    /*
                    if (type == "object") {
                        var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
                        if (objname == undefined) {
                            return;
                        }
                        objname[1] = this.serialize(objname[1]);
                        val = "O" + objname[1].substring(1, objname[1].length - 1);
                    }
                    */
                    var count = 0;
                    var vals = "";
                    var okey;
                    var key;
                    for (key in mixed_value) {
                        ktype = _getType(mixed_value[key]);
                        if (ktype == "function") { 
                            continue; 
                        }
                        
                        okey = (key.match(/^[0-9]+$/) ? parseInt(key) : key);
                        vals += this.serialize(okey) +
                                this.serialize(mixed_value[key]);
                        count++;
                    }
                    val += ":" + count + ":{" + vals + "}";
                    break;
            }
            if (type != "object" && type != "array") val += ";";
            return val;
        },// }}}
        
        // {{{ settype
        settype: function (vr, type) {
           // http://kevin.vanzonneveld.net
            // +   original by: Waldo Malqui Silva
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +    revised by: Brett Zamir
            // %        note 1: Credits to Crockford also
            // %        note 2: only works on global variables, and "vr" must be passed in as a string
            // *     example 1: $P.foo = '5bar';
            // *     example 1: $P.settype(foo, 'integer');
            // *     results 1: foo == 5
            // *     returns 1: true
            // *     example 2: $P.foo = true;
            // *     example 2: $P.settype(foo, 'string');
            // *     results 2: foo == '1'
            // *     returns 2: true
        
            var is_array = function (arr) {
                return typeof arr === 'object' && typeof arr.length === 'number' &&
                            !(arr.propertyIsEnumerable('length')) &&
                            typeof arr.splice === 'function';
            };
            var v, mtch, i, obj;
            v = this[vr] ? this[vr] : vr;
            
            try {
                switch(type) {
                    case 'boolean':
                        if (is_array(v) && v.length === 0) {this[vr]=false;}
                        else if (v === '0') {this[vr]=false;}
                        else if (typeof v === 'object' && !is_array(v)) {
                            var lgth = false;
                            for (i in v) {
                                lgth = true;
                            }
                            this[vr]=lgth;
                        }
                        else {this[vr] = !!v;}
                        break;
                    case 'integer':
                        if (typeof v === 'number') {this[vr]=parseInt(v, 10);}
                        else if (typeof v === 'string') {
                            mtch = v.match(/^([+-]?)(\d+)/);
                            if (!mtch) {this[vr]=0;}
                            else {this[vr]=parseInt(v, 10);}
                        }
                        else if (v === true) {this[vr]=1;}
                        else if (v === false || v === null) {this[vr]=0;}
                        else if (is_array(v) && v.length === 0) {this[vr]=0;}
                        else if (typeof v === 'object') {this[vr]=1;}
        
                        break;
                    case 'float':
                        if (typeof v === 'string') {
                            mtch = v.match(/^([+-]?)(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?/);
                            if (!mtch) {this[vr]=0;}
                            else {this[vr]=parseFloat(v, 10);}
                        }
                        else if (v === true) {this[vr]=1;}
                        else if (v === false || v === null) {this[vr]=0;}
                        else if (is_array(v) && v.length === 0) {this[vr]=0;}
                        else if (typeof v === 'object') {this[vr]=1;}
                        break;
                    case 'string':
                        if (v === null || v === false) {this[vr]='';}
                        else if (is_array(v)) {this[vr]='Array';}
                        else if (typeof v === 'object') {this[vr]='Object';}
                        else if (v === true) {this[vr]='1';}
                        else {this[vr] += '';} // numbers (and s: function?)
                        break;
                    case 'array':
                        if (v === null) {this[vr] = [];}
                        else if (typeof v !== 'object') {this[vr] = [v];}
                        break;
                    case 'object':
                        if (v === null) {this[vr]={};}
                        else if (is_array(v)) {
                            for (i = 0, obj={}; i < v.length; i++) {
                                obj[i] = v;
                            }
                            this[vr] = obj;
                        }
                        else if (typeof v !== 'object') {this[vr]={scalar:v};}
                        break;
                    case 'null':
                        delete this[vr];
                        break;
                }
                return true;
            } catch (e) {
                return false;
            }
        },// }}}
        
        // {{{ strval
        strval: function(str) {
            // Get string value of a variable
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strval/
            // +       version: 901.1316
            // +   original by: Brett Zamir
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Brett Zamir
            // %        note 1: Comment out the entire switch if you want JS-like behavior instead of PHP behavior
            // -    depends on: gettype
            // *     example 1: $P.strval({red: 1, green: 2, blue: 3, white: 4});
            // *     returns 1: 'Array'
        
            var type = '';
        
            if (str === null) return '';
        
            type = this.gettype(str);
            switch (type) {
                case 'boolean':
                    if (str === true) return '1';
                    return '';
                case 'array':
                    return 'Array';
                case 'object':
                    return 'Object';
            }
            
            return str;
        },// }}}
        
        // {{{ unserialize
        unserialize: function(data){
            // Creates a PHP value from a stored representation
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_unserialize/
            // +       version: 809.2122
            // +     original by: Arpad Ray (mailto:arpad@php.net)
            // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
            // +     bugfixed by: dptr1988
            // +      revised by: d3x
            // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // %            note: We feel the main purpose of this should: function be to ease the transport of data between php & js
            // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays 
            // *       example 1: $P.unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
            // *       returns 1: ['Kevin', 'van', 'Zonneveld']
            // *       example 2: $P.unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
            // *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}
            
            var error = function (type, msg, filename, line){throw new window[type](msg, filename, line);};
            var read_until = function (data, offset, stopchr){
                var buf = [];
                var chr = data.slice(offset, offset + 1);
                var i = 2;
                while(chr != stopchr){
                    if((i+offset) > data.length){
                        error('Error', 'Invalid');
                    }
                    buf.push(chr);
                    chr = data.slice(offset + (i - 1),offset + i);
                    i += 1;
                }
                return [buf.length, buf.join('')];
            };
            var read_chrs = function (data, offset, length){
                buf = [];
                for(var i = 0;i < length;i++){
                    var chr = data.slice(offset + (i - 1),offset + i);
                    buf.push(chr);
                }
                return [buf.length, buf.join('')];
            };
            var _unserialize = function (data, offset){
                if(!offset) offset = 0;
                var buf = [];
                var dtype = (data.slice(offset, offset + 1)).toLowerCase();
                
                var dataoffset = offset + 2;
                var typeconvert = new Function('x', 'return x');
                var chrs = 0;
                var datalength = 0;
                
                switch(dtype){
                    case "i":
                        typeconvert = new Function('x', 'return parseInt(x)');
                        var readData = read_until(data, dataoffset, ';');
                        var chrs = readData[0];
                        var readdata = readData[1];
                        dataoffset += chrs + 1;
                    break;
                    case "b":
                        typeconvert = new Function('x', 'return (parseInt(x) == 1)');
                        var readData = read_until(data, dataoffset, ';');
                        var chrs = readData[0];
                        var readdata = readData[1];
                        dataoffset += chrs + 1;
                    break;
                    case "d":
                        typeconvert = new Function('x', 'return parseFloat(x)');
                        var readData = read_until(data, dataoffset, ';');
                        var chrs = readData[0];
                        var readdata = readData[1];
                        dataoffset += chrs + 1;
                    break;
                    case "n":
                        readdata = null;
                    break;
                    case "s":
                        var ccount = read_until(data, dataoffset, ':');
                        var chrs = ccount[0];
                        var stringlength = ccount[1];
                        dataoffset += chrs + 2;
                        
                        var readData = read_chrs(data, dataoffset+1, parseInt(stringlength));
                        var chrs = readData[0];
                        var readdata = readData[1];
                        dataoffset += chrs + 2;
                        if(chrs != parseInt(stringlength) && chrs != readdata.length){
                            error('SyntaxError', 'String length mismatch');
                        }
                    break;
                    case "a":
                        var readdata = {};
                        
                        var keyandchrs = read_until(data, dataoffset, ':');
                        var chrs = keyandchrs[0];
                        var keys = keyandchrs[1];
                        dataoffset += chrs + 2;
                        
                        for(var i = 0;i < parseInt(keys);i++){
                            var kprops = _unserialize(data, dataoffset);
                            var kchrs = kprops[1];
                            var key = kprops[2];
                            dataoffset += kchrs;
                            
                            var vprops = _unserialize(data, dataoffset);
                            var vchrs = vprops[1];
                            var value = vprops[2];
                            dataoffset += vchrs;
                            
                            readdata[key] = value;
                        }
                        
                        dataoffset += 1;
                    break;
                    default:
                        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
                    break;
                }
                return [dtype, dataoffset - offset, typeconvert(readdata)];
            };
            return _unserialize(data, 0)[2];
        },// }}}
        
        // {{{ var_export
        var_export: function(mixed_expression, bool_return) {
            // Outputs or returns a parsable string representation of a variable
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_var_export/
            // +       version: 809.522
            // +   original by: Philip Peterson
            // +   improved by: johnrembo
            // -    depends on: echo
            // *     example 1: $P.var_export(null);
            // *     returns 1: null
            // *     example 2: $P.var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
            // *     returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
            // *     example 3: $P.data = 'Kevin';
            // *     example 3: $P.var_export(data, true);
            // *     returns 3: "'Kevin'"
        
            var retstr = "";
            var iret = "";
            var cnt = 0;
            var x = [];
            
            var __getType = function( inp ) {
                var type = typeof inp, match;
                if (type == 'object' && !inp) {
                    return 'null';
                }
                if (type == "object") {
                    if (!inp.constructor) {
                        return 'object';
                    }
                    var cons = inp.constructor.toString();
                    if (match = cons.match(/(\w+)\(/)) {
                        cons = match[1].toLowerCase();
                    }
                    var types = ["boolean", "number", "string", "array"];
                    for (key in types) {
                        if (cons == types[key]) {
                            type = types[key];
                            break;
                        }
                    }
                }
                return type;
            };
            var type = __getType(mixed_expression);
            
            if( type === null) {
                retstr = "NULL";
            } else if(type == 'array' || type == 'object') {
                for(i in mixed_expression) {
                    x[cnt++] = this.var_export(i,true)+" => "+this.var_export(mixed_expression[i], true);
                }
                iret = x.join(',\n  ');
                retstr = "array (\n  "+iret+"\n)";
            } else {
                retstr = (!isNaN( mixed_expression )) ? mixed_expression : "'" + mixed_expression.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0") + "'";
            }
            
            if(bool_return != true) {
                this.echo(retstr);
                return null;
            } else {
                return retstr;
            }
        },// }}}
        
        // {{{ utf8_decode
        utf8_decode: function ( str_data ) {
            // Converts a string with ISO-8859-1 characters encoded with UTF-8   to single-byte
            // ISO-8859-1
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_utf8_decode/
            // +       version: 810.621
            // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // +      input by: Aman Gupta
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Norman "zEh" Fuchs
            // +   bugfixed by: hitwork
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.utf8_decode('Kevin van Zonneveld');
            // *     returns 1: 'Kevin van Zonneveld'
        
            var tmp_arr = [], i = ac = c1 = c2 = c3 = 0;
        
            str_data += '';
        
            while ( i < str_data.length ) {
                c1 = str_data.charCodeAt(i);
                if (c1 < 128) {
                    tmp_arr[ac++] = String.fromCharCode(c1);
                    i++;
                } else if ((c1 > 191) && (c1 < 224)) {
                    c2 = str_data.charCodeAt(i+1);
                    tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = str_data.charCodeAt(i+1);
                    c3 = str_data.charCodeAt(i+2);
                    tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
        
            return tmp_arr.join('');
        },// }}}
        
        // {{{ utf8_encode
        utf8_encode: function ( string ) {
            // Encodes an ISO-8859-1 string to UTF-8
            // 
            // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_utf8_encode/
            // +       version: 811.1414
            // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: sowberry
            // +    tweaked by: Jack
            // +   bugfixed by: Onno Marsman
            // +   improved by: Yves Sucaet
            // +   bugfixed by: Onno Marsman
            // *     example 1: $P.utf8_encode('Kevin van Zonneveld');
            // *     returns 1: 'Kevin van Zonneveld'
        
            string = (string+'').replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        
            var utftext = "";
            var start, end;
            var stringl = 0;
        
            start = end = 0;
            stringl = string.length;
            for (var n = 0; n < stringl; n++) {
                var c1 = string.charCodeAt(n);
                var enc = null;
        
                if (c1 < 128) {
                    end++;
                } else if((c1 > 127) && (c1 < 2048)) {
                    enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
                } else {
                    enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
                }
                if (enc != null) {
                    if (end > start) {
                        utftext += string.substring(start, end);
                    }
                    utftext += enc;
                    start = end = n+1;
                }
            }
        
            if (end > start) {
                utftext += string.substring(start, string.length);
            }
        
            return utftext;
        }// }}}
    }; // End PHP_JS prototype 
    
    window.$P = PHP_JS();
})();
