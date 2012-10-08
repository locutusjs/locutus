*[Florian](http://duran2.de/felektro)* on 2009-10-24 11:23:57  
Thanks for this wonderful script! I used it for my javascript based search engine.
But it seems if there's a little bug on your website: when you come on this site, it redirects you to a site with only digg buttons for example. It would be good if you fix that!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 14:09:43  
@ Florian: Yeah witnessed on a colleague's PC recently. Should be fixed now!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 14:10:14  
@ Florian: PS, was this by any chance Firefox 3.0?
---------------------------------------
*[Andrew Maxwell]()* on 2011-03-01 19:04:07  
1. It's always faster to access array elements than characters in a string. Always split it.
2. This function is unnecessarily verbose. For most if not all circumstances, the following would more than suffice:
```
 function levenshtein (s1, s2) {
    if (s1===s2){return 0;}
    if (s1.length===0){return s2.length;}
    if (s2.length===0){return s1.length;}
    var v0=[],v1=[], j=0, k=0;
    s1=s1.split('');
    s2=s2.split('');
    for (j=0; j<=s1.length; j++){v0[j]=j;}
    for (k=1; k<=s2.length; k++){
        v1[0]=k;
        for (j=0; j<s1.length; j++){v1[j+1]=Math.min(v0[j+1]+1, v1[j]+1, v0[j]+((s1[j]===s2[k-1])? 0: 1));}
        var v_tmp = v0;
        v0 = v1;
        v1 = v_tmp;
    }
    return v0[s1.length];
}
```
---------------------------------------
*[????? ????? ????](http://an3m1.com/)* on 2012-03-22 13:52:04  
New in the gaming world and all that exclusive games, visit the Portal Forums 
---------------------------------------
*[](http://tessmore.nl)* on 2012-03-26 02:31:44  
Not sure if it is shorter than Andrew Maxwell his version, but since it didn't make it.. I thought I give it a shot.

```
    function levenshtein(a, b) {
      var i, j, r=[];
      
      r[0] = [];
      r[0][0] = 0;
      
      for(i=1; i<=a.length; i++) {
        r[i] = [];
        r[i][0] = i;
        
        for(j=1; j<=b.length; j++) {
          r[0][j] = j;
          r[i][j] = Math.min(
                      r[i-1][j]+1,
                      r[i][j-1]+1, 
                      r[i-1][j-1] + (a[i-1]!==b[j-1])
                    );
        }
      }    
      
      return r[a.length][b.length];
    }
```
---------------------------------------
