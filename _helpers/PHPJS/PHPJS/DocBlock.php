<?php
Class PHPJS_DocBlock {
    
    public $examples = array();
    public $notes = array();
    public $dependencies = array();
    public $authors = array();

    public $config = array(
        "mapping"=>array(
            "-"=>"dependencies",
            "+"=>"authors",
            "%"=>"notes",
            "*"=>"examples",
        )
    );
    
    private $_docBlock = "";
        
    public function PHPJS_DocBlock($docBlock) {
        $this->_docBlock = implode("\n", $docBlock);
        $this->parseDocBlock();
    }
    
    public function parseDocBlock() {
        $mapping = $this->config["mapping"];
        $info    = array();
        
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
                    $this->examples[$r[2]][$r[1]][] = $r[3];
                } else {
                    $this->examples[$r[2]][$r[1]] = $r[3];
                }
            } elseif ($map == "authors" ) {
                preg_match('/[\s]*(\w+)([^:]*):[\s]*([^(]+)(.*)/', trim($matches[2][$k]), $r);
                $url = trim(str_replace(array('(', ')'), '', $r[4]));
                $this->authors[$r[1]][trim($r[3])] = $url;
            } elseif ($map == "dependencies" ) {
                $this->dependencies[] = str_replace("depends on: ", "", $matches[2][$k]);
            } elseif ($map == "notes" ) {
                $this->notes[] = $matches[2][$k];
            } else {
                // Store meaningful comment line
                throw new PHPJS_Exception("Unknown: $map");
                //$info[$map][] = $matches[2][$k];
            }
        }
        
        return $info;        
    }
}
?>