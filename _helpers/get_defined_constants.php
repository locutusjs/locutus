<?php
	
// Could also build a new object based on get_defined_constants(), but which only contained the extensions we want (but it assumes the extensions are in the compiled PHP)
// Converts constants to JavaScript form
// Replace others besides those in replacements() (e.g., Math.PI instead of the PHP number?)
// Still need to remove any extensions not desired
$byExtension = 0;
$add_alert = 1;
// The following only seems to need to catch "null", "true", and "false" (as the constant names) in my tests, and there only if rejecting upper-case
$remove = 0; // set to 0 to print and do nothing about reserved words (print them all, but don't show them--just get the object); set to 1 to remove only if property matches (lower-case) reserved word; set to 2 to remove if the property has any case combination; set to 3 to throw an exception if there is an exact match, set to 4 to throw an exception if there is a case insensitive match; set to anything else to see both object and reserved word instances without doing anything about them


$c = var_export($byExtension ? get_defined_constants(true) : get_defined_constants(), true);
$c = replacements($c); // see function below

// Disallow capitalized versions of TRUE, FALSE, NULL if treated same in some browsers?
$reserved = array ('null', 'true', 'false', 'break', 'case', 'catch', 'continue', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'abstract', 'boolean', 'byte', 'char', 'class', 'const', 'debugger', 'double', 'enum', 'export', 'extends', 'final', 'float', 'goto', 'implements', 'import', 'int', 'interface', 'long', 'native', 'package', 'private', 'protected', 'public', 'short', 'static', 'super', 'synchronized', 'throws', 'transient', 'volatile'); 

function map ($item) {
	global $c, $remove;
	//print $item;
	if (preg_match("@'".$item."' :@", $c)) {
		if ($remove) {
			echo $item.",\n";
		}
		if ($remove === 1 || $remove === 2) {
			$c = preg_replace("@^\s+'".$item."' : .*$\n@m", '', $c);
		}
		else if ($remove === 3) {
			throw new Exception('found unexpected reserved word');
		}
	}
	else if (preg_match("@'".$item."' :@i", $c)) {
		if ($remove) {
			echo $item." (only if JS implementations expected to be case sensitive),\n";
		}
		if ($remove === 2) {
			$c = preg_replace("@^\s+'".$item."' : .*$\n@mi", '', $c);
		}
		else if ($remove === 4) {
			throw new Exception('found unexpected reserved word (though in a different case)');
		}
	}
}

echo '<pre>';
if ($remove) {
	echo 'Reserved words needing removal'."\n";
}
array_map('map', $reserved);
echo '</pre>';

echo '<pre>var constObj = '.$c;


if ($add_alert && !$byExtension) {
	echo <<<HERE
for (var cnst in constObj) {
    window[cnst] = constObj[cnst]; // Might change 'window' here to this[cnst].
}
HERE;
}
else if ($add_alert) {
	echo <<<HERE
for (var ext in constObj) { 
    for (var cnst in constObj[ext]) {
        window[cnst] = constObj[ext][cnst]; // Might change 'window' here to this[ext][cnst].
    }
}
HERE;
}

echo "\n";
echo <<<HERE
alert(E_NOTICE); // 8
alert(TRUE); // true
HERE;

echo '</pre>';


function replacements ($c) {
	$c = preg_replace("@array \(@", '{', $c); // associative array beginning
	$c = preg_replace("@ => @", " : ", $c); // associative array separator
	$c = preg_replace("@: $\n(\s+){@m", ": {", $c); // shorten separator-to-bracket gap in associative array
	$c = preg_replace("@,\n(\s+)\),$@m", "\n$1},", $c); // associative array end
	$c = preg_replace("@,\n\)$@m", "\n};\n\n", $c); // associative array end of document

	$c = preg_replace("@'\r\n',@m", "'\\n',", $c); // for PHP_EOL's newline
	
	$c = preg_replace("@NULL,$@m", "null,", $c); // NULL to lower-case for JS
	$c = preg_replace("@NAN,$@m", "NaN,", $c); // NAN to NaN for JS
	$c = preg_replace("@INF,$@m", "Number.POSITIVE_INFINITY,", $c); // INF to Number.POSITIVE_INFINITY for JS
	// Might be more to add more here, but none critical anymore
	return $c;
}

?>