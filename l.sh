#!/usr/bin/env bash
# Copyright (c) 2016, Kevin van Zonneveld
# Authors:
#  - Kevin van Zonneveld <kevin@vanzonneveld.net>

set -o pipefail
set -o errexit
set -o nounset
# set -o xtrace

# Set magic variables for current FILE & DIR
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${0}")"
__base="$(basename ${__file})"
__root="${__dir}"

filepath="${1}"
subdirNoSrc="$(dirname "${filepath}" |sed 's@src/@@')"
basefile="$(basename "${filepath}")"
mkdir -p "${__dir}/_legacy/${subdirNoSrc}/"
git mv "${filepath}" "${__dir}/_legacy/${subdirNoSrc}/"
git rm -f "${__dir}/test/languages/${subdirNoSrc}/test-${basefile}"
npm run build:indices
