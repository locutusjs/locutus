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

//$PHPJS_Compiler_Shell->setSelection("category::math");
$PHPJS_Compiler_Shell->setSelection("all");

$n = PHPJS_Library_Compiler::COMPILE_NAMESPACED;
$m = PHPJS_Library_Compiler::COMPILE_MINFIED;
$p = PHPJS_Library_Compiler::COMPILE_PACKED;

echo $PHPJS_Compiler_Shell->genLicense(1.61);

die();

echo $PHPJS_Compiler_Shell->compile($p);

?>