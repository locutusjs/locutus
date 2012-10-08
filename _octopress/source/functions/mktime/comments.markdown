*[_argos]()* on 2008-02-03 20:33:28  
Hi Kevin, I'm attaching 3 functions more for the PHP.js project.

```
function array_product ( input ) {
	var Index = 0, Product = 1;
	
	if ( input instanceof Array ) {
		while ( Index &lt; input.length  ) {
			Product *= ( !isNaN ( input [ Index ] ) ? input [ Index ] : 0 );
			Index++;
		}
	} else {
		product = null;
	}
			
	return product;
}

function array_rand ( input, num_req ) {
	var Indexes = [];
	var Ticks = num_req || 1;
	var Check = {
		Duplicate	: function ( input, value ) {
			var Exist = false, Index = 0;
			while ( Index &lt; input.length ) {
				if ( input [ Index ] === value ) {
					Exist = true;
					break;
				}
				Index++;
			}			
			return Exist;
		}
	};
	
	if ( input instanceof Array &amp;&amp; Ticks &lt;= input.length ) {
		while ( true ) {
			var Rand = Math.floor ( ( Math.random ( ) * input.length ) );
			if ( Indexes.length === Ticks ) { break; }
			if ( !Check.Duplicate ( Indexes, Rand ) ) { Indexes.push ( Rand ); }
		}
	} else {
		Indexes = null;
	}
	
	return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
}

function compact ( var_names ) {
	var Index = 0, Matrix = {};
	var Process = function ( value ) {
		for ( var i = 0; i &lt; value.length; i++ ) {
			var key_value = value [ i ];			
			if ( key_value instanceof Array ) {
				Process ( key_value );
			} else {
				if ( typeof window [ key_value ] !== 'undefined' ) {
					Matrix [ key_value ] = window [ key_value ];
				}
			}
		}
		return true;
	};
	
	Process ( arguments );

	return Matrix;
}
```
---------------------------------------
*[_argos]()* on 2008-02-03 20:39:00  
Kevin, a litle fix in array_product

