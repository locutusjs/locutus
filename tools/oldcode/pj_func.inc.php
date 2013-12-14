<?php
    $codedir = dirname(__FILE__)."/code/php_equivalents";

    function rgxDeleteFunction( $func, &$str ){
        $str = preg_replace('//si', '', $str);
    }

    function indentBlock( $block, $indentation=4 ){
        $tmp_block = trim($block);
        $tmp_block = str_replace("\r", "", $tmp_block);
        $tmp_block = str_replace("\t", "    ", $tmp_block);
        $lines = explode("\n", $tmp_block);
        foreach($lines as $k=>$line){
            $lines[$k] = str_repeat(" ", $indentation). $line;
        }
        return implode("\n", $lines);
    }

    function surroundNamespaced( $str ){
        $str1  = "";
        $str1 .= "// {{{ init: \n";
        $str1 .= "init: function() {\n";
        $str1 .= "    // Makes autoloading system works properly.\n";
        $str1 .= "    // \n";
        $str1 .= "    // %        note 1: Not a real PHP.JS function, necessary for namespaced version, though.\n";
        $str1 .= "\n";
        $str1 .= "},// }}}\n";
        $str1 .= $str;

        $str2  = "";
        $str2 .= "if(window == this || !this.init){\n";
        $str2 .= "    return new PHP_JS();\n";
        $str2 .= "}else{\n";
        $str2 .= "    return this.init();\n";
        $str2 .= "}\n";

        $str3  = "var PHP_JS = function() {\n";
        $str3 .= indentBlock($str2, 4)."\n";
        $str3 .= "};\n";
        $str3 .= "";

        $str4 .= "";
        $str4 .= "if(typeof(PHP_JS) == \"undefined\"){\n";
        $str4 .= indentBlock($str3, 4)."\n";
        $str4 .= "}\n";

        $str4 .= "\n";
        $str4 .= "PHP_JS.prototype = {\n";
        $str4 .= indentBlock($str1, 4)."\n";
        $str4 .= "}; // End PHP_JS prototype \n";
        $str4 .= "\n";
        $str4 .= "window.\$P = PHP_JS();\n";

        $str5  = "";
        $str5 .= "(function() {\n";
        $str5 .= indentBlock($str4, 4)."\n";
        $str5 .= "})();\n";

        return $str5;
    }

    function namespaceFunction($str, $function_last = false){

        // dependencies
        $deps = parseFuncDependenciesStr($str);
        $cstr  = $str;
        $cstr  = preg_replace('/(function\s*([a-z][a-z0-9_]*))/s', '$2: function', $cstr); //
        $cstr  = preg_replace('/(example\s+(\d+):\s+([a-z][a-z0-9_]+))/s', 'example $2: \$P.$3', $cstr); //

        $lines = explode("\n", $cstr);

        $comments_finished = false;
        $func = "notset";
        $code_lines = array();
        $head_lines = array();
        foreach($lines as $k=>$line){
            if(trim($line) && strpos(trim($line), ': function') === false && strpos(trim($line), '//') === false){
                $comments_finished = true;
            }

            if(substr_count($line, ": function") && $k < 3){
                $func = trim(reset(explode(":", $line)));
            }

            if(!$comments_finished){
                $head_lines[] = $line;
            } else{
                $code_lines[] = $line;
            }
        }

        $head = implode("\n", $head_lines);
        $code = implode("\n", $code_lines);

        foreach($deps as $dep){
            //$cstr  = str_replace($dep, "this.".$dep, $cstr);
            $code  = preg_replace('/([^a-zA-Z0-9_\.])('.$dep.')([^a-zA-Z0-9_])/s', '$1this.$2$3', $code);
        }
        $code  = preg_replace('/([^a-zA-Z0-9_\.])('.$func.')([^a-zA-Z0-9_])/s', '$1this.$2$3', $code);


        $cstr = $head."\n".$code;

        // close with a comma for object seperation
        if(!$function_last){
            $cstr  = str_replace("// }}}", ",// }}}", $cstr);
        }

        return $cstr;
    }

    function indexCode($codedir){
        // index all functions
        $codefiles = array();
        $codefiles_InProgress = array();
        $authors = array();
        foreach(glob($codedir."/functions/*/*.js") as $filepath){
            $file = basename($filepath);
            $func = basename($filepath, '.js');
            if(is_dir($filepath)) continue; // skip directories
            if(substr_count($file, '.')>1) continue; // skip backups
            if(substr($file, 0, 1)=="_") { // skip 'in the works'
                $func = substr($func,1);
                $codefiles_InProgress[$func] = $filepath;
                continue;
            }
            if($func=="php") continue; // skip container: php.js
            if($func=="php.min") continue; // skip container: php.min.js
            if($func=="php.packed") continue; // skip container: php.packed.js
            $codefiles[$func] = $filepath;

            // build thanks_to array
            $authors = array_merge_recursive($authors, ($tauth=parseFuncAuthors($func, $filepath)));
        }
        return array($codefiles, $codefiles_InProgress, $authors);
    }

    function cvrt_html4strict($source){
        // Specify configuration
        $config = array(
                   'indent'         => true,
                   'hide-comments'  => true,
                   'output-xhtml'   => true,
                   'show-body-only' => true
       );

        // Tidy
        $tidy = new tidy;
        $tidy->parseString($source, $config, 'utf8');
        $tidy->cleanRepair();

        // Output
        $ret = tidy_get_output($tidy);
        return $ret;
    }

    function dbg($str){
        #return true;
        echo $str."\n";
    }

    function ioGetCodeFile($filepath){
        global $file_buffer;
        if(!isset($file_buffer) || !is_array($file_buffer)){
            $file_buffer = array();
        }

        if(!isset($file_buffer[$filepath])){
            $file_buffer[$filepath] = file_get_contents($filepath);
        }

        return $file_buffer[$filepath];
    }

    function getParseManual($func, $codefiles){

        $debug_func = "";
        $not_a_function = 0;

        $lfunc = str_replace('_', '-', $func);
        /******************************************************************************
        *** get
        ******************************************************************************/
        $tempdir = dirname(__FILE__)."/temp";
        $tempfile = $tempdir."/".$lfunc;
        if(!file_exists($tempfile)){
            file_put_contents($tempfile, file_get_contents("http://us2.php.net/".$func));
        }
        $original_buf = $buf = file_get_contents($tempfile);


        /******************************************************************************
        *** parse
        ******************************************************************************/
        // select main part
        $pat = '/<div id="function\.'.$lfunc.'[^>]+>(.*?)id="usernotes"/is';
        if(!preg_match($pat, $buf, $match)){
            if($func == $debug_func){
                echo $pat;
                print_r($match);
            }
            $buf = "";
        } else{
            $buf = $match[1];
        }

        // check:
        $subj = "buf"; $test = '<h1 class="refname">'.$func.'</h1>';
        #if(!substr_count($$subj, $test)) return array(false, "#!#!#!#!# \$".$subj." does not contain valid '".$test."' at line ".__LINE__);

        // replace $vars with vars
        $buf = str_replace('<tt class="parameter">$', '<tt class="parameter">', $buf);

        // replace i class with i
        $buf = str_replace('<i class="literal">', '<i>', $buf);

        // replace vars & bools with simple styling
        $buf = str_replace(array('<tt class="parameter">','<tt>'), '<b>', $buf);
        $buf = str_replace('</tt>', '</b>', $buf);
        $buf = str_replace('<b><b>', '<b>', $buf);
        $buf = str_replace('</b></b>', '</b>', $buf);

        // get 1st description, try different approaches
        $descr1 = false;
        if(!$descr1){
            $subj = "buf"; $pattern = '/<p class="refpurpose([^"])*">(.*?)<\/p>/is';
            if(!preg_match($pattern, $$subj, $match)){
                //dbg("#!#!#!#!# ".$func."::\$".$subj." does not match pattern '".$pattern."' at line ".__LINE__."[".substr($$subj,0,1024)."]");
                $descr1 = false;
            } else{
                $descr1 = $match[2];
                $descr1 = strip_tags($descr1);
                $descr1 = str_replace("\n", "", $descr1);
                $descr1 = str_replace("—", "-", $descr1);
                $descr1 = str_replace("&mdash;", "-", $descr1);
                $descr1 = str_replace(" -    ", " - ", $descr1);
                $descr1 = trim($descr1);
            }
        }
        if(!$descr1){
            // retry
            $subj = "buf"; $pattern = '/<p class="\w{0,3}para">(.*?)<\/p>/is';
            if(!preg_match($pattern, $$subj, $match)){
                //dbg("#!#!#!#!# ".$func."::\$".$subj." does not match pattern '".$pattern."' at line ".__LINE__."[".substr($$subj,0,1024)."]");
                $descr1 = false;
            } else{
                $not_a_function++;
                $descr1 = $match[1];
                $descr1 = strip_tags($descr1);
                $descr1 = str_replace("\n", "", $descr1);
                $descr1 = str_replace("—", "-", $descr1);
                $descr1 = str_replace(" -    ", " - ", $descr1);
                $descr1 = str_replace("&mdash;", "-", $descr1);
                $descr1 = str_replace("    ", " ", $descr1);
                $descr1 = trim($descr1);
            }
        }
        // check:
        $subj = "descr1"; $test = $func;
        if(!substr_count($$subj, $test)) return array(false, "#!#!#!#!# ".$func."::\$".$subj." does not contain valid '".$test."' at line ".__LINE__."");

        // get seealso block
        $subj = "buf"; $pattern = '/<div class="refsect1 seealso">(.*?)<\/div>/is';
        if(!preg_match($pattern, $$subj, $match)){
            // retry
            $subj = "buf"; $pattern = '/<p class="\w{0,3}para">\s+See also(.*?)<\/p>/is';
            // we need the final see-also block so loop
            if(!preg_match_all($pattern, $$subj, $matches)){
                // fail
                #dbg("#!#!#!#!# ".$func."::\$".$subj." does not match pattern '".$pattern."' at line ".__LINE__."");
            } else{
                // success
                $see_also_block = end($matches[1]);
                $not_a_function++;
            }
        } else{
            $see_also_block = $match[1];
        }

        // extract seealso functions
        if(trim($see_also_block)){
            $subj = "see_also_block"; $pattern = '/class="function"([^>])*>([^\(]+)\(\)<\/a>/is';
            if(!preg_match_all($pattern, $$subj, $matches)){
                dbg("#!#!#!#!# ".$func."::\$".$subj." does not match pattern '".$pattern."' at line ".__LINE__."[".substr($$subj,0,1024)."]");
            } else{
                $arrSeeAlso = $matches[2];
            }
        } else{
            dbg($func."::no seealso block");
        }

        if($not_a_function>1){
            $syntax = "";
            $descrF = "";
        } else{
            // get syntax block
            preg_match('/<div class="methodsynopsis([^"])*">(.*?)<\/div>/is', $buf, $match);
            $syntax = $match[2];
            $syntax = str_replace("\n", "", $syntax);
            $syntax = str_replace("\$", "", $syntax);
            $syntax = strip_tags($syntax);
            $syntax = preg_replace('/\s[\s+]/is', '', $syntax);
            $syntax = trim($syntax);
            // check:
            $subj = "syntax"; $test = $func;
            if(!substr_count($$subj, $test)) return array(false, $descr1, false, "#!#!#!#!# ".$func."::\$".$subj." does not contain valid '".$test."' at line ".__LINE__);

            // get full description block
            preg_match('/<p class="para">(.*?)<\/p>/is', $buf, $match);

            $descrF = $match[1];
            $descrF = str_replace("\n", "", $descrF);
            $descrF = strip_tags($descrF, '<i>');
            $descrF = preg_replace('/\s[\s+]/is', '', $descrF);
            $descrF = trim($descrF);
        }


        // select even smaller main part for easier parsing
        preg_match('/<div class="refsect1 parameters">(.*)<\!--UdmComment-->/is', $buf, $match);
        $buf = $match[1];

        // strip blockquotes
        $buf = str_replace("\n\n", "\n", $buf);

        // strip unwanted blocks (changelog,examples,notes,seealso)
        foreach(array('changelog','examples','notes','seealso','errors') as $unw_block){
            $buf = preg_replace('/(<div class="refsect1 '.$unw_block.'">(.*)<\/div>)/is', '', $buf);
        }
        $buf = str_replace("<br /><br />", "", $buf);

        // general tag replacements
        $buf = str_replace(array('<dl>','</dl>'), array('<ul>','</ul>'), $buf);
        $buf = str_replace(array('<caption>','</caption>'), array('<p>','</p>'), $buf);
        $buf = str_replace(array('<dt>','</dt>'), array('<li><strong>','</li>'), $buf);
        $buf = str_replace(array('<dd>','</dd>'), array('</strong>',''), $buf);
        //$buf = str_replace(array('<h3 class="title">','</h3>'), array('<h2>','</h2>'), $buf);
        $buf = str_replace(array(' class="para"'), array(''), $buf);
        $buf = str_replace(array('border="5"'), array('class="sortable" style="350px;"'), $buf);

        // cleanup
        $buf = strip_tags($buf, '<h3>,<h2>,<p>,<ul>,<li>,<b>,<br>,<strong>,<table>,<colgroup>,<thead>,<tbody>,<tr>,<th>,<td>,<em>,<u>,<i>,<pre>,<code>');

        // insert see also
        $seealso_html = "";
        if(is_array($arrSeeAlso) && count($arrSeeAlso)){
            foreach($arrSeeAlso as $see_func){
                if($codefiles[$see_func]){
                    $seealso_html .= "<li><a href=\"/techblog/article/javascript_equivalent_for_phps_".$see_func."/\">javascript ".$see_func."()</a></li>\n";
                }
            }
            if($seealso_html){
                $buf .= "\n<h3>See Also</h3>\n<ul>".$seealso_html."</ul>";
            }
        }

        // tidy html
        $buf = cvrt_html4strict($buf);
        $buf = str_replace("<pre>\n", "<pre>", $buf);
        $buf = str_replace("\n</pre>", "</pre>", $buf);
        $buf = preg_replace('/<pre>(\s+)<\/pre>/s', '', $buf);
        $buf = str_replace(array('<strong><i><b>','</b></i></strong>'), array('<strong><i>','</i></strong>'), $buf);
        $buf = preg_replace('/<li>(\s+)<strong><i>\.\.\.<\/i><\/strong>(\s+)<\/li>/s', '', $buf);

        return array($buf, $descr1, $descrF, $syntax);
    }

    function createVersion($stamp){

        return intval(date("y",$stamp)).date("m.jH", $stamp);
    }
  
    function versionFormat($vers_int){
        
        $vers_int = str_pad($vers_int, 3, "0", STR_PAD_LEFT);
        $arr = str_split($vers_int);
        
        return $arr[0].".".$arr[1].$arr[2];        
    }
    
    function versionGet($version_file){
        if(!file_exists($version_file)){
            file_put_contents($version_file, "0");
            chmod($version_file, 0777);
            return 0;
        } 
        
        $vers_int = file_get_contents($version_file);
        $vers_int = preg_replace('/[^0-9]/', '', $vers_int);
        if(!is_numeric($vers_int) || !$vers_int){
            file_put_contents($version_file, "0");
            return 0;
        } 
        return $vers_int ;
        
    }
    
    function versionPut($version_file, $vers_int){
        $vers_int = preg_replace('/[^0-9]/', '', $vers_int);

        if(!is_numeric($vers_int) || !$vers_int){
            file_put_contents($version_file, "0");
            chmod($version_file, 0777);
            return 0;
        }
        
        file_put_contents($version_file, $vers_int);
        return $vers_int;
    }
    
    function versionUpgrade($vers_int, $osource, $nsource){
        if(!$osource || !$nsource) return false;
        if(!$vers_int || !is_numeric($vers_int)) return false;
        
        $pat = '/\s?\+\s+(version):\s?(.*)/i';
        
        preg_match_all($pat, $osource, $omatches);
        preg_match_all($pat, $nsource, $nmatches);

        $overs = implode(",", $omatches[2]);
        $nvers = implode(",", $nmatches[2]);
        
        if($overs != $nvers){
            $vers_int++;
        }
                
        return $vers_int;
    }
    
    function addCodeFunction($func, $filepath, $descr1){
        $buf  = "";
        $buf .= ioGetCodeFile($filepath);
        $buf .= "\n";
        $buf .= "\n";

        $buf = str_replace("\r", "", $buf);
        $descr1 = strip_tags($descr1);
        if(substr_count($descr1, "-")){
            $parts = explode("-", $descr1);
            array_shift($parts);
            $descr1 = implode("-", $parts);
        }
        $descr1 = trim($descr1);

        $comment  = "";
        $comment .= "    // ". wordwrap($descr1, 80, "\n    // ", false)."\n";
        $comment .= "    // \n";
        $comment .= "    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_".$func."/\n";
        $comment .= "    // +       version: ".createVersion(filemtime($filepath))."\n";

        $buf  = str_replace("    // http://kevin.vanzonneveld.net\n", $comment, $buf);
        $buf  = "\n// {{{ ".$func."\n".trim($buf)."// }}}\n";

        return $buf;
    }

    function highlight_js($code, $width=550, $xtrastyle=""){
        require_once "inc/template.inc.php";
        return str_replace("<pre ","<pre style=\"width:".$width."px;".$xtrastyle."\" ", highlight_code( str_replace("<br />","\n",htmlspecialchars_decode($code)),$width."px","Javascript", false, false));
    }

    function determineMedal($medals){
        global $determineMedal_runs;
        if(!isset($determineMedal_runs)) $determineMedal_runs=0;
        $determineMedal_runs++;

        if($determineMedal_runs==1){
            // 1st has gold
            $medal_pic = "award_star_gold_3.png";
        } else{
            if($medals>4){
                $medal_pic = "award_star_gold_3.png";
            } elseif($medals>1){
                $medal_pic = "award_star_silver_3.png";
            } else{
                $medal_pic = "award_star_bronze_3.png";
            }
        }

        return $medal_pic;
    }

    function parseFuncAuthors($func, $filepath){
        $buf = ioGetCodeFile($filepath);
        $pat = '/\s?\+\s+(\w+(\s\w+)+):\s?(.*)/i';
        preg_match_all($pat, $buf, $matches);

        $arr = array();
        foreach($matches[3] as $indx=>$author){
            $arr[trim($author)][] = trim($func);
        }

        return $arr;
    }

    function parseFuncDependencies($func, $filepath){
        $buf = ioGetCodeFile($filepath);
        $pat = '/\s?\-\s+(\w+(\s\w+)+):\s?(.*)/i';
        preg_match_all($pat, $buf, $matches);

        $arr = array();
        foreach($matches[3] as $indx=>$depstr){
            $deps = explode(",", $depstr);
            foreach($deps as $dep){
                $arr[$dep] = trim($dep);
            }
        }

        return $arr;
    }

    function parseFuncDependenciesStr($buf){
        $pat = '/\s?\-\s+(\w+(\s\w+)+):\s?(.*)/i';
        preg_match_all($pat, $buf, $matches);

        $arr = array();
        foreach($matches[3] as $indx=>$depstr){
            $deps = explode(",", $depstr);
            foreach($deps as $dep){
                $arr[$dep] = trim($dep);
            }
        }

        return $arr;
    }

    // fetch examples
    function parseFuncExamples($func, $filepath){
        $buf = ioGetCodeFile($filepath);
        $pat = '/\s?\*\s+(\w+(\s\w+)+):\s?(.*)/';
        preg_match_all($pat, $buf, $matches);

        $arr = array();
        if($matches[1] && $matches[3]){
            foreach($matches[3] as $k=>$v){
                $arr[trim($matches[2][$k])][preg_replace('/[\d|\s]/','', $matches[1][$k])] = $v;
            }
        }

        return $arr;
    }

    function authorSort_cmp($a, $b){
        $va = count($a);
        $vb = count($b); #; + (ord(substr($b, 0, 1))/255);
        if ($va == $vb) return 0;
        else return ($va > $vb ? -1 : 1);
    }

?>