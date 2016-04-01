#!/usr/bin/env bash
# Copyright (c) 2016, Transloadit Ltd.
# Authors:
#  - Kevin van Zonneveld <kevin@transloadit.com>

set -o pipefail
set -o errexit
set -o nounset
set -o xtrace

# Set magic variables for current FILE & DIR
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${0}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

node_modules/.bin/bower --config.interactive=false install
which bundle 2>/dev/null || sudo gem install bundler -v 1.10.0 -n /usr/local/bin
bundle install --path vendor/bundle || bundle update
