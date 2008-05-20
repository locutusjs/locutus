/* 
 * More info at: http://kevin.vanzonneveld.net/techblog/article/phpjs_licensing/
 * 
 * This is version: 1.09
 * php.js is copyright 2008 Kevin van Zonneveld.
 * 
 * Portions copyright Michael White (http://crestidg.com), _argos, Jonas
 * Raoni Soares Silva (http://www.jsfromhell.com), Legaev Andrey, Ates Goral
 * (http://magnetiq.com), Philip Peterson, Martijn Wieringa, Webtoolkit.info
 * (http://www.webtoolkit.info/), Carlos R. L. Rodrigues
 * (http://www.jsfromhell.com), Ash Searle (http://hexmen.com/blog/),
 * Erkekjetter, marrtins, Alfonso Jimenez (http://www.alfonsojimenez.com),
 * Aman Gupta, Arpad Ray (mailto:arpad@php.net), Karol Kowalski, Thunder.m,
 * Tyler Akins (http://rumkin.com), d3x, mdsjack (http://www.mdsjack.bo.it),
 * Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev),
 * Allan Jensen (http://www.winternet.no), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Bayron Guevara, Benjamin Lupton, Brad
 * Touesnard, Brett Zamir, Cagri Ekin, Cord, David, David James, DxGx,
 * FGFEmperor, Felix Geisendoerfer (http://www.debuggable.com/felix),
 * FremyCompany, Gabriel Paderni, Leslie Hoare, Lincoln Ramsay, MeEtc
 * (http://yass.meetcweb.com), Mick@el, Nick Callen, Ozh, Pedro Tainha
 * (http://www.pedrotainha.com), Peter-Paul Koch
 * (http://www.quirksmode.org/js/beat.html), Philippe Baumann, Sakimori,
 * Sanjoy Roy, Simon Willison (http://simonwillison.net), Steve Clay, Steve
 * Hilder, Steven Levithan (http://blog.stevenlevithan.com), T0bsn, Thiago
 * Mata (http://thiagomata.blog.com), Tim Wiel, XoraX (http://www.xorax.info),
 * baris ozdil, booeyOH, djmix, duncan, echo is bad, gabriel paderni, ger,
 * john (http://www.jd-tech.net), kenneth, penutbutterjelly, stensi
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


// {{{ array
function array( ) {
    // #!#!#!#!# array::$descr1 does not contain valid 'array' at line 258
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array/
    // +       version: 805.1716
    // +   original by: d3x
    // *     example 1: array('Kevin', 'van', 'Zonneveld');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld'];

    return Array.prototype.slice.call(arguments);
}// }}}

// {{{ array_change_key_case
function array_change_key_case( array ) {
    // Changes all keys in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_change_key_case/
    // +       version: 804.1712
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // *     example 1: array_change_key_case(42);
    // *     returns 1: false
    // *     example 2: array_change_key_case([ 3, 5 ]);
    // *     returns 2: {0: 3, 1: 5}
    // *     example 3: array_change_key_case({ FuBaR: 42 });
    // *     returns 3: {"fubar": 42}
    // *     example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
    // *     returns 4: {"fubar": 42}
    // *     example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
    // *     returns 5: {"FUBAR": 42}
    // *     example 6: array_change_key_case({ FuBaR: 42 }, 2);
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
        for (var key in array) {
            tmp_ar[key[case_fn]()] = array[key];
        }
        return tmp_ar;
    }

    return false;
}// }}}

// {{{ array_chunk
function array_chunk( input, size ) {
    // Split an array into chunks
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_chunk/
    // +       version: 804.1712
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // *     example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
    // *     returns 1: {0 : {0: 'Kevin', 1: 'van'} , 1 : {0: 'Zonneveld'}}
 
    for(var x, i = 0, c = -1, l = input.length, n = []; i < l; i++){
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
    }

    return n;
}// }}}

// {{{ array_combine
function array_combine( keys, values ) {
    // Creates an array by using one array for keys and another for its values
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_combine/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
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
}// }}}

// {{{ array_count_values
function array_count_values( array ) {
    // Counts all the values of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_count_values/
    // +       version: 804.1712
    // +   original by: Ates Goral (http://magnetiq.com)
    // + namespaced by: Michael White (http://crestidg.com)
    // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
    // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
    // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
    // *     returns 3: {42:1, "fubar":1}

    var tmp_ar = new Object(), key;

    var countValue = function (value) {
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

    if (array instanceof Array) {
        array.forEach(countValue, tmp_ar);
    } else if (array instanceof Object) {
        for ( key in array ) {
            countValue.call(tmp_ar, array[key]);
        }
    }

    return tmp_ar;
}// }}}

// {{{ array_diff
function array_diff (array) {
    // Computes the difference of arrays
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sanjoy Roy
    // *     example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
    // *     returns 1: ['Kevin']

    var arr_dif = [], i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false, cntr=0;

    // loop through 1st array
    for ( key in array ){
        // loop over other arrays
        for (i = 1; i< argc; i++){
            // find in the compare array
            found = false;
            for (key_c in argv[i]) {
                if (argv[i][key_c] == array[key]) {
                    found = true;
                    break;
                }
            }

            if(!found){
                //arr_dif[key] = array[key];
                arr_dif[cntr] = array[key];
                cntr++;
            }
        }
    }

    return arr_dif;
}// }}}

// {{{ array_diff_assoc
function array_diff_assoc ( array ) {
    // Computes the difference of arrays with additional index check
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_assoc/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
    // *     returns 1: {1: 'van', 2: 'Zonneveld'}

    var arr_dif = {}, i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Array && typeof array != 'object' && typeof array != 'array') ){
        return null;
    }

    // loop through 1st array
    for ( key in array ){
        // loop over other arrays
        for (i = 1; i< argc; i++){
            // find in the compare array
            found = false;
            if(argv[i][key]){
                found = true;
                break;
            }

            if(!found){
                arr_dif[key] = array[key];
            }
        }
    }

    return arr_dif;
}// }}}

// {{{ array_diff_key
function array_diff_key( object ) {
    // Computes the difference of arrays using keys for comparison
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_key/
    // +       version: 804.1712
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4});
    // *     returns 1: {"red":1, "green":2, "blue":3, "white":4}
    // *     example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});
    // *     returns 2: {"green":2, "blue":3, "white":4}
    // *     example 3: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {green: 6, blue: 7});
    // *     returns 3: {"white":4}
    // *     example 4: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});
    // *     returns 4: {"green":2, "blue":3, "white":4}

    var tpm_ar = new Object(), argc = arguments.length, argv = arguments, key, argidx, other;

    for (key in object) {
        tpm_ar[key] = object[key];
    }
    for (argidx = 1; argidx < argc; ++argidx) {
        other = argv[argidx];

        if (other instanceof Object) {
            for (key in other) {
                delete tpm_ar[key];
            }
        }
    }

    return tpm_ar;
}// }}}

// {{{ array_fill
function array_fill( start_index, num, mixed_val ) {
    // Fill an array with values
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_fill/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: array_fill(5, 6, 'banana');
    // *     returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

    var key, tmp_arr = new Array();

    if ( !isNaN ( start_index ) && !isNaN ( num ) ) {
        for( key = start_index; key <= num; key++ ) {
            tmp_arr[key] = mixed_val;
        }
    }

    return tmp_arr;
}// }}}

// {{{ array_flip
function array_flip( trans ) {
    // Exchanges all keys with their associated values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_flip/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}

    var key, tmp_ar = {};

    for( key in trans ) {
        tmp_ar[trans[key]] = key;
    }

    return tmp_ar;
}// }}}

// {{{ array_key_exists
function array_key_exists ( key, search ) {
    // Checks if the given key or index exists in the array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_key_exists/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true

    // input sanitation
    if( !search || (search.constructor !== Array && search.constructor !== Object) ){
        return false;
    }

    return key in search;
}// }}}

// {{{ array_keys
function array_keys( input, search_value, strict ) {
    // Return all the keys of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_keys/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var tmp_arr = new Array(), strict = !!strict, include = true, cnt = 0;

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
}// }}}

// {{{ array_map
function array_map( callback ) {
    // Applies the callback to the elements of the given arrays
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_map/
    // +       version: 804.1712
    // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_map( function(a){return (a * a * a);}, [1, 2, 3, 4, 5] );
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
}// }}}

// {{{ array_pad
function array_pad ( input, pad_size, pad_value ) {
    // Pad array to the specified length with a value
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_pad/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: array_pad([ 7, 8, 9 ], 2, 'a');
    // *     returns 1: [ 7, 8, 9]
    // *     example 2: array_pad([ 7, 8, 9 ], 5, 'a');
    // *     returns 2: [ 7, 8, 9, 'a', 'a']
    // *     example 3: array_pad([ 7, 8, 9 ], 5, 2);
    // *     returns 3: [ 7, 8, 9, 2, 2]
    // *     example 4: array_pad([ 7, 8, 9 ], -5, 'a');
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
}// }}}

// {{{ array_pop
function array_pop( array ) {
    // Pop the element off the end of array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_pop/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_pop([0,1,2]);
    // *     returns 1: 2

    // done popping, are we?
    if( !array.length ){
        return null;
    }

    return array.pop();
}// }}}

// {{{ array_product
function array_product ( input ) {
    // Calculate the product of values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_product/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: array_product([ 2, 4, 6, 8 ]);
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
}// }}}

// {{{ array_push
function array_push ( array ) {
    // Push one or more elements onto the end of array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_push/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_push(['kevin','van'], 'zonneveld');
    // *     returns 1: 3

    var i, argv = arguments, argc = argv.length;

    for (i=1; i < argc; i++){
        array[array.length++] = argv[i];
    }

    return array.length;
}// }}}

// {{{ array_rand
function array_rand ( input, num_req ) {
    // Pick one or more random entries out of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_rand/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: array_rand( ['Kevin'], 1 );
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
}// }}}

// {{{ array_reduce
function array_reduce( a_input, callback ) {
    // Iteratively reduce the array to a single value using a callback function
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_reduce/
    // +       version: 804.1712
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // *     example 1: array_reduce([1, 2, 3, 4, 5], function(v, w){v += w; return v;});
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
}// }}}

// {{{ array_reverse
function array_reverse( array, preserve_keys ) {
    // Return an array with elements in reverse order
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_reverse/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Karol Kowalski
    // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true );
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}

    var arr_len=array.length, newkey=0, tmp_ar = {};

    for(var key in array){
        newkey=arr_len-key-1;
        tmp_ar[(!!preserve_keys)?newkey:key]=array[newkey];
    }

    return tmp_ar;
}// }}}

// {{{ array_search
function array_search( needle, haystack, strict ) {
    // Searches the array for a given value and returns the corresponding key if
    // successful
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_search/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'

    var strict = !!strict;

    for(var key in haystack){
        if( (strict && haystack[key] === needle) || (!strict && haystack[key] == needle) ){
            return key;
        }
    }

    return false;
}// }}}

// {{{ array_shift
function array_shift( array ) {
    // Shift an element off the beginning of array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_shift/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_shift(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin'

    var i=0, first_elm=null, cnt=0, tmp_arr = {};

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
        return null;
    }

    if( array.constructor === Array ){
        first_elm = array[0];
        for( i = 0; i < array.length; i++ ){
            array[i] = array[i+1];
        }
        array.length--;
    } else if( array.constructor === Object ){
        for(var key in array){
            if( cnt == 0 ){
                first_elm = array[key];
            } else{
                tmp_arr[key] = array[key];
            }
            cnt ++;
        }
        array = tmp_arr;
    }

    return first_elm;
}// }}}

// {{{ array_sum
function array_sum( array ) {
    // Calculate the sum of values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_sum/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_sum([4, 9, 182.6]);
    // *     returns 1: 195.6

    var key, sum=0;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
        return null;
    }

    for(var key in array){
        sum += array[key];
    }

    return sum;
}// }}}

// {{{ array_unique
function array_unique( array ) {
    // Removes duplicate values from an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unique/
    // +       version: 805.211
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      input by: duncan
    // +    bufixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld']);
    // *     returns 1: ['Kevin','van','Zonneveld']

    var p, i, j, tmp_arr = array;
    for(i = tmp_arr.length; i;){
        for(p = --i; p > 0;){
            if(tmp_arr[i] === tmp_arr[--p]){
                for(j = p; --p && tmp_arr[i] === tmp_arr[p];);
                i -= tmp_arr.splice(p + 1, j - p).length;
            }
        }
    }

    return tmp_arr;
}// }}}

// {{{ array_unshift
function array_unshift( array ) {
    // Prepend one or more elements to the beginning of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unshift/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
    // *     returns 1: 3

    var cnt=0, tot_cnt=0, tmp_arr = {}, argc = arguments.length, argv = arguments;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Array && typeof array != 'object' && typeof array != 'array') ){
        return null;
    }

    // prepend
    for (i = 1; i< argc; i++){
        tmp_arr[cnt] = argv[i];
        cnt++; tot_cnt++;
    }

    // append original
    for(var key in array){
        if( typeof key == 'number' && isFinite( key ) ){
            // modify numeric key
            tmp_arr[cnt] = array[key];
            cnt++; tot_cnt++;
        } else{
            // save original alphanumeric key
            tmp_arr[key] = array[key];
            tot_cnt++;
        }
    }

    return tot_cnt;
}// }}}

// {{{ array_values
function array_values( input ) {
    // Return all the values of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_values/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}

    var tmp_arr = new Array(), cnt = 0;

    for ( key in input ){
        tmp_arr[cnt] = input[key];
        cnt++;
    }

    return tmp_arr;
}// }}}

// {{{ compact
function compact ( var_names ) {
    // Create array containing variables and their values
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_compact/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: compact('var1', 'var2');
    // *     returns 1: {}

    var Index = 0, Matrix = {};
    var process = function ( value ) {
        for ( var i = 0; i < value.length; i++ ) {
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
}// }}}

// {{{ count
function count( mixed_var, mode ) {
    // Count elements in an array, or properties in an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: _argos
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6

    var key, cnt = 0;

    if( mode == 'COUNT_RECURSIVE' ) mode = 1;
    if( mode != 1 ) mode = 0;

    for (key in mixed_var){
        cnt++;
        if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
            cnt += count(mixed_var[key], 1);
        }
    }

    return cnt;
}// }}}

// {{{ end
function end ( array ) {
    // Set the internal pointer of an array to its last element
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_end/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // *     example 1: end({firstname: 'Kevin', middle: 'van', surname: 'Zonneveld'});
    // *     returns 1: 'Zonneveld'

    var last_elm, key;

    if (array.constructor === Array){
        last_elm = array[(array.length-1)];
    } else {
        for (key in array){
            last_elm = array[key];
        }
    }

    return last_elm;
}// }}}

// {{{ in_array
function in_array(needle, haystack, strict) {
    // Checks if a value exists in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_in_array/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    var found = false, key, strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}// }}}

// {{{ range
function range ( low, high, step ) {
    // Create an array containing a range of elements
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_range/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: range ( 0, 12 );
    // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // *     example 2: range( 0, 100, 10 );
    // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    // *     example 3: range( 'a', 'i' );
    // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    // *     example 4: range( 'c', 'a' );
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
}// }}}

// {{{ reset
function reset ( array ) {
    // Set the internal pointer of an array to its first element
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_reset/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // *     example 1: reset({firstname: 'Kevin', middle: 'van', surname: 'Zonneveld'});
    // *     returns 1: 'Kevin'

    var first_elm, key;

    if (array.constructor === Array){
        first_elm = array[0];
    } else {
        for (key in array){
            first_elm = array[key];
            break;
        }
    }

    return first_elm;
}// }}}

// {{{ shuffle
function shuffle( array ) {
    // Shuffle an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_shuffle/
    // +       version: 804.1712
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: shuffle(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return true;
}// }}}

// {{{ sizeof
function sizeof ( mixed_var, mode ) {
    // Alias of count()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sizeof/
    // +       version: 804.1712
    // +   original by: Philip Peterson
    // -    depends on: count
    // *     example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
 
    return count( mixed_var, mode );
}// }}}

// {{{ get_class
function get_class(obj) {
    // Returns the name of the class of an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_class/
    // +       version: 804.1712
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: David James
    // *     example 1: get_class(new (function MyClass() {}));
    // *     returns 1: "MyClass"
    // *     example 2: get_class({});
    // *     returns 2: "Object"
    // *     example 3: get_class([]);
    // *     returns 3: false
    // *     example 4: get_class(42);
    // *     returns 4: false
    // *     example 5: get_class(window);
    // *     returns 5: false
    // *     example 6: get_class(function MyFunction() {});
    // *     returns 6: false

    if (obj instanceof Object && !(obj instanceof Array) &&
        !(obj instanceof Function) && obj.constructor) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return false;
}// }}}

// {{{ checkdate
function checkdate( month, day, year ) {
    // Validate a Gregorian date
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_checkdate/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: checkdate(12, 31, 2000);
    // *     returns 1: true
    // *     example 2: checkdate(2, 29, 2001);
    // *     returns 2: false
    // *     example 3: checkdate(03, 31, 2008);
    // *     returns 3: true

    var myDate = new Date();
    myDate.setFullYear( year, (month - 1), day );

    return ( (myDate.getMonth()+1) == month );
}// }}}

// {{{ date
function date ( format, timestamp ) {
    // Format a local time/date
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_date/
    // +       version: 804.1712
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: MeEtc (http://yass.meetcweb.com)
    // +   improved by: Brad Touesnard
    // +   improved by: Tim Wiel
    // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
    // *     returns 1: '09:09:40 m is month'
    // *     example 2: date('F j, Y, g:i a', 1062462400);
    // *     returns 2: 'September 2, 2003, 2:26 am'

    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
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
                t = f.l(); return t.substr(0,3);
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
                        return date("W", Math.round(nd2.getTime()/1000));
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
            //o not supported yet
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
            //u not supported yet

        // Timezone
            //e not supported yet
            //I not supported yet
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
            //Z not supported yet

        // Full Date/Time
            c: function(){
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
            },
            //r not supported yet
            U: function(){
                return Math.round(jsdate.getTime()/1000);
            }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
        if( t!=s ){
            // escaped
            ret = s;
        } else if( f[s] ){
            // a date function exists
            ret = f[s]();
        } else{
            // nothing special
            ret = s;
        }

        return ret;
    });
}// }}}

// {{{ mktime
function mktime() {
    // Get Unix timestamp for a date
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_mktime/
    // +       version: 804.1914
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: baris ozdil
    // +      input by: gabriel paderni 
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FGFEmperor
    // *     example 1: mktime( 14, 10, 2, 2, 1, 2008 );
    // *     returns 1: 1201871402
    
    var no, ma = 0, mb = 0, i = 0, d = new Date(), argv = arguments, argc = argv.length;
    d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1972);
 
    var dateManip = {
        0: function(tt){ return d.setHours(tt); },
        1: function(tt){ return d.setMinutes(tt); },
        2: function(tt){ set = d.setSeconds(tt); mb = d.getDate() - 1; return set; },
        3: function(tt){ set = d.setMonth(parseInt(tt)-1); ma = d.getFullYear() - 1972; return set; },
        4: function(tt){ return d.setDate(tt+mb); },
        5: function(tt){ return d.setYear(tt+ma); }
    };
    
    for( i = 0; i < argc; i++ ){
        no = parseInt(argv[i]);
        if(no && isNaN(no)){
            return false;
        } else if(no){
            // arg is number, let's manipulate date object
            if(!dateManip[i](no)){
                // failed
                return false;
            }
        }
    }

    return Math.floor(d.getTime()/1000);
}// }}}

// {{{ basename
function basename(path, suffix) {
    // Returns filename component of path
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_basename/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // +   improved by: djmix
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'

    var b = path.replace(/^.*[\/\\]/g, '');
    if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    return b;
}// }}}

// {{{ dirname
function dirname(path) {
    // Returns directory name component of path
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_dirname/
    // +       version: 804.2817
    // +   original by: Ozh
    // +   improved by: XoraX (http://www.xorax.info)
    // *     example 1: dirname('/etc/passwd');
    // *     returns 1: '/etc'
    // *     example 2: dirname('c:/Temp/x');
    // *     returns 2: 'c:/Temp'
    // *     example 3: dirname('/dir/test/');
    // *     returns 3: '/dir'
    
    return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
}// }}}

// {{{ file
function file( url ) {
    // Reads entire file into an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file/
    // +       version: 804.1712
    // +   original by: Legaev Andrey
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // *     example 1: file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: {0: '123'}

    var req = null;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
        try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
            try { req = new XMLHttpRequest(); } catch(e) {}
        }
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');

    req.open("GET", url, false);
    req.send(null);

    return req.responseText.split('\n');
}// }}}

// {{{ file_get_contents
function file_get_contents( url ) {
    // Reads entire file into a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file_get_contents/
    // +       version: 804.1712
    // +   original by: Legaev Andrey
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var req = null;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
        try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
            try { req = new XMLHttpRequest(); } catch(e) {}
        }
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');

    req.open("GET", url, false);
    req.send(null);

    return req.responseText;
}// }}}

// {{{ call_user_func_array
function call_user_func_array( strFunctionName , arrParam ){
    // Call a user function given with an array of parameters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_call_user_func_array/
    // +       version: 804.1712
    // +   original by: Thiago Mata (http://thiagomata.blog.com)
    // *     example 1: call_user_func_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: call_user_func_array('isNaN', [1]);
    // *     returns 2: false

    var strCommand = "";
    var i;

    strCommand += "return " + strFunctionName + "(";
    for( i = 0; i < arrParam.length; ++i ) {
        strCommand += "arrParam[" + i + "]" ;
        if( ( i + 1 ) != arrParam.length ) {
            strCommand += ",";
        }
    }
    strCommand += ")";
    var oFunction = new Function( "arrParam" , strCommand );
    return oFunction( arrParam );
}// }}}

// {{{ function_exists
function function_exists( function_name ) {
    // Return TRUE if the given function has been defined
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_function_exists/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
    // *     example 1: function_exists('isFinite');
    // *     returns 1: true


    if (typeof function_name == 'string'){
        return (typeof window[function_name] == 'function');
    } else{
        return (function_name instanceof Function);
    }
}// }}}

// {{{ get_included_files
function get_included_files() {
    // Returns an array with the names of included or required files
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_included_files/
    // +       version: 804.1712
    // +   original by: Michael White (http://crestidg.com)
    // *     example 1: get_included_files();
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
}// }}}

// {{{ include
function include( filename ) {
    // The include() statement includes and evaluates the specified file.
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_include/
    // +       version: 804.1808
    // +   original by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael White (http://crestidg.com)
    // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
    // *     example 1: include('/pj_test_supportfile_2.js');
    // *     returns 1: 1

    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', filename);
    js.setAttribute('defer', 'defer');
    document.getElementsByTagName('HEAD')[0].appendChild(js);

    // save include state for reference by include_once
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
}// }}}

// {{{ include_once
function include_once( filename ) {
    // The include_once() statement includes and evaluates the specified file during
    // the execution of the script. This is a behavior similar to the include()
    // statement, with the only difference being that if the code from a file has
    // already been included, it will not be included again.  As the name suggests, it
    // will be included just once.
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_include_once/
    // +       version: 804.1712
    // +   original by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael White (http://crestidg.com)
    // -    depends on: include
    // *     example 1: include_once('/pj_test_supportfile_2.js');
    // *     returns 1: true

    var cur_file = {};
    cur_file[window.location.href] = 1;

    if (!window.php_js) window.php_js = {};
    if (!window.php_js.includes) window.php_js.includes = cur_file;
    if (!window.php_js.includes[filename]) {
        if(include(filename)){
            return true;
        }
    } else{
        return true;
    }
}// }}}

// {{{ require
function require( filename ) {
    // The require() statement includes and evaluates the specific file.
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_require/
    // +       version: 804.1808
    // +   original by: Michael White (http://crestidg.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
    // -    depends on: file_get_contents
    // *     example 1: require('/pj_test_supportfile_2.js');
    // *     returns 1: 2

    var js_code = file_get_contents(filename);
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
}// }}}

// {{{ require_once
function require_once(filename) {
    // The require_once() statement includes and evaluates the specified file during
    // the execution of the script. This is a behavior similar to the require()
    // statement, with the only difference being that if the code from a file has
    // already been included, it will not be included again.  See the documentation for
    // require() for more information on how this statement works.
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_require_once/
    // +       version: 804.1712
    // +   original by: Michael White (http://crestidg.com)
    // -    depends on: require
    // *     example 1: require_once('/pj_test_supportfile_2.js');
    // *     returns 1: true

    var cur_file = {};
    cur_file[window.location.href] = 1;

    // save include state for reference by include_once and require_once()
    if (!window.php_js) window.php_js = {};
    if (!window.php_js.includes) window.php_js.includes = cur_file;
    if (!window.php_js.includes[filename]) {
        if(require(filename)){
            return true;
        }
    } else {
        return true;
    }
}// }}}

// {{{ abs
function abs( mixed_number )  {
    // Absolute value
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_abs/
    // +       version: 804.1712
    // +   original by: _argos
    // +   improved by: Karol Kowalski
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: abs(4.2);
    // *     returns 1: 4.2
    // *     example 2: abs(-4.2);
    // *     returns 2: 4.2
    // *     example 3: abs(-5);
    // *     returns 3: 5
    // *     example 4: abs('_argos');
    // *     returns 4: 0

    return Math.abs(mixed_number) || 0;
}// }}}

// {{{ rand
function rand( min, max ) {
    // Generate a random integer
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rand/
    // +       version: 804.1712
    // +   original by: Leslie Hoare
    // *     example 1: rand(1, 1);
    // *     returns 1: 1

    if( max ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (min + 1));
    }
}// }}}

// {{{ round
function round ( val, precision ) {
    // Rounds a float
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_round/
    // +       version: 804.1712
    // +   original by: Philip Peterson
    // *     example 1: round(1241757, -3);
    // *     returns 1: 1242000
    // *     example 2: round(3.6);
    // *     returns 2: 4
 
    var precision = (round.arguments.length > 1) ? round.arguments[1] : 0;
    return Math.round(val * Math.pow(10, precision))/Math.pow(10, precision);
}// }}}

// {{{ defined
function defined( constant_name )  {
    // Checks whether a given named constant exists
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_defined/
    // +       version: 804.1712
    // +   original by: _argos
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: defined('IMAGINARY_CONSTANT1');
    // *     returns 1: false

    return (typeof window[constant_name] !== 'undefined');
}// }}}

// {{{ ip2long
function ip2long ( ip_address ) {
    // Converts a string containing an (IPv4) Internet Protocol dotted address into a
    // proper address
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ip2long/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: ip2long( '192.0.34.166' );
    // *     returns 1: 3221234342
    
    var output = false;
 
    if ( ip_address.match ( /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/ ) ) {
      var parts  = ip_address.split ( '.' );
      var output = 0;
 
      output = ( parts [ 0 ] * Math.pow ( 256, 3 ) ) +
               ( parts [ 1 ] * Math.pow ( 256, 2 ) ) +
               ( parts [ 2 ] * Math.pow ( 256, 1 ) ) +
               ( parts [ 3 ] * Math.pow ( 256, 0 ) );
    }
     
    return output;
}// }}}

// {{{ long2ip
function long2ip ( proper_address ) {
    // Converts an (IPv4) Internet network address into a string in Internet standard
    // dotted format
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_long2ip/
    // +       version: 804.1712
    // +   original by: _argos
    // *     example 1: long2ip( 3221234342 );
    // *     returns 1: '192.0.34.166'
    
    var output = false;
    
    if ( !isNaN ( proper_address ) && ( proper_address >= 0 || proper_address <= 4294967295 ) ) {
      output = Math.floor (proper_address / Math.pow ( 256, 3 ) ) + '.' +
               Math.floor ( ( proper_address % Math.pow ( 256, 3 ) ) / Math.pow ( 256, 2 ) ) + '.' +
               Math.floor ( ( ( proper_address % Math.pow ( 256, 3 ) )  % Math.pow ( 256, 2 ) ) / Math.pow ( 256, 1 ) ) + '.' +
               Math.floor ( ( ( ( proper_address % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) % Math.pow ( 256, 1 ) ) / Math.pow ( 256, 0 ) );
    }
    
    return output;
}// }}}

// {{{ setcookie
function setcookie(name, value, expires, path, domain, secure) {
    // Send a cookie
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_setcookie/
    // +       version: 804.1712
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true

    expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
    var r = [name + "=" + escape(value)], s, i;
    for(i in s = {expires: expires, path: path, domain: domain}){
        s[i] && r.push(i + "=" + s[i]);
    }
    return secure && r.push("secure"), document.cookie = r.join(";"), true;
}// }}}

// {{{ preg_quote
function preg_quote( str ) {
    // Quote regular expression characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_preg_quote/
    // +       version: 804.1712
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // *     example 1: preg_quote("$40");
    // *     returns 1: "\\\$40"
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: "\\*RRRING\\* Hello\\?"
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: "\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:"

    return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}// }}}

// {{{ addslashes
function addslashes( str ) {
    // Quote string with slashes
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_addslashes/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // *     example 1: addslashes("kevin's birthday");
    // *     returns 1: "kevin\'s birthday"

    return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
}// }}}

// {{{ bin2hex
function bin2hex(s){
    // Convert binary data into hexadecimal representation
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_bin2hex/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: bin2hex('Kev');
    // *     returns 1: '4b6576'

    var i, f = s.length, a = [];
    for(i = 0; i<f; i++){
        a[i] = s.charCodeAt(i).toString(16);
    }
    return a.join('');
}// }}}

// {{{ chr
function chr( ascii ) {
    // Return a specific character
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_chr/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: chr(75);
    // *     returns 1: 'K'

    return String.fromCharCode(ascii);
}// }}}

// {{{ count_chars
function count_chars( str, mode ) {
    // Return information about characters used in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count_chars/
    // +       version: 804.1712
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: count_chars("Hello World!", 3);
    // *     returns 1: "Helo Wrd!"

    var histogram = new Object(), tmp_ar = new Array(), argc = arguments.length, key, i, code, mode;

    if (argc == 1) {
        mode = 0;
    }

    mode_even = (mode & 1) == 0;
    if (mode_even) {
        for (i = 1; i < 256; ++i) {
            histogram[i] = 0;
        }
    }

    for (i = 0; i < str.length; ++i) {
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
            tmp_ar.push(String.fromCharCode(key));
        }
        return tmp_ar.join("");
    }
}// }}}

// {{{ crc32
function crc32 ( str ) {
    // Calculates the crc32 polynomial of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_crc32/
    // +       version: 804.1712
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: T0bsn
    // -    depends on: utf8_encode
    // *     example 1: crc32('Kevin van Zonneveld');
    // *     returns 1: 1249991249

    str = utf8_encode(str);
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
}// }}}

// {{{ echo
function echo ( ) {
    // Output one or more strings
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_echo/
    // +       version: 805.821
    // +   original by: Philip Peterson
    // +   improved by: echo is bad
    // *     example 1: echo('Hello', 'World');
    // *     returns 1: null
    
    var doc_elem = document.createDocumentFragment();
    
    for( i = 0; i < echo.arguments.length; i++ ) {
        if( doc_elem.body && doc_elem.body.innerHTML ) {
            doc_elem.body.innerHTML = doc_elem.body.innerHTML + echo.arguments[i];
        } else if (doc_elem.write) {
            doc_elem.write( echo.arguments[i] );
        }
    }
    
    return null;
}// }}}

// {{{ explode
function explode( delimiter, string, limit ) {
    // Split a string by string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_explode/
    // +       version: 805.1715
    // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: kenneth
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: d3x
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
    // *     example 2: explode('=', 'a=bc=d', 2);
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
}// }}}

// {{{ html_entity_decode
function html_entity_decode( string ) {
    // Convert all HTML entities to their applicable characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_html_entity_decode/
    // +       version: 804.1712
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'

    var ret, tarea = document.createElement('textarea');
    tarea.innerHTML = string;
    ret = tarea.value;
    return ret;
}// }}}

// {{{ htmlentities
function htmlentities( s ){
    // Convert all applicable characters to HTML entities
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_htmlentities/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'

    var div = document.createElement('div');
    var text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}// }}}

// {{{ implode
function implode( glue, pieces ) {
    // Join array elements with a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_implode/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}// }}}

// {{{ join
function join( glue, pieces ) {
    // Alias of implode()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_join/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: implode
    // *     example 1: join(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return implode( glue, pieces );
}// }}}

// {{{ levenshtein
function levenshtein( str1, str2 ) {
    // Calculate Levenshtein distance between two strings
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_levenshtein/
    // +       version: 804.1712
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // *     example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    // *     returns 1: 3

    var s, l = (s = str1.split("")).length, t = (str2 = str2.split("")).length, i, j, m, n;
    if(!(l || t)) return Math.max(l, t);
    for(var a = [], i = l + 1; i; a[--i] = [i]);
    for(i = t + 1; a[0][--i] = i;);
    for(i = -1, m = s.length; ++i < m;){
        for(j = -1, n = str2.length; ++j < n;){
            a[(i *= 1) + 1][(j *= 1) + 1] = Math.min(a[i][j + 1] + 1, a[i + 1][j] + 1, a[i][j] + (s[i] != str2[j]));
        }
    }
    return a[l][t];
}// }}}

// {{{ ltrim
function ltrim ( str, charlist ) {
    // Strip whitespace (or other characters) from the beginning of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ltrim/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ltrim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld    '

    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+', 'g');
    return str.replace(re, '');
}// }}}

// {{{ md5
function md5 ( str ) {
    // Calculate the md5 hash of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_md5/
    // +       version: 804.1712
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://crestidg.com)
    // -    depends on: utf8_encode
    // *     example 1: md5('Kevin van Zonneveld');
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

    str = utf8_encode(str);
    x = ConvertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
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
}// }}}

// {{{ md5_file
function md5_file ( str_filename ) {
    // Calculates the md5 hash of a given file
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_md5_file/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: file_get_contents
    // -    depends on: md5
    // -    depends on: utf8_encode
    // *     example 1: md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '202cb962ac59075b964b07152d234b70'

    return md5(file_get_contents(str_filename));
}// }}}

// {{{ nl2br
function nl2br( str ) {
    // Inserts HTML line breaks before all newlines in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_nl2br/
    // +       version: 804.1714
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br/>\nvan<br/>\nZonneveld'

    return str.replace(/([^>])\n/g, '$1<br />\n');
}// }}}

// {{{ number_format
function number_format( number, decimals, dec_point, thousands_sep ) {
    // Format a number with grouped thousands
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_number_format/
    // +       version: 804.1712
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://crestidg.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)    
    // *     example 1: number_format(1234.5678, 2, '.', '');
    // *     returns 1: 1234.57     

    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}// }}}

// {{{ ord
function ord( string ) {
    // Return ASCII value of character
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ord/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ord('K');
    // *     returns 1: 75

    return string.charCodeAt(0);
}// }}}

// {{{ parse_str
function parse_str(str, array){
    // Parses the string into variables
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_parse_str/
    // +       version: 804.1712
    // +   original by: Cagri Ekin
    // +   improved by: Michael White (http://crestidg.com)
    // *     example 1: parse_str('first=foo&second=bar');
    // *     returns 1: { first: 'foo', second: 'bar' }
    // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.');
    // *     returns 2: { str_a: "Jack and Jill didn't see the well." }

    var glue1 = '=';
    var glue2 = '&';

    var array2 = str.split(glue2);
    var array3 = [];
    for(var x=0; x<array2.length; x++){
        var tmp = array2[x].split(glue1);
        array3[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' ');
    }

    if(array){
        array = array3;
    } else{
        return array3;
    }
}// }}}

// {{{ printf
function printf( ) {
    // Output a formatted string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_printf/
    // +       version: 804.1712
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://crestidg.com)
    // -    depends on: sprintf
    // *     example 1: printf("%01.2f", 123.1);
    // *     returns 1: 6

    var ret = sprintf.apply(this, arguments);
    document.write(ret);
    return ret.length;
}// }}}

// {{{ rtrim
function rtrim ( str, charlist ) {
    // Strip whitespace (or other characters) from the end of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rtrim/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: rtrim('    Kevin van Zonneveld    ');
    // *     returns 1: '    Kevin van Zonneveld'

    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}// }}}

// {{{ sha1
function sha1 ( str ) {
    // Calculate the sha1 hash of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sha1/
    // +       version: 804.1712
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // + namespaced by: Michael White (http://crestidg.com)
    // -    depends on: utf8_encode
    // *     example 1: sha1('Kevin van Zonneveld');
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

    str = utf8_encode(str);
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
}// }}}

// {{{ sha1_file
function sha1_file ( str_filename ) {
    // Calculate the sha1 hash of a file
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sha1_file/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: file_get_contents
    // -    depends on: sha1
    // *     example 1: sha1_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '40bd001563085fc35165329ea1ff5c5ecbdbbeef'

    var buf = file_get_contents(str_filename);
    return sha1(buf);
}// }}}

// {{{ soundex
function soundex( str ) {
    // Calculate the soundex key of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_soundex/
    // +       version: 804.1712
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'

    var i, j, l, r, p = isNaN(p) ? 4 : p > 10 ? 10 : p < 4 ? 4 : p,
    m = {BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6},
    r = (s = str.toUpperCase().replace(/[^A-Z]/g, "").split("")).splice(0, 1);
    for(i = -1, l = s.length; ++i < l;){
        for(j in m){
            if(j.indexOf(s[i]) + 1 && r[r.length-1] != m[j] && r.push(m[j])){
                break;
            }
        }
    }
    return r.length > p && (r.length = p), r.join("") + (new Array(p - r.length + 1)).join("0");
}// }}}

// {{{ split
function split( delimiter, string ) {
    // Split string into array by regular expression
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_split/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: explode
    // *     example 1: split(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

    return explode( delimiter, string );
}// }}}

// {{{ sprintf
function sprintf( ) {
    // Return a formatted string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sprintf/
    // +       version: 804.1712
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // + namespaced by: Michael White (http://crestidg.com)
    // *     example 1: sprintf("%01.2f", 123.1);
    // *     returns 1: 123.10

    var regex = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments, i = 0, format = a[i++];

    // pad()
    var pad = function(str, len, chr, leftJustify) {
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };

    // justify()
    var justify = function(value, prefix, leftJustify, minWidth, zeroPad) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
            value = pad(value, minWidth, ' ', leftJustify);
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
    var formatString = function(value, leftJustify, minWidth, precision, zeroPad) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad);
    };

    // finalFormat()
    var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type) {
        if (substring == '%%') return '%';

        // parse flags
        var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false;
        for (var j = 0; flags && j < flags.length; j++) switch (flags.charAt(j)) {
            case ' ': positivePrefix = ' '; break;
            case '+': positivePrefix = '+'; break;
            case '-': leftJustify = true; break;
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
            throw new Error('sprintf: (minimum-)width must be finite');
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
            case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad);
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
            case 'G':
                        {
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
}// }}}

// {{{ str_ireplace
function str_ireplace ( search, replace, subject ) {
    // Case-insensitive version of str_replace().
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_ireplace/
    // +       version: 804.1712
    // +   original by: Martijn Wieringa
    // +      input by: penutbutterjelly
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_ireplace('l', 'l', 'HeLLo');
    // *     returns 1: 'Hello'
    
    var i;
    
    if(!(replace instanceof Array)){
        replace=new Array(replace);
        if(search instanceof Array){//If search    is an array and replace    is a string, then this replacement string is used for every value of search
            while(search.length>replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }

    if(!(search instanceof Array))search=new Array(search);
    while(search.length>replace.length){//If replace    has fewer values than search , then an empty string is used for the rest of replacement values
        replace[replace.length]='';
    }

    if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
        for(k in subject){
            subject[k]=str_replace(search,replace,subject[k]);
        }
        return subject;
    }


    for(var k=0; k<search.length; k++){
        reg = new RegExp(search[k], 'gi');
        subject = subject.replace(reg, replace[k]);
    }


    return subject;
}// }}}

// {{{ str_pad
function str_pad( input, pad_length, pad_string, pad_type ) {
    // Pad a string to a certain length with another string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_pad/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + namespaced by: Michael White (http://crestidg.com)
    // *     example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
    // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
    // *     example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
    // *     returns 2: '------Kevin van Zonneveld-----'

    var half = '', pad_to_go;

    var str_pad_repeater = function(s, len){
            var collect = '', i;

            while(collect.length < len) collect += s;
            collect = collect.substr(0,len);

            return collect;
        };

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
}// }}}

// {{{ str_repeat
function str_repeat ( input, multiplier ) {
    // Repeat a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_repeat/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: str_repeat('-=', 10);
    // *     returns 1: '-=-=-=-=-=-=-=-=-=-='
    
    
    return new Array(multiplier+1).join(input); 
}// }}}

// {{{ str_replace
function str_replace(search, replace, subject) {
    // Replace all occurrences of the search string with the replacement string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_replace/
    // +       version: 804.1914
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // -    depends on: is_array
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'    
    
    var f = search, r = replace, s = subject;
    var ra = is_array(r), sa = is_array(s), f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

    while(j = 0, i--){
        while(s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f);
    }
     
    return sa ? s : s[0];
}// }}}

// {{{ str_rot13
function str_rot13( str ) {
    // Perform the rot13 transform on a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_rot13/
    // +       version: 804.1712
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // *     example 1: str_rot13('Kevin van Zonneveld');
    // *     returns 1: 'Xriva ina Mbaariryq'
    // *     example 2: str_rot13('Xriva ina Mbaariryq');
    // *     returns 2: 'Kevin van Zonneveld'

    return str.replace(/[A-Za-z]/g, function (c) {
        return String.fromCharCode((((c = c.charCodeAt(0)) & 223) - 52) % 26 + (c & 32) + 65);
    });
}// }}}

// {{{ str_split
function str_split ( f_string, f_split_length){
    // Convert a string to an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_split/
    // +       version: 805.211
    // +     original by: Martijn Wieringa
    // +     improved by: Brett Zamir
    // *         example 1: str_split('Hello Friend', 3);
    // *         returns 1: ['Hel', 'lo ', 'Fri', 'end']
 
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
}// }}}

// {{{ strcasecmp
function strcasecmp (f_string1, f_string2){
    // Binary safe case-insensitive string comparison
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strcasecmp/
    // +       version: 804.1712
    // +     original by: Martijn Wieringa
    // *         example 1: strcasecmp('Hello', 'hello');
    // *         returns 1: 0

    var string1 = f_string1.toLowerCase();
    var string2 = f_string2.toLowerCase();

    if(string1 > string2) {
      return 1;
    }
    else if(string1 == string2) {
      return 0;
    }

    return -1;
}// }}}

// {{{ strchr
function strchr ( haystack, needle, bool ) {
    // Alias of strstr()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strchr/
    // +       version: 804.1712
    // +   original by: Philip Peterson
    // -    depends on: strstr
    // *     example 1: strchr('Kevin van Zonneveld', 'van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: strchr('Kevin van Zonneveld', 'van', true);
    // *     returns 2: 'Kevin '
 
    return strstr( haystack, needle, bool );
}// }}}

// {{{ strcmp
function strcmp ( str1, str2 ) {
    // Binary safe string comparison
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strcmp/
    // +       version: 805.822
    // +   original by: _argos
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strcmp( 'waldo', 'Waldo' );
    // *     returns 1: 1
    // *     example 2: strcmp( 'Waldo', 'waldo' );
    // *     returns 2: -1
    // *     example 3: strcmp( 'waldo', 'waldo' );
    // *     returns 3: 0
    // *     example 4: strcmp( 'test', 'tomato' );
    // *     returns 4: -1

    var i = size1 = size2 = 0;
    
    for (i = 0; i < str1.length; ++i) {
        size1 += str1.charCodeAt(i);
    }

    for (i = 0; i < str2.length; ++i) {
        size2 += str2.charCodeAt(i);
    }
    
    return ( ( size1 == size2 ) ? 0 : ( ( size1 > size2 ) ? 1 : -1 ) );
}// }}}

// {{{ strip_tags
function strip_tags( str ){
    // Strip HTML and PHP tags from a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strip_tags/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strip_tags('Kevin <br />van <i>Zonneveld</i>');
    // *     returns 1: 'Kevin van Zonneveld'

    return str.replace(/<\/?[^>]+>/gi, '');
}// }}}

// {{{ stripos
function stripos ( f_haystack, f_needle, f_offset ){
    // Find position of first occurrence of a case-insensitive string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stripos/
    // +       version: 804.1712
    // +     original by: Martijn Wieringa
    // *         example 1: stripos('ABC', 'a');
    // *         returns 1: 0

    var haystack = f_haystack.toLowerCase();
    var needle = f_needle.toLowerCase();
    var index = 0;

    if(f_offset == undefined) {
        f_offset = 0;
    }

    if((index = haystack.indexOf(needle, f_offset)) > -1) {
        return index;
    }

    return false;
}// }}}

// {{{ stripslashes
function stripslashes( str ) {
    // Un-quote string quoted with addslashes()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stripslashes/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"

    return str.replace('/\0/g', '0').replace('/\(.)/g', '$1');
}// }}}

// {{{ stristr
function stristr( haystack, needle, bool ) {
    // Case-insensitive strstr()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stristr/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: stristr('Kevin van Zonneveld', 'Van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: stristr('Kevin van Zonneveld', 'VAN', true);
    // *     returns 2: 'Kevin '

    var pos = 0;

    pos = haystack.toLowerCase().indexOf( needle.toLowerCase() );
    if( pos == -1 ){
        return false;
    } else{
        if( bool ){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
}// }}}

// {{{ strlen
function strlen( string ){
    // Get string length
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strlen/
    // +       version: 805.1616
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19

    return ("" + string).length;
}// }}}

// {{{ strnatcmp
function strnatcmp ( f_string1, f_string2, f_version ) {
    // String comparisons using a &quot;natural order&quot; algorithm
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strnatcmp/
    // +       version: 805.1715
    // +   original by: Martijn Wieringa
    // + namespaced by: Michael White (http://crestidg.com)
    // -    depends on: strcmp
    // *     example 1: strnatcmp('Price 12.9', 'Price 12.15');
    // *     returns 1: -1
    // *     example 2: strnatcmp('Version 12.9', 'Version 12.15', true);
    // *     returns 2: -6
    // *     example 3: strnatcmp('Version 12.9', 'Version 12.15', false);
    // *     returns 3: -1

    if(f_version == undefined) {
        f_version = false;
    }

    var __strnatcmp_split = function( f_string ) {
            var result = new Array();
            var buffer = '';
            var chr = '';

            var text = true;

            for(var i = 0; i < f_string.length; i++){
                chr = f_string.substring(i, i + 1);

                if(chr.match(/[0-9]/)){
                    if(text){
                        if(buffer.length > 0){
                            result[result.length] = buffer;
                            buffer = '';
                        }

                        text = false;
                    }
                    buffer += chr;
                } else if((text == false) && (chr == '.') && (i < (f_string.length - 1)) && (f_string.substring(i + 1, i + 2).match(/[0-9]/))) {
                    result[result.length] = buffer;
                    buffer = '';
                } else {
                    if(text == false) {
                        if(buffer.length > 0) {
                            result[result.length] = parseInt(buffer);
                            buffer = '';
                        }
                        text = true;
                    }
                    buffer += chr;
                }
            }

            if(buffer.length > 0) {
                if(text) {
                    result[result.length] = buffer;
                } else {
                    result[result.length] = parseInt(buffer);
                }
            }

            return result;
        };

    var array1 = __strnatcmp_split(f_string1);
    var array2 = __strnatcmp_split(f_string2);

    var len = array1.length;
    var text = true;

    var result = -1;
    var r = 0;

    if(len > array2.length) {
        len = array2.length;
        result = 1;
    }

    for(i = 0; i < len; i++) {
        if(isNaN(array1[i])) {
            if(isNaN(array2[i])){
                text = true;

                if((r = strcmp(array1[i], array2[i])) != 0) {
                    return r;
                }
            }
            else if(text){
                return 1;
            } else {
                return -1;
            }
        } else if(isNaN(array2[i])){
            if(text) {
                return -1;
            } else{
                return 1;
            }
        }else  {
            if(text || f_version){
                if((r = (array1[i] - array2[i])) != 0){
                    return r;
                }
            } else {
                if((r = strcmp(array1[i].toString(), array2[i].toString())) != 0) {
                    return r;
                }
            }

            text = false;
        }
    }

    return result;
}// }}}

// {{{ strpbrk
function strpbrk( haystack, char_list ) {
    // Search a string for any of a set of characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpbrk/
    // +       version: 804.1712
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // *     example 1: strpbrk('This is a Simple text.', 'is');
    // *     returns 1: 'is is a Simple text.'

    var lon = haystack.length;
    var lon_search = char_list.length;
    var ret = false;
    var stack = '';

    if(lon >= lon_search) {
        if(lon == lon_search) {
            if(haystack == char_list){
                ret = haystack;
            }
        } else {
            j = 0;
            i = 0;
            while(i < lon_search && j < lon && !ret) {
                if(char_list[i] == haystack[j]) {
                    i++;
                    if(i == lon_search) ret = true;
                }
                j++;
            }
            if(ret){
                for(i = (j-lon_search); i < lon; i++){
                    stack += haystack[i];
                }
            }
            if(stack != ''){
                ret = stack;
            }
        }
    }
    return ret;
}// }}}

// {{{ strpos
function strpos( haystack, needle, offset){
    // Find position of first occurrence of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14

    var i = haystack.indexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strrev
function strrev( string ){
    // Reverse a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrev/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strrev('Kevin van Zonneveld');
    // *     returns 1: 'dlevennoZ nav niveK'

    var ret = '', i = 0;

    for ( i = string.length-1; i >= 0; i-- ){
       ret += string.charAt(i);
    }

    return ret;
}// }}}

// {{{ strripos
function strripos( haystack, needle, offset){
    // Find position of last occurrence of a case-insensitive string in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strripos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strripos('Kevin van Zonneveld', 'E');
    // *     returns 1: 16

    var i = haystack.toLowerCase().lastIndexOf( needle.toLowerCase(), offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strrpos
function strrpos( haystack, needle, offset){
    // Find position of last occurrence of a char in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrpos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16

    var i = haystack.lastIndexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strstr
function strstr( haystack, needle, bool ) {
    // Find first occurrence of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strstr/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strstr('Kevin van Zonneveld', 'van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: strstr('Kevin van Zonneveld', 'van', true);
    // *     returns 2: 'Kevin '

    var pos = 0;

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
}// }}}

// {{{ strtolower
function strtolower( str ) {
    // Make a string lowercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtolower/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtolower('Kevin van Zonneveld');
    // *     returns 1: 'kevin van zonneveld'

    return str.toLowerCase();
}// }}}

// {{{ strtoupper
function strtoupper( str ) {
    // Make a string uppercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtoupper/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtoupper('Kevin van Zonneveld');
    // *     returns 1: 'KEVIN VAN ZONNEVELD'

    return str.toUpperCase();
}// }}}

// {{{ substr
function substr( f_string, f_start, f_length ) {
    // Return part of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr/
    // +       version: 804.1712
    // +     original by: Martijn Wieringa
    // *         example 1: substr('abcdef', 0, -1);
    // *         returns 1: 'abcde'

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
}// }}}

// {{{ substr_count
function substr_count( haystack, needle, offset, length ) {
    // Count the number of substring occurrences
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr_count/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: substr_count('Kevin van Zonneveld', 'K', 1);
    // *     returns 2: 0
    // *     example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false

    var pos = 0, cnt = 0;

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
}// }}}

// {{{ trim
function trim( str, charlist ) {
    // Strip whitespace (or other characters) from the beginning and end of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_trim/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'

    var whitespace;
    
    if(!charlist){
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    } else{
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    }
  
	for (var i = 0; i < str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
		str = str.substring(i);
		break;
		}
	}
	for (i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
    	}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}// }}}

// {{{ ucfirst
function ucfirst( str ) {
    // Make a string&#039;s first character uppercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ucfirst/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'

    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1, str.length-1);
}// }}}

// {{{ ucwords
function ucwords( str ) {
    // Uppercase the first character of each word in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ucwords/
    // +       version: 804.1712
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: _argos
    // *     example 1: ucwords('kevin van zonneveld');
    // *     returns 1: 'Kevin Van Zonneveld'

    return str.replace(/^(.)|\s(.)/g, function ( $1 ) { return $1.toUpperCase ( ); } );
}// }}}

// {{{ wordwrap
function wordwrap( str, int_width, str_break, cut ) {
    // Wraps a string to a given number of characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_wordwrap/
    // +       version: 804.1715
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Nick Callen
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    // *     returns 1: 'Kevin |van |Zonnev|eld'
    
    var m = int_width, b = str_break, c = cut;
    var i, j, l, s, r;
    
    if(m < 1) {
        return str;
    }
    for(i = -1, l = (r = str.split("\n")).length; ++i < l; r[i] += s) {
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        }
    }
    
    return r.join("\n");
}// }}}

// {{{ base64_decode
function base64_decode( data ) {
    // Decodes data encoded with MIME base64
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base64_decode/
    // +       version: 805.821
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    
    // -    depends on: utf8_decode
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'
    
    // mozilla has this native 
    // - but breaks in 2.0.0.12!
    //if (typeof window['btoa'] == 'function') {
    //    return btoa(data);
    //}
    
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, dec = "", tmp_arr = [];

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
    dec = utf8_decode(dec);
    
    return dec;
}// }}}

// {{{ base64_encode
function base64_encode( data ) {
    // Encodes data with MIME base64
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base64_encode/
    // +       version: 805.821
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)        
    // -    depends on: utf8_encode
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='

    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof window['atob'] == 'function') {
    //    return atob(data);
    //}
        
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = ac = 0, enc="", tmp_arr = [];
    data = utf8_encode(data);
    
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
}// }}}

// {{{ http_build_query
function http_build_query( formdata, numeric_prefix, arg_separator ) {
    // Generate URL-encoded query string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_http_build_query/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   improved by: Michael White (http://crestidg.com)
    // *     example 1: http_build_query({ foo: 'bar', baz: 'boom', cow: 'milk', php: 'hypertext processor' }, '', '&amp;');
    // *     returns 1: 'foo=bar&amp;baz=boom&amp;cow=milk&amp;php=hypertext+processor'
    // *     example 2: http_build_query({0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', cow: 'milk', php :'hypertext processor'}, 'myvar_');
    // *     returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk&php=hypertext+processor'

    var key, use_val, use_key, i = 0, tmp_arr = [];

    if(!arg_separator){
        arg_separator = '&';
    }

    for(key in formdata){
        use_key = encodeURIComponent(key);
        use_val = encodeURIComponent((formdata[key].toString()));
        use_val = use_val.replace(/%20/g, '+');

        if(numeric_prefix && !isNaN(key)){
            use_key = numeric_prefix + i;
        }
        tmp_arr[i] = use_key + '=' + use_val;
        i++;
    }

    return tmp_arr.join(arg_separator);
}// }}}

// {{{ urldecode
function urldecode( str ) {
    // Decodes URL-encoded string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_urldecode/
    // +       version: 804.1715
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    
    var ret = str;
       
    ret = ret.replace(/\+/g, '%20');
    ret = decodeURIComponent(ret);
    ret = ret.toString();

    return ret;
}// }}}

// {{{ urlencode
function urlencode( str ) {
    // URL-encodes string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_urlencode/
    // +       version: 804.1715
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
                                     
    var ret = str;
    
    ret = ret.toString();
    ret = encodeURIComponent(ret);
    ret = ret.replace(/%20/g, '+');

    return ret;
}// }}}

// {{{ empty
function empty( mixed_var ) {
    // Determine whether a variable is empty
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_empty/
    // +       version: 804.1712
    // +   original by: Philippe Baumann
    // *     example 1: empty(null);
    // *     returns 1: true

    return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false  ||  ( is_array(mixed_var) && mixed_var.length === 0 ) );
}// }}}

// {{{ floatval
function floatval(mixed_var) {
    // +   original by: Michael White (http://crestidg.com)
    // %        note 1: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
    // *     example 1: floatval('150.03_page-section');
    // *     returns 1: 150.03
    // *     example 2: floatval('page: 3');
    // *     returns 2: 0
    // *     example 2: floatval('-50 + 8');
    // *     returns 2: -50

    return (parseFloat(mixed_var) || 0);
}// }}}

// {{{ intval
function intval( mixed_var, base ) {
    // Get the integer value of a variable
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_intval/
    // +       version: 805.1421
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: stensi
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42

    var tmp;

    if( typeof( mixed_var ) == 'string' ){
        tmp = parseInt(mixed_var);
        if(isNaN(tmp) || !isFinite(tmp)){
            return 0;
        } else{
            return tmp.toString(base || 10);
        }
    } else if( typeof( mixed_var ) == 'number' && isFinite(mixed_var) ){
        return Math.floor(mixed_var);
    } else{
        return 0;
    }
}// }}}

// {{{ is_array
function is_array( mixed_var ) {
    // Finds whether a variable is an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: is_array('Kevin van Zonneveld');
    // *     returns 2: false

    return ( mixed_var instanceof Array );
}// }}}

// {{{ is_null
function is_null( mixed_var ){
    // Finds whether a variable is NULL
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_null/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_null('23');
    // *     returns 1: false
    // *     example 2: is_null(null);
    // *     returns 2: true

    return ( mixed_var === null );
}// }}}

// {{{ is_numeric
function is_numeric( mixed_var ) {
    // Finds whether a variable is a number or a numeric string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_numeric/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true

    return !isNaN( mixed_var );
}// }}}

// {{{ is_object
function is_object( mixed_var ){
    // Finds whether a variable is an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_object/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   improved by: Michael White (http://crestidg.com)
    // *     example 1: is_object('23');
    // *     returns 1: false
    // *     example 2: is_object({foo: 'bar'});
    // *     returns 2: true
    // *     example 3: is_object(null);
    // *     returns 3: false

    if(mixed_var instanceof Array) {
        return false;
    } else {
        return (mixed_var !== null) && (typeof( mixed_var ) == 'object');
    }
}// }}}

// {{{ is_string
function is_string( mixed_var ){
    // Find whether the type of a variable is string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_string/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_string('23');
    // *     returns 1: true
    // *     example 2: is_string(23.5);
    // *     returns 2: false

    return (typeof( mixed_var ) == 'string');
}// }}}

// {{{ isset
function isset(  ) {
    // Determine whether a variable is set
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_isset/
    // +       version: 804.1713
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: FremyCompany
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

    var a=arguments; var l=a.length; var i=0;
    
    while ( i!=l ) {
        if (typeof(a[i])=='undefined') { 
            return false; 
        } else { 
            i++; 
        }
    }
    
    return true;
}// }}}

// {{{ print_r
function print_r( array, return_val ) {
    // Prints human-readable information about a variable
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_print_r/
    // +       version: 805.822
    // +   original by: Michael White (http://crestidg.com)
    // *     example 1: print_r(1, true);
    // *     returns 1: 1

    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if(cur_depth > 0)
            cur_depth++;

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";

        if (obj instanceof Array) {
            str += "Array\n" + base_pad + "(\n";
            for (var key in obj) {
                if (obj[key] instanceof Array) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else {
            str = obj.toString();
        };

        return str;
    };

    var repeat_char = function (len, pad_char) {
        var str = "";
        for(var i=0; i < len; i++) { str += pad_char; };
        return str;
    };
    output = formatArray(array, 0, pad_val, pad_char);

    if (return_val !== true) {
        document.write("<pre>" + output + "</pre>");
        return true;
    } else {
        return output;
    }
}// }}}

// {{{ serialize
function serialize( inp ) {
    // Generates a storable representation of a value
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_serialize/
    // +       version: 804.1712
    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'

    var getType = function( inp ) {
        var type = typeof inp, match;
        if(type == 'object' && !inp)
        {
            return 'null';
        }
        if (type == "object") {
            if(!inp.constructor)
            {
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

    var type = getType(inp);
    var val;
    switch (type) {
        case "undefined":
            val = "N";
            break;
        case "boolean":
            val = "b:" + (inp ? "1" : "0");
            break;
        case "number":
            val = (Math.round(inp) == inp ? "i" : "d") + ":" + inp;
            break;
        case "string":
            val = "s:" + inp.length + ":\"" + inp + "\"";
            break;
        case "array":
            val = "a";
        case "object":
            if (type == "object") {
                var objname = inp.constructor.toString().match(/(\w+)\(\)/);
                if (objname == undefined) {
                    return;
                }
                objname[1] = serialize(objname[1]);
                val = "O" + objname[1].substring(1, objname[1].length - 1);
            }
            var count = 0;
            var vals = "";
            var okey;
            for (key in inp) {
                okey = (key.match(/^[0-9]+$/) ? parseInt(key) : key);
                vals += serialize(okey) +
                        serialize(inp[key]);
                count++;
            }
            val += ":" + count + ":{" + vals + "}";
            break;
    }
    if (type != "object" && type != "array") val += ";";
    return val;
}// }}}

// {{{ unserialize
function unserialize ( inp ) {
    // Creates a PHP value from a stored representation
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_unserialize/
    // +       version: 804.1712
    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // +   improved by: Pedro Tainha (http://www.pedrotainha.com)
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
            objout += "" + key + "=objprops[0]['" + key + "'];";
        }
        objout += "}val=new " + objname + "();";
        eval(objout);
        break;
    default:
        errormsg = "invalid input type";
    }
    return (arguments.length == 1 ? val : [val, rest]);
}// }}}

// {{{ var_export
function var_export ( mixed_expression, bool_return ) {
    // Outputs or returns a parsable string representation of a variable
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_var_export/
    // +       version: 805.1715
    // +   original by: Philip Peterson
    // -    depends on: echo
    // *     example 1: var_export(null);
    // *     returns 1: null

    var __pad_lines = function ( x ) {
        return x.split("\n").join("\n  ");
    };
    
    var retstr = "";
    
    if(mixed_expression instanceof Array) {
        var iret = "";
        for(i in mixed_expression) {
            iret=iret+"\n"+var_export(i,true)+" => "+var_export(mixed_expression[i], true)+",";
        }
        retstr = "array ("+__pad_lines(iret)+"\n)";
    } else if( mixed_expression === null) {
        retstr = "NULL";
    } else {
        retstr = (!isNaN( mixed_expression )) ? mixed_expression : "'" + mixed_expression.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0") + "'";
    }
    
    if(bool_return != true) {
        echo(retstr);
        return null;
    }
    else {
        return retstr;
    }
}// }}}

// {{{ utf8_decode
function utf8_decode ( str_data ) {
    // Converts a string with ISO-8859-1 characters encoded with UTF-8   to single-byte
    // ISO-8859-1
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_utf8_decode/
    // +       version: 805.821
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [], i = ac = c = c1 = c2 = 0;

    while ( i < str_data.length ) {
        c = str_data.charCodeAt(i);
        if (c < 128) {
            tmp_arr[ac++] = String.fromCharCode(c); 
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    
    return tmp_arr.join('');
}// }}}

// {{{ utf8_encode
function utf8_encode ( str_data ) {
    // Encodes an ISO-8859-1 string to UTF-8
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_utf8_encode/
    // +       version: 805.821
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)        
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    str_data = str_data.replace(/\r\n/g,"\n");
    var tmp_arr = [], ac = 0;

    for (var n = 0; n < str_data.length; n++) {
        var c = str_data.charCodeAt(n);
        if (c < 128) {
            tmp_arr[ac++] = String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            tmp_arr[ac++] = String.fromCharCode((c >> 6) | 192);
            tmp_arr[ac++] = String.fromCharCode((c & 63) | 128);
        } else {
            tmp_arr[ac++] = String.fromCharCode((c >> 12) | 224);
            tmp_arr[ac++] = String.fromCharCode(((c >> 6) & 63) | 128);
            tmp_arr[ac++] = String.fromCharCode((c & 63) | 128);
        }
    }
    
    return tmp_arr.join('');
}// }}}
