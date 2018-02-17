**work in progress, not yet released**

---

# hyperaxe

Enchanted [`hyperscript`](https://github.com/hyperhype/hyperscript) weapon.

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

## Install

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install hyperaxe --save
```

## Usage

hyperaxe exports a function that takes a tag name as a string and returns a HTML element factory function.

```js
var x = require('hyperaxe')

x('div')()
// <div></div>
```

The API, inspired by [`reaxe`](https://github.com/jxnblk/reaxe), is similar to `hyperscript` or `React.createElement`, but a little more flexible.

```js
x('.hello')(
  { style: 'color: red' },
  x('.cool')('kewl'),
  x('.world')('earth')
)
// <div class="hello" style="color: red">
//   <div class="cool">kewl</div>
//   <div class="world">earth</div>
// </div>
```

Every valid HTML tag is available as a named export.

```js
var { a, img, video } = require('hyperaxe')

a({ href: '#' }, 'click')
// <a href="#">click</a>

img({ src: 'cats.gif', alt: 'lolcats' })
// <img src="cats.gif" />

video({ src: 'dogs.mp4', autoplay: true })
// <video src="cats.mp4" autoplay></video>
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

todo

## Dependencies

- [html-tags](https://ghub.io/html-tags): List of standard HTML tags.
- [hyperscript](https://ghub.io/hyperscript): Create HyperText with JavaScript, on client or server.
- [is-plain-object](https://ghub.io/is-plain-object): Returns true if an object was created by the `Object` constructor.

## Dev Dependencies

- [standard](https://ghub.io/standard): JavaScript Standard Style.
- [tap-spec](https://ghub.io/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter.
- [tape](https://ghub.io/tape): tap-producing test harness for node and browsers.

## Contributing

Contributors welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## License

[ISC](LICENSE.md)
