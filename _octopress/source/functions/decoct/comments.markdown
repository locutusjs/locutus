*[Onno Marsman]()* on 2008-10-04 11:54:01  
decoct('8') does not work correctly. A fix:

```
function decoct(number) {
    return parseInt(number).toString(8);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:00:40  
@ Onno Marsmann: Fixed, thank you!
---------------------------------------
