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

if [ "${1:-}" = "--no-yaml" ]; then
  yaml=iAintNeverGonnaExist
else
  yaml=yml
fi

pushd "${__root}" > /dev/null

find . \
  -not \( -path ./_site -prune \) \
  -not \( -path ./assets/bower -prune \) \
  -not \( -path ./assets/build -prune \) \
  -not \( -path ./example_apps -prune \) \
  -not \( -path ./node_modules -prune \) \
  -not \( -path ./press.yml -prune \) \
  -not \( -path ./README.md -prune \) \
  -not \( -path ./SIZES.md -prune \) \
  -not \( -path ./vendor -prune \) \
  -not \( -path ./_data -prune \) \
  -not \( -path ./_random -prune \) \
  -not \( -path artwork.yml -prune \) \
  -not \( -path generated_demos.yml -prune \) \
  -not \( -path generated_formats.yml -prune \) \
  -not \( -path generated_presets.yml -prune \) \
  -not \( -path ./.jekyll-crosspost_to_medium -prune \) \
  -name \*.md \
  -o \
  -name \*.markdown \
  -o \
  -name \*.${yaml} \
  ! -name _config-asset-index-development.yml \
  ! -name _config-asset-index-production.yml \
  ! -name _config.yml \
|| false

popd > /dev/null
