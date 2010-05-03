<?php
function printFunc($what, $dif) {
    $r = realpath(dirname(__FILE__)."/..");
    
    echo pad(str_replace($r, "", $what["file"]), 25);
    echo pad($what["line"]);
    echo pad($what["function"]."(".implode(", ", $what["args"]).") ");
    echo pad(round($dif, 3)."s", 5);
    echo "\n";
}

function pad($str, $spaces=25) {
    return str_pad($str, $spaces, " ", STR_PAD_RIGHT)." ";
}

function mark() {
    return null;
    global $lastMarkAt;

    
        
    if (!$lastMarkAt) $lastMarkAt = microtime(true);
    $dif = microtime(true) - $lastMarkAt;
    
    $x = debug_backtrace();
    $one = array_shift($x);
    $two = array_shift($x);
    $three = array_shift($x);
    
    printFunc($two, $dif);
    
    $lastMarkAt = microtime(true);
}

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
        
    
    const PROJECT_URL = "http://phpjs.org";
    const PROJECT_FUNCTION_URL = "http://phpjs.org/functions/";
    
    
    public $phpFunctionsSummary = array();
    
    public $Functions = false;
    public $Function  = false;
    
    protected $_selection = array();
    
    //protected $_functionClass = "PHPJS_Function";
    
    protected $_dirRealFunc = false;
    protected $_dirRealRoot = false;
    protected $_dirRealTemp = false;
    protected $_dirRealTool = false;
    
    protected $_dir = false;
    
    public function getDirRealTemp() {
        return $this->_dirRealTemp;
    }
    public function getDirRealRoot() {
        return $this->_dirRealRoot;
    }
    
    public function addToSelection($functionNames = array()) {
        $addSelection = array();
        
        if (!is_array($functionNames)) {
            $functionNames = array($functionNames);
        }
        
        foreach($functionNames as $functionName) {
            if ($functionName == 'all') {
                // Special keywords
                foreach ($this->Functions as $funcName=>$Function) {
                    $addSelection[] = $funcName;
                }
            } else {
                // Other
                $type = false;
                $name = false;
                if (strpos($functionName, "::") !== false) {
                    list($type, $name) = explode("::", $functionName);
                }
                
                if ($type == "function" || $type === false) {
                    $addSelection[] = $name;
                } elseif (strtolower($type) == "from") {
                    $record = false;
                    foreach ($this->Functions as $funcName=>$Function) {
                        if ($record == false && $name == $funcName) {
                            $record = true;
                        }
                        if ($record == true) {
                            $addSelection[] = $funcName;
                        }
                    }
                } elseif (strtolower($type) == "category") {
                    foreach ($this->Functions as $funcName=>$Function) {
                        if ($name == $Function->getCategoryName()) {
                            $addSelection[] = $funcName;
                        }
                    }
                }
            }
        }
        
        $this->_selection = array_merge($this->_selection, $addSelection);
        return true;
    }
    public function setSelection($functionNames = array()) {
        $this->clearSelection();
        return $this->addToSelection($functionNames);
    }
    public function clearSelection() {
        $this->_selection = array();
        return true;
    }
    public function getSelection() {
        return $this->_selection;
    }
    
    public function getAuthors($options = false) {
        if (!$options) $options = array();
        if (!isset($options["fullblown"])) $options["fullblown"] = false;
        if (!isset($options["sortby"])) $options["sortby"] = "cntContribs";
        if (!isset($options["order"])) $options["order"] = "DESC";
        if (!isset($options["use_selection"])) $options["use_selection"] = false; 
        
        $doFunctions = array();
        if ($options["use_selection"]) {
            $doFunctions = $this->_selection;
        } else {
            // All
            foreach ($this->Functions as $funcName=>$Function) {
                $doFunctions[] = $funcName;
            }
        }
        
        $authors = array();
        foreach ($doFunctions as $funcName) {
            $Function = $this->getFunction($funcName);
            $funcTypeAuthors = $Function->DocBlock->getAuthors();
            foreach ($funcTypeAuthors as $type=>$funcAuthors) {
                foreach($funcAuthors as $authorName => &$authorLink) {
                    trim($authorLink);
                    $authorSave = $authorName;
                    if ($authorLink) {
                        $authorSave .= " (".$authorLink.")";
                    }
                    if ($options["fullblown"]) {
                        if (!isset($authors[$authorSave][$funcName][$type])) {
                            $authors[$authorSave][$funcName][$type] = 0;
                        }
                        $authors[$authorSave][$funcName][$type]++;
                    } else {
                        if (!isset($authors[$authorSave])) {
                            $authors[$authorSave] = 0;
                        }
                        $authors[$authorSave]++;
                    }
                }
            }
        }
        
        if ($options["sortby"] == "cntContribs") {
            natsort($authors);
        } elseif ($options["sortby"] == "authorName") {
            ksort($authors);
        }
        
        if ($options["order"] == "DESC") {
            $authors = array_reverse($authors);
        }
        
        return $authors;
    }
    
    public function genLicense($version) {
        $authorContribs = $this->getAuthors();
        $authors        = array();
        foreach ($authorContribs as $authorNameLink => $cntContrib) {
            $authors[] = $authorNameLink;
        }
        
        $url        = self::PROJECT_URL;
        $authorsTxt = wordwrap("Portions copyright ".implode(", ", $authors), 75, "\n * ", false);
        
        // Copyright Banner
        $copyright  = "";
        $copyright .= "/* \n";
        $copyright .= " * More info at: %s\n";
        $copyright .= " * \n";
        $copyright .= " * This is version: %s\n";
        $copyright .= " * php.js is copyright ".date('Y')." Kevin van Zonneveld.\n";
        $copyright .= " * \n";
        $copyright .= " * %s\n";
        $copyright .= " * \n";
        $copyright .= " * Dual licensed under the MIT (MIT-LICENSE.txt)\n";
        $copyright .= " * and GPL (GPL-LICENSE.txt) licenses.\n";
        $copyright .= " * \n";
        $copyright .= " * Permission is hereby granted, free of charge, to any person obtaining a\n";
        $copyright .= " * copy of this software and associated documentation files (the\n";
        $copyright .= " * \"Software\"), to deal in the Software without restriction, including\n";
        $copyright .= " * without limitation the rights to use, copy, modify, merge, publish,\n";
        $copyright .= " * distribute, sublicense, and/or sell copies of the Software, and to\n";
        $copyright .= " * permit persons to whom the Software is furnished to do so, subject to\n";
        $copyright .= " * the following conditions:\n";
        $copyright .= " * \n";
        $copyright .= " * The above copyright notice and this permission notice shall be included\n";
        $copyright .= " * in all copies or substantial portions of the Software.\n";
        $copyright .= " * \n";
        $copyright .= " * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n";
        $copyright .= " * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n";
        $copyright .= " * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\n";
        $copyright .= " * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES\n";
        $copyright .= " * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\n";
        $copyright .= " * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n";
        $copyright .= " * OTHER DEALINGS IN THE SOFTWARE.\n";
        $copyright .= " */ \n";
        $copyright .= "\n";
        
        return sprintf($copyright, $url, $version, $authorsTxt);
    }
    
    /**
     * Adds a function from filesystem to the PHPJS library
     *
     * @param string $path
     */
    public function addFunction($path) {
        
        $className = str_replace("Library", "Function", get_class($this));
        $Function = new $className($path, $this);
        
        //$obj->reload();
        $funcName = $Function->getFunctionName();
        $this->Functions[$funcName] = $Function;
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
        if (!$this->functionExists($function)) {
            $this->Function = false;
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
            $testPath = $this->_dirRealFunc;
            $found    = false;
            for ($i = 0; $i < 6; $i++) {
                $testPath = realpath($testPath."/..");
                if (file_exists($testPath."/functions")) {
                    // Found
                    $found = true;
                    break;
                }
            }
            if (false === $found) {
                $this->log("dirRealRoot could not be established. no php.js detected in any level above dirRealFunc");
                return false;
            }
            
            $this->_dirRealRoot = $testPath;
        }

        if (!$this->_dirRealTool) {
            $this->_dirRealTool = $this->_dirRealRoot."/_tools";
        }
        
        if (!$this->_dirRealTemp) {
            $this->_dirRealTemp = $this->_dirRealTool."/_temp";
        }
        
        ini_set('memory_limit','256M');
        set_time_limit(0);
        
        foreach (array($this->_dirRealFunc, $this->_dirRealRoot, $this->_dirRealTemp, $this->_dirRealTool) as $dir) {
            if (!is_dir($dir)) {
                $this->log("Directory not accessible: ".$this->_dirRealTemp, PHPJS_Library::LOG_EMERG);
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
        
        $path = str_replace('_', '/', $className).'.php';

        $paths = array();
        $paths[] = realpath(dirname(__FILE__).'/../'.$path);
        $paths[] = realpath(dirname(__FILE__).'/'.$path);
        
        $found = false;
        foreach ($paths as $ipath) {
            if (is_file($ipath)) {
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            throw new PHPJS_Exception("Class: ".$className." could not be autoloaded");
            return false;
        }
        
        include $ipath;
        return true;
    }//end autoload()
        
    
    /**
     * (Re-)Initialize
     *
     * @return boolean
     */
    public function reload() {
        
        if (!$this->index($this->_dirRealFunc)) {
            throw new PHPJS_Exception("Could not index at ".$this->_dir);
            return false;
        }
        
        $this->phpFunctionsSummary = $this->readFuncSummary();
        
        ksort($this->Functions);
        return true;
    }

    
    /**
     * Logs messages. Anything from and above LOG_CRIT will kill the app. 
     *
     * @param string  $str
     * @param integer $level
     */
    public function log($str, $level=PHPJS_Library::LOG_INFO) {
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
    public function index ($dir = null) {
        if ($dir === null) $dir = $this->_dirRealFunc;
        if ($dir === false) return false;
        if (!is_dir($dir)) return false;
        
        $it = new RecursiveDirectoryIterator($dir);
        foreach (glob($dir.'/*') as $filename){
            $path = $filename;

            if (is_dir($path)) {
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
    
    public function readFuncSummary($filePathRaw=false) {
        if ($filePathRaw === false) {
            $filePathRaw = $this->_dirRealTool."/funcsummary.txt";
        }
        
        if (!file_exists($filePathRaw)) {
            throw new PHPJS_Exception("Could find file: ".$filePathRaw);
            return false;
        }
        
        $filePathSerialized = str_replace(".txt", ".serialized.txt", $filePathRaw);
        
        // Caching of serialized function summary
        if (!file_exists($filePathSerialized)) {
            if (false === ($arr = $this->_readRawFuncSummary($filePathRaw))) {
                throw new PHPJS_Exception("Could read raw summary file: ".$filePathRaw);
                return false;
            }
            
            if (false === file_put_contents($filePathSerialized, serialize($arr))) {
                throw new PHPJS_Exception("Could write serialized summary file: ".$filePathSerialized);
                return false;
            }
            
            return $arr;
        }
        
        $buf = file_get_contents($filePathSerialized);
        $arr = unserialize($buf);
        
        return $arr;
    }
    
    protected function _readRawFuncSummary($filePathRaw=false) {
        if (false === ($buf = file_get_contents($filePathRaw))) {
            throw new PHPJS_Exception("Could open file: ".$filePathRaw);
            return false;
        }
        
        if (false === preg_match_all('/^([a-z_]+) ([^\(]+)\(([^\)]+)\).*$\s+?(.+)$/isUm', $buf, $m)) {
            throw new PHPJS_Exception("Could match any function summary from file: ".$filePathRaw);
            return false;
        }
        
        unset($m[0]);
        
        $functions = array();
        foreach ($m[1] as $i=>$type) {
            $functionName = $m[2][$i];
            $argumentsTxt = $m[3][$i];
            $description  = $m[4][$i];
            
            $argumentsTxtNew = $argumentsTxt;//str_replace(" [", "", $argumentsTxt);
            $parts = explode(", ", $argumentsTxtNew);
            $arguments = array();
            foreach ($parts as $part) {
                $required = true;
                if (substr($part, -1) == "]") {
                    $part = substr($part, 0, strlen($part) -1);
                    $required = false;
                } elseif (substr($part, 1) == "[") {
                    $part = substr($part, 1, strlen($part));
                    $required = false;
                } 
                
                $part = trim(str_replace(array("[", "]"), "", $part));
                $part = trim(str_replace(" | ", "|", $part));
                
                $parts2 = explode(" ", $part);
                if (count($parts2) != 2 ) {
                    //throw new PHPJS_Exception("Function: '".$functionName."' Part: '".$part."' does not contain two elements");
                    //return false;
                }
                $type = $parts2[0];
                $var  = $parts2[1];
                
                $arguments[$var] = compact('required', 'type');
            }
            
            
            $functions[$functionName] = compact('arguments', 'description');
        }
        
        
        return $functions;
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