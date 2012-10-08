*[Ole Vrijenhoek](www.nervous.nl)* on 2009-04-25 20:09:31  
I did some reaearch for this function,
in php it uses linebreaks and stuff...
I fixed it with this function

```
// author: Ole Vrijenhoek
// sources: http://www.herongyang.com/encoding/UUEncode-PHP-Implementation.html
//          http://en.wikipedia.org/wiki/Uuencode
// depends on is_scalar()

function convert_uuencode(str){

        // shortcut
        var char = function(c) {
            return String.fromCharCode(c);
        };

        if(!str || str=="") {
            return char(0);
        } else if(!is_scalar(str)) {
            return false;
        }

        var c = 0, u = 0, i = 0, a = 0
        var encoded = "", tmp1 = "", tmp2 = "", bytes = {}, b = {};
        var b0 = 0, b1 = 0, b2 = 0, b3 = 0;

        // divide string into chunks of 45 characters
        var chunk = function() {
            bytes = str.substr(u, 45);
            for(i in bytes) {
                bytes[i] = bytes[i].charCodeAt(0);
            }
            if(bytes.length != 0) {
                return bytes.length;
            } else {
                return 0;
            }
        };
        
        while(chunk() !== 0) {
            c = chunk();
            u += 45;

            while(c % 3) {
                bytes[c++] = char(0);
            }

            // New line encoded data starts with number of bytes encoded.
            encoded += char(c+32);

            // Convert each char in bytes[] to a byte
            for(i in bytes) {
                tmp1 = bytes[i].charCodeAt(0).toString(2);
                while(tmp1.length < 8) {
                    tmp1 = "0" + tmp1;
                }
                tmp2 += tmp1;
            }

            for(i=0; i<=(tmp2.length/6)-1; i++) {
                tmp1 = tmp2.substr(a, 6);
                if(tmp1 == "000000") {
                    encoded += char(96);
                } else {
                    encoded += char(parseInt(tmp1, "2")+32);
                }
                a += 6;
            }

            encoded += "\n";
        }
        
    // Add termination characters
    encoded += char(96)+"\n";

    return encoded;
}
```
---------------------------------------
*[Ole Vrijenhoek](www.nervous.nl)* on 2009-04-26 15:57:01  
hm, found a bug XD
```
function convert_uuencode(str){

    // shortcut
    var char = function(c) {
        return String.fromCharCode(c);
    };

    if(!str || str=="") {
        return char(0);
    } else if(!is_scalar(str)) {
        return false;
    }

    var c = 0, u = 0, i = 0, a = 0
    var encoded = "", tmp1 = "", tmp2 = "", bytes = {};

    // divide string into chunks of 45 characters
    var chunk = function() {
        bytes = str.substr(u, 45);
        for(i in bytes) {
            bytes[i] = bytes[i].charCodeAt(0);
        }
        if(bytes.length != 0) {
            return bytes.length;
        } else {
            return 0;
        }
    };
        
    while(chunk() !== 0) {
        c = chunk();
        u += 45;

        // New line encoded data starts with number of bytes encoded.
        encoded += char(c+32);

        // Convert each char in bytes[] to a byte
        for(i in bytes) {
            tmp1 = bytes[i].charCodeAt(0).toString(2);
            while(tmp1.length < 8) {
                tmp1 = "0" + tmp1;
            }
            tmp2 += tmp1;
        }

        while(tmp2.length % 6) {
            tmp2 = tmp2 + "0";
        }

        for(i=0; i<=(tmp2.length/6)-1; i++) {
            tmp1 = tmp2.substr(a, 6);
            if(tmp1 == "000000") {
                encoded += char(96);
            } else {
                encoded += char(parseInt(tmp1, "2")+32);
            }
            a += 6;
        }
        a = 0, tmp2 = "";
        encoded += "\n";
    }
        
    // Add termination characters
    encoded += char(96)+"\n";

    return encoded;
}
```
---------------------------------------
*[????? ????? ???](http://an3m1.com/)* on 2012-04-10 09:51:54  
I agree it is a very informative article and I actually enjoy reading good stuff unlike all the crap out there on the internet 
---------------------------------------
