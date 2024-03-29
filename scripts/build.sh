#! /bin/bash
###########################################
#
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)


# functions

# main
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
cd `pwd`
cd $baseDir/..
docker build \
    --no-cache=true \
    --force-rm=true --tag kaiyuanshe/osschat:develop .