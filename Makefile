SHELL := /bin/bash

.PHONY: setup
setup:
	git pull && \
	cd _octopress && \
	bundle exec rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

.PHONY: test
test:
	ulimit -n 1024 ||true
	npm install
	make build
	./node_modules/.bin/mocha --reporter list
	node bin/phpjs.js --action test --debug

# Apply code standards & reformat headers
.PHONY: cleanup
cleanup:
	./node_modules/.bin/jscs --fix functions/
	# node bin/phpjs.js --action cleanup

.PHONY: serve
serve:
	python -m SimpleHTTPServer

.PHONY: upgrade-npm-dependencies
upgrade-npm-dependencies:
	@npm install
	@./node_modules/.bin/npm-check-updates --upgrade
	@npm install
	@$(MAKE) test
	@git add ./package.json
	@git commit -m'Upgrade NPM dependencies'
	@git pull && git push

.PHONY: test-cleanup
test-cleanup:
	node bin/phpjs.js --action cleanup --name array_change_key_case
	node bin/phpjs.js --action cleanup --name echo
	git diff functions/array/array_change_key_case.js
	git diff functions/strings/echo.js
	git checkout -- functions/array/array_change_key_case.js
	git checkout -- functions/strings/echo.js

.PHONY: npm
npm:
	node bin/phpjs.js --action buildnpm --output build/npm.js
	ls -al build/npm.js
	node build/npm.js
	node test/npm/npm.js
	echo "Build success. "

.PHONY: publish
publish: npm
	npm publish

.PHONY: build
build: npm

.PHONY: hook
hook:
	mkdir -p ~/.gittemplate/hooks
	curl https://raw.github.com/kvz/ochtra/master/pre-commit -o ~/.gittemplate/hooks/pre-commit
	chmod u+x ~/.gittemplate/hooks/pre-commit
	git config --global init.templatedir '~/.gittemplate'
	rm .git/hooks/pre-commit || true
	git init

.PHONY: site
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

.PHONY: site-clean
site-clean:
	cd _octopress && \
	git clean -fd ; \
	git reset --hard ; \
	bundle exec rake clean ; \
	cd ..

.PHONY: site-preview
site-preview:
	cd _octopress && \
	bundle exec rake build && \
	bundle exec rake generate && \
	bundle exec rake preview ; \
	cd ..
