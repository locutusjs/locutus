*[frame]()* on 2008-11-14 21:07:50  
The function file_exists isn't avaiable in php.js.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-14 21:21:45  
@ frame: But it is, what link are you using?
---------------------------------------
*[frame]()* on 2008-11-18 01:36:29  
Do you have updated the link? I downloaded the lib some time before and the function was not included..  now it is o.O 

Another Bug?: The security code i typed in was not valid.. for 3 times.. and also did not reload to another code.. always the same..
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-18 12:25:44  
@ frame: This could happen if you are writing multiple comments at the same time, cause only one allowed security key is remembered per user. Could this be your case as well?
---------------------------------------
*[James 'Skateside' Long](http://www.sk80.co.uk)* on 2010-05-22 03:56:19  
Hi guys

This is my first contribution to php.js, but I feel that it's an important one.

Firstly, Wikipedia (http://en.wikipedia.org/wiki/Xmlhttprequest) assures us that there are a few more ActiveXObject parameters that can be tried to allow older versions of MSIE to use this function. This can be easily fixed by replacing the ternary opperator on line 14 with a self-executing function to try as many things as possible.

Secondly, checking an absolute URL offline in Firefox throws an NS_ERROR_FAILURE error. I think the best solution to this is to check whether the file location is an absolute reference and whether or not the script is being run online. If the reference is absolute but the script is being run offline, just assume the file exists.

Finally, any status returned that's between 200 and 300 is technically a sucessfull response.

So, with all these in mind, I'd like to propose the following function as the new file_exists(). Please note that I've tweaked this so that it only returns true or false so I can use it in my own scripts - feel free to add your own error handling to the function.

```
function file_exists(url) {

	// Fire up the AJAX function
	var req = (function() {
		if (typeof XMLHttpRequest == "function") {
			return new XMLHttpRequest();
		} else {
			XMLHttpRequest = function () {
				try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}catch(e){};
				try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}catch(e){};
				try {return new ActiveXObject("Msxml2.XMLHTTP");}catch(e){};
				return false;
			};
		}
	}());

	// If we can't use AJAX, or we're offline, we'll have to assume that the image is fine until proved otherwise
	if (!req || (url.match(/https?:\/\//i) && !window.location.href.match(/https?:\/\//i))) {return true;}

	// Send a 'HEAD' request since it's faster than 'GET' and 'POST'
	req.open('HEAD', url, false);
	req.send(null);

	// Any status in the 200 range is a successful request
	return (req.status >= 200 && req.status < 300);
}
```
---------------------------------------
*[James 'Skateside' Long](http://www.sk80.co.uk)* on 2010-05-22 04:00:21  
Blast! Sorry for the double-post but I've just realise that regular expression should only check the beginning of the string so it should be:
/^https?:\/\//i
---------------------------------------
*[Felipe]()* on 2011-12-21 20:36:00  
Funny
---------------------------------------
*[Ali.MD](ali.md)* on 2012-01-06 05:32:30  
its wrong .
you load content of file to check its exist ?!?!
it can very slow in big files, even in 'HEAD' method. (except in nginx servers)
why you don't write an optional php server site script too boost performance and full php feature ?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-01-06 09:46:43  
Hello Ali.MD,

There are indeed client-side uses for checking the existence of a file (though probably adapting this function to accept an asynchronous callback). For example, particularly if your application is interacting with other sites---such as allowing the user to access an API with JSONP or HTML5 cross-domain access (as I was developing in making a site-independent Mediawiki browser client), one might wish to know whether a certain file exists (e.g., to decide the coloring of a link to a wiki page).

The synchronous part of the function is the real problem here, and there is already a disclaimer in the function's notes about the function being for study purposes.

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-01-06 10:24:35  
To add clarification to my last post regarding your point, using PHP as a proxy will add EXTRA time if you have an Ajax-based application. And even regarding PHP's extra features, HTML5 apps nowadays are doing more of the things you can do on the server (there may even be a standard way to run a proxy on the client-side in the future, with user permission, letting you build your own browser in HTML5).
---------------------------------------
