<?php
include "config.php";
$content = file_get_contents($file);
$a = token_get_all($content);
?>
<html>
<head>
	<script type="text/javascript" src="token_get_all.js"></script>
	<script type="text/javascript" src="file_get_contents.min.js"></script>
    <script type="text/javascript" src="var_export.js"></script>
	<script type="application/PHPJS" id="test" style="display:none">
<?php echo $content."\n"?>
    </script>
	<script type="text/javascript">

		function DOMReady(f) {
		  if ((/(?!.*?compatible|.*?webkit)^mozilla|opera/i).test(navigator.userAgent)){ // Feeling dirty yet?
			document.addEventListener('DOMContentLoaded', f, false);
		  } else{
			window.setTimeout(f, 0);
		  }
		}
		function replaceAll(st, rp, rpm) {
			while (st.indexOf(rp)>-1) {
                st = st.replace(rp, rpm);
            }
			return st;
		}
		function fixToken(token) {
			token = replaceAll(token, '\n', '\\n');
			token = replaceAll(token, '\t', '\\t');
			token = replaceAll(token, '\r', '\\r');
			token = replaceAll(token, ' ', '&nbsp;');
			return token;
		}
		DOMReady(function() {
			var cont = file_get_contents('s.php');
			var now = Date.now();
			var tokens = token_get_all(cont);
//			alert(((Date.now() - now) / 1000) + ' seconds');
            echo('<pre>'+var_export(tokens, true)+'</pre>');
			var start = <?php echo count($a) + 1?>; // Not in use
			var Struct=[
			<?php
			foreach($a as $k => $tok) {
				echo "\"<font color='red'>";
				if (!is_array($tok)) {
                    echo str_replace(array("\n","\t","\r"," ",'"'),array("\\\\n","\\\\t","\\\\r","&nbsp;",'\"'),htmlentities($tok))."<br>";
                }
				else {
                    foreach($tok as $t) {
                        echo str_replace(array("\n","\t","\r"," ",'"'),array("\\\\n","\\\\t","\\\\r","&nbsp;",'\"'),htmlentities($t))."<br>";
                    }
                }
				echo "</font>\"".($k == count($a) - 1 ? "" : ",");
			}
			?>
			];
			for (var i = 0; i < tokens.length; i++) {
				var str = Struct[i] ? Struct[i] : "";
				if (!(tokens[i] instanceof Array)) {
                    str += tokens[i] ? fixToken(tokens[i]) : 'undefined';
                }
				else {
					tokens[i][1] = tokens[i][1] ? fixToken(tokens[i][1]) : 'undefined';
					str += tokens[i].join('<br>');
				}
				var el = document.createElement('div');
				el.style.backgroundColor = i%2 === 0 ? '#EEE' : '#FFF';
				el.innerHTML = str;
				document.body.appendChild(el);
			}       
     	});
	</script>
