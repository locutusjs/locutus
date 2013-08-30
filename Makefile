setup:
	git pull && \
	cd _octopress && \
	rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

test:
	cd _tests && npm install
	find functions -type f |grep -v '/_' |xargs node _tests/cli.js -f

site:
	git pull && \
	cd _octopress && \
	bundle install && \
	npm install && \
	rake integrate && \
	rake build && \
	rake generate && \
	rake deploy ; \
	cd .. ; \
	git add . ; \
	git commit -am "Update site" ; \
	git push origin master

site-clean:
	cd _octopress && \
	git clean -fd ; \
	git reset --hard ; \
	rake clean ; \
	cd ..

site-preview:
	cd _octopress && \
	rake build && \
	rake generate && \
	rake preview ; \
	cd ..

.PHONY: site%
