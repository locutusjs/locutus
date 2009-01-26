<?php
class PHPJS_Exception extends Exception {
    function render() {
        $a = func_get_args();
        print_r($a);
        print_r($this->getMessage());
        print_r($this->getFile());
        print_r($this->getLine());
        var_dump($this);
    }
}
?>