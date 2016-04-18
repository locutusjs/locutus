module.exports = function str_ireplace (search, replace, subject, count) {
  //  discuss at: http://locutusjs.org/php/str_ireplace/
  // original by: Glen Arason (http://CanadianDomainRegistry.ca)
  //        note: Case-insensitive version of str_replace()
  //        note: Compliant with PHP 5.0 str_ireplace() Full details at:
  //        note: http://ca3.php.net/manual/en/function.str-ireplace.php
  //        note: The count parameter (optional) if used must be passed in as a
  //        note: string. eg global var MyCount:
  //        note: str_ireplace($search, $replace, $subject, 'MyCount');
  //      format: str_ireplace($search, $replace, $subject[, 'count'])
  //       input: str_ireplace($search, $replace, $subject[, {string}]);
  //   example 1: str_ireplace('M', 'e', 'name');
  //   returns 1: 'naee'

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
    osa = Object.prototype.toString.call(os) === '[object Array]'

  if (typeof (search) === 'object') {
    temp = search
    search = new Array()
    for (i = 0; i < temp.length; i += 1) {
      search[i] = temp[i].toLowerCase()
    }
  } else {
    search = search.toLowerCase()
  }

  if (typeof (subject) === 'object') {
    temp = subject
    subject = new Array()
    for (i = 0; i < temp.length; i += 1) {
      subject[i] = temp[i].toLowerCase()
    }
  } else {
    subject = subject.toLowerCase()
  }

  if (typeof (search) === 'object' && typeof (replace) === 'string') {
    temp = replace
    replace = new Array()
    for (i = 0; i < search.length; i += 1) {
      replace[i] = temp
    }
  }

  temp = ''
  f = [].concat(search)
  r = [].concat(replace)
  ra = Object.prototype.toString.call(r) === '[object Array]'
  s = subject
  sa = Object.prototype.toString.call(s) === '[object Array]'
  s = [].concat(s)
  os = [].concat(os)

  if (count) {
    this.window[count] = 0
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + ''
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
      s[i] = (temp)
        .split(f[j])
        .join(repl)
      otemp = os[i] + ''
      oi = temp.indexOf(f[j])
      ofjl = f[j].length
      if (oi >= 0) {
        os[i] = (otemp)
          .split(otemp.substr(oi, ofjl))
          .join(repl)
      }

      if (count) {
        this.window[count] += ((temp.split(f[j]))
          .length - 1)
      }
    }
  }
  return osa ? os : os[0]
}
