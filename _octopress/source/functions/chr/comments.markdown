*[Kris Brixon]()* on 2008-01-02 13:42:52  
Here are a few links to a similar effort from ColdFusion. You may be able to pick up a few functions they wrote.

http://cfjs.riaforge.org/
http://www.shlomygantz.com/customtags/CFMLjsLibrary/CfmljsLibrary_beta.htm
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-03 18:44:10  
@ Kris: Thanks Kris that's very useful!
---------------------------------------
*[fumbling fellow]()* on 2008-03-14 23:38:07  
Thanks for all the hard work!
This will be very useful to me.

I can't get your test page to work.
Seems like I had green cells a couple of weeks ago, but now nothing is happening :-(
---------------------------------------
*[fumbling fellow]()* on 2008-03-15 00:26:30  
Looks like the code is working, the css file is not found so the cells are not changing color.
http://kevin.vanzonneveld.net/css/pj_tester.css

I found the function I was looking for though.
print_r
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-15 11:51:12  
@ fumbling fellow: Yeah I recently moved the css to a separate file, but I messed up apparently. Thank you, fixed it now!
---------------------------------------
*[Roland Hentschel]()* on 2009-06-30 09:48:14  
just a simple way to use this script:
 
```
function charmap(font,size) {
	if (font==null) font="Arial";
	if (size==null) size=24;
	document.write("<style>\n"+
	"* { font:normal bold "+size+"pt "+font+"; }\n"+
	"td { text-align:center; }\n"+
	"</style>\n");
	document.write("<table>\n");
	for (x=0;x<16;x++) {
		document.write("<tr>\n");
		for (y=0;y<16;y++) {
			document.write("<td>"+chr(16*x+y)+"</td>\n");
		}
		document.write("</tr>\n");
	}
	document.write("</table>\n");
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-06-30 11:36:07  
Nice one, thanks Roland. Used the same approach in my LGPL Firefox Unicode chart view extension - https://addons.mozilla.org/en-US/firefox/addon/5235 (I should make an HTML 5 version of that one if somebody else doesn't, now that SQL can be used client-side to store character descriptions.)

Anyhow, Kevin, what do you think of a public wiki for demos of code like this one? We keep getting asked for demos, so maybe our users would like a little workspace for stuff like this (or derivatives of the functions, etc.). Wouldn't replace the compiler, and central review is still helpful, but we might see others be able to help out a little with introduction, offering special tricks, etc. What do you think?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-03 13:55:28  
@ Brett Zamir: Ok i'm definitely cool with that. Just need to figure out what wiki to use and how to nicely integrate it into this site (cakephp). any suggestions are welcome
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-04 01:16:43  
I'm quite partial to Mediawiki. Well-tested, familiar syntax (at least among wikis), easy to install, extensible, well-supported by the community, etc. See http://www.mediawiki.org/wiki/Download and links on the page for 'how-to' articles such as customizing the logo, etc. (e.g., http://www.mediawiki.org/wiki/Manual:Skins and  http://www.mediawiki.org/wiki/Manual:Gallery_of_user_styles )
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-08 16:30:28  
@ Brett Zamir: Mediawiki it is! I installed a basic version in /wiki. Will link to it from the navigation once we have some goodness to show for it.
---------------------------------------
