SHELL := /bin/bash

setup:
	git pull && \
	cd _octopress && \
	bundle exec rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

test:
	ulimit -n 1024 ||true
	npm install
	make build
	./node_modules/.bin/mocha --reporter list
	node bin/phpjs.js --action test --debug

# Apply code standards & reformat headers
cleanup:
	node bin/phpjs.js --action cleanup

npm:
	node bin/phpjs.js --action buildnpm --output build/npm.js
	ls -al build/npm.js
	node build/npm.js
	node test/npm/npm.js
	echo "Build success. "

publish: npm
	npm publish

build: npm

hook:
	mkdir -p ~/.gittemplate/hooks
	curl https://raw.github.com/kvz/ochtra/master/pre-commit -o ~/.gittemplate/hooks/pre-commit
	chmod u+x ~/.gittemplate/hooks/pre-commit
	git config --global init.templatedir '~/.gittemplate'
	rm .git/hooks/pre-commit || true
	git init

site:
	git pull && \
	cd _octopress && \
	bundle install && \
	npm install && \
	bundle exec rake integrate && \
	bundle exec rake build && \
	bundle exec rake generate && \
	bundle exec rake deploy ; \
	cd .. ; \
	git add --all . ; \
	git commit -anm "Update site" ; \
	git push origin master

site-clean:
	cd _octopress && \
	git clean -fd ; \
	git reset --hard ; \
	bundle exec rake clean ; \
	cd ..

site-preview:
	cd _octopress && \
	bundle exec rake build && \
	bundle exec rake generate && \
	bundle exec rake preview ; \
	cd ..

.PHONY: setup test cleanup npm publish build hook site%
