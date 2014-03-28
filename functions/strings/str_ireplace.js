function str_ireplace(search, replace, subject, count) {
  //  discuss at: http://phpjs.org/functions/str_ireplace/
  // original by: Martijn Wieringa
  //  rewrite by: Glen Arason (http://CanadianDomainRegistry.ca)
  //            : Case-insensitive version of str_replace().
  //      format: str_ireplace(search, replace, subject[, count])
  //  Parameters: If search and replace are arrays, then str_ireplace() takes a value
  //                from each array and uses them to search and replace on subject. 
  //              If replace has fewer values than search, then an empty string is 
  //                used for the rest of replacement values. 
  //              If search is an array and replace is a string, then this replacement 
  //                string is used for every value of search. 
  //        note: The count parameter if used must be passed as a string associated with 
  //                a global variable to pass the result to.
  //       input: str_ireplace({string}, {string}, {string}[, {string}]);
  //       input: str_ireplace({array}, {string}, {string}[, {string}]);
  //       input: str_ireplace({array}, {array}, {string}[, {string}]);
  //       input: str_ireplace({array}, {string}, {array}[, {string}]);
  //       input: str_ireplace({array}, {array}, {array}[, {string}]);

  /* Modified str_replace() */
  /* New vars prefixed with letter "o" to represent original "subject" var changes. */
  var i = 0,
    j = 0,
    temp = '',
    repl = '',
    sl = 0,
    fl = 0,
    f = '',
    r = '',
    s = '',
    ra = '',
    sa = '',
    otemp = '',
    oi = '',
    ofjl = '',
    os = subject,
    osa = Object.prototype.toString.call(os) === '[object Array]';
  
  /* If user enters search criteria in caps change them to lower case */
  if(typeof(search) === 'object') {
    temp = search;
    search = new Array();
    for(i=0; i<temp.length;i+=1) {
      search[i] = temp[i].toLowerCase();
    }
  }else { search = search.toLowerCase(); }
  
  /* change the subject to lower case */
  if(typeof(subject) === 'object') {
    temp = subject;
    subject = new Array();
    for(i=0; i<temp.length;i+=1) {
      subject[i] = temp[i].toLowerCase();
    }
  }else { subject = subject.toLowerCase(); }

  /* removed the re-assignment of vars from this original code segment */
  if(typeof(search) === 'object' && typeof(replace) === 'string' ) {
    temp = replace; 
    replace = new Array();
    for (i=0; i < search.length; i+=1) { 
      replace[i] = temp; 
    }
  }
  
  /* defaults are now assigned here */
  temp = '';
  f = [].concat(search);
  r = [].concat(replace);
  ra = Object.prototype.toString.call(r) === '[object Array]';
  s = subject;
  sa = Object.prototype.toString.call(s) === '[object Array]';
  s = [].concat(s);
  os = [].concat(os);
  
  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + '';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp).split(f[j]).join(repl);
      /* update the original case sensitive subject(s) */
      otemp = os[i] + '';
      oi = temp.indexOf(f[j]);
      ofjl = f[j].length;
      if(oi >= 0) { 
        os[i] = (otemp).split(otemp.substr(oi,ofjl)).join(repl);
      } /* end of this mod segment */

      if (count) {
        this.window[count] += ((temp.split(f[j])).length - 1);
      } 
    }
  }
  return osa ? os : os[0]; /* returning the modified case sensitive subject(s) */
}
