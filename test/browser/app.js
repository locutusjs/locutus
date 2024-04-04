// Execute: npm run browser:watch
// To test this in a local webbrowser with an empty index.html
var sprintf = require('../../src/php/strings/sprintf')
var md5 = require('../../src/php/strings/md5')
var md5File = require('../../src/php/strings/md5_file')
var sha1 = require('../../src/php/strings/sha1')
var isArray = require('../../src/php/var/is_array')
var iniSet = require('../../src/php/info/ini_set')
var varDump = require('../../src/php/var/var_dump')
var preg_match = require('../../src/php/pcre/preg_match')

varDump(preg_match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$', 'rony@pharaohtools.com')) // Should report true
varDump(preg_match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$', 'ronypharaohtools.com')) // Should report flase
varDump(preg_match('^[0-9-+s()]*$', '021827495')) // Should report true
varDump(preg_match('^[0-9-+s()]*$', 'phone23no')) // Should report flase
document.write(sprintf('Hey %s, please check the console log', 'you'))
varDump(iniSet('locutus.objectsAsArrays', 'on'))
varDump(isArray({ name: 'locutus' })) // Should report true
varDump(iniSet('locutus.objectsAsArrays', 'off'))
varDump(isArray({ name: 'locutus' })) // Should report false
varDump(sha1('Resistance'))
varDump(md5('Futile'))
varDump(md5File('Futile'))
