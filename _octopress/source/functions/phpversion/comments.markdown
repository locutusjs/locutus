*[lala](lala.lala)* on 2011-04-01 23:04:37  
lala lala lala lala lala
---------------------------------------
*[qqq](http://www.google-igoogle.com/)* on 2011-05-04 06:27:40  
<?php
// MobGold Publisher Install Code
// Language: PHP (curl)
// Version: MG-20110322
// Copyright MobGold Ltd, All rights reserved

// Parameters to make MobGold request
$site_id    = '02f800ffRZNkRa';	// site_id is required to request ads from MobGold
$version    = 'MG-20110322';
$test_mode  = 0;  // Set 1 for test mode, set 0 for live mode

// Optional parameter
$ad_type    = ""; // 0 = both, 1 = text, 2 = banner
$ad_lang    = ""; // EN, AR, ZZ, EN, FR, DE, ID, IT, JA, PT, RU, ES, TH, OT

/////////////////////////////////
// Do not edit below this line //
/////////////////////////////////

// This section defines MobGold functions and should be used AS IS.

$protocol = 'http';
if (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) != 'off') $protocol = 'https';
$tps 	= isset( $_SERVER["HTTPS"] ) ? $_SERVER["HTTPS"] : '';
$ua 	= isset( $_SERVER["HTTP_USER_AGENT"] ) ? $_SERVER["HTTP_USER_AGENT"] : '';
$ua 	= isset( $_SERVER["HTTP_X_OPERAMINI_PHONE_UA"] ) ? $_SERVER["HTTP_X_OPERAMINI_PHONE_UA"] : $ua;
$ua 	= isset( $_SERVER["HTTP_X_ORIGINAL_USER_AGENT"] ) ? $_SERVER["HTTP_X_ORIGINAL_USER_AGENT"] : $ua;
$ua 	= isset( $_SERVER["HTTP_X_DEVICE_USER_AGENT"] ) ? $_SERVER["HTTP_X_DEVICE_USER_AGENT"] : $ua;
$xwp	= isset( $_SERVER["HTTP_X_WAP_PROFILE"] ) ? $_SERVER["HTTP_X_WAP_PROFILE"] : '';
$pro 	= isset( $_SERVER["HTTP_PROFILE"] ) ? $_SERVER["HTTP_PROFILE"] : '';
$xwc 	= isset( $_SERVER["HTTP_X_WAP_CLIENTID"] ) ? $_SERVER["HTTP_X_WAP_CLIENTID"] : '';
$ipr 	= isset( $_SERVER["REMOTE_ADDR"] ) ? $_SERVER["REMOTE_ADDR"] : '';
$ipx 	= isset( $_SERVER["HTTP_X_FORWARDED_FOR"] ) ? $_SERVER["HTTP_X_FORWARDED_FOR"] : '';
$ipc 	= isset( $_SERVER["HTTP_CLIENT_IP"] ) ? $_SERVER["HTTP_CLIENT_IP"] : '';
$ref 	= isset( $_SERVER["HTTP_REFERER"] ) ? $_SERVER["HTTP_REFERER"] : '';
$hos 	= isset( $_SERVER["HTTP_HOST"] ) ? $_SERVER["HTTP_HOST"] : '';
$uri 	= isset( $_SERVER["REQUEST_URI"] ) ? $_SERVER["REQUEST_URI"] : '';
$acp 	= isset( $_SERVER["HTTP_ACCEPT"] ) ? $_SERVER["HTTP_ACCEPT"] : '';
$cha 	= isset( $_SERVER["HTTP_ACCEPT_CHARSET"] ) ? $_SERVER["HTTP_ACCEPT_CHARSET"] : '';
$lan 	= isset( $_SERVER["HTTP_ACCEPT_LANGUAGE"] ) ? $_SERVER["HTTP_ACCEPT_LANGUAGE"] : '';

$mg_params = array(
	'ua=' . urlencode($ua),
	'xwp=' . urlencode($xwp),
	'pro=' . urlencode($pro),
	'xwc=' . urlencode($xwc),
	'ipr=' . urlencode($ipr),
	'ipx=' . urlencode($ipx),
	'ipc=' . urlencode($ipc),
	'ref=' . urlencode($ref),
	'hos=' . urlencode($hos),
	'uri=' . urlencode($uri),
	'acp=' . urlencode($acp),
	'cha=' . urlencode($cha),
	'lan=' . urlencode($lan),
	'pt=' . urlencode("$protocol://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']),
	'sm=' . $site_id,
	'ver=' . urlencode($version),
	'test=' . $test_mode,
	'type=' . $ad_type,
	'lang=' . $ad_lang,
);

$post = implode('&', $mg_params);
$request = curl_init();
$request_timeout = 5; // 5 seconds timeout	
curl_setopt($request, CURLOPT_URL, 'http://ads.mobgold.com/request.php');
curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($request, CURLOPT_TIMEOUT, $request_timeout);
curl_setopt($request, CURLOPT_CONNECTTIMEOUT, $request_timeout);
curl_setopt($request, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded', 'Connection: Close'));
curl_setopt($request, CURLOPT_POSTFIELDS, $post);
$mg_contents = curl_exec($request);
curl_close($request);

if( null !== $mg_contents )
    echo $mg_contents;
?>
---------------------------------------
