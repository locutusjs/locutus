site:
	pushd _octopress && \
	rake build && \
	rake generate && \
	rake deploy && \
	popd ; \
	git add . ; \
	git commit -am 'update site' ; \
	git push origin master

.PHONY: site%
