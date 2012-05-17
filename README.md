php.js is an open source project that brings high-level PHP
functions to low-level JavaScript platforms such as webbrowsers,
  AIR, V8 and rhino.

If you want to perform high-level operations on these platforms,
you probably need to write JS that combines it's lower-level
functions and build it up until you have something useful like:
md5(), strip_tags(), strtotime(), number_format(), wordwrap().

That's what we are doing for you.

More info at:

- [http://phpjs.org/](http://phpjs.org/)
- [http://github.com/kvz/phpjs/wiki/](http://github.com/kvz/phpjs/wiki/)

# Building the site
```shell
# install octopress dependencies (ruby & gems)
bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
rvm install 1.9.2 && rvm use 1.9.2
echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile
source ~/.bash_profile
cd _octopress
gem install bundler
bundle install
```

```shell
# build
rake generate
```

```shell
# deploy
rake deploy
```