<?php
Class PHPJS_Function_Compiler extends PHPJS_Function {
    public function compileFunction($namespaced=false) {
        
        $head = implode("\n", $this->getWrapHead());
        $docb = implode("\n", $this->getDocBlock());
        $real = implode("\n", $this->getRealCode());
        $tail = implode("\n", $this->getWrapTail());
        
        $name = $this->getFunctionName();
        $desc = $this->getPHPFunctionDescription();
        $vers = $this->getVersion();
        $furl = $this->getUrl();
        
        if (!$namespaced) {
            
        } else {
            $dependencies = $this->DocBlock->getDependencies();
            
            // Convert function declarations & examples to namespaced variants
            $head = preg_replace('/(function\s*([a-z][a-z0-9_]*))/s', '$2: function', $head);
            $docb = preg_replace('/(example\s+(\d+):\s+([a-z][a-z0-9_]+))/s', 'example $2: \$P.$3', $docb);
            
            // Convert dependency function calls to namespaced variants 
            foreach($dependencies as $dependency){
                $real = preg_replace('/([^a-zA-Z0-9_\.])('.$dependency.')([^a-zA-Z0-9_])/s', '$1this.$2$3', $real);
            }
            
            // Convert recursive function calls to namespaced variants 
            $real = preg_replace('/([^a-zA-Z0-9_\.])('.$name.')([^a-zA-Z0-9_])/s', '$1this.$2$3', $real);
        }
        
        $source  = "";
        $source .= $head."\n";
        $source .= "    // ". $desc."\n";
        $source .= "    // \n";
        $source .= "    // version: ". $vers."\n";
        $source .= "    // discuss at: ". $furl."\n";
        $source .= $docb."\n";
        $source .= $real."\n";
        $source .= $tail."\n";
        
        return $source;
    }
}
?>