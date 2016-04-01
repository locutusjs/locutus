---
examples:
  - - "parse_url('http://username:password@hostname/path?arg=value#anchor');"
  - - "parse_url('http://en.wikipedia.org/wiki/%22@%22_%28album%29');"
  - - "parse_url('https://host.domain.tld/a@b.c/folder')"
  - - "parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar');"
returns:
  - - "{scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}"
  - - "{scheme: 'http', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}"
  - - "{scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}"
  - - "{ scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }"
authors:
  original by:
    - 'Steven Levithan (http://blog.stevenlevithan.com)'
  improved by:
    - 'Brett Zamir (http://brett-zamir.me)'
  input by:
    - Lorenzo Pisani
    - Tony
notes:
  - - 'original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js'
    - 'blog post at http://blog.stevenlevithan.com/archives/parseuri'
    - 'demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js'
    - "Does not replace invalid characters with '_' as in PHP, nor does it return false with"
    - a seriously malformed URL.
    - 'Besides function name, is essentially the same as parseUri as well as our allowing'
    - 'an extra slash after the scheme/protocol (to allow file:/// as in PHP)'
layout: function
function: parse_url
category: url
code: "function parse_url (str, component) {\n  //       discuss at: http://phpjs.org/functions/parse_url/\n  //      original by: Steven Levithan (http://blog.stevenlevithan.com)\n  // reimplemented by: Brett Zamir (http://brett-zamir.me)\n  //         input by: Lorenzo Pisani\n  //         input by: Tony\n  //      improved by: Brett Zamir (http://brett-zamir.me)\n  //             note: original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js\n  //             note: blog post at http://blog.stevenlevithan.com/archives/parseuri\n  //             note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js\n  //             note: Does not replace invalid characters with '_' as in PHP, nor does it return false with\n  //             note: a seriously malformed URL.\n  //             note: Besides function name, is essentially the same as parseUri as well as our allowing\n  //             note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)\n  //        example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');\n  //        returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}\n  //        example 2: parse_url('http://en.wikipedia.org/wiki/%22@%22_%28album%29');\n  //        returns 2: {scheme: 'http', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}\n  //        example 3: parse_url('https://host.domain.tld/a@b.c/folder')\n  //        returns 3: {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}\n  //        example 4: parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar');\n  //        returns 4: { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }\n\n  try {\n    this.php_js = this.php_js || {}\n  } catch (e) {\n    this.php_js = {}\n  }\n\n  var query\n  var ini = (this.php_js && this.php_js.ini) || {}\n  var mode = (ini['phpjs.parse_url.mode'] && ini['phpjs.parse_url.mode'].local_value) || 'php'\n  var key = [\n    'source',\n    'scheme',\n    'authority',\n    'userInfo',\n    'user',\n    'pass',\n    'host',\n    'port',\n    'relative',\n    'path',\n    'directory',\n    'file',\n    'query',\n    'fragment'\n  ]\n  var parser = {\n    php: /^(?:([^:\\/?#]+):)?(?:\\/\\/()(?:(?:()(?:([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?()(?:(()(?:(?:[^?#\\/]*\\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/,\n    strict: /^(?:([^:\\/?#]+):)?(?:\\/\\/((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?((((?:[^?#\\/]*\\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/,\n    loose: /^(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?(?:\\/\\/\\/?)?((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))(?:\\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)\n  }\n\n  var m = parser[mode].exec(str)\n  var uri = {}\n  var i = 14\n\n  while (i--) {\n    if (m[i]) {\n      uri[key[i]] = m[i]\n    }\n  }\n\n  if (component) {\n    return uri[component.replace('PHP_URL_', '')\n      .toLowerCase()]\n  }\n\n  if (mode !== 'php') {\n    var name = (ini['phpjs.parse_url.queryKey'] &&\n      ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey'\n    parser = /(?:^|&)([^&=]*)=?([^&]*)/g\n    uri[name] = {}\n    query = uri[key[12]] || ''\n    query.replace(parser, function ($0, $1, $2) {\n      if ($1) {\n        uri[name][$1] = $2\n      }\n    })\n  }\n\n  delete uri.source\n  return uri\n}\n"
permalink: /functions/parse_url/
redirect_from:
  - /functions/url/parse_url/
---

<!-- WARNING! This file is auto generated by `npm run web:inject`, do not edit by hand -->
