<?php

/**
 * If you are using command line run
 * php -q php-compile.php
 */

header("Content-type: text/plain");

$PHPJSFn = realpath(dirname(__FILE__) . "/functions");

echo "\n";

if(is_dir($PHPJSFn)) {
    echo "Scaning for PHPJS functions...\n\n";
    $total_functions = array();
    $libraries = array_slice(scandir($PHPJSFn), 2);
    if(is_array($libraries) && count($libraries) >= 1) {
        foreach($libraries as $library) {
            if(substr($library, 0, 1) !== "_" && is_dir("$PHPJSFn/$library")) {
                $functions = scandir("$PHPJSFn/$library");
                if(is_array($functions) && count($functions) >= 1) {
                    foreach($functions as $function) {
                        if(strpos($function, "js") !== false) {
                            $total_functions[] = "$PHPJSFn/$library/$function";
                        }
                    }
                }
            }
        }
    }
    if(count($total_functions) >= 1) {
        echo count($total_functions) . " Functions are found...\n\nCompiling functions to php.js\n\n";
        $phpjs_data = null;
        foreach($total_functions as $fn) {
            $phpjs_data .= @file_get_contents($fn) . "\n";
        }
        @file_put_contents("php.js", $phpjs_data);
        echo "Success, php.js created with all functions...";
    } else {
        echo "Sorry, No functions are found...";
    }
} else {
    echo "Sorry, Failed to detecting PHPJS functions directory.";
}

echo "\n\n";
