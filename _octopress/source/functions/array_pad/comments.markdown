*[Yury Ramanouski](http://notelad.livejournal.com/)* on 2010-07-02 06:33:45  
```
// Is for loop the best way to fill an array with same value in JavaScript? 
// No! Let's steal the idea from here: http://en.wikipedia.org/wiki/Exponentiation_by_squaring. 
// We get a PHP-like array_pad function: 

function array_pad(array, pad_size, pad_value){ 
  var tail_length = Math.abs(pad_size) - array.length;

  if(tail_length <= 0){ 
    return array; 
  }

  var tail = []; 
  var subTail = [pad_value]; 
  while(tail_length > 0){ 
    if(tail_length % 2){ 
      tail = tail.concat(subTail); 
    } 
    subTail = subTail.concat(subTail); 
    tail_length >>= 1; 
  }

  return pad_size < 0 ? tail.concat(array) : array.concat(tail); 
}
```
---------------------------------------
*[Yury Ramanouski](http://notelad.livejournal.com)* on 2010-07-02 09:13:35  
```
// Even quicker function is possible!
Array.prototype.pad = function(pad_size, pad_value){
  var tail_length = Math.abs(pad_size) - this.length;
  if(tail_length <= 0){
    return this; // replace "this" with "this.slice(0)" if you want a copy
  }

  var tail = [];
  var subTail = [pad_value];
  for( ; ; ){
    if(tail_length % 2){
      tail = tail.concat(subTail);
    }
    if(tail_length >>= 1){
      subTail = subTail.concat(subTail);
    }
    else{
      break;
    }
  }

  return pad_size < 0 ? tail.concat(this) : this.concat(tail);
}
```
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-07-05 08:47:49  
Nothing special, but this is my approach to this function

```function array_pad(input, pad_size, pad_value){
    try {
        pad_size |= 0; // force pad_size to be int
        var diff = Math.abs(pad_size) - input.length,
            pad = [];

        if(diff <= 0){
            return input.slice(0);
        }

        while(diff--){
            pad.push(pad_value);
        }

       return pad_size < 0 ? pad.concat(input) : input.concat(pad);
    } catch(e) {
        return null; // PHP throws a warning and returns null when first param isn't an array
    }
}```

I wrapped the functions body with try..catch, in case the input isn't an array or anything else that has concat and slice methods (the function works also with strings, cause both methods are included in String prototype :-P). To be 99.9% compatible with PHP and not let this function handle strings, just add a condition

```if(!(input instanceOf Array)){
throw "Not an array";
}``` or
```if(!(input instanceOf Array)){
return null;
}```
Some people prefer also "better" checking for arrays
```Object.prototype.toString.call(input) !== '[object Array]'```

Another problem is handling arrays with non-numeric indexes. I don't see a stable strategy along the whole phpjs project, that is why I didn't implement support for it.
---------------------------------------
