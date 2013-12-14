SOURCE="../../functions/datetime/strtotime.js"
curl -o optimized.js \
-X POST \
-H 'Expect: ' \
--data-urlencode compilation_level="WHITESPACE_ONLY" \
--data-urlencode output_format="text" \
--data-urlencode output_info="compiled_code" \
--data-urlencode formatting=pretty_print \
--data-urlencode js_code@${SOURCE} \
http://closure-compiler.appspot.com/compile
