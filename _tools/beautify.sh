#!/bin/bash
Root="$(dirname "$(dirname "${0}")")/functions"
Tool="$(dirname "$(dirname "${0}")")/ext/js-beautify/bin/beautify_js -i 4 -a -n -p"

for File in $(find ${Root} -type f -name '*.js' |sort); do
    echo "Beautifying ${File}"
    $Tool "${File}" |sed \
        -e 's#^[\t ]*function[\t ]*\([a-z_0-9]\+\)[\t ]*#function \1 #' \
        > "${File}.beautified" \
    && mv -f "${File}.beautified" "${File}"
done