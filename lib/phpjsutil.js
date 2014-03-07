if (typeof require !== 'undefined') {
  module.exports = function phpjsutil(config) {
    var self = new PhpjsUtil(config);
    return self;
  };
}

function PhpjsUtil(config) {
  this.injectDependencies = [];

  // Overwrite properties with config
  for (var k in config) {
    this[k] = config[k];
  }
}

// Should be overridden by a more sofisticated function
// such as cli.debug when run in node.js
PhpjsUtil.prototype.debug = function(a) {
  return console.log(a);
};

// Should be overridden by a more sofisticated function
// such as assert.deepEqual when run in node.js
PhpjsUtil.prototype.equal = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

PhpjsUtil.prototype._commentBlocks = function(code) {
  var cnt           = 0;
  var comment       = [];
  var commentBlocks = [];
  var i             = 0;
  var lines         = [];
  var raise         = false;
  for (i in (lines = code.replace('\r', '').split('\n'))) {
    // Detect if line is a comment, and return the actual comment
    if ((comment = lines[i].match(/^\s*(\/\/|\/\*|\*)\s*(.*)$/))) {
      if (raise === true) {
        cnt = commentBlocks.length;
        raise = false;
      }
      if (!commentBlocks[cnt]) {
        commentBlocks[cnt] = {clean: [], raw: []};
      }

      commentBlocks[cnt].clean.push(comment[2].trim());
      commentBlocks[cnt].raw.push(lines[i]);
    } else {
      raise = true;
    }
  }

  return commentBlocks;
};

PhpjsUtil.prototype._headKeys = function(headLines) {
  var i;
  var keys   = {};
  var match  = [];
  var dmatch = [];
  var key    = '';
  var val    = '';
  var num    = 0;

  for (i in headLines) {
    if (!(match = headLines[i].match(/^\s*\W?\s*([a-z\ 0-9]+)\s*:\s*(.*)\s*$/))) {
      continue;
    }
    key = match[1];
    val = match[2];

    if ((dmatch = key.match(/^(\w+)\s+(\d+)$/))) {
      // Things like examples and notes can be grouped
      key = dmatch[1];
      num = dmatch[2] - 1;
    } else {
      num = 0;
    }

    if (!keys[key]) {
      keys[key] = [];
    }
    if (!keys[key][num]) {
      keys[key][num] = [];
    }
    keys[key][num].push(val);
  }

  return keys;
};

PhpjsUtil.prototype.contains = function(array, value) {
  var i = array.length;
  while (i--) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

PhpjsUtil.prototype._loadDependencies = function(name, headKeys, dependencies, cb) {
  var self = this;

  if (!headKeys['depends on'] || !headKeys['depends on'].length) {
    if (cb) {
      cb(null, {});
    }
  }

  var i;
  var depname;
  var loaded = 0;
  for (i in headKeys['depends on']) {
    depname = headKeys['depends on'][i][0];

    self.load(depname, function(err, params) {
      if (err) {
        return cb(err);
      }

      dependencies[depname] = params;
      self._loadDependencies(depname, params.headKeys, dependencies);

      if (cb && ++loaded === headKeys['depends on'].length) {
        cb(null, dependencies);
      }
    });
  }
};

PhpjsUtil.prototype.parse = function(name, code, cb) {
  var patFuncStart  = /^\s*function\s*([^\s\()]+)\s*\(([^\)]*)\)\s*\{\s*/i;
  var patFuncEnd    = /\s*}\s*$/;
  var commentBlocks = this._commentBlocks(code);
  var head          = commentBlocks[0].raw.join('\n');
  var body          = code.replace(head, '');
  body              = body.replace(patFuncStart, '');
  body              = body.replace(patFuncEnd, '');
  var headKeys      = this._headKeys(commentBlocks[0].clean);

  this._loadDependencies(name, headKeys, {}, function(err, dependencies) {
    if (err) {
      return cb(err);
    }

    // Parse fucntion signature
    var funcSigMatch = code.match(patFuncStart);

    cb(null, {
      headKeys      : headKeys,
      body          : body,
      head          : head,
      name          : name,
      code          : code,
      dependencies  : dependencies,
      func_signature: funcSigMatch[0],
      func_name     : funcSigMatch[1],
      func_arguments: funcSigMatch[2].split(/,\s*/),
      commentBlocks : commentBlocks
    });
  });
};

