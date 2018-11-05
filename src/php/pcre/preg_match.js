module.exports = function preg_match (regex, str) { // eslint-disable-line camelcase
  //   original by: Muhammad Humayun (https://github.com/ronypt)
  //   example 1: preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "rony@pharaohtools.com")
  //   returns 1: true
  //   example 2: preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "ronypharaohtools.com")
  //   returns 2: false
  //   example 3: preg_match(preg_match('^[0-9-+s()]*$', '021827495'))
  //   returns 3: true
  //   example 4: preg_match(preg_match('^[0-9-+s()]*$', 'phone23no'))
  //   returns 4: false

  return (new RegExp(regex).test(str))
}
