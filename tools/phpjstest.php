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
$hr = str_repeat("=", 75)."\n";
switch($mode) {
    case "testcode":
        echo $Function->testCode();
        break;
    case "debug":

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
        echo "\n\n";

        echo "Js Lint result\n";
        echo $hr;
        $Function->testFunction(false, false, true);
        break;
    case "output":
        $Function->testFunction(true);
        break;
    case "php":
        $Function->testFunction(false, true);
        break;
    case "from":
        $PHPJS_Tester_Shell->setSelection("from::".$funcName);
        $PHPJS_Tester_Shell->test();
        break;
    case "category":
        $PHPJS_Tester_Shell->setSelection("category::".$funcName);
        $PHPJS_Tester_Shell->test();
        break;
    case "all":
        $PHPJS_Tester_Shell->setSelection("all");
        $PHPJS_Tester_Shell->test();
        break;
    case "run":
        echo $Function->testFunction();
        echo "\n\n";

        echo "Js Lint result\n";
        echo $hr;
        $Function->testFunction(false, false, true);
        break;
    default:
        die("Unknown command: ".$mode);
        break;
}
?>
