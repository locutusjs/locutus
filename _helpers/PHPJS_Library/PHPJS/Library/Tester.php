<?php
Class PHPJS_Library_Tester extends PHPJS_Library {
    
    protected $_fleRealRhino = "/usr/bin/rhino";
    
    public function report($str) {
        echo $str;
    }
    
    public function getFleRealRhino() {
        return $this->_fleRealRhino;
    }
    
    public function testAll() {
        $selectedFunctions = array();
        $selectedFunctions = &$this->Functions;
        return $this->_testSelection($selectedFunctions);
    }
    
    public function testFrom($fromFunctionName) {
        $selectedFunctions = array();
        $record = false;
        foreach ($this->Functions as $funcName=>$Function) {
            if ($fromFunctionName == $funcName) {
                $record = true;
            }
            if ($record == true) {
                $selectedFunctions[$funcName] = &$Function;
            }
        }
        return $this->_testSelection($selectedFunctions);
    }

    public function testOne($oneFunctionName) {
        $selectedFunctions = array();
        $selectedFunctions[$oneFunctionName] = &$this->Functions[$oneFunctionName];
        return $this->_testSelection($selectedFunctions);
    }
    
    protected function _testSelection($selectedFunctions) {
        foreach ($selectedFunctions as $funcName=>$Function) {
            $this->testFunction($funcName, $Function);
        }
    }
    
    public function testFunction($funcName, $outputRaw=false) {
        if (!$this->functionExists($funcName)) {
            throw new PHPJS_Exception("Function $funcName does not exst");
            return false;
        }
        
        $Function = $this->getFunction($funcName);
        $testCode = $Function->testCode();
        $results  = $Function->runTestCode($testCode, $outputRaw);
        
        return $results; 
    }
}
?>