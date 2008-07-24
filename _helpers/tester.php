#!/usr/bin/php -q
<?php
    error_reporting(E_ALL);
    require_once realpath(dirname(__FILE__)."/../ext")."/kvzlib/code/php/all_functions.inc.php";    
    
    /**
     * Config
     */

    $config["dir_functions"] = realpath(dirname(__FILE__)."/..")."/functions";
    $config["dir_temp"]      = "/tmp";
    $config["cmd_rhino"]     = "/usr/bin/rhino";
     
    $config["mapping"]["-"] = "dependencies";
    $config["mapping"]["+"] = "authors";
    $config["mapping"]["%"] = "notes";
    $config["mapping"]["*"] = "examples";    
    
    /**
     * Functions
     */
    
    function find_files($dir, $file=false) {
        if (!is_dir($dir)) {
            die("Dir: $dir does not exist");
        }
        
        if ($file) {
            $cmd = "find ".$dir." -type f -name '*.js' |grep '".$file.".js'";
        } else {
            $cmd = "find ".$dir." -type f -name '*.js' |sort";
        }
        
        echo $cmd."\n";
        exec($cmd, $o, $r);
        if ($r) {
            die("Command: $cmd failed");    
        }
        
        return $o;
    }
    
    function test_files($files) {
        foreach($files as $file) {
            $bool = test_file($file);
        }
    }
    
    /**
     * Compile Tester
     *
     * @param unknown_type $file
     * @param unknown_type $example_set
     * @return unknown
     */
    function compile_tester_source($file, $example_set, $includes = false) {
        global $config;
        
        
        
        $example_lines = preg_split("/;/", $example_set["example"], -1,  PREG_SPLIT_NO_EMPTY);
        $example_lines_count = count($example_lines);
        
        $tester  = "";
        
        // Load Includes
        $tester .= "// Load Includes"."\n";
        if (is_array($includes)) {
            foreach ($includes as $include) {
                $tester .= "load('$include');\n";
            }
        }
        
        // Load actual function source
        $tester .= "load('$file');\n";
        $tester .= ""."\n";
        
        $tester .= "print('## SETS ##');"."\n";
        
        // Execute Example Code
        $tester .= "// Execute Example Code"."\n";
        foreach($example_lines as $i=>$example_line) {
            if (($i+1) == $example_lines_count) {
                $tester .= "returns = ".trim($example_line).";";
            } else {
                $tester .= "$example_line;";
            }
            $tester .= "\n";
        }
        $tester .= ""."\n";
        
        // Compare call return value
        $tester .= "// Compare call return value"."\n";
        $tester .= "success = comparer(returns, ".$example_set["returns"].");"."\n";
        $tester .= "print('> returns', success, trim(print_r(returns, true)));"."\n";
        $tester .= ""."\n";
        $tester .= "print('## RESULTS ##');"."\n";
        
        // Compare variable results
        if (isset($example_set["results"])) {
            $val = $example_set["results"];
            $key = takeOne(" == ", $val);
            
            if (trim($val) && trim($key)) {
                $tester .= "// Compare variable results"."\n";
                $tester .= "success = comparer($key, $val);"."\n";
                $tester .= "print('> results', success, trim(print_r(data, true)));"."\n";
            }
        }
        
        //$example_set["returns"];
        
        return $tester;
    }
    
    function run_tester($tester_path, $example_set) {
        global $config;
        
        // Run Tester
        $cmd = $config["cmd_rhino"]." ".$tester_path;
        $o = array(); 
        exec($cmd, $o, $r);
        if ($r) {
            die("Command: $cmd failed\n");    
        }
        
        $test_results = array();
        
        
        $buf  = implode("\n", $o);
        
        $sets = explode("## SETS ##", $buf);
        $i    = 0;
        foreach ($sets as $set) {
            $set = trim($set);
            if (!$set) continue;
            
            $results = explode("## RESULTS ##", $set);
            foreach($results as $result) {
                $result = trim($result);
                if (!$result) continue;
                
                $x       = takeOne(" ", $result);
                $type    = takeOne(" ", $result);
                $success = takeOne(" ", $result);
                $test_results[$type][$success] = $result;
            }
            $i++;
        }
        
        return $test_results;
    }
    
    /**
     * Test a PHP.JS function
     *
     * @param unknown_type $file
     */
    function test_file($file) {      
        global $config;
        $func = basename($file, ".js");
        
        $source = file_get_contents($file);
        $blocks = divide_function($source);
        $info   = parse_comments($blocks["comments"], $config["mapping"]);
        
        $includes   = array();
        $includes[] = "./env.js";
        $includes[] = "./tester.js";
        
        echo "Testing $func ";
        
        foreach ($info["examples"] as $i=>$example_set) {
            $tester = compile_tester_source($file, $example_set, $includes);
            
            // Store Tester
            $tester_path = $config["dir_temp"]."/".$func.".tester";
            file_put_contents($tester_path, $tester);
            
            // Run Tester
            $test_results = run_tester($tester_path, $example_set);
            foreach ($test_results as $type=>$test_result) {
                 foreach($test_result as $success=>$value) {
                     if ($success) {
                         echo "[okay]";
                     } else {
                         echo "[fail]";
                         echo "\nrunning        : ".$example_set["example"];
                         echo "\nshould return  : ".$value;
                         echo "\ninstead returns: ".$example_set[$type];
                     }
                 }
            }
        }
        
        echo "\n";
    }
    
    /**
     * Splits functions into emptyline-delimited blocks
     *
     * @param string $source
     * 
     * @return array
     */
    function divide_function($source) {
        // Divide
        $blocks = preg_split('/^[\s]*$/m', $source);
        
        // First block is comment
        $comments = trim(array_shift($blocks));
        
        // Glue rest of the blocks back together
        $code = trim(implode("\n", $blocks));
        
        return compact('comments', 'code');
    }
    
    /**
     * Extracts usefull comment types from function's comment block
     *
     * @param string $comments
     * @return array
     */
    function parse_comments($comments, $mapping) {
        $info         = array();
        
        // Match all meaningful comment lines
        preg_match_all('/^[\s]*\/\/[\s]*(['.preg_quote(implode('', array_keys($mapping))).'])[\s]*(.+)/m', $comments, $matches);
        
        // Loop over meaningful comment lines
        foreach ($matches[1] as $k=>$match) {
            // Determine what kind of comment line this is
            $map = $mapping[$match];
            if ($map == "examples" ) {
                // Special hierarchy handling for multiple examples
                preg_match('/[\s]*(\w+) (\d+):[\s]*(.+)/', trim($matches[2][$k]), $r);
                $info[$map][$r[2]][$r[1]] = $r[3];
            } elseif ($map == "authors" ) {
                preg_match('/[\s]*(\w+)([^:]*):[\s]*([^(]+)(.*)/', trim($matches[2][$k]), $r);
                $url = trim(str_replace(array('(', ')'), '', $r[4]));
                $info[$map][$r[1]][trim($r[3])] = $url;
            } else {
                // Store meaningful comment line
                $info[$map][] = $matches[2][$k];
            }
        }
        
        return $info;
    }
        
    
    /**
     * Checks
     */
    if (!is_executable($config["cmd_rhino"])) {
        die("Rhino is not found at: ".$config["cmd_rhino"]."\n");
    }
    
    
    /**
     * Run
     */
    $file = (!isset($argv[1]) ? false : $argv[1]);
    $files = find_files($config["dir_functions"], $file);
    test_files($files);
?>