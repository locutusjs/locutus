setup:
	git pull && \
	cd _octopress && \
	bundle exec rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

test:
	#node tests/cli.js --debug --abort # To abort at first failure
	cd tests && npm install
	node tests/cli.js --debug

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
