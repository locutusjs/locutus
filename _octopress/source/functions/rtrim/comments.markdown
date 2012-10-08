*[rem]()* on 2009-11-04 17:08:02  
What if to rtrim a string like   stringname[0]
rtrim(stringname[0], '[0]')  will return 'stringname['  which it's incorect
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-07 12:27:57  
@rem: Thanks for alerting us to this. While most of the ingredients were there, I guess someone forgot to do the escaping...Fixed in http://github.com/kvz/phpjs/commit/7e0c05cb7c5049dfa89c39fc8460df48aca76948 . Should also be online here shortly.
---------------------------------------
