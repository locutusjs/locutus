Thank you so much for becoming a Locutus contributor!

Even if you have write access, all code changes should be done via a Pull Request. This way
we can peer-review, and also Travis CI can check if the code adheres to our policies before
merging it into `master`.

Here are a few pointers that could save us from disappointment, we'll try to keep it brief!

1. By submitting a Pull Request you are giving Locutus permission to distribute your code under the MIT License.
1. Please adhere to our [updated coding standards](/blog/2016/04/standard-coding-style/). Use `npm run lint` to check. Code should:
  - Follow the [JavaScript Standard Style](http://standardjs.com/), and in addition:
  - Not have lines longer than 100 chars
  - Use `//` for comments instead of `/*`
  - Avoid using lengthy (3+ word) comments on the same line as code
1. Please credit yourself in the function's header-comment: `(original by|reimplemented by|improved by|parts by|bugfixed by|revised by|input by): Your Name (http://your.url)`
1. If you are fixing bad behavior, or introducing new ones, please add an `example` that would fail before your patch, and a `result` that passes after your patch, to the function's header-comment. We use these for website documentation, as well as to generate test cases that avoid regression going forward. There should already be a few ones there if you want to see how it's done.
1. Please keep in mind that some obvious readability improvements are sometimes unwanted for performance reasons. For example, we sometimes place similar `for` loops inside `if` and `else` conditions for performance reasons, even though the code could be half the size if we put the conditions inside a single loop.
