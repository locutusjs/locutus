*[CoursesWeb](http://www.coursesweb.net)* on 2012-04-30 17:12:56  
Hi,
For a simple array_search function, without the third parameter, i use made this variant (works with array and objects:
```
function array_search(val, array) {
  if(typeof(array) === 'array' || typeof(array) === 'object') {
    for(var indice in array) {
      if(array[indice] == val) break;
    }
    if(indice) return indice;
  }
}
```
---------------------------------------
*[CoursesWeb](http://www.coursesweb.net)* on 2012-04-30 18:08:28  
Hi,
This is a comment to correct the function posted below.
That function has an error, it returns the last key, eaven the value not match.
Sorry, here's the corrected version:
```
function array_search(val, array) {
  if(typeof(array) === 'array' || typeof(array) === 'object') {
    var rekey;
    for(var indice in array) {
      if(array[indice] == val) {
        rekey = indice;
        break;
      }
    }
    return rekey;
  }
}
```
---------------------------------------
