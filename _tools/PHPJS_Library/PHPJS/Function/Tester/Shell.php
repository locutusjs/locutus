<?php
Class PHPJS_Function_Tester_Shell extends PHPJS_Function_Tester {

    public function PHPJS_Function_Tester_Shell($file, &$PHPJS_Library){
        // Parent first please
        parent::PHPJS_Function_Tester($file, $PHPJS_Library);
        
        // Add shell specific Includes
        $this->addInclude($PHPJS_Library->getDirRealRoot()."/_tools/env.js",    "Shell Requirement");
        $this->addInclude($PHPJS_Library->getDirRealRoot()."/_tools/tester.js", "Shell Requirement");
    }
    
    public function getPath() {
        return $this->getRealPath();
    }
    
    public function getTesterPath() {
        return $this->PHPJS_Library->getDirRealTemp()."/".$this->_functionName.".tester.js";
    }
    
    protected function _testCodePrepend() {
        $t        = $this->_t;
        $n        = $this->_n;
        $testCode = "";
        
        // Load actual function source
        $testCode .= "// Main source we want to test".$n;
        $testCode .= "load('".$this->getRealPath()."');".$n;
        $testCode .= "".$n;
        $testCode .= "window.location = '".$this->PHPJS_Library->getDirRealRoot()."/_tools/tester.htm"."';".$n;
        $testCode .= "window.onload = function(){".$n;
         
        return $testCode;
    }
    
    protected function _testCodeAppend() {
        $t        = $this->_t;
        $n        = $this->_n;
        $testCode = "";
        
        $testCode .= "}".$n;
        return $testCode;
    }
    
    public function showOutput($results) {
        print_r($results);
        return true;
    }

    public function phpDeviation() {
        if ((php_sapi_name() != 'cli')) {
            die("CLI ONLY");
        }
        
        // Deviation from PHP
        $phpResult = array();
        $exampleSets = $this->DocBlock->getExamples();
        foreach($exampleSets as $nr=>$exampleSet) {
            $example = implode("\n", $exampleSet["example"]);
            if (!isset($exampleSet["returns"])) {
                continue;
            }
            
            $match = null;
            
            $example = preg_replace('#\[([^\]]+)\]#m', 'array($1)', $example);
            $example = preg_replace('#\{([^\}]+)\}#m', 'array($1)', $example);
            $example = preg_replace('#:#m', '=>', $example); 
            
            // Execute Example in PHP! Expirimental!!
            $phpV = eval("return ". $example);
            $jsV  = $exampleSet["returns"];
            
            // Strip Quotes
            if (substr($jsV, 0, 1) == "'" || substr($jsV, 0, 1) == '"') {
                $jsV = substr($jsV, 1);
            }
            if (substr($jsV, strlen($jsV)-1, 1) == "'" || substr($jsV, strlen($jsV)-1, 1) == '"') {
                $jsV = substr($jsV, 0, strlen($jsV)-1);
            }
            
            if ($phpV == $jsV) {
                $phpResult["php"][$nr-1]['true'] = "";
            } else {
                $phpResult["php"][$nr-1]['false'] = "php: ".$phpV." != js: ".$jsV;
            }
        }        
        
        return $phpResult;
    }    
    
    public function showResults($results, $phpResults=false) {
        $examples = $this->DocBlock->getExamples();
        
        $maxOutputLen = 80;
        $rowCnt = 1;
        $failed = false;
        
        if ($phpResults !== false) {
            $results = array_merge_recursive($results, $phpResults);
        }
        
        foreach ($results as $type=>$typeSet) {
            foreach ($typeSet as $typeSetNr=>$typeSetNrRes) {
                foreach ($typeSetNrRes as $succeeded=>$returnValue) {
                    
                    if ($rowCnt == 1) {
                        echo str_pad($this->getCategoryName()."/".$this->_functionName.".js", 40, " ", STR_PAD_RIGHT). " ";
                    } else {
                        echo str_pad(" ", 40, " ", STR_PAD_RIGHT). " ";
                    }
                    
                    if ($succeeded == 'false') {
                        $succeeded = false;
                    }
                    $exampleNr = $typeSetNr+1;
                    $example   = $examples[$exampleNr]["example"];
                    
                    echo str_pad("$type#$exampleNr", 12, " ", STR_PAD_RIGHT). " ";
                    
                    if ($succeeded == false) {
                        echo "FAIL";
                    } else {
                        echo "OKAY";
                    }
                    
                    if ($succeeded == false) {
                        echo ", returned: ";
                        
                        $lines = explode("\n", $returnValue);
                        foreach ($lines as $i=>$line) {
                            if (!trim($line)) {
                                unset($lines[$i]);
                            }
                        }
                        $line  = reset($lines);
                        
                        if (count($lines) == 1) {
                            echo $line; 
                        } else {
                            echo str_pad(substr($line, 0, $maxOutputLen), $maxOutputLen, " ", STR_PAD_RIGHT);
                            if (strlen($line)> $maxOutputLen) {
                                echo "...";
                            }
                        }
                        
                    }
                    echo " ";
                    
                    echo "\n";
                    $rowCnt++;
                    
                    if ($succeeded == false) {
                        $failed = true;
                    }
                }
            }
        }
        
        return $failed;
    }
    
    protected function _saveTestCode($file, $testCode) {
        //$this->log("Saved testcode in ".$file, PHPJS_Library::LOG_DEBUG);
        return file_put_contents($file, $testCode);
    }
    
    public function runTestCode($testCode, $outputRaw=false) {
        $results = array();
        
        $testPath  = $this->getTesterPath();
        $rhinoPath = $this->PHPJS_Library->getFleRealRhino();
        
        if (!file_exists($rhinoPath)) {
            throw new PHPJS_Exception("Rhino not found at: ".$rhinoPath);
            return false;
        }
        
        if (!$this->_saveTestCode($testPath, $testCode)) {
            throw new PHPJS_Exception("Could not write tester to: ".$testPath);
            return false;
        }
        
        $cmd = $rhinoPath." ".$testPath;
        list($success, $output) = $this->_execute($cmd);
        if (!$success) {
            return false;
        } 
        
        $testOutput  = $output;
        $testResults = $this->_parseTestOutput($testOutput);
        
        if ($outputRaw) {
            return $testOutput;
        }
        
        return $testResults;
    }
    
    protected function _execute($cmd) {
        mark();
        exec($cmd, $o, $r);
        mark();
        if ($r) {
            return array(false, $o);
        }
        return array(true, $o);
    }    
}
?>