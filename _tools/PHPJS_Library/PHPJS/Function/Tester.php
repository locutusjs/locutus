<?php
Class PHPJS_Function_Tester extends PHPJS_Function {
    
    protected $_includes = array();
    protected $_testCode = "";
    
    public function PHPJS_Function_Tester($file, &$PHPJS_Library) {
        parent::PHPJS_Function($file, $PHPJS_Library);
    }
    
    protected function _parseTestOutput($testOutput) {
        $testResults = array();
        
        if (is_array($testOutput)) {
            $testOutput = implode("\n", $testOutput);
        }
        
        $sets = explode("## SETS ##", $testOutput);
        $i    = 0;
        foreach ($sets as $set) {
            $set = trim($set);
            if (!$set) continue;
            
            $results = explode("## RESULTS ##", $set);
            foreach($results as $result) {
                $result = trim($result);
                if (!$result) continue;
                
                $x       = $this->PHPJS_Library->strShift(" ", $result);
                $type    = $this->PHPJS_Library->strShift(" ", $result);
                $nr      = $this->PHPJS_Library->strShift(" ", $result);
                $success = $this->PHPJS_Library->strShift(" ", $result);
                $testResults[$type][][$success] = $result;
            }
            $i++;
        }
        
        return $testResults;   
    }
    
    public function phpDeviation() {
        return array();        
    }

    public function testFunction($outputRaw=false, $phpDeviation=false, $jsLint = false) {
        if ($jsLint) {
            $testCode = $this->getSource();
        } else {
            $testCode = $this->testCode();
        }
        $results  = $this->runTestCode($testCode, $outputRaw, $jsLint);
        
        $phpResult = false;
        if ($phpDeviation) {
            $phpResult = $this->phpDeviation();
        }

        if ($jsLint) {
            echo join("\n", $results)."\n";
            return;
        }

        if ($outputRaw) {
            return $this->showOutput($results);
        } else {
            return $this->showResults($results, $phpResult);
        }
    }
    
    public function addInclude($path, $name="") {
        $this->_includes[$path] = $name;
    }
    
    public function getIncludes() {
        return $this->_includes;
    }
        
    protected function _testCodePrepend() {
        return "";
    }
    
    protected function _testCodeAppend() {
        return "";
    }
    
    protected function _testCodeAddIncludes() {
        $t        = $this->_t;
        $n        = $this->_n;
        $testCode = "";
        
        // Includes
        $includes = $this->getIncludes();
        if (is_array($includes) && count($includes)) {
            $testCode .= "// Load Includes".$n;
            foreach ($includes as $path=>$function) {
                $testCode .= "// Include: $function".$n;
                $testCode .= "load('$path');".$n;
            }
            $testCode .= "".$n;
        }
        return $testCode;
    }

    public function testCode() {
        $t        = $this->_t;
        $n        = $this->_n;
        $testCode = "";
        
        // Add dependencies to Includes
        // DONT RECURSE DEPENDENCIES WITH THE CONSTRUCTOR.
        // ALSO DON'T SAVE TESTCODE WITH THE CONSTRUCTOR,
        // BECAUSE NOT ALL FUNCTIONS ARE LOADED YET
        $depsRec = $this->getDependencies(true);
        $depsSng = $this->getDependencies(false);
        foreach ($depsRec as $funcName) {
            if (($FunctionDep = $this->PHPJS_Library->getFunction($funcName)) === false) {
                $this->log("Function $funcName not found", PHPJS_Library::LOG_CRIT);
                return false;
            }
            $path = $FunctionDep->getPath();
            $depType = (!in_array($funcName, $depsSng) ? "direct" : "recursive");
            $this->addInclude($path, "Dependency (".$depType."): ".$funcName);
        }
        
        $example_sets = $this->DocBlock->getExamples();
        
        $testCode .= $this->_testCodeAddIncludes();
        $testCode .= $this->_testCodePrepend();
        
        $testCode .= $t."print('## SETS ##');".$n;
        foreach ($example_sets as $nr=>$example_set) {
            
            $example_lines = $example_set["example"];
            $example_lines_count = count($example_lines);
            
            // Execute Example Code
            $testCode .= $t."// Execute Example Code".$n;
            foreach($example_lines as $i=>$example_line) {
                if (($i+1) == $example_lines_count) {
                    $testCode .= $t."returns = ".trim($example_line).";";
                } else {
                    $testCode .= $t."$example_line;";
                }
                $testCode .= $t.$n;
            }
            $testCode .= $t."".$n;

            
            // Compare call return value
            if (isset($example_set["returns"])) {
                $jsV = $example_set["returns"];
                if (($q = $this->disCloseQuotes($jsV)) !== false) {
                    // Save newlines!
                    $jsV = str_replace('\n', '%n%', $jsV) ;
                    
                    // Add slashes
                    $jsV = addslashes($jsV);
                    
                    // Restore newlines
                    $jsV = str_replace('%n%', '\n', $jsV) ;
                    
                    // Re-enclose with Quotes
                    $jsV = $q.$jsV.$q;
                }
                
                $testCode .= $t."// Compare call return value".$n;
                $testCode .= $t."success = tester_comparer(returns, ".$jsV.");".$n;
                $testCode .= $t."print('> returns', $nr, success, tester_trim(tester_print_r(returns, true)));".$n;
                $testCode .= $t."print('## RESULTS ##');".$n;
                $testCode .= $t."".$n;
            }
            
            
            // Compare variable results
            if (isset($example_set["results"])) {
                
                // Select first variable
                $baseVar = "UNKNOWN_BASEVAR";
                if (preg_match('/(\w+)/', $example_set["results"], $m)) {
                    $baseVar = $m[1];
                }
                
                if (strpos($example_set["results"], "==") !== false) {
                    // == Operator will do more advanced matching with tester_comparer()
                    $val = $example_set["results"];
                    $key = $this->PHPJS_Library->strShift(" == ", $val);
                    if (trim($val) && trim($key)) {
                        $testCode .= $t."// Compare variable results".$n;
                        $testCode .= $t."success = tester_comparer($key, $val);".$n;
                        $testCode .= $t."print('> results', $nr, success, tester_trim(tester_print_r($baseVar, true)));".$n;
                    }
                } else {
                    // Other operators will just execute the expression literally
                    $testCode .= $t."// Validate expression".$n;
                    $testCode .= $t."success = (".$example_set["results"].");".$n;
                    $testCode .= $t."print('> results', $nr, success, $baseVar);".$n;
                }
                $testCode .= $t."print('## RESULTS ##');".$n;
                $testCode .= $t."".$n;
            }
            
            if (!isset($example_set["returns"]) && !isset($example_set["results"])) {
                $testCode .= $t."print('> returns', $nr, false, 'No example return or results value defined');".$n;
                $testCode .= $t."print('## RESULTS ##');".$n;
                $testCode .= $t."".$n;
            }
            
        }
        
        $testCode .= $this->_testCodeAppend();
        
        return $testCode;
    }
    
    public function disCloseQuotes(&$str) {
        $str2 = $str;
        $q = false;
        
        // Strip Quotes
        if (substr($str2, 0, 1) == "'" || substr($str2, 0, 1) == '"') {
            $q = substr($str2, 0, 1);
            $str2 = substr($str2, 1);
        }
        if (substr($str2, strlen($str2)-1, 1) == "'" || substr($str2, strlen($str2)-1, 1) == '"') {
            $str2 = substr($str2, 0, strlen($str2)-1);
        }
        
        $str = $str2;
        
        return $q; 
    }
}
?>