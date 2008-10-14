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
    
    
    
    /**
     * Tests if a specified flag is given
     *
     * @param integer $flags
     * @param integer $testFor
     * 
     * @return boolean
     */
    protected function _flagIsEnabled($flags, $testFor) {
        return ($flags & $testFor > 0);
    }
    
    /**
     * Constructor
     *
     * @param string $dirFunctions Functions directory
     * @param string $dirCompile   Output directory
     * 
     * @return PHPJS_Library_Compiler
     */
    public function PHPJS_Library_Compiler($dirFunctions, $dirCompile=false) {
        parent::PHPJS_Library($dirFunctions);
    }
    
    /**
     * Returns a compilation of selected functions. Filtered according to the 
     * combination of flags given.
     *
     * @param integer $flags
     * @param boolean $breakOnError
     * 
     * @return string
     */
    public function compile($flags = 0, $breakOnError=false) {
        $selectedFunctions = $this->getSelection();
        
        $namespaced = ($this->_flagIsEnabled($flags, self::COMPILE_NAMESPACED));
        
        // Compile each function individually and store in $compiled array
        $compiled = array();
        foreach ($selectedFunctions as $funcName) {
            if (false === ($x = $this->compileFunction($funcName, $namespaced))) {
                if ($breakOnError) {
                    return false;
                    break;
                }
            } else {
                $compiled[$funcName] = $x;
            }
        }

        
        $compiledTxt = implode("\n", $compiled);
        
        // Wrap it with namespaced-specific-code
        if ($namespaced) {
            $compiledTxt = $this->_namespace($compiledTxt);
        }
        
        // Compression? And how?
        if ($this->_flagIsEnabled($flags, self::COMPILE_MINFIED)) {
            $compiledTxt = $this->_minify($compiledTxt);
        } elseif ($this->_flagIsEnabled($flags, self::COMPILE_PACKED)) {
            $compiledTxt = $this->_pack($compiledTxt);
        }
        
        return $compiledTxt;
    }
    
    /**
     * Compiles one function, reroutes to Function object
     *
     * @param string $funcName
     * @param boolean $namespaced
     * 
     * @return string
     */
    public function compileFunction($funcName, $namespaced = false) {
        if (($Function = $this->getFunction($funcName)) === false) {
            throw new PHPJS_Exception("Function $funcName does not exst");
            return false;
        }
        
        // Forward to Function Object 
        $results = $Function->compileFunction($namespaced);
        
        return $results; 
    }
    
    /**
     * Encloses muliple namespaced functions with a namespace wrapper
     *
     * @param string $source
     * 
     * @return string
     */
    protected function _namespace($source) {
        $str1  = "";
        $str1 .= "// {{{ init: \n";
        $str1 .= "init: function() {\n";
        $str1 .= "    // Makes autoloading system works properly.\n";
        $str1 .= "    // \n";
        $str1 .= "    // %        note 1: Not a real PHP.JS function, necessary for namespaced version, though.\n";
        $str1 .= "\n";
        $str1 .= "},// }}}\n";
        $str1 .= $source;

        $str2  = "";
        $str2 .= "if(window == this || !this.init){\n";
        $str2 .= "    return new PHP_JS();\n";
        $str2 .= "}else{\n";
        $str2 .= "    return this.init();\n";
        $str2 .= "}\n";

        $str3  = "var PHP_JS = function() {\n";
        $str3 .= $this->_indentBlock($str2, 4)."\n";
        $str3 .= "};\n";
        $str3 .= "";

        $str4  = "";
        $str4 .= "if(typeof(PHP_JS) == \"undefined\"){\n";
        $str4 .= $this->_indentBlock($str3, 4)."\n";
        $str4 .= "}\n";

        $str4 .= "\n";
        $str4 .= "PHP_JS.prototype = {\n";
        $str4 .= $this->_indentBlock($str1, 4)."\n";
        $str4 .= "}; // End PHP_JS prototype \n";
        $str4 .= "\n";
        $str4 .= "window.\$P = PHP_JS();\n";

        $str5  = "";
        $str5 .= "(function() {\n";
        $str5 .= $this->_indentBlock($str4, 4)."\n";
        $str5 .= "})();\n";

        $source = $str5;
                
        return "//NAMESPACED\n".$source;
        
    }
    
    /**
     * Compresses a string using the jsmin technology
     *
     * @param string $source
     * 
     * @return string
     */
    protected function _minify($source) {
        return "//MINIFIED\n".$source;
    }
    
    /**
     * Compresses a string using the packer technology
     *
     * @param string $source
     * 
     * @return string
     */
    protected function _pack($source) {
        return "//PACKED\n".$source;
    }
    
    /**
     * Indent a block of code
     *
     * @param string  $block
     * @param integer $indentation
     * 
     * @return string
     */
    protected function _indentBlock ($block, $indentation=4) {
        $tmp_block = trim($block);
        $tmp_block = str_replace("\r", "", $tmp_block);
        $tmp_block = str_replace("\t", "    ", $tmp_block);
        $lines = explode("\n", $tmp_block);
        foreach($lines as $k=>$line){
            $lines[$k] = str_repeat(" ", $indentation). $line;
        }
        return implode("\n", $lines);
    }    
}
?>