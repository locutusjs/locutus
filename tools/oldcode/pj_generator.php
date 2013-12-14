<?php

require_once "inc/const.inc.php";
require_once "inc/db.inc.php";
require_once "inc/blog.inc.php";
require_once "inc/blog.functions.inc.php";
require_once "inc/class.JavaScriptPacker.php";
require_once "inc/jsmin-1.1.0.php";
require_once "pj_func.inc.php";

// security
if( !in_array($_SERVER["REMOTE_ADDR"], $admin_ips) ){
    die("no access for: ". $_SERVER["REMOTE_ADDR"]);
}

echo "<xmp>";

    list($codefiles, $codefiles_InProgress, $authors) = indexCode($codedir);


    /******************************************************************************
    *** compile thanksto html
    ******************************************************************************/
    $thanks_to = array();
    foreach($authors as $author=>$funcs){
        $thanks_to[count($funcs)][$author] = $funcs;
        // sort by authorname
        ksort($thanks_to[count($funcs)]);
    }

    // sort by number of contributions
    krsort($thanks_to);

    $html_thanksto  = "";
    $html_thanksto .= "\n<h3>Credits</h3>\n";
    $html_thanksto .= "<p>";
        $html_thanksto .= "Respect &amp; awards go to everybody who has contributed in some way so far: <br />";
    $html_thanksto .= "</p>";
    //$html_thanksto .= "<p>";
    $html_thanksto .= "<div style=\"width:100%; overflow: scroll; overflow-y: scroll; overflow-x: hidden; height:500px;\"><table style=\"width:100%;\">";
    $cnt = 0;
    $all_authors = array();
    foreach($thanks_to as $medals=>$authors){
        foreach($authors as $author=>$functions){

            if($author == "Kevin van Zonneveld (http://kevin.vanzonneveld.net)") continue;

            $cnt++;
            $all_authors[] = $author;

            $medal_pic = determineMedal($medals);
            if($cnt == 1) $highest_medal = $medal_pic;

            // author layout
            $parts = explode("(", $author);
            if(count($parts) == 1 || !trim(reset($parts))){
                // one part
                if(substr($author,0,1)=="("){
                    // just a URL
                    $author = str_replace( array("(",")"), "", $author);
                } else{
                    // just an author
                    $author = "<strong>".$author."</strong>";
                }
            } else{
                // more parts
                $author = "<strong>".array_shift($parts)."</strong>(".implode("(", $parts);
            }

            // linkable
            $author = ereg_replace("[a-zA-Z]+://([-]*[.]?[a-zA-Z0-9_/-?&%])*", "<a href=\"\\0\">link</a>", $author);

            // add html
            if($old_medal != $medal_pic && $old_medal == $highest_medal){
                // extra space to divide gold medals
                $html_thanksto .= "<tr>";
                    $html_thanksto .= "<td colspan=\"2\">";
                        $html_thanksto .= "&nbsp;";
                    $html_thanksto .= "</td>";
                $html_thanksto .= "</tr>";
            }

            $html_thanksto .= "<tr>";
                $html_thanksto .= "<td style=\"text-align:right;width:40px;white-space:nowrap;\">";
                    if($cnt == 1){
                        // extra medal
                        $html_thanksto .= "<img src=\"/images/famsilk/".$medal_pic."\" class=\"icon\" alt=\"medal\" />";
                    } else{
                        $html_thanksto .= "<img src=\"/images/spacer.gif\" class=\"icon\" alt=\"space\" />";
                    }
                    $html_thanksto .= "<img src=\"/images/famsilk/".$medal_pic."\" class=\"icon\" alt=\"medal\" />";
                $html_thanksto .= "</td>";
                $html_thanksto .= "<td style=\"padding-left:3px;width:99%;\">";
                    $html_thanksto .= $author." for contributing to: <br />"."\n";
                $html_thanksto .= "</td>";
            $html_thanksto .= "</tr>";
            $html_thanksto .= "<tr>";
                $html_thanksto .= "<td>";
                    $html_thanksto .= "&nbsp;";
                $html_thanksto .= "</td>";
                $html_thanksto .= "<td style=\"padding-left:5px;\">";
                    $html_thanksto .= "";
                    foreach($functions as $function){
                        $html_thanksto .= "<a href=\"/techblog/article/javascript_equivalent_for_phps_".$function."/\">".$function."</a>, "."\n";
                    }
                    $html_thanksto = substr($html_thanksto,0,strlen($html_thanksto)-3);
                $html_thanksto .= "</td>";
            $html_thanksto .= "</tr>";

            $old_medal = $medal_pic;
        }
    }

    $html_thanksto .= "</table></div>";
    //$html_thanksto .= "</p>\n";

    $html_thanksto .= "\n<h4>Your name here?</h4>\n";
    $html_thanksto .= "<p>Contributing is as <b>easy</b> as <a href=\"#add_comment\">adding a comment</a> with better code, or code for a new function. <br />";
    $html_thanksto .= "Any contribution leading to improvement will directly get your name &amp; link here.\n";
    $html_thanksto .= "</p>\n";

    /******************************************************************************
    *** compile download html
    ******************************************************************************/
    // link to php.js
    $html_download  = "";
    $html_download .= "\n<h3>Download php.js</h3>\n";
    $html_download .= "<p>";
        $html_download .= "To easily include it in your code, every function currently available is stored in ";
    $html_download .= "</p>";
    
    $html_download .= "<p>";
        $html_download .= "<b>Normal</b>";
    $html_download .= "</p>";
    $html_download .= "\n<ul>";
        $recommended = "php.min.js";
        foreach(array(
            "uncompressed source"=>"php.js",
            "minified"=>"php.min.js",
            "compressed"=>"php.packed.js"
            
        ) as $descr=>$phpjsfile){
            $size = round(filesize($codedir."/".$phpjsfile)/1000, 1)."kB";
            $html_download .= "\n<li>";
            $html_download .= $descr.": <a href=\"/code/php_equivalents/".$phpjsfile."\">".$phpjsfile."</a> (".$size.")";
            if ($recommended == $phpjsfile) {
                $html_download .= "  <strong>[recommended]</strong>";
            }
            $html_download .= "</li>";
        }
    $html_download .= "</ul>";
    
    $html_download .= "<p>";
        $html_download .= "<b>Namespaced</b> ";
        $html_download .= "<a href=\"http://kevin.vanzonneveld.net/techblog/article/phpjs_namespaced/\">What is 'namespaced?'</a>";
    $html_download .= "</p>";
    $html_download .= "\n<ul>";
        foreach(array(
            "uncompressed source"=>"php.namespaced.js",
            "minified"=>"php.namespaced.min.js",
            "compressed"=>"php.namespaced.packed.js"
            
        ) as $descr=>$phpjsfile){
            $size = round(filesize($codedir."/".$phpjsfile)/1000, 1)."kB";
            $html_download .= "\n<li>";
            $html_download .= $descr.": <a href=\"/code/php_equivalents/".$phpjsfile."\">".$phpjsfile."</a> (".$size.")";
            $html_download .= "</li>";
        }
    $html_download .= "</ul>";
    $html_download .= "<p>";
        $html_download .= "To download use Right click, Save Link As<br />";
        $html_download .= "Generally the <a href=\"http://www.julienlecomte.net/blog/2007/08/13/\">best way</a> is to use a minified version and <a href=\"http://kevin.vanzonneveld.net/techblog/article/better_performance_with_mod_deflate/\">gzip it</a><br />";    
        $html_download .= "<br />";                
    $html_download .= "</p>";

    /******************************************************************************
    *** compile tester html
    ******************************************************************************/
    $html_tester  = "";
    $html_tester .= "\n<h3>Testing the functions</h3>\n";
    $html_tester .= "<p>";
        $html_tester .= "The number of functions is growing fast and so it becomes hard to ";
        $html_tester .= "<strong>maintain quality</strong>.";
    $html_tester .= "</p>";
    $html_tester .= "<p>";
        $html_tester .= "To defeat that danger of bad code, syntax errors, etc, I've added ";
        $html_tester .= "a new feature: <strong><a href=\"http://kevin.vanzonneveld.net/pj_tester.php\">php.js tester</a></strong>.";
    $html_tester .= "</p>";
    $html_tester .= "<p>";
        $html_tester .= "It is an automatically generated page that includes ALL functions in your browser, and then ";
        $html_tester .= "extracts specific testing information from each function's comments. ";
        $html_tester .= "This info is then used to run the function, and the return value is compared to a ";
        $html_tester .= "predefined one.";
    $html_tester .= "</p>";
