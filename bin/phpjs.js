var cli       = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');
var fs        = require('fs');
var glob      = require('glob');
var path      = require('path');
var phpjsutil = new require('../lib/phpjsutil');
var equal     = require('deep-equal');
var __root    = __dirname + '/..';


var PhpjsUtil = phpjsutil({
  injectDependencies: ['ini_set', 'ini_get'],
  equal             : equal,
  debug             : cli.debug
});

// Environment-specific file opener. function name needs to
// be translated to code. The difficulty is in finding the
// category.
PhpjsUtil.opener = function(name, cb) {
  glob(__root + '/functions/*/' + name + '.js', {}, function(err, files) {
    if (err) {
      return cb(err);
    }
    var filepath = files[0];

    if (!filepath) {
      return cb('could not find ' + __root + '/functions/*/' + name + '.js');
    }

    fs.readFile(filepath, 'utf-8', function(err, code) {
      if (err) {
        return cb(err);
      }
      return cb(null, code);
    });
  });
};

// --debug works out of the box. See -h
cli.parse({
  action  : ['a', 'Test / Build', 'string', 'test'],
  name    : ['n', 'Function name to test', 'path', '*'],
  category: ['c', 'Category to test', 'path', '*'],
  abort   : ['a', 'Abort on first failure']
});

// cli.pad = function(str, pad, chr, dir) {
//   if (!pad) pad = 20;
//   if (!chr) chr = ' ';
//   if (!dir) dir = 'left';

//   if ((str + '').length >= pad) {
//     return str;
//   }

//   if (dir === 'right') {
//     return String(str + Array(pad).join(chr)).slice(0, pad);
//   }

//   return String(Array(pad).join(chr) + str).slice(-pad);
// };

// var width = 120;

cli.buildnpm = function(args, options) {
  var self     = this;
  var globpath = __root + '/functions/' + options.category + '/' + options.name + '.js';
  self.glob(globpath, function (err, params) {
    console.log(params.signature);

    var buf = '';
    buf += 'exports.decbin = function (number) {\n';
    buf += '    // Returns a string containing a binary representation of the number  \n';
    buf += '    // \n';
    buf += '    // version: 1008.1718\n';
    buf += '    // discuss at: http://phpjs.org/functions/decbin\n';
    buf += '    // +   original by: Enrique Gonzalez\n';
    buf += '    // +   bugfixed by: Onno Marsman\n';
    buf += '    // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript\n';
    buf += '    // +   input by: pilus\n';
    buf += '    // +   input by: nord_ua\n';
    buf += '    // *     example 1: \php.decbin(12);\n';
    buf += '    // *     returns 1: \'1100\'\n';
    buf += '    // *     example 2: \php.decbin(26);\n';
    buf += '    // *     returns 2: \'11010\'\n';
    buf += '    // *     example 3: \php.decbin(\'26\');\n';
    buf += '    // *     returns 3: \'11010\'\n';
    buf += '    if (number < 0) {\n';
    buf += '        number = 0xFFFFFFFF + number + 1;\n';
    buf += '    }\n';
    buf += '    return parseInt(number, 10).toString(2);\n';
    buf += '};\n';

    fs.writeFileSync(__root + '/build/npm.js', buf);
  });
};

cli.glob = function(globpath, cb) {
  glob(globpath, {}, function(err, files) {
    var names = [];
    for (var i in files) {
      var file = files[i];
      if (file.indexOf('/_') === -1) {
        names.push(path.basename(file, '.js'));
      }
    }
    names.forEach(function(name) {
      PhpjsUtil.load(name, function(err, params) {
        if (err) {
          return cb(err);
        }

        return cb(null, params);
      });
    });
  });
};

cli.test = function(args, options) {
  var self     = this;
  var globpath = __root + '/functions/' + options.category + '/' + options.name + '.js';

  process.on('exit', function() {
    var msg = self.pass_cnt + ' passed / ' + self.fail_cnt + ' failed / ' + self.skip_cnt + ' skipped';
    if (self.fail_cnt) {
      cli.fatal(msg);
    } else {
      cli.ok(msg);
    }
  });

  self.pass_cnt = 0;
  self.fail_cnt = 0;
  self.skip_cnt = 0;
  self.glob(globpath, function(err, params) {
    if (err) {
      return cli.fatal(err);
    }

    if (params['headKeys']['test'] && params['headKeys']['test'][0] === 'skip') {
      self.skip_cnt++;
      return cli.info('--> ' + params['name'] + ' skipped as instructed. ');
    }

    PhpjsUtil.test(params, function(err, test, params) {
      if (!err) {
        self.pass_cnt++;
        cli.debug('--> ' + params['name'] + '#' + (+test['number'] + 1) + ' passed. ');
      } else {
        self.fail_cnt++;
        cli.error('--> ' + params['name'] + '#' + (+test['number'] + 1) + ' failed. ');
        cli.error(err);
        if (options.abort) {
          cli.fatal('Aborting on first failure as instructed. ');
        }
      }
    });

  });
};

cli.main(function(args, options) {
  cli[options['action']](args, options);
});

