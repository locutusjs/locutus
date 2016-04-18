#!/bin/bash
#
# php.js source cleaner
# Version v0.0.2
# More info: http://phpjs.org
#
# Licensed under MIT: http://kvz.io/licenses/LICENSE-MIT
# Copyright (c) 2013 Kevin van Zonneveld
# http://twitter.com/kvz
#
# Usage:
#  LOG_LEVEL=7 ./beautify.sh
#
#
# Based on BASH3 Boilerplate v0.0.3 (https://github.com/kvz/bash3boilerplate)
# Licensed under MIT: http://kvz.io/licenses/LICENSE-MIT
# Copyright (c) 2013 Kevin van Zonneveld
# http://twitter.com/kvz
#


### Configuration
#####################################################################

# Environment variables
[ -z "${LOG_LEVEL}" ] && LOG_LEVEL="6" # 7 = debug, 0 = emergency

# Set magic variables for current FILE & DIR
__DIR__="$(cd "$(dirname "${0}")"; echo $(pwd))"
__ROOT__="$(cd "$(dirname "${0}")/.."; echo $(pwd))"
__FILE__="${__DIR__}/$(basename "${0}")"

__FUNCTIONS__="${__ROOT__}/functions"

### Functions
#####################################################################

function _fmt ()      {
  color_ok="\x1b[32m"
  color_bad="\x1b[31m"

  color="${color_bad}"
  if [ "${1}" = "debug" ] || [ "${1}" = "info" ] || [ "${1}" = "notice" ]; then
    color="${color_ok}"
  fi

  color_reset="\x1b[0m"
  if [ "${TERM}" != "xterm" ] || [ -t 1 ]; then
    # Don't use colors on pipes or non-recognized terminals
    color=""; color_reset=""
  fi
  echo -e "$(date -u +"%Y-%m-%d %H:%M:%S UTC") ${color}$(printf "[%9s]" ${1})${color_reset}";
}
function emergency () {                             echo "$(_fmt emergency) ${@}" || true; exit 1; }
function alert ()     { [ "${LOG_LEVEL}" -ge 1 ] && echo "$(_fmt alert) ${@}" || true; }
function critical ()  { [ "${LOG_LEVEL}" -ge 2 ] && echo "$(_fmt critical) ${@}" || true; }
function error ()     { [ "${LOG_LEVEL}" -ge 3 ] && echo "$(_fmt error) ${@}" || true; }
function warning ()   { [ "${LOG_LEVEL}" -ge 4 ] && echo "$(_fmt warning) ${@}" || true; }
function notice ()    { [ "${LOG_LEVEL}" -ge 5 ] && echo "$(_fmt notice) ${@}" || true; }
function info ()      { [ "${LOG_LEVEL}" -ge 6 ] && echo "$(_fmt info) ${@}" || true; }
function debug ()     { [ "${LOG_LEVEL}" -ge 7 ] && echo "$(_fmt debug) ${@}" || true; }

function help () {
  echo ""
  echo " ${@}"
  echo ""
  echo "  ${usage}"
  echo ""
  exit 1
}


### Validation (decide what's required for running your script and error out)
#####################################################################

[ -z "${LOG_LEVEL}" ] && emergency "Cannot continue without LOG_LEVEL. "

# Setup (g)sed
if which gsed; then
  alias sed=gsed
fi
gsed -v > /dev/null 2>&1
if [ "${?}" -ne 4 ]; then
  emergency "You need GNU sed, brew install gsed on osx"
fi
dos2unix -v > /dev/null 2>&1
if [ "${?}" -ne 1 ]; then
  emergency "You need dos2unix, brew install dos2unix on osx"
fi


### Runtime
#####################################################################

# Exit on error. Append ||true if you expect an error.
# set -e is safer than #!/bin/bash -e because that is nutralised if
# someone runs your script like `bash yourscript.sh`
set -eu

# Bash will remember & return the highest exitcode in a chain of pipes.
# This way you can catch the error in case mysqldump fails in `mysqldump |gzip`
set -o pipefail

for js_file in $(find "${__FUNCTIONS__}" -type f -name '*.js'); do
  info "Cleaning up ${js_file}"

  # Add trailing newline where needed
  if [ -n "$(tail -c 1 <"${js_file}")" ]; then
    echo >>"${js_file}"
  fi

  # Change tabs to 2 spaces
  sed -i.bak -e ':repeat; s/^\(\(  \)*\)\t/\1  /; t repeat' "${js_file}" && rm "${js_file}.bak"

  # Change dos to unix newlines
  dos2unix -q -o "${js_file}"

  # Remove trailing whitespace
  sed -i.bak 's/[[:space:]]*$//g' "${js_file}" && rm "${js_file}.bak"
done
