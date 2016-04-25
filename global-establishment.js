var $global = (typeof window !== 'undefined' ? window : GLOBAL)
$global.$locutus = $global.$locutus || {}
var $locutus = $global.$locutus
$locutus.php = $locutus.php || {}
$locutus.php.ini = $locutus.php.ini || {}
$locutus.php.pointers = $locutus.php.pointers || []
$locutus.php.locales = $locutus.php.locales || {}
var pointers = $locutus.php.pointers

var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.objectsAsArrays') : undefined)
