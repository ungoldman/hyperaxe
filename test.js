import hyperaxe, { getFactory } from './index.js'
import test from 'tape'
import tags from 'html-tags'

test('factory function signature', t => {
  t.plan(5)

  t.equal(typeof hyperaxe, 'function', 'factory function exists')
  t.equal(typeof hyperaxe('p'), 'function', 'factory produces function')

  const h = hyperaxe('p')('hello')

  t.equal(typeof h, 'object', 'tag function produces object')
  t.equal(h.nodeName, 'p', 'tag object has correct nodeName')
  t.equal(h.childNodes[0].value, 'hello', 'tag object has text node')
})

test('all tags', function (t) {
  t.plan(tags.length)
  tags.forEach(function (tag) {
    t.equal(typeof hyperaxe[tag], 'function', tag + ' method exists')
  })
})

test('complex nested arrays', function (t) {
  const h = hyperaxe.div({ id: 'kidz' }, 'I ', ['am ', ['a ', [hyperaxe.em('very'), ' ', ['nested ', 'bunch ']]], 'of '], hyperaxe.strong('kids'), '.')
  t.equal(h.outerHTML, '<div id="kidz">I am a <em>very</em> nested bunch of <strong>kids</strong>.</div>', 'the kids are alright')
  t.end()
})

test('examples: HTML tags', t => {
  t.plan(3)

  const { a, img, video } = hyperaxe

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

  const p = hyperaxe('p')

  t.equal(
    p('over 9000').outerHTML,
    '<p>over 9000</p>'
  )
})

test('examples: css shorthand', t => {
  t.plan(1)

  const horse = hyperaxe('.horse.with-hands')

  t.equal(
    horse('neigh').outerHTML,
    '<div class="horse with-hands">neigh</div>'
  )
})

test('examples: custom components', t => {
  t.plan(1)

  const siteNav = (...links) => hyperaxe('nav.site')(
    links.map(link =>
      hyperaxe('a.link')({ href: link.href }, link.text)
    )
  )

  t.equal(
    hyperaxe.body(
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
    hyperaxe('.variadic')(
      hyperaxe('h1')('hi'),
      hyperaxe('h2')('hello'),
      hyperaxe('h3')('hey'),
      hyperaxe('h4')('howdy')
    ).outerHTML,
    '<div class="variadic"><h1>hi</h1><h2>hello</h2><h3>hey</h3><h4>howdy</h4></div>'
  )
})

test('examples: arrays', t => {
  t.plan(1)

  const kids = [
    hyperaxe('p')('Once upon a time,'),
    hyperaxe('p')('there was a variadic function,'),
    hyperaxe('p')('that also accepted arrays.')
  ]

  t.equal(
    hyperaxe('.arrays')(kids).outerHTML,
    '<div class="arrays"><p>Once upon a time,</p><p>there was a variadic function,</p><p>that also accepted arrays.</p></div>'
  )
})

test('getFactory: cached createFactory', t => {
  t.plan(1)

  import('hyperscript').then(hyperscript => {
    const h = hyperscript.default
    const y = getFactory(h)
    const z = getFactory(h)

    t.ok(y === z)
  })
})
