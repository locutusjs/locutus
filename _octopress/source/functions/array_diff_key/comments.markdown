*[Ates Goral]()* on 2008-01-22 17:46:51  
Hi Kevin,

Since all the variables are now being declared in this line:

```
var tpm_ar = new Object(), argc = arguments.length, argv = arguments, key, other;
```

The var statements that follow can be removed.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 21:01:23  
@ Ates Goral: Overlooked it, thanks.
---------------------------------------
*[Everlasto]()* on 2011-06-12 15:59:25  
arr1keys: for (k1 in arr1) {
var j=arguments.length;
      for (i = 1; i < j; i++) {...}

A small suggestion :)

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-06-13 06:14:42  
@Everlasto: Added in Git with a little clean-up; thanks for the report!
---------------------------------------
*[????? ???????](http://an3m1.com/)* on 2012-04-17 15:32:45  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 

---------------------------------------