function array_product ( input ) {
  var Index = 0, Product = 1;
  
  if ( input instanceof Array ) {
    while ( Index &lt; input.length  ) {
      Product *= ( !isNaN ( input [ Index ] ) ? input [ Index ] : 0 );
      Index++;
    }
  } else {
    Product = null;
  }
      
  return Product;
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-03 23:17:14  
@ _argos: One thing: array_rand produces javascript errors when you feed it an object instead of an array. maybe we should implement some sort of sanity checking there.

Other than that: Nice work again man, you've earned yourself 2 gold medals :)
---------------------------------------
*[baris ozdil]()* on 2008-02-21 01:03:14  
Hi Kevin,
Thanks a lot for this nice library.
Just a small correction in mktime. In javascript the setMonth the month values are 0 based indexed. I think it should be something like this:
```
    var dateManip = {
        0: function(tt){ return d.setHours(tt); },
        1: function(tt){ return d.setMinutes(tt); },
        2: function(tt){ return d.setSeconds(tt); },
        3: function(tt){ return d.setMonth(parseInt(tt)-1); },
        4: function(tt){ return d.setDate(tt); },
        5: function(tt){ return d.setYear(tt); }
    };
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-21 12:18:07  
@ baris ozdil: Thank your for your contribution, I've updated php.js and included you in the credits!
---------------------------------------
*[Michael White]()* on 2008-03-02 05:26:34  
The example appears to be incorrect for this function. I checked in a PHP script to verify this and to get the correct value.

The new example:
```
		// *     example 1: mktime( 14, 10, 2, 2, 1, 2008 );
		// *     returns 1: 1201893002
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 11:55:09  
@ Michael White: Tried to reproduce the behavior, but wasn't able to:
http://kevin.vanzonneveld.net/test.php
---------------------------------------
*[gabriel paderni]()* on 2008-03-22 17:09:38  
If i'm not mistaken there's a bug when using strings as parameters:

here is the test I've made:
```
&lt;script type=&quot;text/javascript&quot;&gt;
function mktimetest(t_php,t_js){
	document.write(t_php+'&lt;br /&gt;'+t_js);
	if(t_php!=t_js)document.write(' &amp;lt;- Error');
	document.write('&lt;br /&gt;&lt;br /&gt;');
}
mktimetest(&lt;?php echo mktime('01','30','10','06','21','2008')?&gt;,mktime('01','30','10','06','21','2008'));
mktimetest(&lt;?php echo mktime('01','30','10','07','21','2008')?&gt;,mktime('01','30','10','07','21','2008'));
mktimetest(&lt;?php echo mktime('01','30','10','08','21','2008')?&gt;,mktime('01','30','10','08','21','2008'));
mktimetest(&lt;?php echo mktime('01','30','10','09','21','2008')?&gt;,mktime('01','30','10','09','21','2008'));
mktimetest(&lt;?php echo mktime('01','30','10','10','21','2008')?&gt;,mktime('01','30','10','10','21','2008'));
mktimetest(&lt;?php echo mktime('01','30','10','11','21','2008')?&gt;,mktime('01','30','10','11','21','2008'));
&lt;/script&gt;
```

Strangely in the test this shows up only for August and September.

The solution may be to remove the leading zero when the parameter is a string.

(Tested with: Firefox and Internet explorer, same result.)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-23 11:14:27  
@ gabriel paderni: The example won't reproduce:  
http://kevin.vanzonneveld.net/test.php

But I've added the parseInt function. Does that solve the bug? Thanks gabriel!
---------------------------------------
*[FGFEmperor]()* on 2008-03-31 21:13:27  
I have no idea why, but this:
alert('PHP: &lt;?= mktime(0,0,0,4,5,2009); ?&gt;\nJS: '+mktime(0,0,0,4,5,2009));
returns this:
PHP: 1238900400
JS:  1241550694
Any idea why? That way, I should get 4/5/2009 for both, but I'm getting 5/5/2009 on the JS version...
---------------------------------------
*[FGFEmperor]()* on 2008-03-31 22:10:37  
Got It!
Add
```d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1970);```
after
```var no, i = 0, d = new Date(), argv = arguments, argc = argv.length;```

The catch here is that d = New Date(); sets d to the current date. What was happening is that today is the 31th, and I the function was setting the month to February, but the day was still the 31th, then it would set the month to March (since February has only 28/29 days). ;-)
---------------------------------------
*[FGFEmperor]()* on 2008-03-31 22:28:56  
OK, another update:
change
d.setYear(1970);
to
d.setYear(1972);
Why? Because this way Leap Years are gonna work.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-02 13:28:11  
@ FGFEmperor: Good work man, thanks a lot, I'll update the function!
---------------------------------------
*[FGFEmperor]()* on 2008-04-18 21:03:59  
OK, now setting a month to something greater than 11 would not increase the year...
My correction (also for hours, minutes and seconds...
```
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
```

Basically I added 'ma' and 'mb' to the vars, and summed that on Years and Days... =)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-19 14:50:26  
@ FGFEmperor: Thanks a lot!
---------------------------------------
*[Philip Peterson]()* on 2008-04-20 03:34:18  
Just so you know... this is six hours off in firefox, I think? :-/  In the php_tester example, at least... I'm not sure what's doing it, though...
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-20 07:30:04  
@ Philip Peterson: Yeah that's related to the different timezones that we are in.
---------------------------------------
*[Philip Peterson]()* on 2008-04-21 21:01:29  
Hmm, yeah, I figured that might be it, but does PHP do that?  If not it might be a good idea to set the timezone to UTC/GMT/Something as a standard, or maybe including a config file to choose whether to leave it up to the user's computer or to set a standard?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-22 09:39:47  
@ Philip Peterson: Hi Philip. Running the tests in a predefined timezone seems to be a good solution. We should opt for UTC I think. Then adjust the 'result' comment to match the UTC outcome of mktime. Much better indeed!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-22 09:43:26  
@ Philip Peterson: If it's even possible to set the timezone for an entire page... I think you can only do this to a date object.

