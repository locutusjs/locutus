function uniqid() {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: dechex
    // %        note 1: Uses an internal counter (in php_js global) to avoid collision
    // %        note 2: Not perfect yet. We need to checkout the PHP source
    // %        note 2: to find out how they generate this exactly
    // %        note 2: but for now we have a uniqid that generates unique numbers
    // %        note 2: similar to PHP's uniqid
    // *     example 1: uniqid(); // delays for 2 seconds
    // *     returns 1: '49c6ad2705df7'
    
	// BEGIN REDUNDANT
	this.php_js = this.php_js || {};
	// END REDUNDANT

    if (!this.php_js.uniqid) {
        var date = new Date();
        this.php_js.uniqid = date.getTime()/1000;
    }

    this.php_js.uniqid++;

	return this.dechex(this.php_js.uniqid)+this.dechex('10243256');
}

// Replacement function below still needs some work, currently if you run it 3 times it returns
// 4a22bc4100000
// 4a22bc4100000
// 4a22bc4100000
//
// We can utilize the milliseconds in time, don't divide by 1000 so soon
//
//function uniqid(prefix, more_entropy, reduce_collision) {
//    // http://kevin.vanzonneveld.net
//    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
//    // +    revised by: Kankrelune (http://www.webfaktory.info/)
//    // %        note 1: Introduced a 3rd parameter: reduce_collision.
//    // %        note 1: Non-existent in PHP but uses an internal hash table
//    // %        note 1: to eliminate the possibility of collision within
//    // %        note 1: one process.
//    // %        note 1: This should only be used in rare cases cause
//    // %        note 1: keeping track of uniqids isn't free.
//    // *     example 1: uniqid();
//    // *     returns 1: '4a2027b600c14'
//    // *     example 2: uniqid('foo', true, true);
//    // *     returns 2: 'fooa20285b1cd361.31879087'
//    // *     example 3: uniqid('foo', false, true);
//    // *     returns 3: 'bara30285b1cd361'
//
//    prefix +=  '';
//
//    var now = new Date().getTime()/1000;
//    var sec = parseInt(now, 10);
//    var usec = Math.round((now-sec)*1000)/1000;
//    var uniqid = '';
//
//    var formatBase = function(value, reqWidth) {
//        value = (value >>> 0).toString(16);
//
//        if (reqWidth > value.length) {
//            return Array(1 + (reqWidth - value.length) >>> 0).join('0') + value;
//        }
//        if (reqWidth < value.length) {
//            return value.slice(0,reqWidth);
//        }
//
//        return value;
//    };
//
//    var getRandSeed = function() {
//        return [
//        0xa524,0x11f9b,0x11c3a,0x7f5e,0xbe31,0x585a,0xc9c9,0xbee7,0x6a0f,0x8cb2,
//        0x713e,0x11b99,0x4b7f,0x81f9,0x5e8d,0x15f34,0x57a9,0x10658,0x300d,0xa5da,
//        0x13150,0xdf23,0x31b5,0x16fbc,0x17260,0xda84,0x15d13,0x17dc4,0x6263,0x11909,
//        0x147ab,0x99b0,0xacf1,0x10da2,0xeb0f,0x9616,0x3e5b,0xd8dd,0x9331,0x13cb4,
//        0x6701,0x148e3,0x139a4,0x4e74,0x6e6c,0x1230a,0x73e9,0x4b87,0x49c2,0x1357a,
//        0x96cb,0x5010,0x9bc6,0x4588,0x9306,0x18107,0x1599f,0x7c97,0x16229,0x441c
//        ][Math.floor( ( Math.random( ) * this.length ) )];
//    };
//
//    var makeSeed = function(seed) {
//        return seed * ((((Math.random() * getRandSeed()) * (Math.random() * getRandSeed())) * getRandSeed()) * getRandSeed());
//    };
//
//    // for more entropy we add a float lower to 10
//    if(more_entropy) {
//        return prefix+formatBase(sec,8)+formatBase(makeSeed(usec),5)+(Math.random()*10).toFixed(8);
//    }
//
//    uniqid = prefix+formatBase(sec,8)+formatBase(makeSeed(usec),5);
//
//    if (reduce_collision) {
//        // BEGIN REDUNDANT
//        this.php_js = this.php_js || {};
//        // END REDUNDANT
//
//        if (!this.php_js.uniqids) {
//            this.php_js.uniqids = {};
//        }
//
//        if (this.php_js.uniqids[uniqid]) {
//            // Collision detected. Retry
//            return this.uniqid(prefix, more_entropy, reduce_collision);
//        } else {
//            this.php_js.uniqids[uniqid] = true;
//        }
//    }
//
//    return uniqid;
//}