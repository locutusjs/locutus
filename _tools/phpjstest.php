#!/usr/bin/php -q
<?php
error_reporting(E_ALL);
require_once "PHPJS_Library/PHPJS/Library.php";

// Check for CLI
if ((php_sapi_name() != 'cli')) {
    die("CLI Only");
}


$dir = realpath(dirname(__FILE__)."/..")."/functions";
$PHPJS_Tester_Shell = new PHPJS_Library_Tester_Shell($dir);

// Parse commands
$arg1 = "all";
if (isset($argv[1])) {
    $arg1 = $argv[1];
}

$arg2 = "run";
if (isset($argv[2])) {
    $arg2 = $argv[2];
}

$funcName = $arg1;
$mode     = $arg2;
$modes = array("all", "category", "from");

// Load function if nescessary
if (!in_array($funcName, $modes) && $funcName !== false && strlen($funcName) > 1) {
    if (strpos($funcName, "/") !== false || strpos($funcName, ".") !== false) {
        // Convert a path to plain function name
        $funcName = basename($funcName, ".js");
    }
    
    if (!$PHPJS_Tester_Shell->functionExists($funcName)) {
        die("Function '".$funcName."' does not exist\n");
    } else {
        $Function = $PHPJS_Tester_Shell->getFunction($funcName);
    }        
} else {
    $mode     = $arg1;
    $funcName = $arg2;
}

// Choose mode & execute
switch($mode) {
    case "testcode":
        echo $Function->testCode();
        break;
    case "debug":
        $hr = str_repeat("=", 75)."\n";

        echo "Info\n";
        echo $hr;
        echo "source file: ". $Function->getRealPath()."\n";
        echo "tester file: ". $Function->getTesterPath()."\n";
        echo "\n\n";
        
        echo "Examples\n";
        echo $hr;
        print_r($Function->DocBlock->getExamples());
        echo "\n\n";
        
        echo "Dependencies\n";
        echo $hr;
        print_r($Function->getDependencies());
        echo "\n\n";

        echo "Output\n";
        echo $hr;
        $Function->testFunction(true);
        echo "\n\n";
        
        echo "Test result\n";
        echo $hr;
        $Function->testFunction(false);
        break;
    case "output":
        $Function->testFunction(true);
        break;
    case "php":
        $Function->testFunction(false, true);
        break;
    case "from":
        $PHPJS_Tester_Shell->testFrom($funcName);
        break;
    case "category":
        $PHPJS_Tester_Shell->testCategory($funcName);
        break;
    case "all":
        $PHPJS_Tester_Shell->testAll();
        break;
    case "run":
        echo $Function->testFunction();
        break;
    default:
        die("Unknown command: ".$mode);
        break;
}
?>