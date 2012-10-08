*[Philip Peterson]()* on 2008-04-15 08:34:09  
I think this function is breaking php.js tester x.x
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-15 09:03:15  
Probably because it's executing a document.write from outside the real document, don't you think?
---------------------------------------
*[echo is bad]()* on 2008-04-16 18:17:48  
Using innerHTML on the BODY is very dangerous because you will break all references to HTMLElements that were done before !

I strongly recommend you to use document.createDocumentFragment.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-17 12:45:03  
@ echo is bad: I've never used that function, could you tell me:
- this is what the code Should look like?
- your name to include in the comment
---------------------------------------
*[Philip Peterson]()* on 2008-10-14 22:43:47  
From Ronsguide.com:

var docFragment = document.createDocumentFragment(); 
var txt = document.createTextNode(&quot;my text node&quot;); 
docFragment.appendChild(txt);

I guess probably something like that? (note that I am not &quot;echo is bad&quot;.)

Perhaps there should be an alias print() which would take one argument?  It may also be useful to handle \b things (I think php does this, but I'm not sure), which could be accomplished by inserting some text that appears nowhere else in the document (like [COD_92993] or something) and then modify the .innerHTML of the body by removing that [COD_92993] plus as many characters as there are \b's.
---------------------------------------
*[Philip Peterson]()* on 2008-10-18 03:07:05  
Also, this is a very pressing issue.  In Firefox, at the line

```
document.appendChild(elmt);
```

the script breaks, because it should be (for Firefox at least)

```
body.appendChild(elmt);
```
---------------------------------------
*[Philip Peterson]()* on 2008-10-18 03:15:22  
Aggh, sorry to clog up the comments, but there's also another problem: using createTextNode and then appending it like that converts all the special characters (e.g. tags) to HTML entities, thus reducing the usability of HTML formatting in echo().
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-20 18:24:08  
@ Philip Peterson: I've fixed the first issue, we still have to work on the second one.
---------------------------------------
*[waldo malqui silva]()* on 2008-10-29 03:18:11  
HI, Kevin I'm back from long tiime, I wanna know if is possible 2 things:

1.- Change mi nick (_argos) by my real name (Waldo Malqui Silva) :p
2.- If you have a TODO list of functions to port.


I'm happy to back and see more functions that in my last visit. I promise practice more my english :p

PD: I'm working in a customizable download for the project like mootools 1.11 (packagesÂ¿?) based on the PHP functions group :p
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-03 11:08:12  
@ Waldo Malqui Silva: Hi there! Good to have you back Waldo! I've changed all the _argos credits to Waldo Malqui Silva.

We track the 'unported' functions in SVN, which can also be viewed here:
http://trac.plutonia.nl/projects/phpjs/browser/trunk/_unported

Everytime we create a new function it's moved from ./_unported to ./functions

I'll be looking forward to seeing some of your excellent work again.  And your english i fine btw ;) ciao!
---------------------------------------
*[Nate]()* on 2008-11-13 16:16:35  
There are a few problems with this function.

1. There is a misspelling.  The code
```
            var txt = document.createTextNode(aarg);
```
Should read
```
            var txt = document.createTextNode(arg);
```

2. After
```
            docFragment.appendChild(txt); 
```
you need the line
```
            document.body.appendChild(docFragment);
```

I tested it with Firefox, IE, Opera, and Chrome (via wine), and they all worked (on Linux).

3. Like Philip Peterson pointed out, createTextNode() converts HTML to text.  I still think that innerHTML() is better because it actually works (and it's fast).  Though it might not be practical for this project, you could use the innerDOM script from http://innerdom.sourceforge.net/ to achieve the same effect as innerHTML() and adhere to &quot;standards.&quot;
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-14 00:58:19  
@ Nate: I believe it would upset a lot of peope if we were to use innerHTML (considering &quot;echo is bad&quot;'s comments). innerDOM seems to be a solution, but we can't include it into php.js without changing php.js' nature. And to do that for only echo, would make inpracticle an understatement. We'll have to think some more on the innerDOM thing I guess: maybe we could ask it's author if we can just copy a portion of his code into this function directly. That would:
- work
- not change php.js' standalone-lyness
- make echo a big function ;)

Thank you very much for sharing your thoughts and code on this with us. For now, I've at least  comitted your changes.
---------------------------------------
*[der_simon](http://simon-kuehn.de)* on 2009-01-15 20:44:37  
Hi, 

im the author of the innerDOM-Script and I'm happy that anyone really cares about my few lines of code. I'm way out of the programming business, so I can only partly partitiate. 

What I couldn't see from my point is: Whould it help to contribiute the innerDOM-Script to your project or not? The php.js page says: 

â€œThere's no good place for a package like http://innerdom.sourceforge.net/â€

So if it would be helpful I'm willing to contribute my code. 

Regard from Germany

Der Simon
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-15 23:18:43  
Since Kevin stated it might be possible to use innerDOM, I took it upon myself to check with Der Simon to see if we could release under MIT.

Although it is still somewhat large for the average PHP-JS function, with a few superficial tweaks to the already terse code (such as removing a couple document.all blocks), and by just using one of his functions (the only one needed by echo), we can get something as relatively small as this:

```function stringToDOM(q){
    var d=document;
    function r(a){
	return a.replace(/\r/g,' ').replace(/\n/g,' ');
    }
    function s(a){
	return a.replace(/&amp;amp;/g,'&amp;').replace(/&amp;gt;/g,'&gt;').replace(/&amp;lt;/g,'&lt;').replace(/&amp;nbsp;/g,' ').replace(/&amp;quot;/g,'&quot;');
    }
    function t(a){
	return a.replace(/ /g,'');
    }
    function u(a){
	var b,c,e,f,g,h,i;
	b=d.createDocumentFragment();
	c=a.indexOf(' ');
	if(c===-1){
	    b.appendChild(d.createElement(a.toLowerCase()))
	}
	else{
	    i=t(a.substring(0,c)).toLowerCase();
	    a=a.substr(c+1);
	    b.appendChild(d.createElement(i));
	    while(a.length){
		e=a.indexOf('=');
		if(e&gt;=0){
		    f=t(a.substring(0,e)).toLowerCase();
		    g=a.indexOf('&quot;');
		    a=a.substr(g+1);
		    g=a.indexOf('&quot;');
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
  function v(a,b,c){
      var e,f;
      e=b;
      c=c.toLowerCase();
      f=e.indexOf('&lt;/'+c+'&gt;');
      a=a.concat(e.substring(0,f));
      e=e.substr(f);
      while(a.indexOf('&lt;'+c)!=-1){
	  a=a.substr(a.indexOf('&lt;'+c));
	  a=a.substr(a.indexOf('&gt;')+1);
	  e=e.substr(e.indexOf('&gt;')+1);
	  f=e.indexOf('&lt;/'+c+'&gt;');
	  a=a.concat(e.substring(0,f));
	  e=e.substr(f)
      }
      return b.length-e.length
  }
  function w(a){
      var b,c,e,f,g,h,i,j,k,l,m,n,o,p,q;
      b=d.createDocumentFragment();
      while(a&amp;&amp;a.length){
	  c=a.indexOf('&lt;');
	  if(c===-1){
	      a=s(a);
	      b.appendChild(d.createTextNode(a));
	      a=null
	  }
	  else if(c){
	      q=s(a.substring(0,c));
	      b.appendChild(d.createTextNode(q));
	      a=a.substr(c)
	  }
	  else{
	      e=a.indexOf('&lt;!--');
	      if(!e){
		  f=a.indexOf('--&gt;');
		  g=a.substring(4,f);
		  g=s(g);
		  b.appendChild(d.createComment(g));
		  a=a.substr(f+3)
	      }
	      else{
		  h=a.indexOf('&gt;');
		  if(a.substring(h-1,h)==='/'){
		      i=a.indexOf('/&gt;');
		      j=a.substring(1,i);
		      b.appendChild(u(j));
		      a=a.substr(i+2)
		  }
		  else{
		      k=a.indexOf('&gt;');
		      l=a.substring(1,k);
		      m=d.createDocumentFragment();
		      m.appendChild(u(l));
		      a=a.substr(k+1);
		      n=a.substring(0,a.indexOf('&lt;/'));
		      a=a.substr(a.indexOf('&lt;/'));
		      if(n.indexOf('&lt;')!=-1){
			  o=m.lastChild.nodeName;
			  p=v(n,a,o);
			  n=n.concat(a.substring(0,p));
			  a=a.substr(p)
		      }
		      a=a.substr(a.indexOf('&gt;')+1);
		      m.lastChild.appendChild(w(n));
		      b.appendChild(m)
		  }
	      }
	  }
      }
      return b
  }
  return w(q)
}```

I suggest incorporating his useful and standards-compliant method (and also adding print() too), if you were still open to it... 

(Maybe it would be even more standards compliant if it checked for createElementNS support, but using the function in XUL still works ok for me)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-16 23:11:51  
@ der_simon &amp; Brett Zamir: First of all, Der Simon Thank you so much for coming to us and offering your great code to our project. It seems we can put it to good use.

My main concern was that for such a little function, it would be a lot of code. There's no room in PHP.JS for global dependencies so it would really have to be duplicated inside the functions. So a really bloated echo would be the result.

I'm okay with it now because:
- Brett you did a great job trimming it down the the essentials that are important to us.
- I have actually gotten some work done on the public compiler, which will enable people to optionally include echo in their package.

Never ceases to amaze me. The simplest functions sometimes need the biggest chunks of code ;)

Anyway, great effort both.

PS. Can we alias print to echo?
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-17 03:11:03  
One important thing first...The line

```stringToDOM(arg);```

needs to be changed to:

```document.body.appendChild(stringToDOM(arg));```

Now...print() would be the same with the following differences:

This line at the top:
```var arg = '', argc = arguments.length, argv = arguments, i = 0;```

can be entirely removed in print(). print() should also have &quot;arg&quot; added as an explicit function parameter (unless you want to merge the functions--see below).

To get the marginal speed difference with echo, you don't even need the line &quot;return null&quot; because functions always return undefined when not specified (which is probably a little closer to the PHP behavior if we get picky).

The for loop at the end can be replaced with the following shorter version if you are making an independent version for print():

```
    if (document.createDocumentFragment &amp;&amp; document.createTextNode &amp;&amp; document.appendChild) {
        stringToDOM(arg);
    } else if (document.write) {
        document.write(arg);
    }
    return 1;
```

Note that if you did decide to have print() call echo() and just let its single argument cycle through the for loop one time, you'd have to still:
1) avoid potential recursion by avoiding the print(arg) call (as I did above for a dedicated version of print())
2) return 1 instead of not returning anything

