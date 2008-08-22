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
    
    public function showResults($results, $breakOnError=true) {
        // @todo: Parser can be better. Does it work with result-values?
        // @todo: Outputting needs cleanup
        $examples = $this->DocBlock->getExamples();
        
        print_r($results);
        
        foreach ($results as $type=>$typeSet) {
            foreach ($typeSet as $typeSetNr=>$typeSetNrRes) {
                foreach ($typeSetNrRes as $succeeded=>$returnValue) {
                    
                    if ($succeeded) {
                        echo "OKAY ";
                    } else {
                        echo "FAIL ";
                    }
                    $exampleNr = $typeSetNr+1;
                    
                    
                    $example = $examples[$exampleNr]["example"];
                    
                    echo str_pad($this->_functionName.":".$exampleNr, 20, " ", STR_PAD_RIGHT). " ";
                    
                    
                    
                    echo str_pad($example[0], 20, " ", STR_PAD_RIGHT). " "; 
                    
                    echo str_pad($returnValue, 20, " ", STR_PAD_RIGHT). " ";
                    
                    echo "\n";
                    
                    if ($succeeded == false && $breakOnError==true) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }
    
    protected function _saveTestCode($file, $testCode) {
        $this->log("Saved testcode in ".$file, PHPJS_Library::LOG_DEBUG);
        return @file_put_contents($file, $testCode);
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