/*    $html_tester .= "<p>";
        $html_tester .= "This way code is always checked on syntax errors, and if it doesn't function correctly anymore ";
        $html_tester .= "after an update, we should also be able to detect it more easily.";
    $html_tester .= "</p>";
*/    $html_tester .= "<p>";
        $html_tester .= "If you want, <strong><a href=\"http://kevin.vanzonneveld.net/pj_tester.php\">go check it out</a></strong>.";
    $html_tester .= "</p>";

    /******************************************************************************
    *** compile under cunstruction html
    ******************************************************************************/
    $html_construction  = "";
    if(count($codefiles_InProgress)){
        $html_construction .= "\n<h3>Under Construction</h3>\n";
        $html_construction .= "<p>";
            $html_construction .= "To avoid duplicate effort as <a href=\"/techblog/article/javascript_equivalent_for_phps_str_pad/#comment_723\">suggested by Aaron Saray</a>, ";
            $html_construction .= "here is a list of functions that I am currently working on: \n";
        $html_construction .= "</p>";
        $html_construction .= "<ul>";
            foreach($codefiles_InProgress as $func_InProgress=>$codefile_InProgress){
                $html_construction .= "<li>";
                    $html_construction .= $func_InProgress."() <a title=\"Goto PHP Function manual\" href=\"http://www.php.net/".$func_InProgress."\">&raquo;</a>";
                $html_construction .= "</li>";
            }
        $html_construction .= "</ul>";
        $html_construction .= "<p>";
            $html_construction .= "If you would like to provide another function, or improve the current one, <a href=\"#add_comment\">leave a comment</a>!";
        $html_construction .= "</p>";
    }
    $html_construction .= "\n<h3>Coming Project features</h3>\n";
    $html_construction .= "<p>";
        $html_construction .= "Project features that we are currently working on: \n";
    $html_construction .= "</p>";
    $html_construction .= "<ul>";
        $html_construction .= "<li>";
            $html_construction .= "<strong>Versioning</strong>. Individual functions are versioned, but the entire library should be versioned as well.";
        $html_construction .= "</li>";
        $html_construction .= "<li>";
            $html_construction .= "<strong>Light</strong>. A lightweight version of php.js should be made available with only common functions in it.";
        $html_construction .= "</li>";
        $html_construction .= "<li>";
            $html_construction .= "<strong>Site</strong>. A place for PHP.JS of it's own. You can track our lame attempts at phpjs.org (not hyperlinked deliberately). If there are any CakePHP developers out there who would like to contribute, contact me.";
        $html_construction .= "</li>";
        $html_construction .= "<li>";
            $html_construction .= "<strong>Testsuite</strong>. A better test-suite that can be ran locally so developers can easily test before commiting. Also the testing itself should be more thorough.";
        $html_construction .= "</li>";
    $html_construction .= "</ul>";


    /******************************************************************************
    *** update database
    ******************************************************************************/
    $total_code = "";
    $namespaced_code = "";
    foreach($codefiles as $func=>$codefile){
        $info = array();
        $save = array();
        $html = "";


        // get php manual + function code
        list($manual, $descr1, $descrF, $syntax) = ($ret = getParseManual($func, $codefiles));
        if($manual === false){
            foreach($ret as $output){
                if(substr_count($output, "#!#!#!#!#")){
                    echo "\n>>getParseManual Error: ".$output."\n";
                }
            }
        }

        // get dependencies
        $func_deps = parseFuncDependencies($func, $codefile);
        // get dependencies
        $func_examples = parseFuncExamples($func, $codefile);


        // add header & description description
        $html .= "<p>This is a Javascript version of the PHP function: <a href=\"http://www.php.net/".$func."\">".$func."</a>.</p>\n";
        $html .= "\n<h2>PHP ".$func."</h2>\n";
        $html .= "\n<h3>Description</h3>\n";
        if($descr1 && !substr_count($descr1, "#!#!#!#!#")) $html .= "<p>".$descr1."</p>\n";
        if($manual && $syntax && !substr_count($syntax, "#!#!#!#!#")) $html .= "<pre>".$syntax."</pre>\n";
        if($manual && $descrF && !substr_count($descrF, "#!#!#!#!#")) $html .= "<p>".$descrF."</p>\n";

        // add manual
        if($manual) {
            $html .= $manual;
        } else{
            #$html .= "Currently there is no proper function documentation available. <br />";
            $html .= "";
        }

        $html .= "\n<h2>Javascript ".$func."</h2>\n";
        // add function source
        $html .= "\n<h3>Source</h3>\n";
        $html .= "<p>This is the main source of the Javascript version of PHP's ".$func."</p>";
        $html .= "<pre>&lt;?Javascript ".$codefile."?&gt;</pre>\n";

        // add function dependencies
        if(count($func_deps)){
            $html .= "<p>To run the Javascript ".$func.", you will also need the following dependencies:</p>";

            //$html .= "<h3>Dependencies</h3>\n<ul>";
            $html .= "<ul>";
            foreach($func_deps as $func_dep){
                $html .= "<li><a href=\"/techblog/article/javascript_equivalent_for_phps_".$func_dep."/\">".$func_dep."</a></li>\n";
            }
            $html .= "</ul>";
        }

        // add function examples
        $max_site_examples = 3;
        $cnt = 0;
        if(count($func_examples)){
            $html .= "\n<h3>Examples</h3>\n";
            if(count($func_examples)==1){
                $html .= "<p>Currently there is 1 example</p>";
            } else{
                $html .= "<p>Currently there are ".count($func_examples)." examples</p>";
            }

            foreach($func_examples as $test_number=>$tests){
                $html .= "\n<h4>Example $test_number</h4>\n";
                $html .= "<div style=\"padding-left:10px;margin-top:10px;\">";
/*                if(($tests["returns"]=="0" || strlen(trim($tests["returns"])>0)) && $tests["returns"] != "null"){
                    $html .= "This is how you could call ".$func."()<br />";
                    $html .= highlight_js($tests["example"], 400, "margin-left:10px;");
                    $html .= "And that would return<br />";
                    $html .= highlight_js(stripslashes($tests["returns"]), 400, "margin-left:10px;");
                } else{
                    $html .= "This is how you call ".$func."<br />";
                    $html .= highlight_js($tests["example"], 400, "margin-left:10px;");
                }*/
                $html .= "This is how you could call ".$func."()<br />";
                $html .= highlight_js($tests["example"], 400, "margin-left:10px;");
                $html .= "And that would return<br />";
                $html .= highlight_js($tests["returns"], 400, "margin-left:10px;");
                $html .= "</div>";

                $cnt++;
                if($cnt >= $max_site_examples){
                    break;
                }
            }
        }

        $html .= "<br />\n<h2>More about this Project</h2>\n";

        // add download
        $html .= "\n\n";
        $html .= "<!-- download -->";
        $html .= "\n\n";
        $html .= $html_download;

        // add tester
        $html .= "<br />";
        $html .= "\n\n";
        $html .= "<!-- tester -->";
        $html .= "\n\n";
        $html .= "<br />";
        $html .= $html_tester;

        // add thanks to header
        $html .= "\n\n";
        $html .= "<!-- thanks to header -->";
        $html .= "\n\n";
        $html .= "<br />";
        $html .= $html_thanksto;

        // add under construction
        $html .= "\n\n";
        $html .= "<!-- under construction -->";
        $html .= "\n\n";
        $html .= "<br />";
        $html .= $html_construction;

        // database fields
        $info["site_id"] = 2;
        $info["publish"] = 'yes';
        $info["expires"] = 'no';
        $info["user_id"] = 1;
        $info["category_id"] = 13;
        $info["expire"] = '0000-00-00';
        $info["title"] = "Javascript equivalent for PHP's ".$func;
        $info["title_url"] = "javascript_equivalent_for_phps_".$func;
        $info["article"] = $html;
        $info["article_preview"] = extractArticlePreview($info["article"]);

        // add to php.js
        $total_code .= addCodeFunction($func, $codefile, $descr1);
        if($func == "define"){
            $namespaced_code .= "\n// define() is not available in the namespaced version of php.js\n";
        } else{
            $function_last = (end($codefiles) == $codefile);
            $namespaced_code .= namespaceFunction(addCodeFunction($func, $codefile, $descr1), $function_last);
        }

        // sanitize
        foreach($info as $k=>$v){
            $info[$k] = addslashes($v);
        }

        // update || insert
        echo $info["title_url"]." (".$descr1.")";
        list($num, $res) = queryS("SELECT `article_id` FROM `article` WHERE `title_url`='".$info["title_url"]."'");
        if($num){
            $mode = "update";
            $row = mysql_fetch_assoc($res);
            $save["article"] = $info["article"];
            $sqle = updateSql($row["article_id"], $save, "article", "article_id");
            echo "exists. updating... ";
        } else{
            $mode = "insert";
            $save = $info;
            $sqle = insertSql($save, "article");
            echo "does not exist. inserting... ";
        }

        // report
        if(!queryE($sqle)){
            echo "fail\n";
        } else{
            echo "sucess\n";

            if($mode=="insert" && $article_id=mysql_insert_id()){
                $tags = array("programming", "php", "javascript", "phpjs");
                foreach($tags as $k=>$tag_raw){
                    $tag = substr(addslashes(preg_replace('/[^A-z0-9_\s]/', '', trim(  preg_replace('/([\s][\s]*)/'," ", $tag_raw)   ))),0,50);
                    if(!trim($tag))continue;
                    $tag_id = addTag($tag);

                    // add article tag combination
                    queryE("
                        INSERT INTO `".$tbl_article_tag."`
                        SET
                            `".$tbl_article."_id` = ".$article_id.",
                            `".$tbl_tag."_id` = ".$tag_id.",
                            `".$tbl_site."_id` = ".$info["site_id"]."
                    ");
                }
            }

        }



        flush();
    }

    /******************************************************************************
    *** save php.js
    ******************************************************************************/
    
    
    $copyright_portions = " * Portions copyright ".implode(", ", $all_authors);
    $copyright_portions = wordwrap( $copyright_portions, 75, "\n * ", false);

    // Determine version
    $version_file = dirname(__FILE__)."/pj_vers.dat";
    $osource  = file_get_contents($codedir."/php.js");
    $nsource  = $total_code;

    $overs = versionGet($version_file); 
    $nvers = versionUpgrade($overs, $osource, $nsource);
    
    //echo $overs."\n";
    //echo $nvers."\n";
    
    versionPut($version_file, $nvers);
    $hvers = versionFormat($nvers);
    
    //echo $nvers."\n";
    
    // Copyright Banner
    $copyright  = "";
    $copyright .= "/* \n";
    $copyright .= " * More info at: http://kevin.vanzonneveld.net/techblog/article/phpjs_licensing/\n";
    $copyright .= " * \n";
    $copyright .= " * This is version: ".$hvers."\n";
    $copyright .= " * php.js is copyright 2008 Kevin van Zonneveld.\n";
    $copyright .= " * \n";
    $copyright .= $copyright_portions."\n";
    $copyright .= " * \n";
    $copyright .= " * Dual licensed under the MIT (MIT-LICENSE.txt)\n";
    $copyright .= " * and GPL (GPL-LICENSE.txt) licenses.\n";
    $copyright .= " * \n";
    $copyright .= " * Permission is hereby granted, free of charge, to any person obtaining a\n";
    $copyright .= " * copy of this software and associated documentation files (the\n";
    $copyright .= " * \"Software\"), to deal in the Software without restriction, including\n";
    $copyright .= " * without limitation the rights to use, copy, modify, merge, publish,\n";
    $copyright .= " * distribute, sublicense, and/or sell copies of the Software, and to\n";
    $copyright .= " * permit persons to whom the Software is furnished to do so, subject to\n";
    $copyright .= " * the following conditions:\n";
    $copyright .= " * \n";
    $copyright .= " * The above copyright notice and this permission notice shall be included\n";
    $copyright .= " * in all copies or substantial portions of the Software.\n";
    $copyright .= " * \n";
    $copyright .= " * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n";
    $copyright .= " * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n";
    $copyright .= " * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\n";
    $copyright .= " * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES\n";
    $copyright .= " * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\n";
    $copyright .= " * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n";
    $copyright .= " * OTHER DEALINGS IN THE SOFTWARE.\n";
    $copyright .= " */ \n";
    $copyright .= "\n";

    
    // Original
    echo "writing ".$codedir."/php.js...\n";
    file_put_contents($codedir."/php.js", $copyright.$total_code);

    echo "writing ".$codedir."/php.namespaced.js...\n";
    $namespaced_code = surroundNamespaced($namespaced_code);
    file_put_contents($codedir."/php.namespaced.js", "".$copyright.$namespaced_code);

    // Packer
    echo "writing ".$codedir."/php.packed.js...\n";
    $myPacker = new JavaScriptPacker($total_code, 'Normal', true, false);
    $total_code_packed = $myPacker->pack();
    file_put_contents($codedir."/php.packed.js", $copyright.$total_code_packed);
    
    echo "writing ".$codedir."/php.namespaced.packed.js...\n";
    $myPacker = new JavaScriptPacker($namespaced_code, 'Normal', true, false);
    $total_code_packed = $myPacker->pack();
    file_put_contents($codedir."/php.namespaced.packed.js", $copyright.$total_code_packed);
    
    // JSMIN
    echo "writing ".$codedir."/php.min.js...\n";
    $total_code_min = JSMin::minify($total_code);
    file_put_contents($codedir."/php.min.js", $copyright.$total_code_min);

    echo "writing ".$codedir."/php.namespaced.min.js...\n";
    $total_code_min = JSMin::minify($namespaced_code);
    file_put_contents($codedir."/php.namespaced.min.js", $copyright.$total_code_min);
    
/*    // Packer With newlines
    echo "writing ".$codedir."/php.packed.newline.js...\n";
    $myPacker = new JavaScriptPacker($total_code, 'None', true, false);
    $total_code_packed = str_replace("function ", "\nfunction ", $myPacker->pack());
    //$total_code_packed = str_replace("}", "}\n", $total_code_packed);
    file_put_contents($codedir."/php.packed.newline.js", $copyright.$total_code_packed);
*/
    /******************************************************************************
    *** save RSS
    ******************************************************************************/
    echo "saving rss...\n";
    saveXMLFeed();

echo "</xmp>";
?>