setup:
	git pull && \
	cd _octopress && \
	rake setup_github_pages\[git@github.com:kvz/phpjs.git\] && \
	cd .. ; \

site:
	git pull && \
	cd _octopress && \
	bundle install && \
	rake integrate && \
	rake build && \
	rake generate && \
	rake deploy ; \
	cd .. ; \
	git add . ; \
	git commit -am "${MSG}" ; \
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
