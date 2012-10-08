*[Serg]()* on 2010-05-14 18:38:24  
when i used your code I had an error ;
<<Error: this.file_get_contents is not a function>>;
I could not solve it;
If you know about it something pleas tell me about
thanks
p.s.
sorry for my English 
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-05-14 20:43:55  
@ Serg: This function has dependencies. You'll need to get those as well.
---------------------------------------
*[Sr. Polo]()* on 2010-09-20 00:08:44  
See dependencies
---------------------------------------
*[todd]()* on 2011-09-19 10:48:36  
don't run
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-09-19 20:52:52  
@todd: This has to be on the same domain, and it is not meant to load from the local file system (which is not allowed except to privileged JavaScript, something which has unfortunately been becoming a contradiction in client-side JavaScript).
---------------------------------------
*[Paul Wratt]()* on 2011-11-05 12:40:51  
hmm.. maybe if you are dumping PHP into JS tags, this function is OK, you should get a valid pointer if the file exists..

.. but from a client-side http: JS perspective, this function has no other use, as it does not return the actual page/code requested.. which is similar to PHP, use the "dependency" instead.. ('file_get_contents')

btw how does this code depend on 'file_get_contents' (except as I just pointed out), as it contains its own 'file_get_contents' function..

hmm.. maybe if combined with fread($fp) it would allow standard code to operate correctly..(reading 'stream' from '.resourceData')

interesting, and good for completeness & thoroughness
---------------------------------------
*[???? ????????](http://an3m1.com/)* on 2012-04-11 15:47:19  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 
---------------------------------------
