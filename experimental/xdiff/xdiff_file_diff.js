function xdiff_file_diff (old_file, new_file, dest, context, minimal) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // % note 1: Depends on file_put_contents which is not yet implemented
    // -    depends on: xdiff_string_diff
    // -    depends on: file_get_contents
    // -    depends on: file_put_contents

    old_file = this.file_get_contents(old_file);
    new_file = this.file_get_contents(new_file);
    return this.file_put_contents(dest, this.xdiff_string_diff(old_file, new_file, context));
}
