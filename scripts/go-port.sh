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

[ -d "${GOPATH}/src/github.com/gopherjs/gopherjs" ] || go get -u github.com/gopherjs/gopherjs
[ -d "${GOPATH}/src/github.com/golang/go" ] || go get -u github.com/golang/go

pushd "${__dir}"
  "${GOPATH}/bin/gopherjs" build --verbose main.go
  ls main.js
  "${__root}/node_modules/.bin/eslint" --fix main.js
popd
