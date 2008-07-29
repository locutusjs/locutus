<?php
Class PHPJS_Library_Tester extends PHPJS_Library {
    
    
    
    
    public function execute($cmd) {
        exec($cmd, $o, $r);
        if ($r) {
            return false;
        }
        return true;
    }
    
}
?>