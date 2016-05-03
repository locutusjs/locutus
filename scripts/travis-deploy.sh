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
__webroot="${__root}/website"

git config --global user.name 'Locutus Bot'
git config --global user.email 'bot@locutusjs.io'

pushd "${__webroot}"
  sed -i.bak -e "s~git@github.com:kvz/locutus.git~${GHPAGES_URL}~" _config.yml && rm -f _config.yml.bak
  if [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
    npm run deploy
  else
    echo "Skipping for non-PRs"
  fi
popd
