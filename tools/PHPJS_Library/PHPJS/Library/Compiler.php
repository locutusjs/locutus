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
     * Compile flag: Namespaced
     */
    const COMPILE_COMMONJS = 8;

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
        $commonjs   = ($this->_flagIsEnabled($flags, self::COMPILE_COMMONJS));
        
        // Compile each function individually and store in $compiled array
        $compiled = array();
        foreach ($selectedFunctions as $funcName) {
            if (false === ($x = $this->compileFunction($funcName, $namespaced, $commonjs))) {
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
        if ($commonjs) {
            $compiledTxt = join("\n", $compiled);
            $compiledTxt = $this->_commonjs($compiledTxt);
        } elseif ($namespaced) {
            $compiledTxt = join(",\n", $compiled);
            $compiledTxt = $this->_namespace($compiledTxt);
        } else {
            $compiledTxt = join("\n", $compiled);
        }

        // Compression? And how?
        if ($this->_flagIsEnabled($flags, self::COMPILE_MINFIED)) {
            $compiledTxt = PHPJS_Pack::pack('minified', $compiledTxt);
        } elseif ($this->_flagIsEnabled($flags, self::COMPILE_PACKED)) {
            $compiledTxt = PHPJS_Pack::pack('packed', $compiledTxt);
        }
        
        // Hack to circumvent Jsmin 'bug':
        // http://phpjs.org/pages/home#comment_53169
        $compiledTxt = str_replace(']]>', ']] >', $compiledTxt);
        
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
    public function compileFunction($funcName, $namespaced = false, $commonjs = false) {
        if (($Function = $this->getFunction($funcName)) === false) {
            throw new PHPJS_Exception("Function $funcName does not exist");
            return false;
        }
        
        // Forward to Function Object 
        $results = $Function->compileFunction($namespaced, $commonjs);
        
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
        $namespaceTemplate = dirname(__FILE__).'/Compiler/namespaced_template.js';
        
        if (!file_exists($namespaceTemplate)) {
            throw new PHPJS_Exception("namespaceTemplate ".$namespaceTemplate." does not exist");
            return false;
        }
        
        $template = file_get_contents($namespaceTemplate);
        $source = str_replace('//#FUNCTIONS_HERE#', $this->_indentBlock($source, 8), $template);
        // $source = preg_replace('@// BEGIN REDUNDANT(.+)// END REDUNDANT@smU', '', $source); // Should not strip out until remove duplicates and auto-place single copies (or at least ensure copies are manually added there); also do for BEGIN/END STATIC

        return $source;
    }

    /**
     * Encloses muliple commonjs functions with a namespace wrapper
     *
     * @param string $source
     *
     * @return string
     */
    protected function _commonjs($source) {
        $commonjsTemplate = dirname(__FILE__).'/Compiler/commonjs_template.js';

        if (!file_exists($commonjsTemplate)) {
            throw new PHPJS_Exception("commonjsTemplate ".$commonjsTemplate." does not exist");
            return false;
        }

        $template = file_get_contents($commonjsTemplate);
        $source = str_replace('//#FUNCTIONS_HERE#', $source, $template);
        // $source = preg_replace('@// BEGIN REDUNDANT(.+)// END REDUNDANT@smU', '', $source); // Should not strip out until remove duplicates and auto-place single copies (or at least ensure copies are manually added there); also do for BEGIN/END STATIC

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
        $lines     = explode("\n", $tmp_block);
        $indent    = str_repeat(" ", $indentation);
        foreach($lines as $k=>$line){
            $lines[$k] = $indent . $line;
        }
        return join("\n", $lines);
    }    
}