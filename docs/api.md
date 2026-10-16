# API reference

Requires Node.js 20 or later (see `engines` in `package.json`).

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

A defined `maxLength` that is not a positive integer throws a `RangeError`
with the message `"maxLength must be a positive integer, got <value>"`, where
`<value>` is `String(maxLength)`.

```js
slugify("x", { maxLength: 0 }); // throws RangeError: maxLength must be a positive integer, got 0
```

## `slugWords(text)`

Counts the words in the slug of a string. Exported from `src/slug-words.js`:

```js
const { slugWords } = require("./src/slug-words.js");
```

Returns the number of hyphen-separated words in `slugify(text)`, or `0` when
the slug is empty.

```js
slugWords("Hello World"); // 2
slugWords("!!!"); // 0
slugWords("Crème brûlée & co"); // 4 ("&" becomes the word "and")
```

### Errors

A non-string `text` throws a `TypeError` (via `slugify`) with the message
`"slugify expects a string"`.

```js
slugWords(42); // throws TypeError: slugify expects a string
```

## `isSlug(text, options)`

Exported from `src/is-slug.js`:

```js
const { isSlug } = require("./src/is-slug.js");
```

Returns `true` when `text` is a well-formed slug: non-empty runs of `a-z` and
`0-9` joined by single separators, with no leading or trailing separator. The
empty string is not a slug. `options` is optional; `separator` is `"-"` (the
default) or `"_"`.

```js
isSlug("hello-world"); // true
isSlug("Hello"); // false
isSlug("a--b"); // false
isSlug(""); // false
isSlug(42); // false
isSlug("a_b", { separator: "_" }); // true
isSlug("a-b", { separator: "_" }); // false
```

`isSlug` never throws for the `text` argument: any non-string returns `false`.
A `separator` other than `"-"` or `"_"` throws a `TypeError` with the message
`'separator must be "-" or "_"'`.

## `deslugify(slug)`

Turns a slug back into readable text. Exported from `src/deslugify.js`:

```js
const { deslugify } = require("./src/deslugify.js");
```

Every `-` becomes a space and the first character is uppercased. The rest
keeps its case.

```js
deslugify("hello-world"); // "Hello world"
```

### Errors

A non-string `slug` throws a `TypeError` with the message
`"deslugify expects a string"`.

```js
deslugify(42); // throws TypeError: deslugify expects a string
```

## `sameSlug(a, b, options)`

Returns `true` when `a` and `b` produce the same slug under `slugify`, otherwise
`false`. Exported from `src/same-slug.js`:

```js
const { sameSlug } = require("./src/same-slug.js");
```

`options` is optional and is passed unchanged to both `slugify` calls.

```js
sameSlug("Hello World", "hello-world"); // true
sameSlug("Hello wonderful world", "Hello wonderful people"); // false
sameSlug("Hello wonderful world", "Hello wonderful people", { maxLength: 15 }); // true
```

### Errors

Errors are those of `slugify`. When either argument is not a string it throws a
`TypeError` with the message `"slugify expects a string"`, and an invalid
`maxLength` throws a `RangeError`.

```js
sameSlug(42, "a"); // throws TypeError: slugify expects a string
```

## `toAnchors(headings)`

Exported from `src/anchors.js`.

```js
const { toAnchors } = require("./src/anchors.js");
```

Takes an array of heading strings, slugifies each one with `slugify`, and
returns an array of the same length and order. The first occurrence of a slug
stays bare; later repeats get `-1`, `-2`, ... A suffixed candidate that is
already taken is skipped, so the result never contains duplicates. The
function is pure: no state is kept between calls.

```js
toAnchors(["Intro", "Intro", "Setup"]); // ["intro", "intro-1", "setup"]
```

## `slugifyFilename(name)`

Slugifies a filename while keeping its last extension in lower case. Exported
from `src/filename.js`:

```js
const { slugifyFilename } = require("./src/filename.js");
```

Earlier dots become `-`. A leading dot does not count as an extension. When the
stem is empty or the extension is not plain `[a-z0-9]`, the whole name is
slugified instead.

```js
slugifyFilename("My Holiday Photo.JPG"); // "my-holiday-photo.jpg"
slugifyFilename(".env"); // "env"
```

A non-string `name` throws the same `TypeError` as `slugify`.

## Performance

Measured with `node scripts/bench.js` (a fixed 50-string corpus, run for 150 s)
on Node v24.21.0 on 2026-10-15:

```
slugify: 1361883 ops/s
```
