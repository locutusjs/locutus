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
        commentBlocks[cnt] = {clean: [], raw: [], };
      }

      commentBlocks[cnt].clean.push(comment[2].trim());
      commentBlocks[cnt].raw.push(lines[i]);
    } else {
      raise = true;
    }
  }

  return commentBlocks;
}

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
}

PhpjsUtil.parse = function(name, code, cb) {
  var commentBlocks = this._commentBlocks(code);
  var head = commentBlocks[0].raw.join('\n');
  var body = code.replace(head, '');

  var headKeys = this._headKeys(commentBlocks[0].clean);

  cb(null, {
    headKeys: headKeys,
    body: body,
    head: head,
    name: name,
    code: code,
    commentBlocks: commentBlocks,
  });
};

PhpjsUtil.test = function(params, cb) {
  var i = 0;
  var j = 0;

  // @todo(kvz)L if a function depends, we need to recursively
  // add those.. needs to be done with callbacks cause
  // getting code in browser / cli is very different..
  eval(params['code']);
  for (i in params['headKeys']['example']) {

    var test = {
      example: params['headKeys']['example'][i].join('\n'),
      number: i,
    };

    // Needs an eval so types are cast properly, also, expected may
    // contain code
    eval('test.expected = ' + params['headKeys']['returns'][i].join('\n') + '');

    // Let's do something evil. Execute line by line (see date.js why)
    for (j in params['headKeys']['example'][i]) {
      eval('test.result = ' + params['headKeys']['example'][i][j] + '');
    }


    if (test.expected !== test.result) {
      var msg = 'Expected: ' + JSON.stringify(test.expected, undefined, 2) +
        ' but returned: ' + JSON.stringify(test.result, undefined, 2);
      cb(msg, test, params);
    } else {
      cb(null, test, params)
    }
  }
};

