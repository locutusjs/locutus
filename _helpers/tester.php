#!/usr/bin/php -q
<?php
error_reporting(E_ALL);
require_once realpath(dirname(__FILE__)."/../ext")."/kvzlib/code/php/all_functions.inc.php";
require_once realpath(dirname(__FILE__)."")."/tester.inc.php";    

/**
 * Config
 */

define("t", "    ");
define("n", "\n");

$config["dir_functions"] = realpath(dirname(__FILE__)."/..")."/functions";
$config["dir_temp"]      = "/tmp";
$config["cmd_rhino"]     = "/usr/bin/rhino";
 
$config["mapping"]["-"] = "dependencies";
$config["mapping"]["+"] = "authors";
$config["mapping"]["%"] = "notes";
$config["mapping"]["*"] = "examples";    


/**
 * Checks
 */
if (!is_executable($config["cmd_rhino"])) {
    die("Rhino is not found at: ".$config["cmd_rhino"].n);
}

if (false) {
    $buf  = file_get_contents("/home/kevin/workspace/plutonia-phpjs/functions/array/ksort.js");
    $info = parse_comments($buf, $config["mapping"]);
    print_r($info);
    die();
}


/**
 * Run
 */
$file = (!isset($argv[1]) ? false : $argv[1]);
$config["show_results"] = false;
$config["from"] = false;
foreach ($argv as $i=>$arg) {
    if ($arg == "--show") {
        $config["show_results"] = true;
    } elseif ($arg == "--from") {
        $config["from"] = $argv[$i+1];
        $file=false;
    }
}

$all_files = find_files($config["dir_functions"]); 
$files = find_files($config["dir_functions"], $file, $config["from"]);
test_files($files);
?>