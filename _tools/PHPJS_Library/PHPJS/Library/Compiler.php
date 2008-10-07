<?php
Class PHPJS_Library_Compiler extends PHPJS_Library {
    
    /**
     * Compile flag: Namespaced
     */
    const COMPILE_NAMESPACED = 1;    
    
    /**
     * Compile flag: Packed
     */
    const COMPILE_PACKED = 2;    
    
    /**
     * Compile flag: Minified
     */
    const COMPILE_MINFIED = 4;    
    
    
    
    protected function _flagIsEnabled($flags, $testFor) {
        return ($flags & $testFor > 0);
    }
    
    public function PHPJS_Library_Compiler($dirFunctions, $dirCompile) {
        parent::PHPJS_Library($dirFunctions);
    }
    
    
    
    public function compile($flags = 0, $breakOnError=false) {
        $selectedFunctions = $this->getSelection();
        $compiled = array();
        foreach ($selectedFunctions as $funcName) {
            if (false === ($x = $this->compileFunction($funcName, $flags))) {
                if ($breakOnError) {
                    return false;
                    break;
                }
            } else {
                $compiled[$funcName] = $x;
            }
        }

        
        $compiledTxt = implode("\n", $compiled);
        if ($this->_flagIsEnabled($flags, self::COMPILE_MINFIED)) {
            $compiledTxt = $this->_minify($compiledTxt);
        } elseif ($this->_flagIsEnabled($flags, self::COMPILE_PACKED)) {
            $compiledTxt = $this->_pack($compiledTxt);
        }
        
        return $compiled;
    }
        
    
    protected function _minify($source) {
        return "//MINIFIED\n".$source;
    }
    
    protected function _pack($source) {
        return "//PACKED\n".$source;
    }
    
    public function compileFunction($funcName, $namespaced=false) {
        if (($Function = $this->getFunction($funcName)) === false) {
            throw new PHPJS_Exception("Function $funcName does not exst");
            return false;
        }
        
        // Forward to Function Object 
        $results = $Function->compileFunction($namespaced);
        
        return $results; 
    }    
}
?>