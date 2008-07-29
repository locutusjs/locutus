<?php

// Autoloader borrowed from PHP_CodeSniffer, see function for credits
spl_autoload_register(array("PHPJS_Library", "autoload"));

Class PHPJS_Library {
    public $Functions = false;
    public $Function  = false;
    
    private $_dir = false;
    
    /**
     * Adds a function from filesystem to the PHPJS library
     *
     * @param string $path
     */
    public function addFunction($path) {
        $obj = new PHPJS_Function($path, $this);
        //$obj->reload();
        $function_name = &$obj->getFunctionName();
        $this->Functions[$function_name] = &$obj;
    }
    
    /**
     * Sets & returns a function for active use
     *
     * @param string $function
     * 
     * @return Object
     */
    public function getFunction($function) {
        if (!isset($this->Functions[$function])) {
            throw new PHPJS_Exception("Function: $function not found");
            return false;
        }
        
        $this->Function = $this->Functions[$function];
        return $this->Function; 
    }
    
    /**
     * Constructor
     *
     * @param unknown_type $dir
     * @return PHPJS
     */
    public function PHPJS($dir) {
        $this->_dir = $dir;
        $this->reload();
    }
    
    
    /**
     * Autoload static method for loading classes and interfaces.
     * Code from the PHP_CodeSniffer package by Greg Sherwood and 
     * Marc McIntyre
     *
     * @param string $className The name of the class or interface.
     *
     * @return void
     */
    static public function autoload($className)
    {
        $parent     = 'PHPJS_Library';
        $parent     = '';
        $parent_len = strlen($parent);
        if (substr($className, 0, $parent_len) == $parent) {
            $newClassName = substr($className, $parent_len);
        } else {
            $newClassName = $className;
        }

        $path = str_replace('_', '/', $newClassName).'.php';

        if (is_file(dirname(__FILE__).'/'.$path) === true) {
            // Check standard file locations based on class name.
            include dirname(__FILE__).'/'.$path;
        } else {
            // Everything else.
            @include $path;
        }

    }//end autoload()
        
    
    /**
     * (Re-)Initialize
     *
     * @return boolean
     */
    public function reload() {
        
        
        if (!$this->index($this->_dir)) {
            throw new PHPJS_Exception("Could not index at ".$this->_dir);
        }
        
        print_r($this->Functions);
        
        ksort($this->Functions);
        return true;
    }
    
    /**
     * Scans filesystem recursively and adds functions to the
     * library 
     *
     * @param string $dir Defaults to $this->dir as specified by Class constructor
     * 
     * @return boolean
     */
    public function index($dir=false) {
        if ($dir === false) $dir = $this->_dir;            
        if (!is_dir($dir)) return false;

        $it = new RecursiveDirectoryIterator($dir);
        foreach($it as $splFile){
            $path = $splFile->getRealPath();
            if ($splFile->isDir()) {
                // Recurse
                $this->index($path);
            } else {
                // Just add
                if (substr($path,-3) == ".js") {
                    $this->addFunction($path);
                }
            }
        }
        
        return true;
    }
}
?>