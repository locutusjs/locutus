var cli = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');
var FS = require('fs');
var PhpjsUtil = require('./phpjsutil');

cli.parse({
  function_file: ['f', 'Function to test', 'path'],
});

cli.main(function(args, options) {
	if (!options.function_file) {
		this.fatal('Please specify a file to test (-h for help)');
	}

  // cli.spinner('Working..');
  // cli.spinner('Working.. done!', true); //End the spinner

  FS.readFile(options.function_file, 'utf-8', function (err, code) {
    if (err) {
      return cli.fatal(err);
    }

    PhpjsUtil.parse(options.function_file, code, function (err, params) {
      if (err) {
        return cli.fatal(err);
      }
      // console.log(params['headKeys']);

      PhpjsUtil.test(params, function(err, test, params) {
        var testline = params['name'] + 
          '#' + test['number'] +
          '\t' + test['example'] +
          '\t' + test['expected'] +
          '\t' + test['result'] +
          '\t';

        if (err) {
          cli.error(testline + ' test failed :(');
        }
        cli.ok(testline + ' test passed :)');
      });
    });
  });  
});
