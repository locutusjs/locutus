#!/usr/bin/php -q
<?php
    error_reporting(E_ALL);
    require_once "PHPJS/Library.php";
    
    $dir = realpath(dirname(__FILE__)."/../..")."/functions";
    
    $PHPJS_Tester_Shell = new PHPJS_Library_Tester_Shell($dir);
    $options = $PHPJS_Tester_Shell->parseCmdArgs($argv);
    
    foreach ($options as $key=>$funcName) {
        if (!is_bool($funcName) && strlen($funcName) > 1) {
            if (!$PHPJS_Tester_Shell->functionExists($funcName)) {
                die("Function does not exist\n");
            }
        }
    }
    
    if (isset($options["testcode"])) {
        $Function = $PHPJS_Tester_Shell->getFunction($funcName);
        echo $Function->testCode();
    } elseif (isset($options["output"])) {
        $Function = $PHPJS_Tester_Shell->getFunction($funcName);
        echo $PHPJS_Tester_Shell->testFunction($funcName, true);
    } elseif (isset($options["from"])) {
        $PHPJS_Tester_Shell->testFrom($funcName);
    } elseif (isset($options["func"])) {
        $PHPJS_Tester_Shell->testFunction($funcName);
    } else {
        $PHPJS_Tester_Shell->testAll();
    }
?>