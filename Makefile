setup:
	git pull && \
	cd _octopress && \
	bundle exec rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

test:
	cd tests && npm install
	find functions -type f |grep -v '/_' |sed 's@\.js$$@@g' |awk -F/ '{print "node tests/cli.js -f "$$NF}' |bash

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
