var cli = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');
var FS = require('fs');
var glob = require('glob');
var path = require('path');
var phpjsutil = new require('./phpjsutil');
var equal = require('deep-equal');


var PhpjsUtil = phpjsutil({
  injectDependencies: ['ini_set', 'ini_get'],
  equal: equal
});

// Environment-specific file opener. function name needs to
// be translated to code. The difficulty is in finding the
// category.
PhpjsUtil.opener = function(name, cb) {
  glob(__dirname + '/../functions/*/' + name + '.js', {}, function(err, files) {
    if (err) {
      return cb(err);
    }
    var filepath = files[0];

    if (!filepath) {
      return cb('could not find ' + __dirname + '/../functions/*/' + name + '.js');
    }

    FS.readFile(filepath, 'utf-8', function(err, code) {
      if (err) {
        return cb(err);
      }
      return cb(null, code);
    });
  });
};

// --debug works out of the box. See -h
cli.parse({
  name: ['name', 'Function name to test', 'path', '*'],
  category: ['c', 'Category to test', 'path', '*'],
  abort: ['a', 'Abort on first failure']
});

cli.pad = function(str, pad, chr, dir) {
  if (!pad) pad = 20;
  if (!chr) chr = ' ';
  if (!dir) dir = 'left';

  if ((str + '').length >= pad) {
    return str;
  }

  if (dir === 'right') {
    return String(str + Array(pad).join(chr)).slice(0, pad);
  }

  return String(Array(pad).join(chr) + str).slice(-pad);
};

var width = 120;

cli.main(function(args, options) {
  var self = this;
  var globpath = __dirname + '/../functions/' + options.category + '/' + options.name + '.js';

  process.on('exit', function() {
    var msg = self.pass_cnt + ' passed / ' + self.fail_cnt + ' failed / ' + self.skip_cnt + ' skipped';
    if (self.fail_cnt) {
      cli.fatal(msg);
    } else {
      cli.ok(msg);
    }
  });

  glob(globpath, {}, function(err, files) {
    var names = [];
    for (var i in files) {
      var file = files[i];
      if (file.indexOf('/_') === -1) {
        names.push(path.basename(file, '.js'));
      }
    }

    self.pass_cnt = 0;
    self.fail_cnt = 0;
    self.skip_cnt = 0;

    names.forEach(function(name) {
      PhpjsUtil.load(name, function(err, params) {
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
    });
  });
});
