<?php
Class PHPJS_DocBlock {
    
    protected $_examples = array();
    protected $_notes = array();
    protected $_dependencies = array();
    protected $_authors = array();
    protected $_processed = 0;

    public $config = array(
        "mapping"=>array(
            "-"=>"dependencies",
            "+"=>"authors",
            "%"=>"notes",
            "*"=>"examples",
        )
    );
    
    protected $_docBlock = "";
        
    public function getExamples() {
        return $this->_examples;
    }

    public function getNotes() {
        return $this->_notes;
    }
    
    public function getAuthors() {
        return $this->_authors;
    }
    
    public function getDependencies() {
        return $this->_dependencies;
    }
    
    public function PHPJS_DocBlock($docBlock) {
        $this->_docBlock = implode("\n", str_replace("\r", "", $docBlock));
        $this->parseDocBlock();
    }
    
    public function parseDocBlock() {
        if ($this->_processed > 0) {
            return $this->_processed;
        }
        
        $mapping = $this->config["mapping"];
        
        // Match all meaningful comment lines
        preg_match_all('/^[\s]*\/\/[\s]*(['.preg_quote(implode('', array_keys($mapping))).'])[\s]*(.+)/m', 
            $this->_docBlock, 
            $matches);
        
        // Loop over meaningful comment lines
        foreach ($matches[1] as $k=>$match) {
            // Determine what kind of comment line this is
            $map = $mapping[$match];
            if ($map == "examples" ) {
                // Special hierarchy handling for multiple examples
                preg_match('/[\s]*(\w+) (\d+):[\s]*(.+)/', trim($matches[2][$k]), $r);
                if ($r[1] == "example") {
                    $this->_examples[$r[2]][$r[1]][] = $r[3];
                } else {
                    $this->_examples[$r[2]][$r[1]] = $r[3];
                }
            } elseif ($map == "authors" ) {
                preg_match('/[\s]*(\w+)([^:]*):[\s]*([^(]+)(.*)/', trim($matches[2][$k]), $r);
                $url = trim(str_replace(array('(', ')'), '', $r[4]));
                $this->_authors[$r[1]][trim($r[3])] = $url;
            } elseif ($map == "dependencies" ) {
                $this->_dependencies[] = str_replace("depends on: ", "", $matches[2][$k]);
            } elseif ($map == "notes" ) {
                $this->_notes[] = $matches[2][$k];
            } else {
                // Store meaningful comment line
                throw new PHPJS_Exception("Unknown: $map");
                //$info[$map][] = $matches[2][$k];
            }
        }
        
        $this->_processed++;
        return $this->_processed;        
    }
}
?>