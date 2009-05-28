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
        return ($flags & (int)$testFor)?true:false;
    }
    
    /**
     * Public interface to flag enabled
     *
     * @param integer $flags
     * @param integer $testFor
     * 
     * @return boolean
     */
    public function isFlagEnabled($flags, $testFor) {
        return $this->_flagIsEnabled($flags, $testFor);
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
    public function compile($flags = 0, $version = 'unknown', $breakOnError=false) {
        $selectedFunctions = $this->getSelection();


        $namespaced = ($this->_flagIsEnabled($flags, self::COMPILE_NAMESPACED));
        
        // Compile each function individually and store in $compiled array
        $compiled = array();
        foreach ($selectedFunctions as $funcName) {
            if (false === ($x = $this->compileFunction($funcName, $namespaced))) {
                $compiled[$funcName] = "\n // Failed to compile: ".$funcName."\n";
                if ($breakOnError) {
                    return false;
                    break;
                }
            } else {
                $compiled[$funcName] = $x;
            }
        }
        
        // Wrap it with namespaced-specific-code
        if ($namespaced) {
            $compiledTxt = implode(",\n", $compiled);
            $compiledTxt = $this->_namespace($compiledTxt);
        } else {
            $compiledTxt = implode("\n", $compiled);
        }
        
        // Compression? And how?
        if ($this->_flagIsEnabled($flags, self::COMPILE_MINFIED)) {
            $compiledTxt = PHPJS_Pack::pack('minified', $compiledTxt);
        } elseif ($this->_flagIsEnabled($flags, self::COMPILE_PACKED)) {
            $compiledTxt = PHPJS_Pack::pack('packed', $compiledTxt);
        }

        return $this->genLicense($version)."\n".$compiledTxt;
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
            throw new PHPJS_Exception("Function $funcName does not exist");
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
//        $str1  = "";
//        $str1 .= "// {{{ init: \n";
//        $str1 .= "init: function() {\n";
//        $str1 .= "    // Makes autoloading system works properly.\n";
//        $str1 .= "    // \n";
//        $str1 .= "    // %        note 1: Not a real PHP.JS function, necessary for namespaced version, though.\n";
//        $str1 .= "\n";
//        $str1 .= "},// }}}\n";
//        $str1 .= $source;
//
//        $str2  = "";
//        $str2 .= "if(window == this || !this.init){\n";
//        $str2 .= "    return new PHP_JS();\n";
//        $str2 .= "}else{\n";
//        $str2 .= "    return this.init();\n";
//        $str2 .= "}\n";
//
//        $str3  = "var PHP_JS = function() {\n";
//        $str3 .= $this->_indentBlock($str2, 4)."\n";
//        $str3 .= "};\n";
//        $str3 .= "";
//
//        $str4  = "";
//        $str4 .= "if(typeof(PHP_JS) == \"undefined\"){\n";
//        $str4 .= $this->_indentBlock($str3, 4)."\n";
//        $str4 .= "}\n";
//
//        $str4 .= "\n";
//        $str4 .= "var php_js = {};\n";
//        $str4 .= "PHP_JS.prototype = {\n";
//        $str4 .= $this->_indentBlock($str1, 4)."\n";
//        $str4 .= "}; // End PHP_JS prototype \n";
//        $str4 .= "\n";
//        $str4 .= "window.\$P = PHP_JS();\n";
//
//        $str5  = "";
//        $str5 .= "(function() {\n";
//        $str5 .= $this->_indentBlock($str4, 4)."\n";
//        $str5 .= "})();\n";
//
//        $source = $str5;
        
        $namespaceTemplate = dirname(__FILE__).'/Compiler/namespaced_template.js';
        
        if (!file_exists($namespaceTemplate)) {
            throw new PHPJS_Exception("namespaceTemplate ".$namespaceTemplate." does not exist");
            return false;
        }
        
        $source = file_get_contents($namespaceTemplate);
        $source = str_replace('//#FUNCTIONS_HERE#', $this->_indentBlock($source, 8), $source);
        $source = preg_replace('@// BEGIN REDUNDANT(.+)// END REDUNDANT@smU', '', $source);

        return $source;
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