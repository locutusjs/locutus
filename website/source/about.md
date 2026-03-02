---
layout: page
title: "We are Locutus"
date: false
comments: true
permalink: /
alias:
- /pages/contact/
- /about/
---

> All your standard libraries will be assimilated into our ~~JavaScript~~ [TypeScript](/2026/03/locutus-4-0/) collective. Resistance is futile.

Locutus is {% locutus_func_count %} TypeScript implementations of standard library functions from {% locutus_lang_count %} programming languages: {% locutus_lang_list %}. The project has been running since 2008 and has had [137 contributors](https://github.com/locutusjs/locutus/graphs/contributors).

Most of these started as rainy Sunday afternoon puzzles. Some are genuinely useful. Some are just fun to write. All of them are a way to learn how different languages solve the same problems, by reimplementing their standard library functions in TypeScript.

You can install individual functions via npm and tree-shake everything else away:

```ts
import { sprintf } from 'locutus/php/strings/sprintf'
import { Contains } from 'locutus/golang/strings/Contains'
```

## What we are not

Locutus is **not a drop-in standard library for TypeScript**. If you need a well-rounded utility library, [lodash](https://lodash.com/) is the better choice.

That said, there are useful things here, and Locutus makes it easy to pull in just a single function. The notes on each function page should help you judge its maturity.

## What we port

Individual functions from standard libraries. We stay away from language constructs, global environment, data types, and extending built-in natives. We tried some of that in the early days and it did not end well. Other projects are welcome to take a stab at it using our MIT-licensed sources.

## A community effort

Not unlike Wikipedia, Locutus is an ongoing community effort. Our philosophy follows [The McDonald's Theory](https://medium.com/what-i-learned-building/9216e1c9da7d). Many of our functions are first iterations that could be improved. We hope they inspire you to come up with something better.

## Contributing

We use [GitHub](https://github.com/locutusjs/locutus) for collaboration. There are a few guidelines in our [CONTRIBUTING.md](https://github.com/locutusjs/locutus/blob/HEAD/CONTRIBUTING.md). It would be helpful to glance over them before submitting your work.

## Licensing

Locutus is [MIT licensed](https://github.com/locutusjs/locutus/blob/HEAD/LICENSE). Use it however you like, including in commercial projects, as long as the license travels with it.