Also, you can remove the notes to this function now (and for print()).

By the way, I realized that the stringToDOM() function can be stripped down a tiny bit more by changing substr() references to slice() (same behavior with one argument)--and substring() calls could be changed to slice() in cases where the 2nd argument would never be negative, though that would be harder to gauge without going through the code.

After going through the stringToDOM() code a little more, besides the shortening just mentioned, I realized that a little bit more could be done, such as allow namespaces on elements and attributes when parsing to DOM. I'm not sure though when I may have time to get to it (have some deadlines now), but I hope to get to it eventually. 

It would be cool if there could be some what we could specify where we wanted the echo to go (e.g., if we didn't want it in the body).  You know, I think we should be able to actually implement the PHP output buffer functions by configuring a parameter (as in the global php_js) which allowed the output from such functions to be captured and aggregated (until flushed/cleaned) and then output later or assigned to a variable!

As an extended aside, another great thing about the stringToDOM() and DOMToString() functions is that they could be combined to make a standards-compliant version of the DOM level 3 Load-and-Save module for serialization and parsing (currently not supported in Firefox and probably other browsers). 

For example, using the skeleton code within the source at https://bugzilla.mozilla.org/attachment.cgi?id=333875 (for Mozilla bug https://bugzilla.mozilla.org/show_bug.cgi?id=155749 ), they could be used within the code for LSSerializer.prototype.writeToString and LSParser.prototype.parse .

Thus you could parse in any browser in a compliant fashion with something like this:

```var lsInput = DOMImplementationLS.createLSInput().stringData = '&lt;myXml/&gt;';

var doc = DOMImplementationLS.createLSParser(1, null).parse(lsInput);
```

and serialize in any browser with something like this:

```
var ser = DOMImplementationLS.createLSSerializer();
var str = ser.writeToString(document);```

Admittedly it might not be pretty, but it's standard (and can easily be wrapped as with the current Firefox and IE equivalents).
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-17 03:14:38  
Sorry, if you did apply my changes for an independent version of print(), this should be changed to also apply the fix for stringToDOM():

```
    if (document.createDocumentFragment &amp;&amp; document.createTextNode &amp;&amp; document.appendChild) {
        stringToDOM(arg);
    }```

to

```
    if (document.createDocumentFragment &amp;&amp; document.createTextNode &amp;&amp; document.appendChild) {
        document.body.appendChild(stringToDOM(arg));
    }```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-17 13:36:29  
unfortunately, right now i cannot implement print as rhino already provides it. will have to change the testsuite later on.

out buffering is a great idea. we should first make all functions that print something rely on echo,
and have echo collect a buffer. i can see this working.

does that really effect the speed, yes?

notes removed.

I don't see yet where else we we should implement those dom functions. I have to say I don't work with that stuff on a daily basis.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-18 03:28:54  
As far as output buffering, I plan to shortly discuss my thoughts on how this, as with other issues, can be solved without too much pain for maintenance with a global instead, but if not, being dependent on echo would be fine by me.  

By the way, maybe the function could also test 

if (document.body) {
    document.body.appendChild(stringToDOM(arg));
}
else {
    document.documentElement.appendChild(stringToDOM(arg));
}

to see if there IS a document.body, in case we are in an XML context (like XUL), and if not, append after the last element in the document.

As far as the speed, in my crude tests just now in JavaScript, there seems to be no difference in JavaScript between returning with null and not returning anything. But in PHP there is apparently a slight difference according to the FAQ linked from the PHP documentation: http://www.faqts.com/knowledge_base/view.phtml/aid/1/fid/40 , and the behavior of echo is not to return anything (while print returns 1), so I think there's no reason to return null specifically (takes a little more space in the already big function!) :)

As far as implementing the DOM functions, you're right, there is no place I know of, except serialize() if it handles DOM objects, and DOMDocument::saveXML, DOMDocument::loadXML . (speaking of the DOM in PHP (as in DOMDocument::validate), I'd LOVE to get XML validation in JS somehow).

