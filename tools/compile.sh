#!/bin/bash

curl -sk https://raw.github.com/kvz/phpjs/master/functions/{datetime/date\
	,array/array_diff\
	,array/array_unique\
	,datetime/strtotime\
	,strings/md5\
	,strings/vsprintf\
}.js |tee ./myphp.js && \
curl -vo ./myphp.min.js \
	-X POST \
	-H 'Expect: ' \
	--data-urlencode compilation_level="SIMPLE_OPTIMIZATIONS" \
	--data-urlencode output_format="text" \
	--data-urlencode output_info="compiled_code" \
	--data-urlencode js_code@myphp.js \
	http://closure-compiler.appspot.com/compile

