<?php

// Autoloader borrowed from PHP_CodeSniffer, see function for credits
spl_autoload_register(array("PHPJS_Library", "autoload"));

Class PHPJS_Library {


    /**
     * System is unusable
     */
    const LOG_EMERG = 0;
    
    /**
     * Immediate action required
     */ 
    const LOG_ALERT = 1;
    
    /**
     * Critical conditions
     */
    const LOG_CRIT = 2;
    
    /**
     * Error conditions
     */
    const LOG_ERR = 3;
    
    /**
     * Warning conditions
     */
    const LOG_WARNING = 4;
    
    /**
     * Normal but significant
     */
    const LOG_NOTICE = 5;
    
    /**
     * Informational
     */
    const LOG_INFO = 6;
    
    /**
     * Debug-level fixMessages
     */
    const LOG_DEBUG = 7;
        
    
    public $Functions = false;
    public $Function  = false;
    
    //protected $_functionClass = "PHPJS_Function";
    
    protected $_dirRealFunc = false;
    protected $_dirRealRoot = false;
    protected $_dirRealTemp = false;
    
    protected $_dir = false;
    
    
    public function getDirRealTemp() {
        return $this->_dirRealTemp;
    }
    
    public function getDirRealRoot() {
        return $this->_dirRealRoot;
    }
    
    /**
     * Adds a function from filesystem to the PHPJS library
     *
     * @param string $path
     */
    public function addFunction($path) {
        
        $className = str_replace("Library", "Function", get_class($this));
        $obj = new $className($path, &$this);
        
        //$obj->reload();
        $funcName = &$obj->getFunctionName();
        $this->Functions[$funcName] = &$obj;
    }
    
    public function functionExists($funcName) {
        return isset($this->Functions[$funcName]);
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
    public function PHPJS_Library($dirRealFunctions="") {

        if (!$this->_dirRealFunc) {
            if (!$dirRealFunctions) {
                $this->_dirRealFunc = realpath(dirname(__FILE__)."/../..")."/functions";
            } else {
                $this->_dirRealFunc = $dirRealFunctions;
            }
        }
        
        if (!$this->_dirRealRoot) {
            $this->_dirRealRoot = realpath($this->_dirRealFunc."/..");
        }
        if (!$this->_dirRealTemp) {
            $this->_dirRealTemp = $this->_dirRealRoot."/_helpers/_temp";
        }
        
        foreach (array($this->_dirRealFunc, $this->_dirRealRoot, $this->_dirRealTemp) as $dir) {
            if (!is_dir($dir)) {
                $this->_log("Directory not accessible: ".$this->_dirRealTemp, PHPJS_Library::LOG_EMERG);
                return false;
            }
        }
        
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
        
        if (!$this->index($this->_dirRealFunc)) {
            throw new PHPJS_Exception("Could not index at ".$this->_dir);
        }
        
        ksort($this->Functions);
        return true;
    }

    
    /**
     * Logs messages. Anything from and above LOG_CRIT will kill the app. 
     *
     * @param string  $str
     * @param integer $level
     */
    private function _log($str, $level=PHPJS_Library::LOG_INFO) {
        echo $str."\n";
        if ($level <= self::LOG_CRIT) {
            die();
        }
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
        if ($dir === false) $dir = $this->_dirRealFunc;            
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
    
        
    /**
     * Takes first part of a string based on the delimiter.
     * Returns that part, and mutates the original string to contain
     * the reconcatenated remains 
     *
     * @param string $delimiter
     * @param string &$string
     * 
     * @return string
     */
    public function strShift($delimiter, &$string)
    {
        // Explode into parts
        $parts  = explode($delimiter, $string);
        
        // Shift first
        $first  = array_shift($parts);
        
        // Glue back together, overwrite string by reference
        $string = implode($delimiter, $parts);
        
        // Return first part
        return $first;
    }    
}
?>