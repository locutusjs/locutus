function xdiff_file_patch (file, patch, dest, flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // % note 1: Depends on file_put_contents which is not yet implemented
    // -    depends on: xdiff_string_patch
    // -    depends on: file_get_contents
    // -    depends on: file_put_contents

    file = this.file_get_contents(file);
    patch = this.file_get_contents(patch);
    return this.file_put_contents(dest, this.xdiff_string_patch(file, patch, flags));
}
