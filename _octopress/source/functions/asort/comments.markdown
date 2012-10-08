*[Jason]()* on 2009-01-14 22:50:10  
Great work!  This should be very useful.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-15 00:55:29  
Glad you liked it, Jason.

That reminds me, I should give some credit for this function (and for arsort() too) to http://javascriptsource.com (specifically http://javascript.internet.com/math-related/bubble-sort.html ). They stated &quot;the script is yours&quot; (and my version is reasonably altered anyways), but they deserve some credit.

Kevin, a small thing, but if you were attending to these kinds of things, I should have put a semicolon after &quot;var bubbleSort .... {...}&quot; (or used regular function notation).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-15 11:27:50  
@ Brett Zamir: fixed
---------------------------------------
*[paulo kuong]()* on 2009-11-17 20:05:04  
Doesn't work in IE
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-18 06:11:46  
@paulo kuong: Darn, you're right!  You can see how the array forms by adding our var_dump (with echo() dependency) after line 82 :

```var_dump(inputArr);echo('<br />');```

IE does preserve the right order as it goes through the for loop, but it seems to remember its previous order (since I see no other good explanation why it puts it back in exactly that non-alphabetical/non-reverse-alphabetical order)--no matter whether I delete (as we do now), set to undefined or some value and then delete, etc.

Nevertheless, everyone from Chrome, Opera, Safari, to Firefox handle this consistently.

Has anyone heard of this issue in IE before and any ways to get around it?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-18 06:13:36  
That echo() was supposed to have a br line break in it but the form stripped the element out (seems the colorer is using strip_tags() instead of htmlentities())...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-07 15:03:30  
@Paulo Kuong: I have now fixed the function (and all others like it except for array_multisort which still needs to be fixed and array_unique which hasn't implemented its sorting argument at all yet) to return a (shallow) copy of the array unless the user does "ini_set('phpjs.strictForIn', true);" in which case it will attempt to work by reference (assumes an exclusively non-IE environment!).
---------------------------------------
*[Adam Wallner](http://web2.bitbaro.hu/)* on 2010-05-03 17:57:26  
It doesn't work in Firefox 3.6 (I haven't tested in other browsers, I need it only in firefox). The problem is in js you don't have associative arrays only objects.

Workaround: change the 
```
populateArr = []
```
to
```
populateArr = {}
```
in the first line.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-05-03 21:32:06  
@Adam Wallner: Argh...Yes, you are right, and that was what I originally meant to do...Very glad you found that since it affected a good number of functions (though thankfully, fewer people probably using that option--still...). Now fixed in Git... Thank you...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-05-03 21:34:10  
@Adam Wallner: I see now I hadn't looked carefully; I see that it was actually messed up for the more common use case. Oh, that is annoying, but glad it is now fixed.
---------------------------------------
*[Tom](www.binde.lv)* on 2011-04-13 20:53:02  
This is not working on Chrome. Objects are not specified as having to return properties in any particular order.
More info here: http://code.google.com/p/chromium/issues/detail?id=883
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-04-14 13:52:10  
Yes, Tom, thanks. We're aware of the issue, and since Chrome might not address this issue, given that the ECMAScript specification indeed does state that the iteration order is in fact implementation dependent (though it's worked pretty well to date with a minor exception before Chrome changed the behavior), I'm doing initial work now (see the array() function) on supporting an associative array representation which is slightly more cumbersome (unfortunately necessarily so). Feel free to help out--great way to learn some more JavaScript or at least do a little brain puzzles....Lots of array functions to port...

So, to ensure order is predictable cross-browser, you would use something like this:   

```
// Returns a PHPJS_Array object--our own class which can
// have all the same PHP methods on it, but using a chainable 
// style, and ensuring sequence is preserved
var arr = array({key1:value1}, {key2:value2});
```

Note that this would be treated as an associative array a single level deep (i.e., it would actually be treated like {key1:value1, key2:value2}). 

Or, once I finish updating the array_merge() implementation to work on PHPJS_Array, you could import arrays or objects too, bearing in mind that you'd have to first perform a sort in order to guarantee order:

```
var arr = array().merge({key1:value1, key2:value2}).sort(); // After the sort, we would have a reliable fixed order
```

On the bright side, one benefit of moving to this model is that it is forcing us to implement what has been a goal for some time: a jQuery-like chainable object which would allow us to do such as:

```
arr.sort().change_key_case('UPPER_CASE').values(); // Notice "array_" is removed from "array_values" since we know the object is an array.
```

We should also be able to do the like for strings, etc.:

```
string(user_input).str_replace(...).strip_tags().rev(); // I didn't remove "str_" from "str_replace" to avoid conflict with the built-in replace() method.
```

Besides this syntax being more "JavaScript-like" and favorable to some JavaScript users, perhaps because it avoids one needing to go backwards to add parentheses around a sequence--you just keep adding to the right instead--it also addresses some of the objections to PHP's API in not having predictable argument order--there's no need to remember needle-haystack for example, because the haystack argument will be eliminated, as it will be assumed to be the object on which we are calling methods.

Some libraries like Underscore.js already offer some of these abilities, and maybe offer some innovations not present in PHP, but the PHP library is both familiar in naming to PHP users, as well as quite rich, so hopefully this may bring our library into wider favor among regular JavaScript users, as well as continue to provide convenience for PHP users moving to JavaScript (as well as give piece of mind for this implementation order issue). Thanks for bringing this up!
---------------------------------------
*[Conix Inc](www.conixinc.com)* on 2012-02-18 21:31:24  
i want to use it
---------------------------------------
