*[XoraX]()* on 2008-04-28 11:27:30  
```
dirname('/dir/test/'); // output /dir
```
so :
```
return path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/, '');
```
http://www.xorax.info/
;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-28 17:28:22  
@ Xorax: Cool, thank you!
---------------------------------------
*[Philip]()* on 2008-04-29 08:55:40  
Question: does it work for things with ../ in it ?  Does the PHP version do it, for that matter?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-29 21:34:17  
@ Philip: Judging by the rexeg, it looks to me like dots are handled just like normal characters. So /etc/vsftpd/../vsftpd.conf should return /etc/vsftpd/..
For relative paths there's the function realpath in PHP. Maybe we should port that as well?
---------------------------------------
*[Michael]()* on 2009-03-03 18:54:07  
```
function realpath(path) {
   return path.substring(0, path.lastIndexOf('/')) + '/';
}
```
gets for me the realpath for any file.

dirname('/myfiles/cache/temp/');
should return '/myfiles/cache/temp/', so php does it.
Or my I wrong?

But dirname('/myfiles/cache/temp/thefile.txt');
return the right dirname.

Regards Michael
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-04 15:05:04  
@ Michael: In php, realpath is used to make an absolute path, based on a relative one:

e.g.: '../' becomes /tmp/ if your pwd is /tmp/abc/

If you'd want to do that in javascript, you'd have to base realpath on the location.href or something. 

I haven't figured out yet if that would be useful / desirable or not.
---------------------------------------
*[Michael]()* on 2009-03-04 16:07:17  
@ Kevin: jepp I understand.
So here's a newer function:
```
function realpath(path) {
    var base = '', port = '', parts = [];

    /**
     * Split the given path into port and path
     */
    function urisplit(p) {
        if (p.substring(0, 7).toLowerCase() === 'http://' || p.substring(0, 7).toLowerCase() === 'file://' || p.substring(0, 7).toLowerCase() === 'ftps://') {
            base = p.substring(7, p.length);
            port = p.substring(0, 7);
        } else if (p.substring(0, 8).toLowerCase() === 'https://') {
            base = p.substring(8, p.length);
            port = p.substring(0, 8);
        } else if (p.substring(0, 6).toLowerCase() === 'ftp://') {
            base = p.substring(6, p.length);
            port = p.substring(0, 6);
        }
    }

    /**
     * Make a relative path to an absolute
     * @param {String} s: source path
     * @param {String} r: relative path
     */
    function abspath(s, r) {
        var a = 0, add = '', arr = [], cnt = 0, num = 0, ret = '';
        if (r.substring(0, 2) == './') {
            r = r.substring(2, r.length);
        }
        if (r !== '') {
            arr = r.split('/');
            num = arr.length;
            for (a = 0; a &lt; num; a++) {
                if (arr[a] !== '') {
                    if (arr[a] !== '..') {
                        add += arr[a] + '/';
                    } else {
                        cnt++;
                    }
                }
            }
        }
        if (s !== '') {
            arr = s.split('/');
            num = (arr.length - cnt);
            for (a = 0; a &lt; num; a++) {
                if (arr[a] !== '') {
                    ret += arr[a] + '/';
                }
            }
            ret += add;
        }
        return ret;
    }

    /* check for the port */
    urisplit(path);
    /* path has no port: perhabs relative */
    if (port == '') {
        base = window.location.href;
        base = base.substring(0, base.lastIndexOf('/')) + '/';
        urisplit(base);
        base = abspath(base, path);
    }
    else {
        alert(base);
        base = path.substring(0, path.lastIndexOf('/')) + '/';
        urisplit(base);
    }
    path = port + base;
    return path;
}
```

But this would only work if your path like something './../path' or './path/' or '/path' or simple 'path'
---------------------------------------
*[mk.keck]()* on 2009-03-05 10:44:56  
My previous function was a bit overkilled so I've made a better one:

```
function realpath(path) {
    var p = 0, arr = [];
    var r = window.location.href;
    if (path.indexOf('://') !== -1) {
        p = 1;
    }
    if (!p) {
        path = r.substring(0, r.lastIndexOf('/') + 1)
             + path;
    }
    arr = path.split('/');
    path = [];
    for (var k in arr) {
        if (arr[k] == '.') {
            continue;
        }
        if (arr[k] == '..') {
            path.pop();
        } else {
            if (k &lt; 2 || arr[k] !== '') {
                path.push(arr[k]);
            }
        }
    }
    return path.join('/');
}
```

