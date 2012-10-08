*[]()* on 2010-01-19 07:31:39  
For some reason, JSLint wants the cases of a switch statement to be lined up with the switch statement itself:
```
switch (expression) {
case 1:
    ...
case 2:
    ...
}
```

...instead of the more readable....

```
switch (expression) {
    case 1:
        ...
    case 2:
        ...
}
```

I don't understand why it wants this.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-20 10:49:22  
JSLint, as good as it is, really needs more configuration options. I would venture a guess that maybe the reason is because the indents at the end are otherwise confusing:

```switch(v) {
    case 'a':
        break;
    default:

...lots of stuff here...


        break;
   // Might be tempting to put ending bracket here 
  // or add one here since the indent before this line 
  // is twice as much as the next
}
```

That being said, I don't like all of JSLint's provisions, including this one, as well as even the one forbidding fall-throughs. There has to be room for different coding styles too. I bet Douglas Crockford may be open to patches which did allow configuration if someone submitted the patches...
---------------------------------------
