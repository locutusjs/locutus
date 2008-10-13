<?php
Class PHPJS_Library_Tester extends PHPJS_Library {
    /**
     * Returns test results of selected functions.
     *  
     * @param boolean $breakOnError
     * 
     * @return array
     */
    public function test($breakOnError=false) {
        $selectedFunctions = $this->getSelection();
        $testResults = array();
        foreach ($selectedFunctions as $funcName) {
            if (false === ($x = $this->testFunction($funcName, false))) {
                $testResults[$funcName] = $x;
                if ($breakOnError) {
                    break;
                }
            }
        }
        return $testResults;
    }
    
    /**
     * Tests one function, reroutes to Function object
     *
     * @param string  $funcName
     * @param boolean $outputRaw
     * 
     * @return array
     */
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