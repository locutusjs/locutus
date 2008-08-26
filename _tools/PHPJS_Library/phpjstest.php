#!/usr/bin/php -q
<?php
    error_reporting(E_ALL);
    require_once "PHPJS/Library.php";

    // Check for CLI
    if ((php_sapi_name() != 'cli')) {
        die("CLI Only");
    }
    
    
    $dir = realpath(dirname(__FILE__)."/../..")."/functions";
    $PHPJS_Tester_Shell = new PHPJS_Library_Tester_Shell($dir);
    
    // Parse commands
    $argFunc = "all";
    if (isset($argv[1])) {
        $argFunc = $argv[1];
    }
    
    $argMode = "run";
    if (isset($argv[2])) {
        $argMode = $argv[2];
    }

    $funcName = $argFunc;
    $mode     = $argMode;
    
    // Load funcion if nescessary
    if ($funcName !== "all" && $funcName !== false && strlen($funcName) > 1) {
        if (strpos($funcName, "/") !== false || strpos($funcName, ".") !== false) {
            // Convert a path to plain function name
            $funcName = basename($funcName, ".js");
        }
        
        if (!$PHPJS_Tester_Shell->functionExists($funcName)) {
            die("Function '".$funcName."' does not exist\n");
        } else {
            $Function = $PHPJS_Tester_Shell->getFunction($funcName);
        }        
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
        case "run":
            if ($funcName == "all") {
                $PHPJS_Tester_Shell->testAll();
            } else {
                echo $Function->testFunction();
            }
            break;
        default:
            die("Unknown command: ".$argMode);
            break;
    }
?>