#!/bin/bash
git pull origin
if [ "${1}" = "-modules" ]; then
    git submodule status
    git submodule update --init

    for mod in `git submodule status | awk '{ print $2 }'`; do
        if [ -z "${2}" ] || [ "${2}" = "${mod}" ]; then
            changed=0
            echo -n "${mod} "
            cd ${mod}
            git pull origin master && changed=1
            git checkout master
            cd -
            if [ "${changed}" -ne 1 ]; then
                echo "not changed."
            else
                echo "changed. updating references"
                git add ${mod}
                git commit -m "Updated submodule ${mod}"
            fi
        fi
    done
    
    exit 0
fi
