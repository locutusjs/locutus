<?php
function toUTF ($val)
{
	if (is_array($val)) {
		return array_map("toUTF", $val);
	} elseif (is_string($val)) {
		return utf8_encode($val);
	}
	return $val;
}

$content = file_get_contents("tests/" . $_POST["file"]);
$result = array(token_get_all($content), $content);
$result = array_map("toUTF", $result);
die(json_encode($result));