So maybe the right approach is to include a
```
+(date.getTimeZoneOffset() * 60 * 60);
```
In the test to neutralize the end user's timezone?
---------------------------------------
*[Yannoo]()* on 2008-05-21 12:34:18  
There are a probleme with :
```
mktime(0, 0, 0, 5, 8, 2008);
mktime(0, 0, 0, 5, 9, 2008);
```
The timestamp is wrong !
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-21 12:54:38  
@ Yannoo: What output are you getting? What should it be? Could this be related to the different timezones?
---------------------------------------
*[@Kevin]()* on 2008-05-21 13:47:08  
I've test different date. Look results :
```
alert(mktime(0, 0, 0, 5, 03, 2008)); // 1209765600
alert(mktime(0, 0, 0, 5, 04, 2008)); // 1209852000
alert(mktime(0, 0, 0, 5, 05, 2008)); // 1209938400
alert(mktime(0, 0, 0, 5, 06, 2008)); // 1210024800
alert(mktime(0, 0, 0, 5, 07, 2008)); // 1210111200
alert(mktime(0, 0, 0, 5, 08, 2008)); // 1209592800
alert(mktime(0, 0, 0, 5, 09, 2008)); // 1209592800
alert(mktime(0, 0, 0, 5, 10, 2008)); // 1210370400
alert(mktime(0, 0, 0, 5, 11, 2008)); // 1210465800
```
---------------------------------------
*[Yannoo]()* on 2008-05-21 13:59:43  
@Kevin
I've test different date. Look results :
```
alert(mktime(0, 0, 0, '05', '03', '2008')); // 1209765600
alert(mktime(0, 0, 0, '05', '04', '2008')); // 1209852000
alert(mktime(0, 0, 0, '05', '05', '2008')); // 1209938400
alert(mktime(0, 0, 0, '05', '06', '2008')); // 1210024800
alert(mktime(0, 0, 0, '05', '07', '2008')); // 1210111200
alert(mktime(0, 0, 0, '05', '08', '2008')); // 1209592800 (it should be 1210197600)
alert(mktime(0, 0, 0, '05', '09', '2008')); // 1209592800 (it should be 1210284000)
alert(mktime(0, 0, 0, '05', '10', '2008')); // 1210370400
alert(mktime(0, 0, 0, '05', '11', '2008')); // 1210465800
```

My timezone is Paris (GMT+1)
---------------------------------------
*[Yann]()* on 2008-05-21 14:31:26  
Well, this is my script :
```
function dateFr2timestamp(dateFr) {
  var a_date = explode('/', dateFr); // array with {0:day; 1:month; 2:year)
  return mktime(0,0,0,a_date[1],a_date[0],a_date[2]);
}
```
dateFr is any date to french format (dd/mm/yyyy) --&gt; '08/05/2008', '01/01/2008', '31/12/2008', ...

With dates '08/05/2008' and '09/05/2008', there are problems : wrong timestamp
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-21 18:45:06  
@ Yanno: I have found the bug. It lays in using '09'. When using a number 9, the function worked normally. So I investigated further and it turns out that

```
parseInt('09') // returns 0 instead of 9
```
Multiplying by 1 seems to work:
```
parseInt('09'*1) // returns 9 as it 'should'
```

Thank you for all the info.
---------------------------------------
*[jakes]()* on 2008-07-01 00:13:57  
when iterating through a loop with negative values for month, on the transition to positive (zero month) php delivers expected values but js doesnt, ie:

```alert(mktime(0,0,0,0,1,2008) + &quot; - &quot; + date('d M Y', mktime(0,0,0,0,1,2008)));```

```echo mktime(0, 0, 0, 0, 1, 2008).&quot; - &quot;.date(&quot;d M Y&quot;, mktime(0, 0, 0, 0, 1, 2008));```

