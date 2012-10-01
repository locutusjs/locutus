site:
	git pull && \
	cd _octopress && \
	cd _deploy && \
	git remote add origin git@github.com:kvz/phpjs.git ; \
	cd .. ; \
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
