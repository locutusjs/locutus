Thank you so much for becoming a php.js contributor!

Here are a few pointers that could save us from disappointment, we'll keep it brief:

1. By submitting a Pull Request you are giving php.js permission to distribute your code under the MIT License.
1. Please adhere to our [coding standards](/blog/2016/04/01/standard-coding-style/).
1. Please credit yourself in the function's header-comment: `(original by|improved by|bugfixed by|revised by|input by): Your Name (http://your.url)`
1. If you're fixing bad behavior, please add an `example` that would fail before your patch, and a `result` that passes after your patch, to the function's header-comment
1. Since we are mimicking PHP, our `array_` functions need to accept Objects, which is the closest thing to the hash-table like data-structure that PHP calls an array. Please keep this in mind as you're proposing optimizations.
1. Sometimes we place `for` inside `if` for performance reasons, even if the code could be twice as small if we did this the other way around.
