# Building the site

## Prerequisites

The site is built using Octopress. For instructions how to set things up, 
please check [here](http://kvz.io/blog/2012/09/25/blog-with-octopress/).

## build, generate, commit, push, deploy

```shell
make site MSG="Updated site"
```

## preview locally

```shell
make site-preview
```

## reset site (should not be necessary)

```shell
make site-clean
```
