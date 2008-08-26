<?php
Class PHPJS_Library_Tester extends PHPJS_Library {
    
    protected $_fleRealRhino = "/usr/bin/rhino";
    
    public function getFleRealRhino() {
        return $this->_fleRealRhino;
    }
    
    public function testAll($breakOnError=false) {
        $selectedFunctions = array();
        $selectedFunctions = &$this->Functions;
        return $this->_testSelection($selectedFunctions, $breakOnError);
    }
    
    public function testFrom($fromFunctionName, $breakOnError=false) {
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
        return $this->_testSelection($selectedFunctions, $breakOnError);
    }

    protected function _testSelection($selectedFunctions, $breakOnError=false) {
        $testResults = array();
        foreach ($selectedFunctions as $funcName=>$Function) {
            if (($x = $this->testFunction($funcName, false)) === false) {
                $testResults[$funcName] = $x;
                if ($breakOnError) {
                    break;
                }
            }
        }
        return $testResults;
    }
    
    public function testFunction($funcName, $outputRaw=false) {
        if (($Function = $this->getFunction($funcName)) === false) {
            throw new PHPJS_Exception("Function $funcName does not exst");
            return false;
        }
        
        // Forward to Function Object 
        $results = $Function->testFunction($outputRaw);
        
        return $results; 
    }
}
?>