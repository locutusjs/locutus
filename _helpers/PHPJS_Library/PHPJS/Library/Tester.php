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
    
    public function testFunction($funcName, $Function, $outputRaw=false) {
        // Add dependencies to Includes
        $depsRec = $Function->getDependencies(true);
        $depsSng = $Function->getDependencies(false);
        
        foreach ($depsRec as $funcName) {
            $path = $this->Functions[$funcName]->getPath();
            $depType = (!in_array($funcName, $depsSng) ? "direct" : "recursive");
            $Function->addInclude($path, "Dependency (".$depType."): ".$funcName);
        }
            
        $testCode = $Function->testCode();
        $results  = $Function->runTestCode($testCode, $outputRaw);
        
        return $results; 
    }
}
?>