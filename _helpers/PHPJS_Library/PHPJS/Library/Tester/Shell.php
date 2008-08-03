<?php
Class PHPJS_Library_Tester_Shell extends PHPJS_Library_Tester {
    
    public function testFunction($funcName, $outputRaw=false) {
        // Proceed with parent
        parent::testFunction($funcName, $outputRaw);
    }
    
    public function getAllowedCmdArgs() {
        $posArgs = array();
        $posArgs["func"]     = "--func";
        $posArgs["from"]     = "--from";
        $posArgs["output"]   = "--output";
        $posArgs["testcode"] = "--testcode";
        $posArgs["verbose"]  = "-v";
        return $posArgs; 
    }
    
    public function parseCmdArgs($argv) {
        $posArgs = $this->getAllowedCmdArgs();
        
        $options = array();
        foreach($argv as $i=>$arg) {
            if (($option = array_search($arg, $posArgs)) !== false) {
                if (substr($arg, 0, 2) == "--") {
                    $options[$option] = $argv[$i+1];
                } else {
                    $options[$option] = true;
                }
            }
        }
        
        if (isset($argv[1]) && isset($this->Functions[$argv[1]])) {
            $options["func"] = $argv[1];
        }
        
        return $options;
    }

}
?>