js:  1201788000 - 01 Feb 2008
php: 1196427600 - 01 Dec 2007
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-18 07:45:29  
@ jakes: Thanks for your input. I've updated the function
---------------------------------------
*[Marc Palau](http://www.nbsp.es)* on 2009-01-16 10:25:29  
Kevin, the returned value by mktime on php without arguments (or with less arguments) is based on the current date, not [0,0,0,1,1,1972].

To solve, just delete this line:

```d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1972);```

Thanks!!
Marc
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-16 23:27:31  
@ Marc Palau: We still need that line for the other examples to work, but I think we got it right now. Agree? Thanks for helping us out Marc!
---------------------------------------
*[Marc Palau](http://www.nbsp.es)* on 2009-01-17 16:04:19  
Two comments on one:

I'm not agree with tath mod. man, you are not filtering the arguments.
Definetively this is all wrong (sorry man)

I have rewrited the function, please take a test and tell me if I'm OK:

```function mktime() {
	//agree here
    var d = new Date(), argv = arguments; 
	var cH=argv[0]!=undefined?argv[0]*1:d.getHours(),//hours
		ci=argv[1]!=undefined?argv[1]*1:d.getMinutes(),//minutes
		cs=argv[2]!=undefined?argv[2]*1:d.getSeconds(),//second
		cn=argv[3]!=undefined?(argv[3]*1)-1:d.getMonth(),//month
		cj=argv[4]!=undefined?argv[4]*1:d.getDate(),//day
		cY=argv[5]!=undefined?argv[5]*1:d.getYear()+1900;//year
	
	d.setHours(cH,ci,cs); d.setDate(cj); d.setMonth(cn); d.setYear(cY);
	
    return Math.floor(d.getTime()/1000);
}```

To test I have used this code:

```function test(){
	document.body.appendChild(div=document.createElement(&quot;div&quot;));
	var w=function(v){
		div.innerHTML+=v+&quot;&lt;br&gt;&quot;;
	}

	w(&quot;xx:xx:xx xx/xx/xxxx: &quot;+mktime());
	w(&quot;10:xx:xx xx/xx/xxxx: &quot;+mktime(10));
	w(&quot;10:10:xx xx/xx/xxxx: &quot;+mktime(10,10,10));
	w(&quot;10:10:10 10/xx/xxxx: &quot;+mktime(10,10,10,10));
	w(&quot;10:10:00 10/10/xxxx: &quot;+mktime(10,10,10,10,10));
	w(&quot;10:10:10 10/10/2000: &quot;+mktime(10,10,10,10,10,2000));
	w(&quot;00:00:00 05/03/2008: &quot;+mktime(0, 0, 0, '05', '03', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '03', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/04/2008: &quot;+mktime(0, 0, 0, '05', '04', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '04', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/05/2008: &quot;+mktime(0, 0, 0, '05', '05', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '05', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/06/2008: &quot;+mktime(0, 0, 0, '05', '06', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '06', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/07/2008: &quot;+mktime(0, 0, 0, '05', '07', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '07', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/08/2008: &quot;+mktime(0, 0, 0, '05', '08', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '08', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/09/2008: &quot;+mktime(0, 0, 0, '05', '09', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '09', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/10/2008: &quot;+mktime(0, 0, 0, '05', '10', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '10', '2008')?&gt;]&quot;);
	w(&quot;00:00:00 05/11/2008: &quot;+mktime(0, 0, 0, '05', '11', '2008')+&quot; [&lt;?=mktime(0, 0, 0, '05', '11', '2008')?&gt;]&quot;);
}```


And a free tip:
	parseInt('09') it's an octet, 9 don't exist, return false or 0; parseInt('08') will fail too
	parseInt('05') return 5
	parseInt('010') return 8
	parseInt('011') return 9
	var n='09'*1; work fine ;) //parseInt it's not necesary


Please, make the textarea bigger ;)

if you need something more, please send me an e-mail :) (I visit usually your project, but not every day)
good luck!
Marc
http://www.nbsp.es
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 13:05:46  
@ Marc Palau: Maybe it's because we're in different timezones, but your function fails the second &amp; 3rd test. So, sorry but I cannot replace the current implementation just yet.

And:
```
no = parseInt(argv[i]*1);
```

already multiplies by one, btw.
---------------------------------------
*[Marc Palau](http://www.nbsp.es)* on 2009-02-06 12:24:56  
Ok Kevin, I will take a look with diferent timezones and I will fix it :)

thanks for your reply
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-11 02:19:45  
@ Marc Palau: very well!
---------------------------------------
*[tomi]()* on 2009-07-26 02:27:47  
Hello mans!

I executed mktime(0,0,0,7,1,1975) sintax under both of javascript and php, and I have got not equal results.
The js produced this: 173397600
The php produced this: 173401200

This is a bug!
Have a nice day!

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-26 20:04:56  
Are you in a different time zone than your server? JavaScript can only use the user's default timezone unless we were to program the function to work with date_default_timezone_set(), as we should, but in that case you'd still need to call that extra function... Any patches are welcome...
---------------------------------------
*[3D-GRAF]()* on 2009-08-30 14:00:12  
Found bug:
mktime(0, 0, 0, 2, 23, 2009);

Results:
JS: 1237755600
PHP: 1235336400