</head>
<body>
<table>
<tr><td>T_REQUIRE_ONCE</td><td><font color="red">261</font></td></tr><tr><td>T_REQUIRE</td><td><font color="red">260</font></td></tr><tr><td>T_EVAL</td><td><font color="red">259</font></td></tr><tr><td>T_INCLUDE_ONCE</td><td><font color="red">258</font></td></tr><tr><td>T_INCLUDE</td><td><font color="red">257</font></td></tr><tr><td>T_LOGICAL_OR</td><td><font color="red">262</font></td></tr><tr><td>T_LOGICAL_XOR</td><td><font color="red">263</font></td></tr><tr><td>T_LOGICAL_AND</td><td><font color="red">264</font></td></tr><tr><td>T_PRINT</td><td><font color="red">265</font></td></tr><tr><td>T_SR_EQUAL</td><td><font color="red">276</font></td></tr><tr><td>T_SL_EQUAL</td><td><font color="red">275</font></td></tr><tr><td>T_XOR_EQUAL</td><td><font color="red">274</font></td></tr><tr><td>T_OR_EQUAL</td><td><font color="red">273</font></td></tr><tr><td>T_AND_EQUAL</td><td><font color="red">272</font></td></tr><tr><td>T_MOD_EQUAL</td><td><font color="red">271</font></td></tr><tr><td>T_CONCAT_EQUAL</td><td><font color="red">270</font></td></tr><tr><td>T_DIV_EQUAL</td><td><font color="red">269</font></td></tr><tr><td>T_MUL_EQUAL</td><td><font color="red">268</font></td></tr><tr><td>T_MINUS_EQUAL</td><td><font color="red">267</font></td></tr><tr><td>T_PLUS_EQUAL</td><td><font color="red">266</font></td></tr><tr><td>T_BOOLEAN_OR</td><td><font color="red">277</font></td></tr><tr><td>T_BOOLEAN_AND</td><td><font color="red">278</font></td></tr><tr><td>T_IS_NOT_IDENTICAL</td><td><font color="red">282</font></td></tr><tr><td>T_IS_IDENTICAL</td><td><font color="red">281</font></td></tr><tr><td>T_IS_NOT_EQUAL</td><td><font color="red">280</font></td></tr><tr><td>T_IS_EQUAL</td><td><font color="red">279</font></td></tr><tr><td>T_IS_GREATER_OR_EQUAL</td><td><font color="red">284</font></td></tr><tr><td>T_IS_SMALLER_OR_EQUAL</td><td><font color="red">283</font></td></tr><tr><td>T_SR</td><td><font color="red">286</font></td></tr><tr><td>T_SL</td><td><font color="red">285</font></td></tr><tr><td>T_INSTANCEOF</td><td><font color="red">287</font></td></tr><tr><td>T_UNSET_CAST</td><td><font color="red">296</font></td></tr><tr><td>T_BOOL_CAST</td><td><font color="red">295</font></td></tr><tr><td>T_OBJECT_CAST</td><td><font color="red">294</font></td></tr><tr><td>T_ARRAY_CAST</td><td><font color="red">293</font></td></tr><tr><td>T_STRING_CAST</td><td><font color="red">292</font></td></tr><tr><td>T_DOUBLE_CAST</td><td><font color="red">291</font></td></tr><tr><td>T_INT_CAST</td><td><font color="red">290</font></td></tr><tr><td>T_DEC</td><td><font color="red">289</font></td></tr><tr><td>T_INC</td><td><font color="red">288</font></td></tr><tr><td>T_CLONE</td><td><font color="red">298</font></td></tr><tr><td>T_NEW</td><td><font color="red">297</font></td></tr><tr><td>T_EXIT</td><td><font color="red">299</font></td></tr><tr><td>T_IF</td><td><font color="red">300</font></td></tr><tr><td>T_ELSEIF</td><td><font color="red">301</font></td></tr><tr><td>T_ELSE</td><td><font color="red">302</font></td></tr><tr><td>T_ENDIF</td><td><font color="red">303</font></td></tr><tr><td>T_LNUMBER</td><td><font color="red">304</font></td></tr><tr><td>T_DNUMBER</td><td><font color="red">305</font></td></tr><tr><td>T_STRING</td><td><font color="red">306</font></td></tr><tr><td>T_STRING_VARNAME</td><td><font color="red">307</font></td></tr><tr><td>T_VARIABLE</td><td><font color="red">308</font></td></tr><tr><td>T_NUM_STRING</td><td><font color="red">309</font></td></tr><tr><td>T_INLINE_HTML</td><td><font color="red">310</font></td></tr><tr><td>T_CHARACTER</td><td><font color="red">311</font></td></tr><tr><td>T_BAD_CHARACTER</td><td><font color="red">312</font></td></tr><tr><td>T_ENCAPSED_AND_WHITESPACE</td><td><font color="red">313</font></td></tr><tr><td>T_CONSTANT_ENCAPSED_STRING</td><td><font color="red">314</font></td></tr><tr><td>T_ECHO</td><td><font color="red">315</font></td></tr><tr><td>T_DO</td><td><font color="red">316</font></td></tr><tr><td>T_WHILE</td><td><font color="red">317</font></td></tr><tr><td>T_ENDWHILE</td><td><font color="red">318</font></td></tr><tr><td>T_FOR</td><td><font color="red">319</font></td></tr><tr><td>T_ENDFOR</td><td><font color="red">320</font></td></tr><tr><td>T_FOREACH</td><td><font color="red">321</font></td></tr><tr><td>T_ENDFOREACH</td><td><font color="red">322</font></td></tr><tr><td>T_DECLARE</td><td><font color="red">323</font></td></tr><tr><td>T_ENDDECLARE</td><td><font color="red">324</font></td></tr><tr><td>T_AS</td><td><font color="red">325</font></td></tr><tr><td>T_SWITCH</td><td><font color="red">326</font></td></tr><tr><td>T_ENDSWITCH</td><td><font color="red">327</font></td></tr><tr><td>T_CASE</td><td><font color="red">328</font></td></tr><tr><td>T_DEFAULT</td><td><font color="red">329</font></td></tr><tr><td>T_BREAK</td><td><font color="red">330</font></td></tr><tr><td>T_CONTINUE</td><td><font color="red">331</font></td></tr><tr><td>T_GOTO</td><td><font color="red">332</font></td></tr><tr><td>T_FUNCTION</td><td><font color="red">333</font></td></tr><tr><td>T_CONST</td><td><font color="red">334</font></td></tr><tr><td>T_RETURN</td><td><font color="red">335</font></td></tr><tr><td>T_TRY</td><td><font color="red">336</font></td></tr><tr><td>T_CATCH</td><td><font color="red">337</font></td></tr><tr><td>T_THROW</td><td><font color="red">338</font></td></tr><tr><td>T_USE</td><td><font color="red">339</font></td></tr><tr><td>T_GLOBAL</td><td><font color="red">340</font></td></tr><tr><td>T_PUBLIC</td><td><font color="red">346</font></td></tr><tr><td>T_PROTECTED</td><td><font color="red">345</font></td></tr><tr><td>T_PRIVATE</td><td><font color="red">344</font></td></tr><tr><td>T_FINAL</td><td><font color="red">343</font></td></tr><tr><td>T_ABSTRACT</td><td><font color="red">342</font></td></tr><tr><td>T_STATIC</td><td><font color="red">341</font></td></tr><tr><td>T_VAR</td><td><font color="red">347</font></td></tr><tr><td>T_UNSET</td><td><font color="red">348</font></td></tr><tr><td>T_ISSET</td><td><font color="red">349</font></td></tr><tr><td>T_EMPTY</td><td><font color="red">350</font></td></tr><tr><td>T_HALT_COMPILER</td><td><font color="red">351</font></td></tr><tr><td>T_CLASS</td><td><font color="red">352</font></td></tr><tr><td>T_INTERFACE</td><td><font color="red">353</font></td></tr><tr><td>T_EXTENDS</td><td><font color="red">354</font></td></tr><tr><td>T_IMPLEMENTS</td><td><font color="red">355</font></td></tr><tr><td>T_OBJECT_OPERATOR</td><td><font color="red">356</font></td></tr><tr><td>T_DOUBLE_ARROW</td><td><font color="red">357</font></td></tr><tr><td>T_LIST</td><td><font color="red">358</font></td></tr><tr><td>T_ARRAY</td><td><font color="red">359</font></td></tr><tr><td>T_CLASS_C</td><td><font color="red">360</font></td></tr><tr><td>T_METHOD_C</td><td><font color="red">361</font></td></tr><tr><td>T_FUNC_C</td><td><font color="red">362</font></td></tr><tr><td>T_LINE</td><td><font color="red">363</font></td></tr><tr><td>T_FILE</td><td><font color="red">364</font></td></tr><tr><td>T_COMMENT</td><td><font color="red">365</font></td></tr><tr><td>T_DOC_COMMENT</td><td><font color="red">366</font></td></tr><tr><td>T_OPEN_TAG</td><td><font color="red">367</font></td></tr><tr><td>T_OPEN_TAG_WITH_ECHO</td><td><font color="red">368</font></td></tr><tr><td>T_CLOSE_TAG</td><td><font color="red">369</font></td></tr><tr><td>T_WHITESPACE</td><td><font color="red">370</font></td></tr><tr><td>T_START_HEREDOC</td><td><font color="red">371</font></td></tr><tr><td>T_END_HEREDOC</td><td><font color="red">372</font></td></tr><tr><td>T_DOLLAR_OPEN_CURLY_BRACES</td><td><font color="red">373</font></td></tr><tr><td>T_CURLY_OPEN</td><td><font color="red">374</font></td></tr><tr><td>T_PAAMAYIM_NEKUDOTAYIM</td><td><font color="red">375</font></td></tr><tr><td>T_NAMESPACE</td><td><font color="red">376</font></td></tr><tr><td>T_NS_C</td><td><font color="red">377</font></td></tr><tr><td>T_DIR</td><td><font color="red">378</font></td></tr><tr><td>T_NS_SEPARATOR</td><td><font color="red">379</font></td></tr>
</table>
<pre><?php var_export($a);  ?></pre>
</body>
</html>