But the note about the DOM functions was otherwise more just of an interesting aside (if you don't mind my overloading the comments here!).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 13:41:24  
@ Brett Zamir: Noted. I don't mind big comments. Relevant info should be here, and people should know how to use ctrl+f :)
---------------------------------------
*[Eugene Bulkin](http://doubleaw.com)* on 2009-04-30 00:28:57  
Lines 62 and 132 are missing semicolons after the bracket; as you are setting a var to a function, you must include them or when you pack the code it can trigger errors.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-04-30 03:21:04  
@Eugene, thanks for the catch! Fixed in SVN. (p.s. We're hoping to catch such issues automatically in the future with JSLint)
---------------------------------------
*[JB]()* on 2009-05-29 05:18:31  
Couldn't you just create a new node, innerHTML the code into it then move all of the children of the new node into body?
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-30 10:22:22  
JB, I adapted your idea as our last resort, since it may not work in an XML context. I also moved out the bulky code and added support for the common DOMParser or IE-specific parsing--for those who want full standards support, they can add the script referenced in the code to add DOM 3 Load and Save. The problem now though is that one must use the XHTML namespace since the script is giving a chance for the parsing to be done by DOMParser(), etc. for the sake of working with and in XML. We might make that code only execute if an ini is set, thus removing the need for a namespace.
---------------------------------------
*[Cue]()* on 2010-05-13 16:04:57  
This throws an error in Firefox 3.6.3. Works fine in all other browsers.

```stringToDOM(arg, d.body, ns_xhtml, "div").cloneNode is not a function```
---------------------------------------
*[EdorFaus]()* on 2010-10-29 01:26:58  
I think this code (lines 57-60) is not quite right:
```
if (!fc || !fc.documentElement ||
  fc.documentElement.localName !== 'parsererror' ||
  fc.documentElement.namespaceURI !== 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
  return fc.documentElement.firstChild;
```

Considering what's in the block, and the last two tests, shouldn't the or-s be and-s, and the two first tests be reversed, to avoid returning undefined? Like this:
```
if (fc && fc.documentElement &&
  fc.documentElement.localName !== 'parsererror' &&
  fc.documentElement.namespaceURI !== 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
  return fc.documentElement.firstChild;
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-10-29 02:31:43  
@EdorFaus: Good catch (and bad mistake on my part, mitigated a bit by the catch thankfully). Fixed in Git (along with some JSLint/coding standards fixes).
---------------------------------------
*[seingh]()* on 2010-12-25 13:19:41  
i think that echo() is only document.write() ...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-12-27 05:50:40  
@seingh: Yes, document.write() works all right (unless you are using XHTML served as application/xhtml+xml), but this function attempts to offer normal DOM construction (assuming well-formed XHTML) which can work in either environment.
---------------------------------------
