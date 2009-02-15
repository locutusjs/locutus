<?php
/**
 * Javascript Packers
 *
 * @author kevin
 */
class PHPJS_Pack {
    public static function pack($compression = 'none', $code = '') {
        switch($compression) {
            case 'packed':
                require_once dirname(__FILE__).'/Pack/class.JavaScriptPacker.php';
                $packer = new JavaScriptPacker($code, 'Normal', true, false);
                return $packer->pack();

                break;
            case 'none':
                return $code;
                
                break;
            case 'minified':
                $total_code_min = JSMin::minify($total_code);

                break;
            default:
                throw new PHPJS_Exception("No such packer: '".$compression."'");
                break;
        }
    }
}
?>
