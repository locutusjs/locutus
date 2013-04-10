#!/bin/bash
#
# php.js source cleaner
# Version v0.0.1
# More info: http://phpjs.org
#
# Licensed under MIT: http://kvz.io/licenses/LICENSE-MIT
# Copyright (c) 2013 Kevin van Zonneveld
# http://twitter.com/kvz
#
# Usage:
#  LOG_LEVEL=7 ./template.sh -f /tmp/foo -d 
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

__FUNCTIONS__="${__ROOT__}"

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


### Switches (like -d for debugmdoe, -h for showing helppage)
#####################################################################

# debug mode
if [ "${arg_d}" = "1" ]; then
  # turn on tracing
  set -x
  # output debug messages
  LOG_LEVEL="7"
fi


### Validation (decide what's required for running your script and error out)
#####################################################################

[ -z "${LOG_LEVEL}" ] && emergency "Cannot continue without LOG_LEVEL. "


### Runtime
#####################################################################

# Exit on error. Append ||true if you expect an error.
# set -e is safer than #!/bin/bash -e because that is nutralised if
# someone runs your script like `bash yourscript.sh`
set -eu

# Bash will remember & return the highest exitcode in a chain of pipes.
# This way you can catch the error in case mysqldump fails in `mysqldump |gzip`
set -o pipefail

info "--> end all files with a newline in ${__FUNCTIONS__}"
pushd ""
  for js_file in $(find "${__FUNCTIONS__}" -type f -name *.js); do 
  	if [ -n "$(tail -c 1 <"${js_file}")" ]; then 
	  notice "--> adding newline in ${js_file}"

  	  echo >>"${js_file}"; 
  	fi; 
  done
popd