Need a solution, help.

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-30 16:59:52  
@3D-GRAF : Thanks for the report. Since the date today (whether the 29th or 30th) is an impossible day for February, our function was mistakenly moving the month up to March. Fixed in SVN.

Please note though that while we have date_default_timezone_set() implemented (it uses this.php_js.default_timezone to store the current timezone), mktime (and no doubt a number of others) do not use the information yet.

So, it will currently just work against the current locale in the user's JavaScript--and you can't directly control the timezone via JavaScript. So, we have to fix mktime at some point to check our own this.php_js.default_timezone and adjust the time and possibly date accordingly in case someone wishes to control the timezone via JS (as opposed to letting the user's locale determine that).
---------------------------------------
*[swyong](-)* on 2009-09-14 09:35:07  
i cannot return the UNIX value which i put the argument. but it's working without the argument.(return today UNIX)

mktime(0,0,0,10,2,2009); this is argument i put.

and i notice that this function dun have any arguments needed. function mktime () {....}

im newbie, please help.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-14 16:01:28  
@swyong: Are you using the latest version of the function? If yes, what errors are you getting? (e.g., if using Firefox, what does it say in Tools->Error Console when you run the function?) I'm not getting any errors with the code you gave... 

The reason no arguments appear is because the automatically-built "arguments" object (available in JavaScript, like func_get_args() in PHP if you know what that is) is used here to get that information.
---------------------------------------
*[zeroneta]()* on 2010-01-05 22:08:23  
```
_.mktime = function()
{
	var a = date();
	arguments.length > 1 && a.setHours.apply( a, arguments );
	arguments.length > 3 && a.setFullYear( arguments[5] == un ? a.getFullYear() : arguments[5], arguments[3] == un ? a.getMonth() : arguments[3] - 1, arguments[4] == un ? a.getDate() : arguments[4] );
	return _.floor( a.getTime() / 1000 );
},
```

我写的JS类 下载地址 有爱好的可以探讨

http://bgscript.com/jscore/script/core.js
---------------------------------------
*[Chris]()* on 2010-01-18 01:56:45  
PHP:    mktime(23,59,59,13,0,2010) => 1293857999 
PHPJS: mktime(23,59,59,13,0,2010) => 1325393999

Looks like it doesn't like the '13' month with the '0' day which should be the last day of the previous month.
---------------------------------------
*[]()* on 2010-01-19 06:13:54  
@Chris: Thank you for finding this bug. The function has been updated to fix this bug as well as others. (http://github.com/kvz/phpjs/raw/master/functions/datetime/mktime.js) 
---------------------------------------
*[Micky]()* on 2010-02-23 12:10:43  
this date dosn't work...
01/01/2020 12h00:00
mktime(js) return 1152784800
instead of 1577876400 (mktime php)

why i don't know but it's strange...
---------------------------------------
*[Nikolay Ivanov](http://www.mediasoft.bg/)* on 2010-12-11 10:05:22  
1. I'm not guru, but isn't going to be much easier if you use:
```
new Date(year, month, day, hours, minutes, seconds, milliseconds)
```
To create the date object? Just the order of parameters is different than mktime in PHP.

2. Suggestion - why not using a small piece of AJAX code and simple .PHP file on the server just to use the real mktime function? This way you'll get always the server time, not the local one!
---------------------------------------
*[Rafa? Kukawski]()* on 2010-12-11 13:39:58  
@Nikolay Ivanov:
the goal of this project is to port php functions to javascript, so people familiar with PHP will be able to write something in javascript without good knowledge of this scripting language. The server time is something that we don't need.
Using only new Date(...) won't allow us to do an exact port of PHP API.
Using your suggestion, wouldn't allow us to do an exact port of PHP API. Your suggestion assumes that every single parameter is present, but PHP defines every param as optional, so we have to use current time. Thus, it's easier to create new Date instance with current time and update it.
---------------------------------------
*[Luiz Miguel Axcar](http://paineldegeneralidades.blogspot.com)* on 2011-05-12 19:35:22  
Fellows,

Don't forget converting string numbers to integer before sending to the functions, like this:

```
time = mktime(0,0,0,Number(month),Number(day),Number(year))
```

or the function returns unexpected results.

Cheers,

Luiz Miguel Axcar
Bauru, São Paulo, Brazil
---------------------------------------
*[????? ????](http://an3m1.com/)* on 2012-04-18 10:20:43  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 

---------------------------------------
