if (typeof require !== 'undefined') {
  module.exports = function phpjsutil(config) {
    var self = new PhpjsUtil(config);
    return self;
  };
}

function PhpjsUtil(config) {
  for (var k in config) {
    this[k] = config[k];
  }
}

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
        cnt   = commentBlocks.length;
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
    if (!(match = headLines[i].match(/^[\s\W]*(.*?)\s*:\s*(.*)\s*$/))) {
      continue;
    }
    key = match[1];
    val = match[2];

    if ((dmatch = key.match(/^(\w+)\s+(\d+)$/))) {
      // Things like examples and notes can be grouped
      key = dmatch[1];
      num = dmatch[2]-1;

      if (!keys[key]) {
        keys[key] = [];
      }
      if (!keys[key][num]) {
        keys[key][num] = [];
      }
      keys[key][num].push(val);
    } else {
      if (!keys[key]) {
        keys[key] = [];
      }
      keys[key].push(val);
    }
  }

  return keys;
};

PhpjsUtil.prototype.contains = function (array, value) {
    var i = array.length;
    while (i--) {
       if (array[i] === value) {
           return true;
       }
    }
    return false;
};

PhpjsUtil.prototype._loadDependencies = function(name, headKeys, dependencies, cb) {
  var self      = this;
  var functions = headKeys['depends on'] || [];

  var j;
  for (j in self.injectDependencies) {
    var injectFunction = self.injectDependencies[j];
    if (self.contains(self.injectDependencies, name)) {
      continue;
    }

    // console.log({injectFunction: injectFunction});
    functions.push(injectFunction);
  }

  if (!functions || !functions.length) {
    if (cb) {
      cb(null, {});
    }
  }

  // console.log({functions: functions, headKeys: headKeys, dependencies: dependencies});
  var i;
  var name;
  var loaded = 0;
  for (i in functions) {
    name = functions[i];

    self.load(name, function (err, params) {
      if (err) {
        return cb(err);
      }

      dependencies[name] = params;
      self._loadDependencies(name, params.headKeys, dependencies);

      loaded++;
      if (cb && loaded === functions.length) {
        cb(null, dependencies);
      }
    });
  }
};

PhpjsUtil.prototype.parse = function(name, code, cb) {
  var commentBlocks = this._commentBlocks(code);
  var head          = commentBlocks[0].raw.join('\n');
  var body          = code.replace(head, '');
  var headKeys      = this._headKeys(commentBlocks[0].clean);

  // @todo(kvz) If we add function signature, we can use
  // body to generate CommonJs compatible output
  // in the browser.

  this._loadDependencies(name, headKeys, {}, function (err, dependencies) {
    if (err) {
      return cb(err);
    }

    cb(null, {
      headKeys     : headKeys,
      body         : body,
      head         : head,
      name         : name,
      code         : code,
      dependencies : dependencies,
      commentBlocks: commentBlocks
    });
  });
};

PhpjsUtil.prototype.opener = function(name, cb) {
  return cb('Please override with a method that can translate a function-name to code in your environment');
};

PhpjsUtil.prototype.load = function(name, cb) {
  var self = this;
  self.opener(name, function (err, code) {
    if (err) {
      return cb(err);
    }

    self.parse(name, code, function (err, params) {
      if (err) {
        return cb(err);
      }

      return cb(null, params);
    });
  });
};

PhpjsUtil.prototype.test = function(params, cb) {
  var i    = 0;
  var j    = 0;
  var d    = 0;
  var self = this;


  var codes = [];
  // Push own code onto stack
  codes.push(params['code']);
  // Push dependencies onto stack
  for (d in params['dependencies']) {
    codes.push(params['dependencies'][d]['code']);
  }
  console.log({codes: codes});

  // Reverse stack so dependencies are loaded first
  codes = codes.reverse();

  // console.log({params: params});

  // Load code
  eval(codes.join('\n'));


  // Run each example
  for (i in params['headKeys']['example']) {
    var test = {
      example: params['headKeys']['example'][i].join('\n'),
      number : i
    };

    if (!params['headKeys']['returns'][i] || !params['headKeys']['returns'][i].length) {
      cb('There is no return for example ' + i, test, params);
      continue;
    }

    // Needs an eval so types are cast properly, also, expected may
    // contain code
    eval('test.expected = ' + params['headKeys']['returns'][i].join('\n') + '');

    // Let's do something evil. Execute line by line (see date.js why)
    for (j in params['headKeys']['example'][i]) {
      eval('test.result = ' + params['headKeys']['example'][i][j] + '');
    }

    var jsonExpected = JSON.stringify(test.expected, undefined, 2);
    var jsonResult   = JSON.stringify(test.result, undefined, 2);

    if (jsonExpected !== jsonResult) {
      var err = 'Expected: ' + jsonExpected +
        ' but returned: ' + jsonResult;
      cb(err, test, params);
      continue;
    }

    cb(null, test, params);
    continue;
  }
};
