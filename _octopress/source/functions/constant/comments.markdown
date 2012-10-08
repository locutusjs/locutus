*[Paulo Freitas]()* on 2010-06-19 18:06:27  
Hmm, this one should require get_defined_constants(), no? When I wrote I think that the get_defined_constants() doesn't exist yet, but for now it should be useful to do things like constant('DATE_W3C'). :)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-06-21 04:50:35  
@Paulo: I think Kevin wants to avoid automatically importing PHP constants (whether as globals or on the namespaced object). If a user wants them, they can follow the notes at http://phpjs.org/functions/get_defined_constants:839 to get them in scope, but this function constant() could still be useful without them in the case of user-defined constants.
---------------------------------------
