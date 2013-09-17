<?php
Class PHPJS_Function extends SplFileInfo {
    public $PHPJS_Library;
    public $DocBlock = false;
    public $functionLookup = array();
    
    protected $_categoryName = "";
    protected $_functionName = "";
    
    protected $_source = "";
    protected $_docBlock = "";
    protected $_code = "";

    protected $_t = "    ";
    protected $_n = "\n";
    
    protected $_tokWrapHead = array();
    protected $_tokWrapTail = array();
    protected $_tokDocBlock = array();
    protected $_tokRealCode = array();
    
    
    
    protected function _setSource($source) {
        $this->_source = trim($source);
    }
    
    protected function _setCategoryName($categoryName) {
        $this->_categoryName = $categoryName;
    }
    
    protected function _setFunctionName($functionName) {
        $this->_functionName = $functionName;
    }
    
    /**
     * Trims an array
     *
     * @param array $array
     * 
     * @return array
     */
    protected function _array_trim($array) {
        while (strlen(reset($array)) === 0) {
            array_shift($array);
        }
        while (strlen(end($array)) === 0) {
            array_pop($array);
        }
        return $array;
    }     
    
    /**
     * Converts filepath to PHPJS function name
     *
     * @param string $file
     * 
     * @return string
     */
    protected function _file2function($file) {
        return basename($file, ".js");    
    }
    
    /**
     * Converts filepath to PHPJS category name
     *
     * @param string $file
     * 
     * @return string
     */
    protected function _file2category($file) {
        $parts = explode("/", $file);
        array_pop($parts);
        return array_pop($parts);
    }

    /**
     * Determines wether a line is a comment or not
     *
     * @param string $line
     * 
     * @return boolean
     */
    protected function _isLineComment($line) {
        return preg_match('/^[\s]*(\/\/|\/\*|\#|\*)/', $line);
    }
    
    /**
     * Splits function source into: docblock, wrappers, realcode
     * and saves these in protected variables
     *
     * @return boolean
     */
    protected function _tokenizeSource() {
        $recDocBlock = -1;
        
        $this->_tokDocBlock = array();
        $this->_tokWrappers = array();
        $this->_tokRealCode = array();
        
        $src_lines = explode("\n", $this->getSource());
        $src_count = count($src_lines);
        foreach ($src_lines as $i=>$src_line) {
            // Flag begin docBlock 
            if ($this->_isLineComment($src_line) && $recDocBlock == -1) {
                $recDocBlock = 1;
            }
            // Flag end docBlock
            if (!$this->_isLineComment($src_line) && $recDocBlock == 1) {
                $recDocBlock = 2;
            }
            
            if ($recDocBlock == 1) {
                // Record docBlock
                $this->_tokDocBlock[] = $src_line;
            } elseif (!$this->_isLineComment($src_line) && $recDocBlock == -1) {
                // Record begin Wrapper 
                $this->_tokWrapHead[] = $src_line;
            } elseif ($src_count == ($i+1)) {
                // Record end Wrapper
                $this->_tokWrapTail[] = $src_line;
            } else {
                // Record real code
                $this->_tokRealCode[] = $src_line;
            }
        }
        
        $this->_tokRealCode = $this->_array_trim($this->_tokRealCode);
        
        return true;
    }    
    
    
    
    /**
     * Constructor
     *
     * @param string $file
     * @param object &$PHPJS
     */
    public function PHPJS_Function($file, &$PHPJS_Library){
        // Call Parent SplFileInfo constructor
        parent::__construct($file);
        
        // Reference to mother object
        $this->PHPJS_Library = &$PHPJS_Library;
        
        // Initialize object
        $this->reload();
    }
        
    /**
     * (Re-)Initialize
     *
     * @return boolean
     */
    public function reload() {
        $this->_setSource(file_get_contents($this->getRealPath()));
        $this->_setCategoryName($this->_file2category($this->getRealPath()));
        $this->_setFunctionName($this->_file2function($this->getRealPath()));
        
        $this->_tokenizeSource();
        
        $this->DocBlock = new PHPJS_DocBlock($this->_tokDocBlock);
        return true;
    }
    
    /**
     * Recursively get dependencies
     *
     * @param boolean $recurse
     * 
     * @return array
     */
    public function getDependencies($recurse=true) {
        // Own deps
        $list = $this->DocBlock->getDependencies();
        
        // Recurse
        if ($recurse) {
            if (count($list)) {
                foreach($list as $functionName) {
                    $Function = &$this->PHPJS_Library->getFunction($functionName);
                    
                    if (!is_object($Function)) {
                        throw new PHPJS_Exception("No Function object for '".$functionName."' in relation to: '".$this->getFunctionName()."'.");
                        //$dbg = debug_backtrace();
                        //print_r($dbg);
                    } else {
                        $list = array_merge($Function->getDependencies(true), $list);
                    }
                }
            }
        }
        
        return $list;
    }
    
    public function log($str, $level=PHPJS_Library::LOG_INFO) {
        return PHPJS_Library::log($str, $level);
    }    
    
    public function getDocBlock() {
        return $this->_tokDocBlock;
    }

    public function getRealCode() {
        return $this->_tokRealCode;
    }

    public function getWrapHead() {
        return $this->_tokWrapHead;
    }
    
    public function getWrapTail() {
        return $this->_tokWrapTail;
    }
    
    public function getSource() {
        return $this->_source;
    }

    public function getCategoryName() {
        return $this->_categoryName;
    }
    
    public function getPHPFunctionDescription() {
        $name = $this->getFunctionName();
        
        if (isset($this->PHPJS_Library->phpFunctionsSummary[$name])) {
            return $this->PHPJS_Library->phpFunctionsSummary[$name]["description"];
        } else {
            return "!No description available for ".$name.". @php.js developers: Please update the function summary text file.";
        }
    }
    
    public function getUrl() {
        $name = $this->getFunctionName();
        return PHPJS_Library::PROJECT_FUNCTION_URL.$name;
    }
    
    public function getFunctionName() {
        return $this->_functionName;
    }
    
    public function getVersion() {
        $stamp = $this->getMTime();; 
        return intval(date("y",$stamp)).date("m.jH", $stamp);
    }
}