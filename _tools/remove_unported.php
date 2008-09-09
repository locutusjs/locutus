#!/usr/bin/php -q
<?php
    error_reporting(E_ALL);
    require_once "PHPJS_Library/PHPJS/Library.php";
    
    $dir         = realpath(dirname(__FILE__)."/..")."/functions";
    $dirUnported = realpath(dirname(__FILE__)."/..")."/_unported";
    
    $PHPJS = new PHPJS_Library($dir);
    
    // Remove already ported function
    foreach ($PHPJS->Functions as $Function) {
        $path         = $Function->getRealPath();
        $pathUnported = str_replace("/functions/", "/_unported/", $path);
        
        if (is_file($pathUnported)) {
            echo "Please remove: ".$pathUnported." \n";
        }
    }
?>