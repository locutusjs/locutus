#!/bin/bash
Root="$(dirname "$(dirname "${0}")")/functions"
Tool="$(dirname "$(dirname "${0}")")/ext/js-beautify/bin/beautify_js -i 4 -a -n -p"

for File in $(find ${Root} -type f -mmin +5 -name '*.js'); do
    echo "Beautifying ${File}"
    $Tool "${File}"  > "${File}.beautified" && mv -f "${File}.beautified" "${File}"
done