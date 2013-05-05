var Q = require('q');
var FS = require('fs');
var cli = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');

cli.parse({
  function_file: ['f', 'Function to test', 'path'],
});


function Phpjs () {
}

Phpjs.prototype._read = function(file, cb) {
  FS.readFile(file, 'utf-8', function (error, code) {
    if (error) {
      return cb(error);
    }

    cb(null, code);
  });  
};

Phpjs.prototype._commentBlocks = function(code) {
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
        cnt++;
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

Phpjs.prototype.parse = function(code, cb) {
  var commentBlocks = this._commentBlocks(code);
  var head = commentBlocks[0];
  // var body = code.replace(head, '');

  // return cb(null, commentBlocks[1]);

  cb(null, {
    // code: code,
    // body: body,
    head: head,
    commentBlocks: commentBlocks,
  });
};

Phpjs.prototype.load = function(file, cb) {
  var self = this;
  self._read(file, function (err, code) {
    if (err) {
      return cb(err);
    }

    self.parse(code, function (err, result) {
      if (err) {
        return cb(err);
      }

      return cb(null, result);
    });
  });
};




cli.main(function(args, options) {
	if (!options.function_file) {
		this.fatal('Please specify a file to test (-h for help)');
	}
	this.ok('Going to test: ' + options.function_file);
  // cli.spinner('Working..');
  // cli.spinner('Working.. done!', true); //End the spinner

  var phpjs = new Phpjs();

  phpjs.load(options.function_file, function (err, result) {
    if (err) {
      return cli.fatal(err);
    }
    console.log(result);
    // cli.ok('result' + result);
  });


  // setTimeout(function () {
  //     cli.spinner('Working.. done!', true); //End the spinner
  // }, 3000);

});
