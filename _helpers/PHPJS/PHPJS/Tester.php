<?php
Class PHPJS_Tester extends PHPJS {
    
    
    
    
    public function execute($cmd) {
        exec($cmd, $o, $r);
        if ($r) {
            return false;
        }
        return true;
    }
    
}
?>