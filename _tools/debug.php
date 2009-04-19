#!/usr/bin/php -q
<?php


$ser = serialize("a \n b");
var_dump($ser);

die();

echo hexdec('9c4cb8');
die();

//echo mktime(0, 0, 0, 12, 32, 1997)."\n";
//echo mktime(0, 0, 0, 13, 1, 1997)."\n";
//echo mktime(0, 0, 0, 1, 1, 1998)."\n";


echo strnatcasecmp("10", "1")."\n";
echo strnatcasecmp(10, 1)."\n";
echo strnatcasecmp('1', '10')."\n";
//$x = get_html_translation_table(HTML_ENTITIES);
//print_r($x);
?>
echo strnatcasecmp(10, 1)."\n";
