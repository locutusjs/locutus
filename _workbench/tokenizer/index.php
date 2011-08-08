<?php
$tests=array();
$files=scandir("tests");
foreach($files as $file) {
	if (preg_match("#\.php#i", $file)) {
		$tests[] = $file;
	}
}
?>
<html>
	<head>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
		<script type="text/javascript" src="token_get_all.js"></script>
		<script type="text/javascript">
			function execTest () {
				if (next >= files.length) {
					document.getElementsByTagName("button")[0].disabled = false;
					return;
				}
				$.post("tokenizer.php", {file: files[next]}, function (data) {
					data = $.parseJSON(data);
					var php = data[0],
						tokens,
						start,
						res = true;
					try {
						start = + (new Date);
						tokens = token_get_all(data[1]);
						time = (+ (new Date)) - start;
						totTime += time;
						var i = 0,
							l = tokens.length;
						for (; i < l; i++) {
							//console.log("PHP", php[i]);
							//console.log("JS", tokens[i]);
							if (!i in php) {
								failTest("Missing token at index " + i);
								res = false;
								break;
							} else {
								var tArr = $.isArray(tokens[i]),
									pArr = $.isArray(php[i]);
								if (tArr !== pArr) {
									res = false;
								} else if (!tArr) {
									if (tokens[i] !== php[i]) {
										res = false;
									}
								} else {
									for (var c = 0, lc = tokens[i].length; c < lc; c++) {
										if (tokens[i][c] !== php[i][c]) {
											res = false;
											break;
										}
									}
								}
								if (!res) {
									var s = i,
										stop = Math.min(s + 5, l),
										err = "";
									for (; s < stop; s++) {
										err += "PHP (" + s + "):" + "<br>" + (php[s] + "").replace(replace, replacement) + "<br>";
										err += "JS (" + s + "):" + "<br>" + (tokens[s] + "").replace(replace, replacement) + "<br>";
									}
									res = false;
									failTest(err);
									break;
								}
							}
						}
						if (res && l !== php.length) {
							failTest("Different number of tokens. PHP: " + php.length + ", JS: " + l);
						}
					} catch (e) {
						time = (+ (new Date)) - start;
						res = false;
						failTest((e.fileName ? e.fileName + "<br>" : "") + (e.lineNumber ? "Line: " + e.lineNumber + "<br>" : "") + "Message: " + e.message);
					}
					res && passTest();
					next++;
					execTest();
				});
			}
			
			function failTest (msg)
			{
				var html = boxes.eq(next).html();
				boxes.eq(next).addClass("fail").html(html+ " - Time: " + time + "ms").append($("<div class='error'>" + msg + "</div>"));
				pf.innerHTML=parseInt(pf.innerHTML) + 1;
				pt.innerHTML = totTime;
			}
			
			function passTest ()
			{
				var html = boxes.eq(next).html();
				boxes.eq(next).addClass("pass").html(html+ " - Time: " + time + "ms");
				pb.innerHTML=parseInt(pb.innerHTML) + 1;
				pt.innerHTML = totTime;
			}
			
			var files = [
					"<?php echo implode('", "', $tests);?>"
				],
				next = 0,
				replace = /[\n\r\t <>]/g,
				replacement = function (match) {
					if (match === "\n") {
						return "\\n";
					} else if (match === "\r") {
						return "\\r";
					} else if (match === "\t") {
						return "\\t";
					} else if (match === " ") {
						return "\\s";
					} else if (match === ">") {
						return "&gt;";
					} else if (match === "<") {
						return "&lt;";
					}
					return match;
				},
				boxes,
				pb,
				pt,
				pf,
				time,
				totTime = 0;
			$(document).ready(function () {
				boxes = $(".test");
				pb=document.getElementById("pass");
				pf=document.getElementById("fail");
				pt=document.getElementById("ttime");
			});
		</script>
		<style>
		body{
			font-family: Arial, Verdana, sans-serif;
			font-size:13px;
		}
		.test {
			background: #F0F0F0;
			border: 1px solid #CDCDCD;
			padding: 10px;
			margin-top: 10px;
		}
		.test.pass {
			background: #DCFEDA;
			border: 1px solid #A6FCA2;
		}
		.test.fail {
			background: #FEDADA;
			border: 1px solid #FCA6A6;
		}
		.test .error {
			background: white;
			margin-top:5px;
			border: 1px solid #FCA6A6;
		}
		</style>
	</head>
