var cli = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');
var FS = require('fs');
var glob = require('glob');
var PhpjsUtil = require('./phpjsutil');

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
  name: ['f', 'Function name to test', 'path']
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
  if (!options.name) {
    this.fatal('Please specify a file to test (-h for help)');
  }

  // cli.spinner('Working..');
  // cli.spinner('Working.. done!', true); //End the spinner

  PhpjsUtil.load(options.name, function (err, params) {
    if (err) {
      return cli.fatal(err);
    }

    console.log(params['headKeys']);

    PhpjsUtil.test(params, function(err, test, params) {
      var testline = cli.pad(params['name'] + '#' + test['number'], (width * 0.4), ' ', 'right') +
        ' ' + cli.pad(test['example'], (width * 0.6 -7)) + '\n' +
        ' ' + cli.pad(test['expected'], width) + '\n' +
        ' ' + cli.pad(test['result'], width) + '\n' +
        ' ';

      if (err) {
        cli.error(testline + '');
      } else {
        cli.ok('   ' + testline + '');
      }
    });
  });

  // PhpjsUtil.load('')
  // PhpjsUtil.parse(options.name, code,

});
