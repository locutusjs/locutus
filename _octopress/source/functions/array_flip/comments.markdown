*[Pier Paolo Ramon](www.mastersoup.com)* on 2011-07-15 16:45:51  
You should check if it's a property of the object, with hasOwnProperty.

```
for (key in trans) {
  if (!trans.hasOwnProperty(key)) continue;
  tmp_ar[trans[key]] = key;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-07-20 03:47:32  
@Pier Paolo Ramon: Good catch! Thanks--fixed in Git... (This function as with many others still needs to support reliably ordered associative arrays--see PHPJS_Array() in array().)
---------------------------------------
