#!/usr/bin/php -q
<?php
    error_reporting(E_ALL);
    require_once "PHPJS/Library.php";
    
    $dir = realpath(dirname(__FILE__)."/../..")."/functions";
    
    $PHPJS_Tester_Shell = new PHPJS_Library_Tester_Shell($dir);
    $options = $PHPJS_Tester_Shell->parseCmdArgs($argv);
    
    if (isset($options["testcode"])) {
        if (!$PHPJS_Tester_Shell->functionExists($options["testcode"])) {
            echo "Function does not exist\n";
        } else {
            $Function = $PHPJS_Tester_Shell->getFunction($options["testcode"]);
            echo $Function->testCode();
        }
    } elseif (isset($options["output"])) {
        if (!$PHPJS_Tester_Shell->functionExists($options["output"])) {
            echo "Function does not exist\n";
        } else {
            $Function = $PHPJS_Tester_Shell->getFunction($options["output"]);
            echo $PHPJS_Tester_Shell->testFunction($options["output"], $Function, true);
        }
    } elseif (isset($options["from"])) {
        $PHPJS_Tester_Shell->testFrom($options["from"]);
    } elseif (isset($options["func"])) {
        $PHPJS_Tester_Shell->testOne($options["func"]); 
    } else {
        $PHPJS_Tester_Shell->testAll();
    }
?>