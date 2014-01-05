var cli       = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');
var FS        = require('fs');
var glob      = require('glob');
var path      = require('path');
var phpjsutil = new require('./phpjsutil');

var PhpjsUtil = phpjsutil({
  injectDependencies: [ 'ini_set', 'ini_get' ]
});

// Environment-specific file opener. function name needs to
// be translated to code. The difficulty is in finding the
// category.
PhpjsUtil.opener = function (name, cb) {
  glob(__dirname + '/../functions/*/' + name + '.js', {}, function (err, files) {
    if (err) {
      return cb(err);
    }
    var filepath = files[0];

    if (!filepath) {
      return cb('could not find ' + __dirname + '/../functions/*/' + name + '.js');
    }

    FS.readFile(filepath, 'utf-8', function (err, code) {
      if (err) {
        return cb(err);
      }
      return cb(null, code);
    });
  });
};

cli.parse({
  name: ['name', 'Function name to test', 'path', '*'],
  category: ['c', 'Category to test', 'path', '*']
});

cli.pad = function(str, pad, chr, dir) {
  if (!pad) pad = 20;
  if (!chr) chr = ' ';
  if (!dir) dir = 'left';

  if ((str+'').length >= pad) {
    return str;
  }

  if (dir === 'right') {
    return String(str + Array(pad).join(chr)).slice(0, pad);
  }

  return String(Array(pad).join(chr) + str).slice(-pad);
};

var width = 120;

cli.main(function(args, options) {
  var globpath = __dirname + '/../functions/' + options.category + '/' + options.name + '.js';

  glob(globpath, {}, function (err, files) {
    var names = [];
    for (var i in files) {
      var file = files[i];
      if (file.indexOf('/_') === -1) {
        names.push(path.basename(file, '.js'));
      }
    }

    // cli.spinner('Working..');
    var processed = 0;
    names.forEach(function(name) {
      PhpjsUtil.load(name, function (err, params) {
        if (err) {
          return cli.fatal(err);
        }

        if (params['headKeys']['test'] && params['headKeys']['test'][0] === 'skip') {
          return cli.ok('Skipped ' + params['name']);
        }

        PhpjsUtil.test(params, function(err, test, params) {
          var testline = cli.pad(params['name'] + '#' + test['number'], (width * 0.4), ' ', 'right');
          testline += ' ' + cli.pad(test['example'], (width * 0.6 -7));

          if (err) {
            if ('expected' in test) {
              testline += '\n expected' + cli.pad(JSON.stringify(test['expected'], undefined, 2).replace(/\n/g, ''), width - 8);
            } else {
              testline += '\n expected' + cli.pad('undefined', width - 8);
            }
            if ('result' in test) {
              testline += '\n result  ' + cli.pad(JSON.stringify(test['result'], undefined, 2).replace(/\n/g, ''), width - 8);
            } else {
              testline += '\n result  ' + cli.pad('undefined', width - 8);
            }
            cli.error(testline + '');
            // cli.error(err);
          } else {
            cli.ok('   ' + testline + '');
          }

          if (++processed === names.length) {
            cli.spinner('Working.. done!', true); //End the spinner
          }
        });
      });
    });
  });
});
