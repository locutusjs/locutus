if (typeof require !== 'undefined') {
  module.exports = PhpjsUtil;
}
function PhpjsUtil () {
}

PhpjsUtil._commentBlocks = function(code) {
  var cnt = 0;
  var comment = [];
  var commentBlocks = [];
  var i = 0;
  var lines = [];
  var raise = false;
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

PhpjsUtil._headKeys = function(headLines) {
  var i;
  var keys = {};
  var match = [];
  var dmatch = [];
  var key = '';
  var val = '';
  var num = 0;
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

PhpjsUtil._loadDependencies = function(headKeys, dependencies, cb) {
  var self = this;

  if (!headKeys['depends on'] || !headKeys['depends on'].length) {
    if (cb) {
      cb(null, {});
    }
  }

  var i;
  var name;
  var loaded = 0;
  for (i in headKeys['depends on']) {
    name = headKeys['depends on'][i];

    self.load(name, function (err, params) {
      if (err) {
        return cb(err);
      }

      dependencies[name] = params;
      self._loadDependencies(params.headKeys, dependencies);

      loaded++;

      if (cb && loaded === headKeys['depends on'].length) {
        cb(null, dependencies);
      }
    });
  }
};

PhpjsUtil.parse = function(name, code, cb) {
  var commentBlocks = this._commentBlocks(code);
  var head = commentBlocks[0].raw.join('\n');
  var body = code.replace(head, '');

  var headKeys = this._headKeys(commentBlocks[0].clean);

  // @todo(kvz) If we add function signature, we can use
  // body to generate CommonJs compatible output
  // in the browser.

  this._loadDependencies(headKeys, {}, function (err, dependencies) {
    if (err) {
      return cb(err);
    }
    cb(null, {
      headKeys: headKeys,
      body: body,
      head: head,
      name: name,
      code: code,
      dependencies: dependencies,
      commentBlocks: commentBlocks
    });
  });
};

PhpjsUtil.opener = function(name, cb) {
  return cb('Please override with a method that can translate a function-name to code in your environment');
};

PhpjsUtil.load = function(name, cb) {
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

PhpjsUtil.test = function(params, cb) {
  var i = 0;
  var j = 0;
  var d = 0;
  var self = this;


  var codes = [];
  // Push own code onto stack
  codes.push(params['code']);
  // Push dependencies onto stack
  for (d in params['dependencies']) {
    codes.push(params['dependencies'][d]['code']);
  }

  // Reverse stack so dependencies are loaded first
  codes = codes.reverse();

  // console.log(codes);

  // Load code
  eval(codes.join('\n'));


  // Run each example
  for (i in params['headKeys']['example']) {
    var test = {
      example: params['headKeys']['example'][i].join('\n'),
      number: i
    };

    // Needs an eval so types are cast properly, also, expected may
    // contain code
    eval('test.expected = ' + params['headKeys']['returns'][i].join('\n') + '');

    // Let's do something evil. Execute line by line (see date.js why)
    for (j in params['headKeys']['example'][i]) {
      eval('test.result = ' + params['headKeys']['example'][i][j] + '');
    }

    if (test.expected !== test.result) {
      var err = 'Expected: ' + JSON.stringify(test.expected, undefined, 2) +
        ' but returned: ' + JSON.stringify(test.result, undefined, 2);
      cb(err, test, params);
    } else {
      cb(null, test, params);
    }
  }
};

