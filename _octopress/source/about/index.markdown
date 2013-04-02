---
layout: page
title: "About php.js"
date: 2012-09-26 17:18
comments: true
sharing: false
footer: true
alias:
- /pages/contact
---

php.js is a resource that offers community-built JavaScript alternatives for PHP functions.

If you want to perform high-level operations on JavaScript platforms such as webbrowsers, node.js, etc, you probably need to write JS that combines its lower-level functions and build it up until you have something useful like:
[strip_tags](http://phpjs.org/functions/strip_tags/),
[strtotime](http://phpjs.org/functions/strtotime/),
[strftime](http://phpjs.org/functions/strftime/),
[number_format](http://phpjs.org/functions/number_format/),
[wordwrap](http://phpjs.org/functions/wordwrap/), or
[date](http://phpjs.org/functions/date/).

PHP is a language with many high-level functions and while they're not always implemented as consistently as we'd like (mimicking their underlying C parts), it has a huge following familiar with its functions.

We recognize JS has beautiful language features, and we encourage you to learn them.
Never let php.js be an excuse not to.
For the this reason we don't offer gigantic php.js packages or compilers anymore.

That said, we do think it's a challenge to port everything and decided to also port low-level PHP functions like
[strpos](http://phpjs.org/functions/strpos/)
even though it has a perfectly fine (and more performant!) JavaScript counterpart ([String.indexOf](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf)).
Besides the intellectual challenge of seeing how far we could come, porting ALL THE THINGS opens up php.js to be used for
other fun thought excercises such as realtime in-browser debugging/running of PHP code, or running .php files with JavaScript interpreters.
Also, there are quite a few PHP developers that use php.js just to learn how something is done in JavaScript.

And so we see ourselves as this big resource and leave it up to the developer to decide what makes sense to take from it.
And what not.

Under the motto: "Make it work, then make it work better", we have plently of functions here online that aren't perfect just yet.
If you know how to improve, just send us a pull request on GitHub.

## Contributing

We use [github](http://github.com/kvz/phpjs) for collaboration. Comments are for remarks only.
Please adhere to our [coding standards](https://github.com/kvz/phpjs/wiki/DeveloperGuidelines) before
sending a pull request.

## Licensing

php.js is dual licensed under the MIT licenses.

The MIT license allows you to use the library as you see fit (even in commercial projects) as long as you redistribute original the license with it. You're not obligated to share your improvements, but obviously that would be greatly appreciated and ensure you won't lose your changes after you upgrade.

	php.js is copyright 2012 Kevin van Zonneveld.

	Portions copyright Brett Zamir (http://brett-zamir.me), Kevin van Zonneveld
	(http://kevin.vanzonneveld.net), Onno Marsman, Theriault, Michael White
	(http://getsprink.com), Waldo Malqui Silva, Paulo Freitas, Jack, Jonas
	Raoni Soares Silva (http://www.jsfromhell.com), Philip Peterson, Legaev
	Andrey, Ates Goral (http://magnetiq.com), Alex, Ratheous, Martijn Wieringa,
	Rafa? Kukawski (http://blog.kukawski.pl), lmeyrick
	(https://sourceforge.net/projects/bcmath-js/), Nate, Philippe Baumann,
	Enrique Gonzalez, Webtoolkit.info (http://www.webtoolkit.info/), Carlos R.
	L. Rodrigues (http://www.jsfromhell.com), Ash Searle
	(http://hexmen.com/blog/), Jani Hartikainen, travc, Ole Vrijenhoek,
	Erkekjetter, Michael Grier, Rafa? Kukawski (http://kukawski.pl), Johnny
	Mast (http://www.phpvrouwen.nl), T.Wild, d3x,
	http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript,
	Rafa? Kukawski (http://blog.kukawski.pl/), stag019, pilus, WebDevHobo
	(http://webdevhobo.blogspot.com/), marrtins, GeekFG
	(http://geekfg.blogspot.com), Andrea Giammarchi
	(http://webreflection.blogspot.com), Arpad Ray (mailto:arpad@php.net),
	gorthaur, Paul Smith, Tim de Koning (http://www.kingsquare.nl), Joris, Oleg
	Eremeev, Steve Hilder, majak, gettimeofday, KELAN, Josh Fraser
	(http://onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/),
	Marc Palau, Martin
	(http://www.erlenwiese.de/), Breaking Par Consulting Inc
	(http://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87256CFB006C45F7),
	Chris, Mirek Slugen, saulius, Alfonso Jimenez
	(http://www.alfonsojimenez.com), Diplom@t (http://difane.com/), felix,
	Mailfaker (http://www.weedem.fr/), Tyler Akins (http://rumkin.com), Caio
	Ariede (http://caioariede.com), Robin, Kankrelune
	(http://www.webfaktory.info/), Karol Kowalski, Imgen Tata
	(http://www.myipdf.com/), mdsjack (http://www.mdsjack.bo.it), Dreamer,
	Felix Geisendoerfer (http://www.debuggable.com/felix), Lars Fischer, AJ,
	David, Aman Gupta, Michael White, Public Domain
	(http://www.json.org/json2.js), Steven Levithan
	(http://blog.stevenlevithan.com), Sakimori, Pellentesque Malesuada,
	Thunder.m, Dj (http://phpjs.org/functions/htmlentities:425#comment_134018),
	Steve Clay, David James, Francois, class_exists, nobbler, T. Wild, Itsacon
	(http://www.itsacon.net/), date, Ole Vrijenhoek (http://www.nervous.nl/),
	Fox, Raphael (Ao RUDLER), Marco, noname, Mateusz "loonquawl" Zalega, Frank
	Forte, Arno, ger, mktime, john (http://www.jd-tech.net), Nick Kolosov
	(http://sammy.ru), marc andreu, Scott Cariss, Douglas Crockford
	(http://javascript.crockford.com), madipta, Slawomir Kaniecki,
	ReverseSyntax, Nathan, Alex Wilson, kenneth, Bayron Guevara, Adam Wallner
	(http://web2.bitbaro.hu/), paulo kuong, jmweb, Lincoln Ramsay, djmix,
	Pyerre, Jon Hohle, Thiago Mata (http://thiagomata.blog.com), lmeyrick
	(https://sourceforge.net/projects/bcmath-js/this.), Linuxworld, duncan,
	Gilbert, Sanjoy Roy, Shingo, sankai, Oskar Larsson H?gfeldt
	(http://oskar-lh.name/), Denny Wardhana, 0m3r, Everlasto, Subhasis Deb,
	josh, jd, Pier Paolo Ramon (http://www.mastersoup.com/), P, merabi, Soren
	Hansen, Eugene Bulkin (http://doubleaw.com/), Der Simon
	(http://innerdom.sourceforge.net/), echo is bad, Ozh, XoraX
	(http://www.xorax.info), EdorFaus, JB, J A R, Marc Jansen, Francesco, LH,
	Stoyan Kyosev (http://www.svest.org/), nord_ua, omid
	(http://phpjs.org/functions/380:380#comment_137122), Brad Touesnard, MeEtc
	(http://yass.meetcweb.com), Peter-Paul Koch
	(http://www.quirksmode.org/js/beat.html), Olivier Louvignes
	(http://mg-crea.com/), T0bsn, Tim Wiel, Bryan Elliott, Jalal Berrami,
	Martin, JT, David Randall, Thomas Beaucourt (http://www.webapp.fr), taith,
	vlado houba, Pierre-Luc Paour, Kristof Coomans (SCK-CEN Belgian Nucleair
	Research Centre), Martin Pool, Kirk Strobeck, Rick Waldron, Brant Messenger
	(http://www.brantmessenger.com/), Devan Penner-Woelk, Saulo Vallory, Wagner
	B. Soares, Artur Tchernychev, Valentina De Rosa, Jason Wong
	(http://carrot.org/), Christoph, Daniel Esteban, strftime, Mick@el, rezna,
	Simon Willison (http://simonwillison.net), Anton Ongson, Gabriel Paderni,
	Marco van Oort, penutbutterjelly, Philipp Lenssen, Bjorn Roesbeke
	(http://www.bjornroesbeke.be/), Bug?, Eric Nagel, Tomasz Wesolowski,
	Evertjan Garretsen, Bobby Drake, Blues (http://tech.bluesmoon.info/), Luke
	Godfrey, Pul, uestla, Alan C, Ulrich, Rafal Kukawski, Yves Sucaet,
	sowberry, Norman "zEh" Fuchs, hitwork, Zahlii, johnrembo, Nick Callen,
	Steven Levithan (stevenlevithan.com), ejsanders, Scott Baker, Brian Tafoya
	(http://www.premasolutions.com/), Philippe Jausions
	(http://pear.php.net/user/jausions), Aidan Lister
	(http://aidanlister.com/), Rob, e-mike, HKM, ChaosNo1, metjay, strcasecmp,
	strcmp, Taras Bogach, jpfle, Alexander Ermolaev
	(http://snippets.dzone.com/user/AlexanderErmolaev), DxGx, kilops, Orlando,
	dptr1988, Le Torbi, James (http://www.james-bell.co.uk/), Pedro Tainha
	(http://www.pedrotainha.com), James, Arnout Kazemier
	(http://www.3rd-Eden.com), Chris McMacken, gabriel paderni, Yannoo,
	FGFEmperor, baris ozdil, Tod Gentille, Greg Frazier, jakes, 3D-GRAF, Allan
	Jensen (http://www.winternet.no), Howard Yeend, Benjamin Lupton, davook,
	daniel airton wermann (http://wermann.com.br), Atli T¨®r, Maximusya, Ryan
	W Tenney (http://ryan.10e.us), Alexander M Beedie, fearphage
	(http://http/my.opera.com/fearphage/), Nathan Sepulveda, Victor, Matteo,
	Billy, stensi, Cord, Manish, T.J. Leahy, Riddler
	(http://www.frontierwebdev.com/), Rafa? Kukawski, FremyCompany, Matt
	Bradley, Tim de Koning, Luis Salazar (http://www.freaky-media.com/), Diogo
	Resende, Rival, Andrej Pavlovic, Garagoth, Le Torbi
	(http://www.letorbi.de/), Dino, Josep Sanz (http://www.ws3.es/), rem,
	Russell Walker (http://www.nbill.co.uk/), Jamie Beck
	(http://www.terabit.ca/), setcookie, Michael, YUI Library:
	http://developer.yahoo.com/yui/docs/YAHOO.util.DateLocale.html, Blues at
	http://hacks.bluesmoon.info/strftime/strftime.js, Ben
	(http://benblume.co.uk/), DtTvB
	(http://dt.in.th/2008-09-16.string-length-in-bytes.html), Andreas, William,
	meo, incidence, Cagri Ekin, Amirouche, Amir Habibi
	(http://www.residence-mixte.com/), Luke Smith (http://lucassmith.name),
	Kheang Hok Chin (http://www.distantia.ca/), Jay Klehr, Lorenzo Pisani,
	Tony, Yen-Wei Liu, Greenseed, mk.keck, Leslie Hoare, dude, booeyOH, Ben
	Bryan

	Licensed under the MIT (MIT-LICENSE.txt) license.

	Permission is hereby granted, free of charge, to any person obtaining a
	copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be included
	in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
	OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
