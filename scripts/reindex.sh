#!/usr/bin/env bash
# Copyright (c) 2016, Transloadit Ltd.
# Authors:
#  - Kevin van Zonneveld <kevin@transloadit.com>

set -o pipefail
set -o errexit
set -o nounset
# set -o xtrace

# Set magic variables for current FILE & DIR
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${0}")"
__base="$(basename ${__file})"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

target="${1:-php}"

pushd "${target}" > /dev/null
  entries=$(find . \
    -maxdepth 1 \
    -not \( -path './_*' -prune \) \
    ! -name index.js \
    ! -name known-failures.txt \
    ! -name .DS_Store \
  | egrep -v '^\.$' \
  | sed 's#\.js##g' \
  | sed 's#\./##g'
  )

  rm -f index.js
  for fileEntry in $(echo ${entries}); do
    modEntry="${fileEntry}"

    # To compensate for Git & Windows not liking that we have index.js and Index.js
    if [ "${modEntry}" = "Index2" ]; then
      modEntry="Index"
    fi

    echo "module.exports['${modEntry}'] = require('./${fileEntry}')" >> index.js
    if [ -d "${fileEntry}" ]; then
      "${__file}" "${fileEntry}"
    fi
  done
popd > /dev/null
