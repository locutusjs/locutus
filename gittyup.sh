#!/bin/bash

function capinstall {
    if [ ! -x /var/lib/gems/1.8/bin/cap ]; then
        echo ""
        read -p "Capistrano not installed. Install? (Y/n)" answer
        if [ "${answer}" = "n" ] || [ "${answer}" = "N" ]; then
            echo ".. Skipping capistrano. Deploys not possible but you can still commit & push."
            exit 1
        else
            sudo echo "Please enter password to continue"
            sudo aptitude -y install rubygems libopenssl-ruby || exit 1
            sudo gem sources -a http://gems.github.com/ || exit 1
            sudo gem -v || exit 1
            sudo gem install capistrano || exit 1
            sudo gem install leehambley-railsless-deploy
            echo 'export PATH=$PATH:/var/lib/gems/1.8/bin' >> ~/.bashrc
        fi
        echo ""
    fi
}

function gitoptions {
    # Change according to: https://github.com/account
    git config --global github.user kvz
    git config --global github.token xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    git config --global user.name "Kevin van Zonneveld"
    git config --global user.email "kevin@vanzonneveld.net"

    # Pretty colors
    git config --global color.ui true
    git config --global color.status auto
    git config --global color.diff auto
    git config --global color.branch auto
    git config --global color.interactive auto

    # Handy Aliases
    git config --global alias.st status
    git config --global alias.ci commit
    git config --global alias.co checkout

    git config --global alias.lol 'log --pretty=oneline --abbrev-commit --graph --decorate'
}

function deploy {
    capinstall
    
    if [ ! -f ./Capfile ]; then
        echo "No capfile. First run: "
        echo "   capify ."
        echo ""
        exit 1
    fi

    if [ "${1}" = "first" ]; then
        cap deploy:setup
        cap deploy:check
        cap deploy:cold
    fi
    cap deploy
}


if [ "${1}" = "-deploy" ]; then
    if [ "${2}" = "-first" ]; then
        deploy "first"
    fi
    deploy
    exit 0
fi

echo "Comparing working directory with .git database (TAKES LONG OVER NFS/SAMBA!!) ..."
git status
#status=$(git status)
#x=$(echo "${status}" | grep 'working directory clean' |wc -l)
##for line in ${status}; do
#   echo ${line}
#done 
#if [ ${x} -ne 0 ]; then
#    exit 0
#fi
if [ -z "${1}" ]; then
    PREV_COMMENT=""
    if [ -f ~/.gitup.dat ]; then
        PREV_COMMENT=$(cat ~/.gitup.dat)
    fi
    if [ -f .gitup.dat ]; then
        PREV_COMMENT=$(cat .gitup.dat)
    fi
    
    if [ ! -f .gitignore ] || [ $(cat .gitignore |grep '.gitup.dat' |wc -l) -eq 0 ]; then
        echo '.gitup.dat' >> .gitignore
        git add .gitignore
        git add ${0}
    fi
    
    echo "You are about to commit & gitup changes"
    echo "Press CTRL+C now if you are unsure"
    echo ""

    while [ -z "${COMMENT}" ]; do
        read -p "Please tell me what you've done: (default is: '${PREV_COMMENT}') " COMMENT
        [ -z "${COMMENT}" ] && [ -n "${PREV_COMMENT}" ] && COMMENT="${PREV_COMMENT}"
    done
else
    if [ -n "${21}" ]; then
        echo "20 Words Max"
        exit 1
    fi
    COMMENT="${1} ${2} ${3} ${4} ${5} ${6} ${7} ${8} ${9} ${10} ${11} ${12} ${13} ${14} ${15} ${16} ${17} ${18} ${19} ${20}"
fi
echo "${COMMENT}" > .gitup.dat
echo "${COMMENT}" > ~/.gitup.dat

echo "Committing: ${COMMENT}..."
git commit -a -m "${COMMENT}" && git push origin 

echo ""
echo "Fixed: https://github.com/"`git config remote.origin.url`"/commit/"`git rev-parse HEAD`| sed -E s/[a-z]+@github\.com:// | sed 's#\.git##g'