How it works:
```
url = 'this/is/../a/./test/.///is';
url = realpath(url);
alert(url);
```
will alert something like:
'http://yourhost.tld/yourpath/this/a/test/is'

I hope this would be good reason for simulate php's realpath function in javascript ;)
---------------------------------------
*[mk.keck]()* on 2009-03-06 16:04:03  
Hi again,

sorry: in last post there are some mistakes.
If your path leaves outside the window.location.href the path may be wrong.
I've never a seen a system, where you can leave the doc-root ;)

Now here's the final function and I hope it would be nice, that realpath is proted php.js ;)

```
/**
 * Expands all symbolic links and resolves references
 * to '/./', '/../' and extra '/' characters in the
 * input 'path' and return the canonicalized absolute
 * pathname
 * @param {String} path: the relative pathname
 * Note:
 *     The returned path is an url like e.g.
 *     'http://yourhost.tld/path/'
 */
function realpath(path) {
    var p = 0, arr = [];
    /* Save the root, if not given */
    var r = window.location.href;
    /* Avoid input failures */
    path = (path + '').replace('\\', '/');
    /* Check if there's a port in path (like 'http://') */
    if (path.indexOf('://') !== -1) {
        p = 1;
    }
    /* Ok, there's not a port in path, so let's take the root */
    if (!p) {
        path = r.substring(0, r.lastIndexOf('/') + 1) + path;
    }
    /* Explode the given path into it's parts */
    arr = path.split('/');
    /* The path is an array now */
    path = [];
    /* Foreach part make a check */
    for (var k in arr) {
        /* This is'nt really interesting */
        if (arr[k] == '.') {
            continue;
        }
        /* This reduces the realpath */
        if (arr[k] == '..') {
            /* But only if there more than 3 parts in the path-array.
             * The first three parts are for the uri */
            if (path.length &gt; 3) {
                path.pop();
            }
        }
        /* This adds parts to the realpath */
        else {
            /* But only if the part is not empty or the uri
             * (the first three parts ar needed) was not
             * saved */
            if ((path.length &lt; 2) || (arr[k] !== '')) {
                path.push(arr[k]);
            }
        }
    }
    /* Returns the absloute path as a string */
    return path.join('/');
}


/**
 * EXAMPLES
 * perhabs your window.location.href returns something like this:
 * 'http://www.myserver.com/js/rp/my.html'
 */

// Example 1
    path = 'this/is/../a/test/.//is';
    path = realpath(path);
    // result: 'http://www.myserver.com/js/rp/this/a/test/is'

// Example 2
    path = '../this/is/../a/test/.//is';
    path = realpath(path);
    // result: 'http://www.myserver.com/js/this/a/test/is'

// Example 3
    path = '../../../this/is/../a/test/.//is';
    path = realpath(path);
    // result: 'http://www.myserver.com/this/a/test/is'
    // note:   you can't leave your server ;)
```
---------------------------------------
*[Michael White](http://getsprink.com)* on 2009-05-11 21:39:11  
Hey,

I was working with the __DIR__() and __FILE__() stuff again today and I ran across a bug in this function.

If you pass something like 'filename.js' to this function in IE7 it will return 'filename.js' instead of '.'

To work around the behavior of IE I modified the function to the following:

[CDOE]
function dirname(path){
	var dir = path.replace(/\\/g,'/').replace(/\/[^\/]*\/?$/,'');
	return (dir && !dir == path) ? dir : '.';
}
```

The only change is to store the result of the regex in a variable and then check to see if the result is empty or if the result is equivalent to the original input.

The result of the regex should only be equal to the original input if using IE7 (6/8????) AND that original input was just the file name and contained no slashes or directory components.
---------------------------------------
*[starmonkey]()* on 2010-02-15 23:35:02  
Using this function:

```
dirname("/index.htm")
```

Gives me 

""

Using PHP (4):

```
echo "<br/>dirname test:".dirname("/index.htm");
```

Gives me "dirname test:/"
---------------------------------------
*[???? ????](http://an3m1.com/)* on 2012-04-23 14:50:14  
Write more, that’s all I have to say. Literally, it seems as though you relied on the video to make your point. You clearly know what you’re talking about, why waste your intelligence on just posting videos to your blog when you could be giving us something enlightening to read 

---------------------------------------
