#!/usr/bin/php -q
<?php
error_reporting(E_ALL);
require_once "PHPJS_Library/PHPJS/Library.php";

// Check for CLI
if ((php_sapi_name() != 'cli')) {
    die("CLI Only");
}

$dirFunctions = realpath(dirname(__FILE__)."/..")."/functions";
$dirCompile   = realpath(dirname(__FILE__)."/..")."";
$PHPJS_Compiler_Shell = new PHPJS_Library_Compiler_Shell($dirFunctions, $dirCompile);

$PHPJS_Compiler_Shell->setSelection("category::math");
$PHPJS_Compiler_Shell->compile();

?>