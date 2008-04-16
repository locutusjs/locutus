<?php
    
    function download($url, $cachedir=false){
        // $cachedir = false to don't cache
        if($cachedir !== false && !is_dir($cachedir)){
            return false;
        } elseif($cachedir !== false){
            $cachefile = $cachedir."/". preg_replace('/[^a-z0-9]/', '_', strtolower($url));
        } else{
            $cachefile = false;
        }
        
        if($cachefile){
            if(file_exists($cachefile)){
                $buf = file_get_contents($cachefile);
            } else{
                $buf = file_get_contents($url);
                file_put_contents($cachefile, $buf);
            }
        } else{
            $buf = file_get_contents($url);
        }
        
        return $buf;
    }
    
    function missing2d($needles, $haystacks){
        // 2dimensional array diffing
        $missing = array();
        foreach($needles as $needle_subcat=>$needle_arr){
            if(is_array($needle_arr)){
                foreach($needle_arr as $k=>$v){
                    if(!isset($haystacks[$needle_subcat][$k])){
                        $missing[$needle_subcat][$k]=$v;
                    }
                }
            }
        }
        return $missing;
    }    
    
    function cutTo($str, $cutto){
        $p = explode($cutto, $str);
        array_shift( $p );
        $str = implode($cutto, $p);
        return $str;
    }
    
    function phpSubCats(){
        $url = "http://www.php.net/manual/en/funcref.php";
        $buf_orig = $buf = download($url, dirname(__FILE__)."/cache");
        $buf = strip_tags( $buf, '<a>');
        preg_match_all('/book\.([a-z\.\-]+)\.php/s', $buf, $matches);
        return $matches[1]; 
    }
    
    function phpFunctionsOf($subcat){
        $url = "http://www.php.net/manual/en/ref.".$subcat.".php";
        $buf_orig = $buf = download($url, dirname(__FILE__)."/cache");
        
        $buf = cutTo($buf, '<ul class="chunklist ');
        
        $buf = strip_tags( $buf, '<a>');
        preg_match_all('/function\.([a-z\.\-]+)\.php/s', $buf, $matches);
        $functions = $matches[1];
        if(!count($functions)){
            echo "No functions found in php: ".$subcat."\n";
        } else {
            foreach($functions as $k=>$v){
                $functions[$k] = str_replace("-", "_", $v);
            }
            $php_functions = array_combine($functions, $functions);
        }
        return $php_functions; 
    }

    function phpFunctions($subcats){
        $php_functions = array();
        foreach($subcats as $subcat){
            $php_functions[$subcat] = phpFunctionsOf($subcat);
        }
        return $php_functions; 
    }
    
    function jsSubCats($function_homedir){
        $js_subcats = array();
        $dirs = glob($function_homedir."/*");
        foreach($dirs as $dir){
            if(is_dir($dir)){
                $js_subcats[] = basename($dir);                
            }
        }
        return $js_subcats;
    }
    
    function jsFunctionsOf($subcat, $function_homedir){
        $js_functions = array();
        $files = glob($function_homedir."/".$subcat."/*.js");
        foreach($files as $file){
            if(is_file($file)){
                $function = basename($file, ".js");
                $js_functions[$function] = $function;                
            }
        }
        return $js_functions;
    }
    
    function jsFunctions($subcats, $function_homedir){
        $js_functions = array();
        foreach($subcats as $subcat){
            $js_functions[$subcat] = jsFunctionsOf($subcat, $function_homedir);
        }
        return $js_functions; 
    }
    
    function jsFunctionStore($function, $subcat, $function_homedir){
        $store_dir  = $function_homedir."/".$subcat;
        $store_file = $store_dir."/".$function.".js";
        if(!is_dir($store_dir)){
            if(!mkdir($store_dir)){
                echo "Could not create: ".$store_dir."\n";
                return false;
            } else{
                echo system("/usr/bin/svn add ".$store_dir )."\n";
            }
        }
        
        if(!file_exists($store_file)){
            file_put_contents($store_file, '// not yet ported. feel like it?' );
            echo system("/usr/bin/svn add ".$store_file )."\n";
        }
    }
    
    $function_homedir = "/home/kevin/workspace/plutonia-phpjs/functions";
    $unported_homedir = "/home/kevin/workspace/plutonia-phpjs/_unported";
    
    $js_subcats  = jsSubCats($function_homedir);
    // js subcats are leading, otherwise we would get an enormous amount of unportable functions (snmp, gd, etc)
    //$php_subcats = phpSubCats();
    
    $js_functions  = jsFunctions($js_subcats, $function_homedir);
    $php_functions = phpFunctions($js_subcats);
    
    $missing = missing2d($php_functions, $js_functions);
    foreach($missing as $subcat=>$func_arr){
        foreach($func_arr as $k=>$function){
            jsFunctionStore($function, $subcat, $unported_homedir);
        }
    }
?>