PhpjsUtil.prototype.opener = function(name, cb) {
  return cb('Please override with a method that can translate a function-name to code in your environment');
};

PhpjsUtil.prototype.loadMultiple = function(names, cb) {
  var self = this;
  var paramsMultiple = {};
  var loaded = 0;
  for (var i in names) {
    var name = names[i];
    self.load(name, function(err, params) {
      if (err) {
        return cb(err);
      }

      paramsMultiple[params.name] = params;

      if (++loaded === names.length) {
        return cb(null, paramsMultiple);
      }
    });
  }
};

PhpjsUtil.prototype.load = function(name, cb) {
  var self = this;
  self.opener(name, function(err, code) {
    if (err) {
      return cb(err);
    }

    self.parse(name, code, function(err, params) {
      if (err) {
        return cb(err);
      }

      return cb(null, params);
    });
  });
};

PhpjsUtil.prototype.unique = function(array) {
  var a = array.concat();

  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }

  return a;
};

PhpjsUtil.prototype.getRecursiveCode = function(params) {
  var self  = this;
  var codez = [];

  if ('name' in params) {
    codez.push(params.code);
    for (var d in params.dependencies) {
      codez = codez.concat(self.getRecursiveCode(params.dependencies[d]));
    }
  }

  codez = codez.reverse();

  return codez;
};

PhpjsUtil.prototype.test = function(params, cb) {
  var self  = this;
  var codez = [];


  self.loadMultiple(self.injectDependencies, function(err, paramsMultiple) {
    codez.unshift('phpjs = {}');
    for (var name in paramsMultiple) {
      codez.unshift(paramsMultiple[name].code);
    }

    var extracted = self.getRecursiveCode(params);
    codez = codez.concat(codez, extracted);

    codez.unshift('window.window' + ' = window;');
    for (var global in self.globals) {
      codez.unshift(global + ' = ' + self.globals[global] + ';');
    }

    // Load code
    // self. refers to own function
    // that. refers to phpjs
    // this. refers to phpjs
    var code = codez.join(';\n')
      .replace(/that\.([a-z_])/g, '$1')
      .replace(/this\.([a-z_])/g, '$1')
      .replace(/window\.setTimeout/g, 'setTimeout');

    // self.debug(code);
    eval(code);



    // Run each example
    for (var i in params.headKeys.example) {
      var test = {
        example: params.headKeys.example[i].join('\n'),
        number: i
      };

      if (!params.headKeys.returns[i] || !params.headKeys.returns[i].length) {
        cb('There is no return for example ' + i, test, params);
        continue;
      }

      // Needs an eval so types are cast properly, also, expected may
      // contain code
      eval('test.expected = ' + params.headKeys.returns[i].join('\n') + '');

      // Let's do something evil. Execute line by line (see date.js why)
      // We need test.reslult be the last result of the example code
      for (var j in params.headKeys.example[i]) {
        if (+j === params.headKeys.example[i].length - 1) {
          eval('test.result = ' + params.headKeys.example[i][j] + '');
        } else {
          eval(params.headKeys.example[i][j] + '');
        }
      }

      var jsonExpected = JSON.stringify(test.expected, undefined, 2);
      var jsonResult = JSON.stringify(test.result, undefined, 2);

      // We cannot compare using the JSON.stringify as object order is
      // not guaranteed
      if (!self.equal(test.expected, test.result)) {
        err = 'expected: \n' + jsonExpected + '\n\n' +
              'returned: \n' + jsonResult + '\n';
        cb(err, test, params);
        continue;
      }

      cb(null, test, params);
      continue;
    }
  });
};
