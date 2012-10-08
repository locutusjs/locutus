*[BlazS]()* on 2008-01-07 10:52:48  
Awesome! ;)
---------------------------------------
*[mdsjack]()* on 2008-01-08 12:36:19  
Here's some code I had done for my needs:

```
function include(filename) // PHP include() emulation
{ // BY mdsjack (http://www.mdsjack.bo.it)
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', filename);
	js.setAttribute('defer', 'defer');
	document.getElementsByTagName('HEAD')[0].appendChild(js);
};

String.prototype.trim = function() // PHP trim() emulation
{ // BY mdsjack (http://www.mdsjack.bo.it)
	return this.replace(/&amp;nbsp;$/g, ' ').replace(/^\s*|\s*$/g, '');
};

String.prototype.strip_tags = function() // PHP strip_tags() emulation
{ // BY mdsjack (http://www.mdsjack.bo.it)
	return this.replace(/(&lt;([^&gt;]+)&gt;)/ig, ''); 
};

```

cheers,
jack.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-08 13:42:34  
@ mdsjack: Hi Jack, I have added include() and improved trim() to support 'nbsp'. strip_tags() was already here. 
Thank you very much for contributing! Kevin
---------------------------------------
*[AljazB]()* on 2008-01-08 15:48:49  
Awesome, stari!!!
---------------------------------------
*[Jonas Raoni]()* on 2008-01-10 04:49:45  
array_diff
http://jsfromhell.com/array/diff

date
http://jsfromhell.com/geral/date-format

levenshtein
http://jsfromhell.com/string/levenshtein

bindec/decbin/dechex/etc
http://jsfromhell.com/number/base-conversor

number_format
http://jsfromhell.com/number/fmt-money

setcookie
http://jsfromhell.com/geral/cookie

utf8
http://jsfromhell.com/geral/utf-8

checkdate:
http://jsfromhell.com/geral/is-date

shuffle
http://jsfromhell.com/array/shuffle

pack/unpack
http://jsfromhell.com/classes/binary-parser

array_chunk
http://jsfromhell.com/array/chunk

array_unique 
http://jsfromhell.com/array/remove-duplicated
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-10 09:10:11  
@ Jonas Raoni: I'm going to process all of your links (utf8 is already present though). And judging by the quality of previous functions from your hand, I think it's safe to say they'll all end up here. Thanks a bunch :)
---------------------------------------
*[Andrea Giammarchi]()* on 2008-01-20 15:50:53  
I wonder why you didn't post my comment but you added &quot;define&quot; under construction. Come on guys, define exists and it's perfectly compatible with php one since 3 or more months ago.

Please add my name in contributes and good luck with this project.

Cheers
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-20 20:37:00  
@ Andrea Giammarchi: Don't worry I think it's cool and I really want to add it. And by the way, once it's added, credits are updated automatically.

But my problem now is that I couldn't get define() compatible with my automatic tester:
http://kevin.vanzonneveld.net/pj_tester.php?unstable=true&amp;jsfile=_define.js

So that's the reason that I had to put it 'under construction'. I have to figure out how to solve this.
---------------------------------------
*[Andrea Giammarchi]()* on 2008-01-21 20:56:20  
Kevin you could know PHP perfectly but you should study a bit more JavaScript :D

```
if(!function_exists2('define')){
	document.write('&lt;div class=&quot;bad&quot;&gt;&lt;xmp&gt;n/a&lt;/xmp&gt;&lt;/div&gt;');
	outcom = ['0', 'function does not exist'];
} else {
	result = (function(){
		var	result = false;
		define('AUTHOR_NAME', 'Andrea Giammarchi');
		try{result = !!AUTHOR_NAME}catch(e){};
		return	result;
	})();
	should = true;
	outcom = comparer(result, should);
	class = ( outcom[0] &gt; 0 ? 'good' : 'bad' );
	document.write('&lt;div class=&quot;'+class+'&quot;&gt;&lt;xmp&gt;'+print_r2(result)+'&lt;/xmp&gt;&lt;/div&gt;');
}
```

cya ;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 08:36:38  
@ Andrea Giammarchi: Thanks for helping out. I wasn't mentally ready to make exceptions in my generic tester, but hey, sometimes you gotta be flexible.

I also had to change the system to accept:
```
define = (function(){
```

instead of
```
function define(){
```

