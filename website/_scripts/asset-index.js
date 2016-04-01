// This file:
// - traverses over its arguments
// - clones assets to a new name, by the md5 of the original content
// - collects a mapping of original basename -> hashed variant (production)
// - collects a mapping of original basename -> original variant (development)
// - ouputs the collection as yaml, for use in e.g. overriding Jekyll config

var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');
var yaml = require('js-yaml');
var collection = {
  'production': {},
  'development': {}
};

argv._.forEach(function (filename) {
  var extension = path.extname(filename);
  var basename = path.basename(filename);
  var cleanbase = path.basename(basename, extension);

  // Skip existing asset-indices
  if (cleanbase.match(/^[a-f0-9]{32}$/)) {
    return;
  }

  var md5sum = crypto.createHash('md5');
  var s = fs.ReadStream(filename);
  s.on('data', function (d) {
    md5sum.update(d);
  });

  s.on('end', function () {
    var hash = md5sum.digest('hex');
    var destFile = hash + extension;
    var destPath = path.dirname(filename) + '/' + destFile;
    var cleanExtension = extension.replace('.', '');
    fs.writeFileSync(destPath, fs.readFileSync(filename, 'utf-8'));
    if (!collection['development'][cleanExtension]) {
      collection['development'][cleanExtension] = {};
    }
    if (!collection['production'][cleanExtension]) {
      collection['production'][cleanExtension] = {};
    }

    collection['development'][cleanExtension][cleanbase] = path.basename(filename);
    collection['production'][cleanExtension][cleanbase] = destFile;
  });
});

process.on('exit', function () {
  if (!argv.environment) {
    console.log(yaml.safeDump(collection));
  } else {
    if (!collection[argv.environment]) {
      throw new Error('Not found in collection: ' + argv.environment);
    } else {
      console.log(yaml.safeDump(collection[argv.environment]));
    }
  }
});
