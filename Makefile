SHELL := /bin/bash

setup:
	git pull && \
	cd _octopress && \
	bundle exec rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

test: build
	#node tests/cli.js --debug --abort # To abort at first failure
	cd tests && npm install
	node bin/phpjs.js --action test --debug

# Apply code standards
cleanup:
	@[ -x `which gjslint` ] || sudo easy_install http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz
	fixjsstyle \
		--recurse ./ \
		--exclude_directories _octopress,experimental,workbench,tests/node_modules,tools \
		--max_line_length 100 \
		--nojsdoc \
		--error_trace \
		--strict \
		--jslint_error all

npm:
	node bin/phpjs.js --action buildnpm --output build/npm.js
	ls -al build/npm.js
	node build/npm.js
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
	git add . ; \
	git commit -am "Update site" ; \
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

.PHONY: site%
