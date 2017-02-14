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
# __file="${__dir}/$(basename "${0}")"
# __base="$(basename ${__file})"
__root="$(cd "$(dirname "${__dir}")" && pwd)"
__webroot="${__root}/website"

# Only set git user until we verified we're on Travis
# We don't want to change this during local experiments
git config --global user.name 'Locutus Bot'
git config --global user.email 'bot@locutus.io'

pushd "${__root}"
  sed -i.bak -e "s~git@github.com:kvz/locutus.git~${GHPAGES_URL}~" "${__webroot}/_config.yml"
  rm -f "${__webroot}/_config.yml.bak" # This .bak dance makes sed portable accross gnu/bsd
  # Travis docs: Note that pull request builds skip deployment step altogether.
  # https://docs.travis-ci.com/user/deployment/#Conditional-Releases-with-on
  npm run deploy
popd
