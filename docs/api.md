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

### Errors

A non-string `text` throws a `TypeError` with the message
`"slugify expects a string"`.

```js
slugify(42); // throws TypeError: slugify expects a string
```

## `isSlug(text)`

Exported from `src/is-slug.js`:

```js
const { isSlug } = require("./src/is-slug.js");
```

Returns `true` when `text` is a well-formed slug: non-empty runs of `a-z` and
`0-9` joined by single hyphens, with no leading or trailing hyphen. The empty
string is not a slug.

```js
isSlug("hello-world"); // true
isSlug("Hello"); // false
isSlug("a--b"); // false
isSlug(""); // false
isSlug(42); // false
```

`isSlug` never throws: any non-string returns `false`.

## `sameSlug(a, b, options)`

Returns `true` when `a` and `b` produce the same slug. `options` is optional and
is passed unchanged to both `slugify` calls.

```js
sameSlug("Hello wonderful world", "Hello wonderful people"); // false
sameSlug("Hello wonderful world", "Hello wonderful people", { maxLength: 15 }); // true
```

Errors are those of `slugify`: a non-string argument throws a `TypeError`, and an
invalid `maxLength` throws a `RangeError`.
