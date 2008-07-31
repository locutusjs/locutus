<?php
Class PHPJS_Function_Tester_Shell extends PHPJS_Function_Tester {

    public function PHPJS_Function_Tester_Shell($file, &$PHPJS_Library){
        // Add shell specific Includes
        $this->addInclude($PHPJS_Library->getDirRealRoot()."/_helpers/env.js",    "Shell Requirement");
        $this->addInclude($PHPJS_Library->getDirRealRoot()."/_helpers/tester.js", "Shell Requirement");
        
        // Proceed with parent
        parent::PHPJS_Function($file, &$PHPJS_Library);
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
        $testCode .= "window.location = '".$this->PHPJS_Library->getDirRealRoot()."/_helpers/tester.htm"."';".$n;
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
    
    protected function _saveTestCode($file, $testCode) {
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
        
        list($success, $output) = $this->_execute($rhinoPath." ".$testPath);
        if (!$success) {
            return false;
        } 
        
        $testOutput  = implode("\n", $output);
        $testResults = $this->_parseTestOutput($testOutput);
        
        if ($outputRaw) {
            return $testOutput;
        }

        return $testResults;
    }
    
    protected function _execute($cmd) {
        exec($cmd, $o, $r);
        if ($r) {
            return array(false, $o);
        }
        return array(true, $o);
    }    
}
?>