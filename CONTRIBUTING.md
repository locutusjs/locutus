Thank you so much for becoming a Locutus contributor!

Even if you have write access, all code changes should be done via a pull request. This way
we can peer-review, and also Travis CI can check if the code adheres to our policies before
merging it in.

Here are a few pointers that could save us from disappointment, we'll keep it brief:

1. By submitting a Pull Request you are giving Locutus permission to distribute your code under the MIT License.
1. Please adhere to our [updated coding standards](/blog/2016/04/standard-coding-style/). Use `npm run lint` to check. Code should:
  - Follow the [JavaScript Standard Style](http://standardjs.com/)
  - Not have lines longer than 100 chars
  - Use `//` for comments instead of `/*`
  - Avoid using lengthy (3+ words) comments on the same line as code
1. Please credit yourself in the function's header-comment: `(original by|reimplemented by|improved by|parts by|bugfixed by|revised by|input by): Your Name (http://your.url)`
1. If you are fixing bad behavior, please add an `example` that would fail before your patch, and a `result` that passes after your patch, to the function's header-comment
1. Sometimes we place `for` inside `if` for performance reasons, even though the code could be half the size if we did this the other way around.
