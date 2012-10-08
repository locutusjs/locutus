*[Silas - shut]()* on 2009-02-28 06:07:55  
Simples e Muito útil, parabéns.
---------------------------------------
*[Legaev Andrey]()* on 2008-01-19 19:50:26  
Ajaxian replacements of file_get_contents() and file():
```
function file_get_contents(url) {
	// +	original by: Legaev Andrey
	// *	note:	Whis function uses XmlHttpRequest and cannot retrieve resource from different domain.
	var req = null;
	try { req = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;); } catch (e) {
		try { req = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;); } catch (e) {
			try { req = new XMLHttpRequest(); } catch(e) {}
		}
	}
	if (req == null) throw new Error('XMLHttpRequest not supported');
	
	req.open(&quot;GET&quot;, url, false);
	req.send(null);

	return req.responseText;
}

function file(url) {
	// +	original by: Legaev Andrey
	// *	note:	Whis function uses XmlHttpRequest and cannot retrieve resource from different domain.
	var req = null;
	try { req = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;); } catch (e) {
		try { req = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;); } catch (e) {
			try { req = new XMLHttpRequest(); } catch(e) {}
		}
	}
	if (req == null) throw new Error('XMLHttpRequest not supported');
	
	req.open(&quot;GET&quot;, url, false);
	req.send(null);

	return req.responseText.split('\n');
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-19 20:53:22  
@ Legaev Andrey: wicked :)
---------------------------------------
