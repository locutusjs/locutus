*[Kongo]()* on 2012-06-29 21:31:56  
Hi ! Your function doesn't work :) 
Why ? You don't use parseInt :)
working is :
```
function mt_rand (min, max) {
    var argc = arguments.length;
    if (argc === 0) {        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
    }    
var score = Math.floor(Math.random() * (max - min + 1));
score = parseInt(score) + parseInt(min);
return score;
}
```

:)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-04 15:24:04  
@Kongo: I can see how parseInt is necessary for the min part, but Math.floor should already be creating an integer for the score portion. Still, I do see that PHP seems to cut off the decimal portion for min and max, so I think we should parseInt on both arguments BEFORE calculation to avoid any chance of too high of a max. I have made this change in Git.
---------------------------------------
