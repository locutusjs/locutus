#!/bin/bash
Root="$(dirname "$(dirname "${0}")")/functions"
Tool="$(dirname "$(dirname "${0}")")/ext/js-beautify/bin/beautify_js -i 4 -a -n -p"
find ${Root} -type f -mmin +5 -name '*.js' |sort | while read File; do
    $Tool > "${File}.beautified" && mv -f "${File}.beautified" "${File}"
done