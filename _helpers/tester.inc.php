<?php
/**
 * Functions
 */

function file2function($file) {
    return basename($file, ".js");    
}

function function2file($function){
    global $all_files;
    return find_function($function, $all_files);
}

function find_files($dir, $file=false, $from_file=false) {
    if (!is_dir($dir)) {
        die("Dir: $dir does not exist");
    }
    
    if ($file) {
        $cmd = "find ".$dir." -type f -name '*.js' |grep '".$file.".js'";
    } else {
        $cmd = "find ".$dir." -type f -name '*.js' |sort";
    }
    
    exec($cmd, $o, $r);
    if ($r) {
        die("Command: $cmd failed");    
    }
    
    $n = array();
    foreach ($o as $file) {
        $n[file2function($file)] = $file; 
    }
    ksort($n);
    
    $files  = array();
    $record = false;
    foreach ($n as $file) {
        if ($from_file && !$record) {
            if (file2function($file) == $from_file) {
                $record = true;
            }
        }
        if (!$from_file || $record) {
            $files[file2function($file)] = $file;
        }
    }
    
    
    return $files;
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
    
    //$example_lines = preg_split("/;\s|;$/", $example_set["example"], -1,  PREG_SPLIT_NO_EMPTY);
    $example_lines = $example_set["example"];
    $example_lines_count = count($example_lines);
    
    $tester  = "";
    
    // Load Includes
    $tester .= "// Load Includes".n;
    if (is_array($includes)) {
        foreach ($includes as $path=>$function) {
            $tester .= "// Include: $function".n;
            $tester .= "load('$path');".n;
        }
    }
    
    // Load actual function source
    $tester .= "// Main source we want to test".n;
    $tester .= "load('$file');".n;
    $tester .= "window.location = './tester.htm';".n;
    $tester .= "".n;
    $tester .= "window.onload = function(){".n; 
    $tester .= t."print('## SETS ##');".n;
    
    // Execute Example Code
    $tester .= t."// Execute Example Code".n;
    foreach($example_lines as $i=>$example_line) {
        if (($i+1) == $example_lines_count) {
            $tester .= t."returns = ".trim($example_line).";";
        } else {
            $tester .= t."$example_line;";
        }
        $tester .= t.n;
    }
    $tester .= t."".n;
    
    // Compare call return value
    $tester .= t."// Compare call return value".n;
    $tester .= t."success = tester_comparer(returns, ".$example_set["returns"].");".n;
    $tester .= t."print('> returns', success, tester_trim(tester_print_r(returns, true)));".n;
    $tester .= t."".n;
    $tester .= t."print('## RESULTS ##');".n;
    
    // Compare variable results
    if (isset($example_set["results"])) {
        $val = $example_set["results"];
        $key = strShift(" == ", $val);
        
        if (trim($val) && trim($key)) {
            $tester .= t."// Compare variable results".n;
            $tester .= t."success = comparer($key, $val);".n;
            $tester .= t."print('> results', success, tester_trim(tester_print_r(data, true)));".n;
        }
    }
    
    $tester .= "}".n;
    //$example_set["returns"];
    
    return $tester;
}

function run_tester($tester_path, $example_set) {
    global $config;
    
    // Run Tester
    $cmd = $config["cmd_rhino"]." ".$tester_path;
    $o = array(); 
    exec($cmd, $o, $r);
    $buf = implode("\n", $o);
    if ($r) {
        // Probably a syntax error
        return array(false=>$buf);
    }
    
    // Compile nice array of results
    $test_results = array();
    $sets = explode("## SETS ##", $buf);
    $i    = 0;
    foreach ($sets as $set) {
        $set = trim($set);
        if (!$set) continue;
        
        $results = explode("## RESULTS ##", $set);
        foreach($results as $result) {
            $result = trim($result);
            if (!$result) continue;
            
            $x       = strShift(" ", $result);
            $type    = strShift(" ", $result);
            $success = strShift(" ", $result);
            $test_results[$type][$success] = $result;
        }
        $i++;
    }
    
    return $test_results;
}

function find_function($function, $files) {
    $file = "";
    if (isset($files[$function])) {
        $file = $files[$function];
    }
    
    if (!$file) {
        print_r($files);
        die("function $function not found in files");
    }
    
    return $file;
}

function dependencies($file, $mapping, &$list=false) {
    $firstrun = false;
    if ($list === false) {
        $list = array();
        $firstrun = true;
    }
    
    $info = info_from_file($file, $mapping);
    if (isset ($info["dependencies"]) && is_array($info["dependencies"]) && count($info["dependencies"])) {
        foreach ($info["dependencies"] as $function) {
            $file = function2file($function); 
            $list[$file] = $function;
            dependencies($file, $mapping, $list);
        }
    }
    
    return $list;
}

function info_from_file($file, $mapping) {
    $source = file_get_contents($file);
    $blocks = divide_function($source);
    $info   = parse_comments($blocks["comments"], $mapping);
    return $info;
}

/**
 * Test a PHP.JS function
 *
 * @param unknown_type $file
 */
function test_file($file) {      
    global $config, $all_files;
    $func = file2function($file);
    
    $info = info_from_file($file, $config["mapping"]);
    
    $includes   = array();
    $includes[dirname(__FILE__)."/env.js"]    = "./env.js";
    $includes[dirname(__FILE__)."/tester.js"] = "./tester.js";
    
    $dependencies = dependencies($file, $config["mapping"]);
    $includes = array_merge($includes, $dependencies);
    
    echo "Testing $func ";
    
    foreach ($info["examples"] as $i=>$example_set) {
        $tester = compile_tester_source($file, $example_set, $includes, $info);
        
        // Store Tester
        $tester_path = $config["dir_temp"]."/".$func.".tester";
        file_put_contents($tester_path, $tester);
        
        // Run Tester
        $test_results = run_tester($tester_path, $example_set);
        if ($test_results === false) {
            // Syntax Error
            if (reset(array_keys($test_results)) === false) {
                echo "[fail]";
                echo reset($test_results);
            }
        } else {
            // Show test results
            foreach ($test_results as $type=>$test_result) {
                 foreach($test_result as $success=>$value) {
                     if ($success) {
                         echo "[okay]";
                     } else {
                         echo "[fail]";
                     }
                     
                     if (!$success || $config["show_results"]) {
                         echo "\nrunning       : ".$example_set["example"];
                         echo "\nshould return : ".$example_set[$type];
                         echo "\n       returns: ".$value;
                         echo "\n";
                         echo "\n";
                     }
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
            if ($r[1] == "example") {
                $info[$map][$r[2]][$r[1]][] = $r[3];
            } else {
                $info[$map][$r[2]][$r[1]] = $r[3];
            }
        } elseif ($map == "authors" ) {
            preg_match('/[\s]*(\w+)([^:]*):[\s]*([^(]+)(.*)/', trim($matches[2][$k]), $r);
            $url = trim(str_replace(array('(', ')'), '', $r[4]));
            $info[$map][$r[1]][trim($r[3])] = $url;
        } elseif ($map == "dependencies" ) {
            $info[$map][] = str_replace("depends on: ", "", $matches[2][$k]);
        } else {
            // Store meaningful comment line
            $info[$map][] = $matches[2][$k];
        }
    }
    
    return $info;
}
?>