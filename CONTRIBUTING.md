Thank you so much for being or becoming a Locutus contributor!

Even if you have write access already, all code changes should be done via a Pull Request. This way
we can peer-review, and also Travis CI can check if the code adheres to our policies already before
merging it into `master`.

## Contributing Checklist

Here are a few pointers that could save us from disappointment, we'll try to keep it brief!

1. By submitting a Pull Request you are giving Locutus permission to distribute your code under the MIT License.
1. Please adhere to our [updated coding standards](/blog/2016/04/standard-coding-style/). Use `npm run lint` to check. Code should:
  - Follow the [JavaScript Standard Style](http://standardjs.com/), and in addition:
  - Not have lines longer than 100 chars
  - Use `//` for comments instead of `/*`
  - Avoid using lengthy (3+ word) comments on the same line as code
1. Please credit yourself in the function's header-comment: `(original by|reimplemented by|improved by|parts by|bugfixed by|revised by|input by): Your Name (http://your.url)`
1. If you are fixing bad behavior, or introducing new ones, please add an `example` that would fail before your patch, and a `result` that passes after your patch, to the function's header-comment. We use these for website documentation, as well as to generate test cases that avoid regression going forward. There should already be a few ones there if you want to see how it's done.
1. If you are contributing performance upgrades, please provide proof via e.g. <http://jsperf.com>
1. Please keep in mind that some obvious readability improvements are sometimes unwanted for performance reasons. For example, we sometimes place similar `for` loops inside `if` and `else` conditions for performance reasons, even though the code could be half the size if we put the conditions inside a single loop.

## Locutus Development

For ease of development, we recommend these global installs:

```bash
npm install --global mocha babel-cli hexo
```

## Clone

```bash
cd ~/code
git clone git@github.com:kvz/locutus.git
cd locutus
```

## Install

```bash
npm install 
npm run website:install
```

## Test

```bash
npm run test
```

Single out one function: `natsort`

```bash
TEST_GREP=natsort npm run test:languages
```

This first rewrites mocha test-cases based on `example` and `result` comments found in the function's headers. This is useful if you're changing the tests themselves as well. 

If that's not needed as you're iterating purely on the implementation, here's a speedier way of singling out `natsort`. This re-uses an already generated mocha test:

```bash
env DEBUG=locutus:* mocha \
  --compilers js:babel-register \
  --reporter spec \
test/languages/php/array/test-natsort.js
```

## Website Development

We keep the website in `./website` so it's easy to keep code and website in sync as we iterate. For those reading this screaming murder, [HashiCorp does this](https://github.com/hashicorp/terraform/tree/master/website) for all their projects, and it's working well for them on a scale more impressive than ours.

Our website is built with Hexo. To install the prerequisites type `npm run website:install`.

Even the the website is bundled with this repo, we treat it as a separate project, with its own `package.json`. We also try to avoid dependencies from the website straight to the main code base. Instead, any such dependency shall be injected by a script.

Here's the flow that takes written functions to the website:

 - `npm run injectweb` runs `src/_util/util.js`'s `injectweb` method
 - `injectweb` iterates over functions and parses them via the `_load` and `_parse` methods, specifically: the header comments that declare authors, tests, and dependencies
 - `injectweb` then writes each function to `website/source`. The code is written as the content. The other parsed properties are prepended as [YAML front matter](https://jekyllrb.com/docs/frontmatter/)
 - Jekyll uses `website/_layouts/function.html` as the layout template for the function collection, this determines how all the properties are rendered.
 
Blog posts can be found in `website/source/_posts`.
 
If you want to preview locally type `npm run website:start`.

Any change to `master` is deployed automatically onto GitHub Pages by Travis CI via the `travis-deploy.sh` script.

Typing `npm run deploy` in the root of the project takes care of all the building steps, and then force pushes the generated HTML to the `gh-pages` branch of this repo. But as mentioned, this should not be necessary as Travis handles it automatically.
