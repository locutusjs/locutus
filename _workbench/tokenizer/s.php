<?php
include "config.php";

$asd=file_get_contents($file);
header("Content-type: text/plain");
echo $asd;
?>