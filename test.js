var x = require('./')
var test = require('tape')
var tags = require('html-tags')

test('factory function signature', t => {
  t.plan(5)

  t.equal(typeof x, 'function', 'factory function exists')
  t.equal(typeof x('p'), 'function', 'factory produces function')

  var h = x('p')('hello')

  t.equal(typeof h, 'object', 'tag function produces object')
  t.equal(h.nodeName, 'p', 'tag object has correct nodeName')
  t.equal(h.childNodes[0].value, 'hello', 'tag object has text node')
})

test('all tags', function (t) {
  t.plan(tags.length)
  tags.forEach(function (tag) {
    t.equal(typeof x[tag], 'function', tag + ' method exists')
  })
})

test('complex nested arrays', function (t) {
  var h = x.div({ id: 'kidz' }, 'I ', ['am ', ['a ', [x.em('very'), ' ', ['nested ', 'bunch ']]], 'of '], x.strong('kids'), '.')
  t.equal(h.outerHTML, '<div id="kidz">I am a <em>very</em> nested bunch of <strong>kids</strong>.</div>', 'the kids are alright')
  t.end()
})

test('examples: HTML tags', t => {
  t.plan(3)

  var { a, img, video } = x

  t.equal(
    a({ href: '#' }, 'click').outerHTML,
    '<a href="#">click</a>'
  )
  t.equal(
    img({ src: 'cats.gif', alt: 'lolcats' }).outerHTML,
    '<img src="cats.gif" alt="lolcats">'
  )
  t.equal(
    video({ src: 'dogs.mp4', autoplay: true }).outerHTML,
    '<video src="dogs.mp4" autoplay="true"></video>'
  )
})

test('examples: element factory', t => {
  t.plan(1)

  var p = x('p')

  t.equal(
    p('over 9000').outerHTML,
    '<p>over 9000</p>'
  )
})

test('examples: css shorthand', t => {
  t.plan(1)

  var horse = x('.horse.with-hands')

  t.equal(
    horse('neigh').outerHTML,
    '<div class="horse with-hands">neigh</div>'
  )
})

test('examples: custom components', t => {
  t.plan(1)

  var siteNav = (...links) => x('nav.site')(
    links.map(link =>
      x('a.link')({ href: link.href }, link.text)
    )
  )

  t.equal(
    x.body(
      siteNav(
        { href: '#apps', text: 'apps' },
        { href: '#games', text: 'games' }
      )
    ).outerHTML,
    '<body><nav class="site"><a class="link" href="#apps">apps</a><a class="link" href="#games">games</a></nav></body>'
  )
})

test('examples: variadic', t => {
  t.plan(1)

  t.equal(
    x('.variadic')(
      x('h1')('hi'),
      x('h2')('hello'),
      x('h3')('hey'),
      x('h4')('howdy')
    ).outerHTML,
    '<div class="variadic"><h1>hi</h1><h2>hello</h2><h3>hey</h3><h4>howdy</h4></div>'
  )
})

test('examples: arrays', t => {
  t.plan(1)

  var kids = [
    x('p')('Once upon a time,'),
    x('p')('there was a variadic function,'),
    x('p')('that also accepted arrays.')
  ]

  t.equal(
    x('.arrays')(kids).outerHTML,
    '<div class="arrays"><p>Once upon a time,</p><p>there was a variadic function,</p><p>that also accepted arrays.</p></div>'
  )
})