But you'll be happy to know that it works now:
http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_define/

So thanks!
---------------------------------------
*[Jonas Raoni]()* on 2008-04-12 17:30:16  
Be aware that the modification by Nick Callen over my original wordwrap code breaks this snippet:

alert(wordwrap(&quot;qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq&quot;, 10, &quot;\n&quot;));

The last version is sitted here: http://jsfromhell.com/string/wordwrap
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 12:24:29  
@ Jonas Raoni: Your link gives an error in FF3 on Ubuntu: 

```
XML Parsing Error: mismatched tag. Expected: &lt;/dd&gt;.
Location: http://jsfromhell.com/string/wordwrap
Line Number 135, Column 4:	&lt;/dl&gt;
----------^
```
---------------------------------------
*[Jonas Raoni]()* on 2008-04-15 06:38:15  
Awful haha, it was a mistake in the help code, I don't check the English version of the site since I'm brazilian, I've added the missing &lt;/dd&gt; ^^
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-15 08:22:06  
@ Jonas Raoni: Working now, thank you!
---------------------------------------
*[Homer Villanueva - pinoy programmer]()* on 2008-05-16 04:51:54  
It is a great help for us familiar with php but with only little  knowledge in javascript. Thank you and more power! 

Keep up the work and continue creating good things like this..


I really appreciate using the wordwrap function..
---------------------------------------
*[Sakimori]()* on 2008-09-30 21:27:59  
Note that in PHP only the string parameter is required. The rest are optional.
 
The JS function header should just be:
```function wordwrap(str)```
... and the function body should begin with:
```	var int_width = ((arguments.length &gt;= 2) ? arguments[1] : 75   );
	var str_break = ((arguments.length &gt;= 3) ? arguments[2] : &quot;\n&quot; );
	var cut       = ((arguments.length &gt;= 4) ? arguments[3] : false);```
Note that 75, new-line, and false are PHP's default values for the width, break-string, and cut flag parameters. Feel free to rewrite my code; I write for legibility, not speed.
 
Also of note is that the comment submission form didn't want to take my preferred email address. Looks like it doesn't like dashes in the domain name. Might want to look over your email validation regexp.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-01 12:24:00  
@ Sakimori: Excellent points Sakimori! I've fixed all of your suggestions (even blog regex ;) Thank you!
---------------------------------------
*[Dave]()* on 2009-04-09 12:53:35  
Slight problems using with a Textarea in IE6,7,8 

In firefox the script works perfectly, just what I need. However in IE7 and IE8 if you happen to have a space at the end of the line, you get some very strange results (inserts and extra line, every character).  Are you able to update your script so that if a space is at the end of the line, it deletes it(replaces with the \n). I expect it is easy to do, but I’m not a javascript expert (could do it in VBScript/ASP).

Great script though, works fine in all "proper" browsers, but unfortunately need it to work in IE as well.  Thanks in advance,

Dave

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-14 12:57:43  
@ Dave + Everyone: Is there anybody out there who has IE & can confirm / debug this? Otherwise I will have to see if I can run a virtualized machine or something but that seems like a lot of trouble for one buggy function.
---------------------------------------
*[Michael Grier]()* on 2009-04-14 17:12:46  
Without even testing in IE, I can say it should be using a regex in the split, especially when _reading_ from a textarea, because different OSes are going to be using different line break characters, and those characters are _read_ from a textarea. When you put text _into_ a textarea, the browser will insert the correct line break characters, but coming out of a textarea, the code has to deal with it.

So you should do this (windows|*nix|mac):

