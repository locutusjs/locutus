*[Roland Hentschel]()* on 2009-10-02 10:44:06  
Hi!

Well, the function void() does not really show, how the whole thing works. Couldn't you provide a sample call with a function,
that would help me understanding better?

thanx ( -: roland :- )

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 23:32:31  
@ Roland Hentschel: Our examples are also used for unit testing. Hence the strangeness.
Please refer to the official PHP documentation for more details on how to operate these functions. 
---------------------------------------
*[Basti](www.example.org)* on 2009-10-13 18:54:55  
Please prefer prototyping instead of doing something like this. Instead of polluting the users memory...Prototypes are just ONCE instanced in memory, but are applied for every existing array.

Example:
```
Array.prototype.myFunction = function (yourArgumentsGoHere) {
 // doWhatever you want to apply 
}
```
---------------------------------------
*[Basti](www.example.org)* on 2009-10-13 18:56:26  
Please prefer prototyping instead of doing something like this. Instead of polluting the users memory...Prototypes are just ONCE instanced in memory, but are applied for every existing array.

Example:
```
Array.prototype.myFunction = function (yourArgumentsGoHere) {
 // doWhatever you want to apply 
}
```
---------------------------------------