</html>
<body>
	<button onClick="this.disabled=true;execTest();">Run test</button> Total: <?php echo count($tests)?>, Pass: <span id="pass">0</span>, Fail: <span id="fail">0</span>, Total time: <span id="ttime">0</span> ms
	<?php foreach ($tests as $test):?>
	<div class="test">
		<?php echo $test?>
	</div>
	<?php endforeach;?>
	<?php
	/*echo "T_ABSTRACT: ".T_ABSTRACT.",<br>";
	echo "T_AND_EQUAL: ".T_AND_EQUAL.",<br>";
	echo "T_ARRAY: ".T_ARRAY.",<br>";
	echo "T_ARRAY_CAST: ".T_ARRAY_CAST.",<br>";
	echo "T_AS: ".T_AS.",<br>";
	echo "T_BAD_CHARACTER: ".T_BAD_CHARACTER.",<br>";
	echo "T_BOOLEAN_AND: ".T_BOOLEAN_AND.",<br>";
	echo "T_BOOLEAN_OR: ".T_BOOLEAN_OR.",<br>";
	echo "T_BOOL_CAST: ".T_BOOL_CAST.",<br>";
	echo "T_BREAK: ".T_BREAK.",<br>";
	echo "T_CASE: ".T_CASE.",<br>";
	echo "T_CATCH: ".T_CATCH.",<br>";
	echo "T_CHARACTER: ".T_CHARACTER.",<br>";
	echo "T_CLASS: ".T_CLASS.",<br>";
	echo "T_CLASS_C: ".T_CLASS_C.",<br>";
	echo "T_CLONE: ".T_CLONE.",<br>";
	echo "T_CLOSE_TAG: ".T_CLOSE_TAG.",<br>";
	echo "T_COMMENT: ".T_COMMENT.",<br>";
	echo "T_CONCAT_EQUAL: ".T_CONCAT_EQUAL.",<br>";
	echo "T_CONST: ".T_CONST.",<br>";
	echo "T_CONSTANT_ENCAPSED_STRING: ".T_CONSTANT_ENCAPSED_STRING.",<br>";
	echo "T_CONTINUE: ".T_CONTINUE.",<br>";
	echo "T_CURLY_OPEN: ".T_CURLY_OPEN.",<br>";
	echo "T_DEC: ".T_DEC.",<br>";
	echo "T_DECLARE: ".T_DECLARE.",<br>";
	echo "T_DEFAULT: ".T_DEFAULT.",<br>";
	echo "T_DIR: ".T_DIR.",<br>";
	echo "T_DIV_EQUAL: ".T_DIV_EQUAL.",<br>";
	echo "T_DNUMBER: ".T_DNUMBER.",<br>";
	echo "T_DOC_COMMENT: ".T_DOC_COMMENT.",<br>";
	echo "T_DO: ".T_DO.",<br>";
	echo "T_DOLLAR_OPEN_CURLY_BRACES: ".T_DOLLAR_OPEN_CURLY_BRACES.",<br>";
	echo "T_DOUBLE_ARROW: ".T_DOUBLE_ARROW.",<br>";
	echo "T_DOUBLE_CAST: ".T_DOUBLE_CAST.",<br>";
	echo "T_DOUBLE_COLON: ".T_DOUBLE_COLON.",<br>";
	echo "T_ECHO: ".T_ECHO.",<br>";
	echo "T_ELSE: ".T_ELSE.",<br>";
	echo "T_ELSEIF: ".T_ELSEIF.",<br>";
	echo "T_EMPTY: ".T_EMPTY.",<br>";
	echo "T_ENCAPSED_AND_WHITESPACE: ".T_ENCAPSED_AND_WHITESPACE.",<br>";
	echo "T_ENDDECLARE: ".T_ENDDECLARE.",<br>";
	echo "T_ENDFOR: ".T_ENDFOR.",<br>";
	echo "T_ENDFOREACH: ".T_ENDFOREACH.",<br>";
	echo "T_ENDIF: ".T_ENDIF.",<br>";
	echo "T_ENDSWITCH: ".T_ENDSWITCH.",<br>";
	echo "T_ENDWHILE: ".T_ENDWHILE.",<br>";
	echo "T_END_HEREDOC: ".T_END_HEREDOC.",<br>";
	echo "T_EVAL: ".T_EVAL.",<br>";
	echo "T_EXIT: ".T_EXIT.",<br>";
	echo "T_EXTENDS: ".T_EXTENDS.",<br>";
	echo "T_FILE: ".T_FILE.",<br>";
	echo "T_FINAL: ".T_FINAL.",<br>";
	echo "T_FOR: ".T_FOR.",<br>";
	echo "T_FOREACH: ".T_FOREACH.",<br>";
	echo "T_FUNCTION: ".T_FUNCTION.",<br>";
	echo "T_FUNC_C: ".T_FUNC_C.",<br>";
	echo "T_GLOBAL: ".T_GLOBAL.",<br>";
	echo "T_GOTO: ".T_GOTO.",<br>";
	echo "T_HALT_COMPILER: ".T_HALT_COMPILER.",<br>";
	echo "T_IF: ".T_IF.",<br>";
	echo "T_IMPLEMENTS: ".T_IMPLEMENTS.",<br>";
	echo "T_INC: ".T_INC.",<br>";
	echo "T_INCLUDE: ".T_INCLUDE.",<br>";
	echo "T_INCLUDE_ONCE: ".T_INCLUDE_ONCE.",<br>";
	echo "T_INLINE_HTML: ".T_INLINE_HTML.",<br>";
	echo "T_INSTANCEOF: ".T_INSTANCEOF.",<br>";
	echo "T_INT_CAST: ".T_INT_CAST.",<br>";
	echo "T_INTERFACE: ".T_INTERFACE.",<br>";
	echo "T_ISSET: ".T_ISSET.",<br>";
	echo "T_IS_EQUAL: ".T_IS_EQUAL.",<br>";
	echo "T_IS_GREATER_OR_EQUAL: ".T_IS_GREATER_OR_EQUAL.",<br>";
	echo "T_IS_IDENTICAL: ".T_IS_IDENTICAL.",<br>";
	echo "T_IS_NOT_EQUAL: ".T_IS_NOT_EQUAL.",<br>";
	echo "T_IS_NOT_IDENTICAL: ".T_IS_NOT_IDENTICAL.",<br>";
	echo "T_IS_SMALLER_OR_EQUAL: ".T_IS_SMALLER_OR_EQUAL.",<br>";
	echo "T_LINE: ".T_LINE.",<br>";
	echo "T_LIST: ".T_LIST.",<br>";
	echo "T_LNUMBER: ".T_LNUMBER.",<br>";
	echo "T_LOGICAL_AND: ".T_LOGICAL_AND.",<br>";
	echo "T_LOGICAL_OR: ".T_LOGICAL_OR.",<br>";
	echo "T_LOGICAL_XOR: ".T_LOGICAL_XOR.",<br>";
	echo "T_METHOD_C: ".T_METHOD_C.",<br>";
	echo "T_MINUS_EQUAL: ".T_MINUS_EQUAL.",<br>";
	echo "T_MOD_EQUAL: ".T_MOD_EQUAL.",<br>";
	echo "T_MUL_EQUAL: ".T_MUL_EQUAL.",<br>";
	echo "T_NAMESPACE: ".T_NAMESPACE.",<br>";
	echo "T_NS_C: ".T_NS_C.",<br>";
	echo "T_NS_SEPARATOR: ".T_NS_SEPARATOR.",<br>";
	echo "T_NEW: ".T_NEW.",<br>";
	echo "T_NUM_STRING: ".T_NUM_STRING.",<br>";
	echo "T_OBJECT_CAST: ".T_OBJECT_CAST.",<br>";
	echo "T_OBJECT_OPERATOR: ".T_OBJECT_OPERATOR.",<br>";
	echo "T_OPEN_TAG: ".T_OPEN_TAG.",<br>";
	echo "T_OPEN_TAG_WITH_ECHO: ".T_OPEN_TAG_WITH_ECHO.",<br>";
	echo "T_OR_EQUAL: ".T_OR_EQUAL.",<br>";
	echo "T_PAAMAYIM_NEKUDOTAYIM: ".T_PAAMAYIM_NEKUDOTAYIM.",<br>";
	echo "T_PLUS_EQUAL: ".T_PLUS_EQUAL.",<br>";
	echo "T_PRINT: ".T_PRINT.",<br>";
	echo "T_PRIVATE: ".T_PRIVATE.",<br>";
	echo "T_PUBLIC: ".T_PUBLIC.",<br>";
	echo "T_PROTECTED: ".T_PROTECTED.",<br>";
	echo "T_REQUIRE: ".T_REQUIRE.",<br>";
	echo "T_REQUIRE_ONCE: ".T_REQUIRE_ONCE.",<br>";
	echo "T_RETURN: ".T_RETURN.",<br>";
	echo "T_SL: ".T_SL.",<br>";
	echo "T_SL_EQUAL: ".T_SL_EQUAL.",<br>";
	echo "T_SR: ".T_SR.",<br>";
	echo "T_SR_EQUAL: ".T_SR_EQUAL.",<br>";
	echo "T_START_HEREDOC: ".T_START_HEREDOC.",<br>";
	echo "T_STATIC: ".T_STATIC.",<br>";
	echo "T_STRING: ".T_STRING.",<br>";
	echo "T_STRING_CAST: ".T_STRING_CAST.",<br>";
	echo "T_STRING_VARNAME: ".T_STRING_VARNAME.",<br>";
	echo "T_SWITCH: ".T_SWITCH.",<br>";
	echo "T_THROW: ".T_THROW.",<br>";
	echo "T_TRY: ".T_TRY.",<br>";
	echo "T_UNSET: ".T_UNSET.",<br>";
	echo "T_UNSET_CAST: ".T_UNSET_CAST.",<br>";
	echo "T_USE: ".T_USE.",<br>";
	echo "T_VAR: ".T_VAR.",<br>";
	echo "T_VARIABLE: ".T_VARIABLE.",<br>";
	echo "T_WHILE: ".T_WHILE.",<br>";
	echo "T_WHITESPACE: ".T_WHITESPACE.",<br>";
	echo "T_XOR_EQUAL: ".T_XOR_EQUAL.",<br>";
	*/
	?>
</body>