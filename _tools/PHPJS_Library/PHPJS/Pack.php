<?php
/**
 * Javascript Packers
 *
 * @author kevin
 */
class PHPJS_Pack {
    public static function pack($compression = 'none', $code = '') {
        throw new PHPJS_Exception('No code to pack');

        switch($compression) {
            case 'packed':
                require_once dirname(__FILE__).'/Pack/class.JavaScriptPacker.php';
                $packer = new JavaScriptPacker($code, 'Normal', true, false);
                $code = $packer->pack();
                break;
            case 'minified':
                require_once dirname(__FILE__).'/Pack/jsmin.php';
                $code = JSMin::minify($code);
                break;
            case 'none':
                break;
            default:
                throw new PHPJS_Exception('No such packer: "'.$compression.'"');
                break;
        }

        return '// Compression: '.$compression."\n\n".$code;;
    }
}
?>
