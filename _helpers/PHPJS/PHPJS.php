<?php

// Autoloader borrowed from PHP_CodeSniffer, see function for credits
spl_autoload_register(array("PHPJS", "autoload"));

Class PHPJS {
    public $Functions = false;
    public $Function  = false;
    
    private $_dir = false;
    
    /**
     * Enter description here...
     *
     * @param unknown_type $path
     */
    public function addFunction($path) {
        $obj = new PHPJS_Function($path, $this);
        //$obj->reload();
        $function = &$obj->getFunction();
        $this->Functions[$function] = &$obj;
    }
    
    public function getFunction($function) {
        if (!isset($this->Functions[$function])) {
            throw new PHPJS_Exception("Function: $function not found");
            return false;
        }
        
        $this->Function = $this->Functions[$function];
        return $this->Function; 
    }
    
    public function PHPJS($dir) {
        $this->_dir = $dir;
        $this->index();
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
        //$parent     = 'System_';
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
        ksort($this->Functions);
    }
}
?>