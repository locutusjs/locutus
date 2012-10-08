*[Darrell Brogdon]()* on 2008-01-09 03:23:28  
Here's a similar project I started awhile back if you're interested:  http://sourceforge.net/projects/php4js  I haven't had much time to devote to it but I would love it if someone could breathe new life into it.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-09 10:15:25  
@ Darell Brogdon: Thanks for pointing that out, I've searched hard, but wasn't able to find similar projects. Now that I did, how would you feel if I included some of your functions to this project? Well creditted of course. 
Most functions are already here but I found a couple that would be a great addition.

The reason to continue here is I developed some tools that really help me to publish new functions quickly, and for me it would be a buzz killer to have to maintain this on sourceforge. Exposure here is bigger as well I think.

I do believe however that once php.js reaches version 1.0, housing it on such a platform would be a better idea.
---------------------------------------
*[Jonas Raoni]()* on 2008-04-12 20:22:46  
This way it's faster :)

String.prototype.repeat = function(l){
	return new Array(l+1).join(this);
};

alert(&quot;jonas&quot;.repeat(10));
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 13:01:30  
@ Jonas Raoni: It sure is, thanks a lot!
---------------------------------------
*[snaky]()* on 2008-07-27 19:31:58  
thats grat :-) thank you for publishing
---------------------------------------
*[Tihomir Rabuzin](www.2klika.net)* on 2010-06-22 18:39:57  
I think that function has to be improved in this way:
```
return new Array(Number(multiplier)+1).join(input);
```
Change is in: Number(multiplier)

Explanation:
I have requirement for expanding numbers inside string in to equivalent number of characters. For example string: 3e2 must have string.length of 6

I have function that iterate through every character of a string and if is_numeric (one of phpjs functions too) replace that value with corresponding number of dummy characters using str_replace:
```
// max number that we can expand is 99
function expandTerm(subject) {
    var output = '';
    var repeat = '';

    for (i=0; i<subject.length; i++) {
        if(is_numeric(subject[i])) {
            repeat = subject[i];
            if (is_numeric(subject[i + 1])) {
                repeat = repeat * 10;
            }

            output = output + str_repeat('_', repeat);
            repeat = '';
        } else {
            output = output + subject[i];
        }
    }

    return output;
}
```
this returns 21 if input string is: 2 and __________01 if input string is: 10 and that is wrong. In first case output have to be: __ and in second __________ .
When I change your function, adding type casting on multiplier: Number(multiplier), everything working just as expected.

Have a nice day
---------------------------------------
*[????? ????? ???](http://an3m1.com/)* on 2012-04-04 14:32:11  
I agree it is a very informative article and I actually enjoy reading good stuff unlike all the crap out there on the internet 

---------------------------------------
*[Ian Carter](euona.com)* on 2012-05-18 12:03:43  
Using bytewise operators this function can be up to 99% faster

```
/*
 * @see http://jsperf.com/for-vs-while-bytewise-str-repeat/2
 */
    function str_repeat(x,n)
    {
        var y = '';
        while(true)
        {
                if(n & 1) y += x;
                n >>= 1;
                if(n) x += x; else break;
        }
        return y;
    }
```


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-22 13:23:38  
@Ian Carter: Thanks! I confirmed the significant performance improvement in Firefox (actually 4 or 5x faster in my testing)...Applied in Git...
---------------------------------------
