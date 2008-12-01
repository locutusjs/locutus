#!/bin/bash

tooldir="$(dirname ${0})"
funcdir="${tooldir}/../functions"
lastfnc=$(find "${funcdir}" -type f -printf '%C@ %p\n' |grep -v '.svn'  |sort -rn  |head -n1 |awk -F'/' '{print $NF}')

${tooldir}/phpjstest.php ${lastfnc} debug