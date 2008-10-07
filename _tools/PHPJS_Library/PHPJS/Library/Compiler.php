<?php
Class PHPJS_Library_Compiler extends PHPJS_Library {
    
    public function PHPJS_Library_Compiler($dirFunctions, $dirCompile) {
        parent::PHPJS_Library($dirFunctions);
    }
    
    public function compileAll($breakOnError=false) {
        $selectedFunctions = array();
        $selectedFunctions = &$this->Functions;
        return $this->_compileSelection($selectedFunctions, $breakOnError);
    }
    
    protected function _compileSelection($selectedFunctions, $breakOnError=false) {
        $compileResults = array();
        foreach ($selectedFunctions as $funcName=>$Function) {
            if (($x = $this->compileFunction($funcName, false)) === false) {
                $compileResults[$funcName] = $x;
                if ($breakOnError) {
                    break;
                }
            }
        }
        return $compileResults;
    }

    public function compileFunction($funcName, $outputRaw=false) {
        if (($Function = $this->getFunction($funcName)) === false) {
            throw new PHPJS_Exception("Function $funcName does not exst");
            return false;
        }
        
        // Forward to Function Object 
        $results = $Function->compileFunction($outputRaw);
        
        return $results; 
    }    
    
    public function compress ($source, $method) {
        
    }    
}
?>