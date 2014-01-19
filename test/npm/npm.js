var php = require('../../index');

php.echo(php.sprintf('Hey, %s : )', 'you'));
php.echo(php.parse_url('mysql://kevin:abcd1234@example.com/databasename')['pass']);
php.echo(php.strtotime('2 januari 2012, 11:12:13 GMT'));
