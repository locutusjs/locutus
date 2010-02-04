// Original: http://nl3.php.net/manual/en/function.parse-ini-file.php#78815


function parse_ini_string ( $filepath ) {
    $ini = file( $filepath );
    if ( count( $ini ) == 0 ) { return array(); }
    $sections = array();
    $values = array();
    $globals = array();
    $i = 0;
    for( $ini in $line ){
        $line = trim( $line );
        // Comments
        if ( $line == '' || $line.substr(0,1) == ';' ) { continue; }
        // Sections
        if ( $line.substr(0,1) == '[' ) {
            $sections.push($line.substr(1, -1));
            $i++;
            continue;
        }
        // Key-value pair
        list( $key, $value ) = explode( '=', $line, 2 );
        $key = trim( $key );
        $value = trim( $value );
        if ( $i == 0 ) {
            // Array values
            if ( substr( $line, -1, 2 ) == '[]' ) {
                $globals[ $key ].push($value);
            } else {
                $globals[ $key ].push($value);
            }
        } else {
            // Array values
            if ( substr( $line, -1, 2 ) == '[]' ) {
                $values[ $i - 1 ][ $key ].push($value);
            } else {
                $values[ $i - 1 ][ $key ] = $value;
            }
        }
    }
    for( $j=0; $j<$i; $j++ ) {
        $result[ $sections[ $j ] ] = $values[ $j ];
    }
    return $result + $globals;
}

// Better? http://nl3.php.net/manual/en/function.parse-ini-file.php#82900
//function _parse_ini_file($file, $process_sections = false) {
//  $process_sections = ($process_sections !== true) ? false : true;
//
//  $ini = file($file);
//  if (count($ini) == 0) {return array();}
//
//  $sections = array();
//  $values = array();
//  $result = array();
//  $globals = array();
//  $i = 0;
//  foreach ($ini as $line) {
//    $line = trim($line);
//    $line = str_replace("\t", " ", $line);
//
//    // Comments
//    if (!preg_match('/^[a-zA-Z0-9[]/', $line)) {continue;}
//
//    // Sections
//    if ($line{0} == '[') {
//      $tmp = explode(']', $line);
//      $sections[] = trim(substr($tmp[0], 1));
//      $i++;
//      continue;
//    }
//
//    // Key-value pair
//    list($key, $value) = explode('=', $line, 2);
//    $key = trim($key);
//    $value = trim($value);
//    if (strstr($value, ";")) {
//      $tmp = explode(';', $value);
//      if (count($tmp) == 2) {
//        if ((($value{0} != '"') && ($value{0} != "'")) ||
//            preg_match('/^".*"\s*;/', $value) || preg_match('/^".*;[^"]*$/', $value) ||
//            preg_match("/^'.*'\s*;/", $value) || preg_match("/^'.*;[^']*$/", $value) ){
//          $value = $tmp[0];
//        }
//      } else {
//        if ($value{0} == '"') {
//          $value = preg_replace('/^"(.*)".*/', '$1', $value);
//        } elseif ($value{0} == "'") {
//          $value = preg_replace("/^'(.*)'.*/", '$1', $value);
//        } else {
//          $value = $tmp[0];
//        }
//      }
//    }
//    $value = trim($value);
//    $value = trim($value, "'\"");
//
//    if ($i == 0) {
//      if (substr($line, -1, 2) == '[]') {
//        $globals[$key][] = $value;
//      } else {
//        $globals[$key] = $value;
//      }
//    } else {
//      if (substr($line, -1, 2) == '[]') {
//        $values[$i-1][$key][] = $value;
//      } else {
//        $values[$i-1][$key] = $value;
//      }
//    }
//  }
//
//  for($j = 0; $j < $i; $j++) {
//    if ($process_sections === true) {
//      $result[$sections[$j]] = $values[$j];
//    } else {
//      $result[] = $values[$j];
//    }
//  }
//
//  return $result + $globals;
//}
//?>
//
//usage regarding semicolons:
//<?php
//;sample.ini
//
//variable1   = v1;v1
//variable 2  = "v2;v2"
//variable_3  = "v3;v3;v3"
//variable4   = "v4;v4" ;v4
//variable 5  = "v5;v5;v5" ;v5
//variable_6  = "v6;v6" ;v6;;
//variable7   = "v7;;v7"
//variable 8  = 'v8;v8'
//variable_9  = 'v9;v9;v9'
//variable10  = 'v10;v10' ;v10
//variable 11 = 'v11;v11;v11' ;v11
//variable_12 = 'v12;v12' ;v2;;
//variable13  = 'v13;;v13'
//variable 14 = "v14
//variable_15 = 'v15
//variable16  = "v16;v16
//variable 17 = 'v17;v17
//?>
//<?php
////example.php
//print_r(_parse_ini_file("sample.ini"));
//?>
//<?php
////example.php output
//Array
//(
//    [variable1] => v1
//    [variable 2] => v2;v2
//    [variable_3] => v3;v3;v3
//    [variable4] => v4;v4
//    [variable 5] => v5;v5;v5
//    [variable_6] => v6;v6
//    [variable7] => v7;;v7
//    [variable 8] => v8;v8
//    [variable_9] => v9;v9;v9
//    [variable10] => v10;v10
//    [variable 11] => v11;v11;v11
//    [variable_12] => v12;v12
//    [variable13] => v13;;v13
//    [variable 14] => v14
//    [variable_15] => v15
//    [variable16] => v16
//    [variable 17] => v17
//)
