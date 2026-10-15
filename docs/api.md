# API reference

## `slugify(text, options = {})`

Turns arbitrary text into a URL slug. Exported from `src/slugify.js`:

```js
const { slugify } = require("./src/slugify.js");
```

### Parameters

- `text` (`string`) - the text to convert.
- `options` (`object`, optional)
  - `maxLength` (`number`) - maximum length of the slug; see below.
  - `separator` (`"-"` or `"_"`, default `"-"`) - the character joining words.

### Return value

A lowercase ASCII string of letter and digit words joined by `-`. Accents are
stripped, apostrophes (U+0027 and U+2019) are dropped rather than treated as
separators, and `&` becomes `and`. Any remaining run of characters other than
ASCII letters or digits becomes a single separator, and leading and trailing
separators are dropped. Returns `""` when nothing is sluggable.

```js
slugify("Hello World"); // "hello-world"
slugify("  Hello,   World!!  "); // "hello-world"
slugify("Crème brûlée"); // "creme-brulee"
slugify("Don't stop"); // "dont-stop"
slugify("Top 10 tips"); // "top-10-tips"
slugify("!!!"); // ""
```

### `maxLength`

When the slug is longer than `maxLength`, it is trimmed at a word boundary.
A single word longer than the limit is hard-cut at `maxLength`.

```js
slugify("one two three", { maxLength: 9 }); // "one-two"
slugify("abcdefghij", { maxLength: 4 }); // "abcd"
```

### `separator`

Words are joined by `-` by default. Pass `separator: "_"` to join with `_`
instead; `maxLength` and `cut` behave the same way.

```js
slugify("Hello World", { separator: "_" }); // "hello_world"
slugify("one two three", { maxLength: 9, separator: "_" }); // "one_two"
```

### Errors

A non-string `text` throws a `TypeError` with the message
`"slugify expects a string"`.

```js
slugify(42); // throws TypeError: slugify expects a string
```

Any `separator` other than `"-"` or `"_"` throws a `TypeError` with the message
`'separator must be "-" or "_"'`, even for empty text.

```js
slugify("a b", { separator: "." }); // throws TypeError: separator must be "-" or "_"
```
