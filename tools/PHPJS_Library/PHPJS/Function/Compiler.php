<?php
Class PHPJS_Function_Compiler extends PHPJS_Function {
    /**
     * Returns a function ready for packaging
     *
     * @param boolean $namespaced
     * 
     * @return string
     */
    public function compileFunction($namespaced = false, $commonjs = false) {
        
        $head = implode("\n", $this->getWrapHead());
        $docb = implode("\n", $this->getDocBlock());
        $real = implode("\n", $this->getRealCode());
        $tail = implode("\n", $this->getWrapTail());
        
        $name = $this->getFunctionName();
        $desc = $this->getPHPFunctionDescription();
        $vers = $this->getVersion();
        $furl = $this->getUrl();
        
        // Convert function declarations & examples to namespaced variants
        if ($namespaced) {
            $head = preg_replace('/(function\s*([a-z_][a-z0-9_]*))/s', '$2: function', $head);
            $docb = preg_replace('/(example\s+(\d+):\s+([a-z][a-z0-9_]+))/s', 'example $2: \$P.$3', $docb);
        }
        
        if ($commonjs) {
            $head = preg_replace('/(function\s*([a-z_][a-z0-9_]*))/s', 'exports.$2 = function', $head);
            $docb = preg_replace('/(example\s+(\d+):\s+([a-z][a-z0-9_]+))/s', 'example $2: \php.$3', $docb);
        }

        $newDocb  = "";
        $newDocb .= "    // ". $desc."\n";
        $newDocb .= "    // \n";
        $newDocb .= "    // version: ". $vers."\n";
        $newDocb .= "    // discuss at: ". $furl."";
                        
        $docb = str_replace("    // http://kevin.vanzonneveld.net", $newDocb, $docb);
        
        $source  = "";
        $source .= $head."\n";
        $source .= $docb."\n";
        $source .= $real."\n";

        if ($commonjs) {
            $source .= $tail.";\n";
        } else {
            $source .= $tail."\n";
        }
        
        return $source;
    }
}