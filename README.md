<div align="center">

<img src="./axe.png" alt="HyperAxe" width="200">

# HyperAxe

An enchanted [hyperscript](https://github.com/hyperhype/hyperscript) weapon.

[![npm][1]][2]
[![travis][3]][4]
[![standard][5]][6]
[![downloads][7]][2]

[1]: https://img.shields.io/npm/v/hyperaxe.svg?style=flat-square
[2]: https://www.npmjs.com/package/hyperaxe
[3]: https://img.shields.io/travis/ungoldman/hyperaxe/master.svg?style=flat-square
[4]: https://travis-ci.org/ungoldman/hyperaxe
[5]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[6]: http://standardjs.com/
[7]: https://img.shields.io/npm/dm/hyperaxe.svg?style=flat-square

</div>

```sh
npm install hyperaxe
```

```js
var { body, h1 } = require('hyperaxe')

body(
  h1('hello world')
)
// => <body><h1>hello world</h1></body>
```

## Usage

Exports all [HTML tags](https://ghub.io/html-tags).

```js
var { a, img, video } = require('hyperaxe')

a({ href: '#' }, 'click')
// <a href="#">click</a>

img({ src: 'cats.gif', alt: 'lolcats' })
// <img src="cats.gif" alt="lolcats">

video({ src: 'dogs.mp4', autoplay: true })
// <video src="dogs.mp4" autoplay="true"></video>
```

Default export accepts a tag and returns an element factory.

```js
var x = require('hyperaxe')
var p = x('p')

p('over 9000')
// <p>over 9000</p>
```

CSS shorthand works too.

```js
var x = require('hyperaxe')
var horse = x('.horse.with-hands')

horse('neigh')
// <div class="horse with-hands">neigh</div>
```

Makes creating custom components easy.

```js
var x = require('hyperaxe')

var siteNav = (...links) => x('nav.site')(
  links.map(link =>
    x('a.link')({ href: link.href }, link.text)
  )
)

x.body(
  siteNav(
    { href: '#apps', text: 'apps' },
    { href: '#games', text: 'games' }
  )
)
// <body>
//   <nav class="site">
//     <a class="link" href="#apps">apps</a>
//     <a class="link" href="#games">games</a>
//   </nav>
// </body>
```

## Example

Here's a counter increment example using [`nanochoo`](https://github.com/heyitsmeuralex/nanochoo):

```js
var { body, button, h1 } = require('hyperaxe')
var nano = require('nanochoo')

var app = nano()

app.use(store)
app.view(view)
app.mount('body')

function view (state, emit) {
  return body(
    h1(`count is ${state.count}`),
    button({ onclick }, 'Increment')
  )

  function onclick () {
    emit('increment', 1)
  }
}

function store (state, emitter) {
  state.count = 0

  emitter.on('increment', function (count) {
    state.count += count
    emitter.emit('render')
  })
}
```

## API

### `hyperaxe`

```js
hyperaxe(tag) => ([props], [...children]) => HTMLElement
```

- `tag` _string_ - valid HTML tag name or CSS shorthand (required)
- `props` _object_ - HTML attributes (optional)
- `children` _node, string, number, array_ - child nodes or primitives (optional)

Returns a function that creates HTML elements.

The factory is [variadic](https://en.wikipedia.org/wiki/Variadic_function), so any number of children are accepted.

```js
x('.variadic')(
  x('h1')('hi'),
  x('h2')('hello'),
  x('h3')('hey'),
  x('h4')('howdy')
)
```

Arrays of children also work.

```js
var kids = [
  x('p')('Once upon a time,'),
  x('p')('there was a variadic function,'),
  x('p')('that also accepted arrays.')
]

x('.arrays')(kids)
```

In a browser context, the object returned by the factory is an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) object. In a server (node) context, the object returned is an instance of [`html-element`](https://github.com/1N50MN14/html-element). In both contexts, the stringified HTML is accessible via the [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) attribute.

### `hyperaxe[tag]`

All [HTML tags](https://ghub.io/html-tags) are attached to `hyperaxe` as keys.

They return the same function as described above, with the `tag` argument prefilled.

Think of it as a kind of [partial application](https://en.wikipedia.org/wiki/Partial_application).

The main motivation for doing this is convenience.

```js
var { p } = require('hyperaxe')

p('this is convenient')
```

## Enchantments

- Summons DOM nodes.
- +1 vs. virtual DOM nodes.
- Grants [Haste](http://engl393-dnd5th.wikia.com/wiki/Haste).

## Dependencies

- [html-tags](https://ghub.io/html-tags): List of standard HTML tags.
- [hyperscript](https://ghub.io/hyperscript): Create HyperText with JavaScript, on client or server.

## Dev Dependencies

- [standard](https://ghub.io/standard): JavaScript Standard Style.
- [standard-version](https://ghub.io/standard-version): Replacement for `npm version` with automatic CHANGELOG generation.
- [tap-spec](https://ghub.io/tap-spec): Formatted TAP output like Mocha's spec reporter.
- [tape](https://ghub.io/tape): tap-producing test harness for node and browsers.

## See Also

This library's approach and API are heavily inspired by [reaxe](https://github.com/jxnblk/reaxe).

## Contributing

Contributors welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## License

[ISC](LICENSE.md)

Axe image is from [emojidex](https://emojidex.com/emoji/axe).
