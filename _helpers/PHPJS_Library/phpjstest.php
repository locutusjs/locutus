#!/usr/bin/php -q
<?php
    error_reporting(E_ALL);
    require_once "PHPJS/Library.php";
    
    $dir = realpath(dirname(__FILE__)."/../..")."/functions";
    
    $phpjs = new PHPJS_Library($dir);
    
    
    $phpjs = new PHPJS_Library_Tester($dir);
    $func = $phpjs->getFunction("md5_file");
    
    
/*    
    echo $func->getDocBlock()."\n";
    echo $func->getWrapHead()."\n";
    echo $func->getWrapTail()."\n";
    echo $func->getRealCode()."\n";
*/    
    print_r($func->getDependencies());
    
?>