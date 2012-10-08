*[Rey]()* on 2011-05-05 23:15:18  
The following term returns different results on php and js:

Chick-fil-A

PHP result:
XKFL

JS:
KKFL

I'm not sure which one is correct.
---------------------------------------
*[Rafa? Kukawski]()* on 2011-05-06 08:13:07  
@Rey: yeah, the metaphone requires a big cleanup and some bug fixing. But the PHP implementation isn't bug free, nor does it follow the metaphone "specs". There are some differences.
I did a rewrite of the function, that you can see on github https://github.com/kvz/phpjs/raw/master/_workbench/strings/metaphone.js You can check if this one suits your needs (it lacks phonemes param support, but that's easy to do). The problem is, it's difficult to test if a metaphone implementation works correctly. For many cases also the current implementation works, but as you've proven it's not bug free.
I will try to unit test that one ASAP make it a final release.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-05-06 09:13:06  
@Rey: According to the original BASIC implementation of metaphone at http://aspell.net/metaphone/metaphone.basic (though not mentioned in summaries of the algorithm such as http://en.wikipedia.org/wiki/Metaphone ), "Ch" at the beginning of a word and then followed by a vowel should produce "k". It seems to depend on what metaphone version is being targeted (see http://aspell.net/metaphone/ ). The PHP source code had a "traditional" flag, apparently to distinguish this original algorithm from others, but this was not apparently exposed anywhere in the public API.

Practically speaking, there are examples like "Character", "Charisma", and "Chyme" where "k" makes sense, but other counter-examples like "Check", "Chick", "Chinese", "Chore", etc. which might indicate otherwise (seems 'e', 'i', 'o' should have been distinguished from other vowels based on this sample anyways, though there is also "Chad").

I went with the original algorithm, thinking http://bugs.php.net/bug.php?id=48711 might end up getting PHP to follow the original.

Lines 114-118 in our code deal with this, so feel free to alter it in your own copy, as this seems up for grabs to me (though maybe we should revert to PHP behavior, allowing configuration to allow the deviation until such time as PHP itself may resolve the issue).
---------------------------------------
*[Lawrence Philips](http://www.amorphics.com/)* on 2011-06-04 21:35:36  
re: correct implementations of metaphone, specifically whether to code "CH-<vowel>" as K or X

This is in fact an incredibly complicated question, since the number of exceptions in the pronunciation of consonants and consonant groups in English is huge. These issues are only really addressed correctly in the third generation of the Metaphone algorithm, Metaphone 3
---------------------------------------