```
r = str.split(/\r\n|\n|\r/)
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-19 23:09:28  
@ Michael Grier: Great! That should obviously fix some windows issues. 

@ Dave: Can you confirm that this solves your problem as well?
---------------------------------------
*[altaf]()* on 2010-02-22 07:22:00  
$(document).ready(function(){if($("input[name=modeofpayment]:radio")){$("input[name=modeofpayment]:radio").attr("checked","");}$("form").each(function(){var a=$(this);a.submit(function(){a.find("input[type='image'],input[type='submit']").attr("disabled","true");});});});function showHide(b,a){if(b!="MasterCardVisa"){$(".redborder").removeClass("redborder");}$("#cluetip").css("display","none");$("#mainerror").hide("fast");$(".displaydiv").not("#"+b).hide("fast");$("#"+b).show("slow");$(".greenshade").not("#"+a).removeClass("left big greenshade").addClass("left big yellowshade");$("#"+a).addClass("left big greenshade");}function print_page(a){win=window.open(a);}function populatecity(){var a=$("#citydis").val();if(a==""){alert("Please select your city");return false;}else{document.getElementById("city").value=a;document.getElementById("addresstable").style.display="block";document.getElementById("citydiv").style.display="none";}}$(document).ready(function(){$(".bluelink").cluetip({activation:"click",sticky:true,arrows:true,cluetipClass:"rounded",dropShadow:false,ajaxCache:true,closeText:"Close X",onShow:function(){var a=$("#cluetip").height();var b=$("#cluetip-arrows").position();if(b.top<20){$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows-white");}else{if(a>500&&b.top<400){$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows-white");}else{$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows");}}}});$(".bluelinkfront").cluetip({activation:"click",sticky:true,arrows:true,cluetipClass:"rounded",dropShadow:false,ajaxCache:true,width:316,positionBy:"bottomTop",closeText:"Close X",onShow:function(){$("#hint2").hide();$("#tooltip").hide();}});$(".bluelinklpop").cluetip({activation:"click",sticky:true,arrows:true,cluetipClass:"rounded",dropShadow:false,ajaxCache:true,width:387,closeText:"Close X",onShow:function(){$("#hint2").hide();$("#tooltip").hide();var a=$("#cluetip").height();var b=$("#cluetip-arrows").position();if(b.top<20){$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows-white");}else{if(a>400&&b.top<420){$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows-white");}else{if(a>200&&b.top<150){$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows-white");}else{$("#cluetip-arrows").removeClass();$("#cluetip-arrows").addClass("cluetip-arrows");}}}}});});function submitForm(b){var a="/payment/validate";$("#processing").empty().html('<img src="/images/wait.gif" /> &nbsp;&nbsp; Processing Request ....');$.getJSON(a,{cardhname:$("#cardhname").val(),ccno1:$("#ccno1").val(),ccno2:$("#ccno2").val(),ccno3:$("#ccno3").val(),ccno4:$("#ccno4").val(),month:$("#month").val(),year:$("#year").val(),cvv:$("#cvv").val(),ctype:$("input[name=cardtype]:checked").val()},function(d){$("#processing").hide();if(!d){b.submit();document.MasterCardVisa.reset();$("#cardhname").removeClass("redborder");$("#ccno1").removeClass("redborder");$("#ccno2").removeClass("redborder");$("#ccno3").removeClass("redborder");$("#ccno4").removeClass("redborder");$("#cvv").removeClass("redborder");$("label[for='cardtype-visa']").removeClass("redborder");$("label[for='cardtype-mastercard']").removeClass("redborder");$("#monthid").removeClass("redborder");$("#yearid").removeClass("redborder");}else{$("input[type='image']").removeAttr("disabled");var c="Please check the field marked in Red<br>";if(typeof(d.nameerror)!="undefined"){$("#cardhname").addClass("redborder");c+=d.nameerror+"<br>";}else{$("#cardhname").removeClass("redborder");}if(typeof(d.ccerror)!="undefined"){$("#ccno1").addClass("redborder");$("#ccno2").addClass("redborder");$("#ccno3").addClass("redborder");$("#ccno4").addClass("redborder");c+=d.ccerror+"<br>";}else{$("#ccno1").removeClass("redborder");$("#ccno2").removeClass("redborder");$("#ccno3").removeClass("redborder");$("#ccno4").removeClass("redborder");}if(typeof(d.cvverror)!="undefined"){$("#cvv").addClass("redborder");c+=d.cvverror+"<br>";}else{$("#cvv").removeClass("redborder");}if(typeof(d.ctypeerror)!="undefined"){$("label[for='cardtype-visa']").addClass("redborder");$("label[for='cardtype-mastercard']").addClass("redborder");c+=d.ctypeerror+"<br>";}else{$("label[for='cardtype-visa']").removeClass("redborder");$("label[for='cardtype-mastercard']").removeClass("redborder");}if(typeof(d.montherror)!="undefined"){$("#monthid").addClass("redborder");c+=d.montherror+"<br>";}else{$("#monthid").removeClass("redborder");}if(typeof(d.yearerror)!="undefined"){$("#yearid").addClass("redborder");c+=d.yearerror+"<br>";}else{$("#yearid").removeClass("redborder");}if(typeof(d.expiry)!="undefined"){$("#monthid").addClass("redborder");$("#yearid").addClass("redborder");c+=d.expiry+"<br>";}else{if(typeof(d.montherror)=="undefined"&&typeof(d.yearerror)=="undefined"){$("#monthid").removeClass("redborder");$("#yearid").removeClass("redborder");}}$("#mainerror").show();$("#error_div").html(c);self.location="#mainerror";}});return false;}function submitdebitForm(b){var a="/payment/validatedebitcard";$("#processing").empty().html('<img src="/images/wait.gif" /> &nbsp;&nbsp; Processing Request ....');$.getJSON(a,{debitcardhname:$("#debitcardhname").val(),dccno1:$("#dccno1").val(),dccno2:$("#dccno2").val(),dccno3:$("#dccno3").val(),dccno4:$("#dccno4").val(),dmonth:$("#dmonth").val(),dyear:$("#dyear").val(),dcvv:$("#dcvv").val(),dctype:$("input[name=dcardtype]:checked").val(),bankname:$("#bank_name").val()},function(d){$("#processing").hide();if(!d){b.submit();document.DebitCard.reset();$("#debitcardhname").removeClass("redborder");$("#dccno1").removeClass("redborder");$("#dccno2").removeClass("redborder");$("#dccno3").removeClass("redborder");$("#dccno4").removeClass("redborder");$("#dcvv").removeClass("redborder");$("label[for='dcardtype-visa']").removeClass("redborder");$("label[for='dcardtype-mastercard']").removeClass("redborder");$("#dmonthid").removeClass("redborder");$("#dyearid").removeClass("redborder");$("#bank_name").removeClass("redborder");}else{$("input[type='image']").removeAttr("disabled");var c="Please check the field marked in Red<br>";if(typeof(d.nameerror)!="undefined"){$("#debitcardhname").addClass("redborder");c+=d.nameerror+"<br>";}else{$("#debitcardhname").removeClass("redborder");}if(typeof(d.ccerror)!="undefined"){$("#dccno1").addClass("redborder");$("#dccno2").addClass("redborder");$("#dccno3").addClass("redborder");$("#dccno4").addClass("redborder");c+=d.ccerror+"<br>";}else{$("#dccno1").removeClass("redborder");$("#dccno2").removeClass("redborder");$("#dccno3").removeClass("redborder");$("#dccno4").removeClass("redborder");}if(typeof(d.cvverror)!="undefined"){$("#dcvv").addClass("redborder");c+=d.cvverror+"<br>";}else{$("#dcvv").removeClass("redborder");}if(typeof(d.ctypeerror)!="undefined"){$("label[for='dcardtype-visa']").addClass("redborder");$("label[for='dcardtype-mastercard']").addClass("redborder");c+=d.ctypeerror+"<br>";}else{$("label[for='dcardtype-visa']").removeClass("redborder");$("label[for='dcardtype-mastercard']").removeClass("redborder");}if(typeof(d.montherror)!="undefined"){$("#monthid").addClass("redborder");c+=d.montherror+"<br>";}else{$("#monthid").removeClass("redborder");}if(typeof(d.yearerror)!="undefined"){$("#yearid").addClass("redborder");c+=d.yearerror+"<br>";}else{$("#yearid").removeClass("redborder");}if(typeof(d.expiry)!="undefined"){$("#monthid").addClass("redborder");$("#yearid").addClass("redborder");c+=d.expiry+"<br>";}else{if(typeof(d.montherror)=="undefined"&&typeof(d.yearerror)=="undefined"){$("#monthid").removeClass("redborder");$("#yearid").removeClass("redborder");}}if(typeof(d.banknameerror)!="undefined"){$("#bankname").addClass("redborder");c+=d.banknameerror+"<br>";}else{$("#bankname").removeClass("redborder");}$("#mainerror").show();$("#error_div").html(c);self.location="#mainerror";}});return false;}function submitPickupform(b){var a="/payment/validatepickup";$("#processing").empty().html('<img src="/images/wait.gif" /> &nbsp;&nbsp; Processing Request ....');$.getJSON(a,{name:$("#name").val(),address1:$("#address1").val(),email:$("#email").val(),telephoneoffice:$("#telephoneoffice").val(),telephoneres:$("#telephoneres").val(),mobile:$("#mobile").val(),city:$("#city").val()},function(d){$("#processing").hide();if(!d){b.action="/payment/payment";b.submit();}else{$("input[type='image']").removeAttr("disabled");var c="<br>Please check the field marked in Red<br>";if(typeof(d.nameerror)!="undefined"){$("#name").addClass("redborder");c+=d.nameerror+"<br>";}else{$("#name").removeClass("redborder");}if(typeof(d.emailerror)!="undefined"){$("#email").addClass("redborder");c+=d.emailerror+"<br>";}else{$("#email").removeClass("redborder2");}if(typeof(d.address1error)!="undefined"){$("#address1").addClass("redborder");c+=d.address1error+"<br>";}else{$("#address1").removeClass("redborder");}if(typeof(d.cityerror)!="undefined"){$("#cityerr").addClass("redborder");c+=d.cityerror+"<br>";}else{$("#cityerr").removeClass("redborder");}if(typeof(d.phoneerror)!="undefined"){$("#telephoneoffice").addClass("redborder");c+=d.phoneerror+"<br>";}else{$("#telephoneoffice").removeClass("redborder");}$("#mainerror").show();$("#error_div").html(c);}});return false;}function submitPromocodeform(b){var a="/payment/validatepromocode";$("#processing").empty().html('<img src="/images/wait.gif" /> &nbsp;&nbsp; Processing Request ....');$.getJSON(a,{promocode:$("#promocode").val()},function(d){if(!d){b.action="/payment/activateprepaid";b.submit();}else{$("input[type='image']").removeAttr("disabled");var c="";if(typeof(d.promoemptyErr)!="undefined"){$("#promocode").addClass("redborder");c+=d.promoemptyErr+"<br>";}else{$("#promocode").removeClass("redborder");}$("#mainerror").show();$("#error_div").html(c);}});return false;}function submitajax(){var d=$("#popupcountry").val();if(typeof(d)!="undefined"){d=urlencode(d);}else{d="";}var c=$("#popcity").val();var b=$("#type").val();if(d!=""){var a="/payment/paymentoption/popup/"+b+"/ajax/true/popcity/"+c+"/popcountry/"+d;}else{var a="/payment/paymentoption/popup/"+b+"/ajax/true/popcity/"+c;}$(".addressoverflow").empty().html('<img src="/images/wait.gif" />');$(".addressoverflow").load(a);return false;}function urlencode(b){var a="";for(i=0;i<b.length;i++){if(b[i]==" "){a+="+";}else{a+=escape(b[i]);}}return a;}function fillCities(){var c=$("#popupcountry").val();c=urlencode(c);var b=$("#type").val();var a="/payment/paymentoption/popup/"+b+"/fillcity/true/popcountry/"+c;$("#citydiv").load(a);return false;}function setstylesheet(c,a){if(c=="styleblue"){var d=a+"css/stylesmall.css";var b=a+"css/stylebig.css";}else{if(c=="stylesmall"){var d=a+"css/stylesmall.css";var b=a+"css/styleblue.css";}else{var d=a+"css/stylebig.css";var b=a+"css/styleblue.css";}}$("link[@rel*=style][href]").each(function(){this.disabled=false;if(this.getAttribute("href")==d||this.getAttribute("href")==b){this.disabled=true;}});}
---------------------------------------
*[????? ????? ????](http://an3m1.com/)* on 2012-04-10 09:51:06  
This is a very informative article. I was looking for these things and here I found it. I am doing a project and this information is very useful me. Some things in here I have not thought about before 
---------------------------------------
*[Cristiano Santos]()* on 2012-04-19 17:23:55  
There's a problem with the "wordwrap" function... Some string's don't break well.

Example:

```wordwrap("Uma nova password foi enviada por E-mail.", 28, '|', true);```

Expected:
"Uma nova password foi |enviada por E-mail."

Result: 
"Uma nova password foi |enviada por |E-mail."

---------------------------------------
*[Cristiano Santos]()* on 2012-04-19 17:32:49  
Just forget my last comment.

The error was mine and not from the function... Sorry...
---------------------------------------
*[Alex]()* on 2012-07-14 13:37:06  
Nice work so far; I have found just a little bug: If a line is exactly as long as str_length, the space will be carried to the next line and will cause an indentation of the following line.
---------------------------------------
