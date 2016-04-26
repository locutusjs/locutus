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
__root="$(cd "$(dirname "${__dir}")" && pwd)"

pushd "${__root}/src" > /dev/null
  filepath="$(find . -type f -print0 | xargs -0 stat -f "%m %N" | grep -v '/_util/' | sort -rn | head -1 | cut -f2- -d" ")"
  subdir="$(dirname "${filepath}")"
  basefile="$(basename "${filepath}")"
  testfile="${__root}/test/languages/${subdir}/test-${basefile}"
popd > /dev/null

env DEBUG=locutus:* mocha \
  --compilers js:babel-register \
  --reporter spec \
"${testfile}"
