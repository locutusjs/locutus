#!/usr/bin/php -q
<?php
error_reporting(E_ALL);
require_once "PHPJS_Library/PHPJS/Library.php";

// Check for CLI
if ((php_sapi_name() != 'cli')) {
    die("CLI Only");
}

$functionDir = realpath(dirname(__FILE__)."/..")."/functions";
$PHPJS_Compiler_Shell = new PHPJS_Library_Compiler_Shell($functionDir, $compileDir);

$PHPJS_Compiler_Shell->compileAll();

?>