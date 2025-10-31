import { test, describe } from 'node:test'
import { strict as assert } from 'node:assert'
import hyperaxe, { getFactory } from '../src/hyperaxe'
import type { CreateElementFunction } from '../src/factory'
import h from 'hyperscript'
import tags from 'html-tags'

describe('Hyperaxe Factory', () => {
  test('factory function signature', () => {
    assert.equal(typeof hyperaxe, 'function', 'factory function exists')
    assert.equal(typeof hyperaxe('p'), 'function', 'factory produces function')

    const h = hyperaxe('p')('hello')

    assert.equal(typeof h, 'object', 'tag function produces object')
    assert.equal(h.nodeName, 'p', 'tag object has correct nodeName')
    assert.equal(
      (h.childNodes[0] as any).value,
      'hello',
      'tag object has text node'
    )
  })

  test('all tags exist', () => {
    tags.forEach((tag) => {
      assert.equal(
        typeof (hyperaxe as any)[tag],
        'function',
        `${tag} method exists`
      )
    })
  })

  test('complex nested arrays', () => {
    const h = (hyperaxe as any).div(
      { id: 'kidz' },
      'I ',
      [
        'am ',
        ['a ', [(hyperaxe as any).em('very'), ' ', ['nested ', 'bunch ']]],
        'of '
      ],
      (hyperaxe as any).strong('kids'),
      '.'
    )
    assert.equal(
      h.outerHTML,
      '<div id="kidz">I am a <em>very</em> nested bunch of <strong>kids</strong>.</div>',
      'the kids are alright'
    )
  })
})

describe('HTML Tag Examples', () => {
  test('basic HTML tags', () => {
    const { a, img, video } = hyperaxe as any

    assert.equal(a({ href: '#' }, 'click').outerHTML, '<a href="#">click</a>')
    assert.equal(
      img({ src: 'cats.gif', alt: 'lolcats' }).outerHTML,
      '<img src="cats.gif" alt="lolcats">'
    )
    assert.equal(
      video({ src: 'dogs.mp4', autoplay: true }).outerHTML,
      '<video src="dogs.mp4" autoplay="true"></video>'
    )
  })

  test('element factory', () => {
    const p = hyperaxe('p')

    assert.equal(p('over 9000').outerHTML, '<p>over 9000</p>')
  })

  test('css shorthand', () => {
    const horse = hyperaxe('.horse.with-hands')

    assert.equal(
      horse('neigh').outerHTML,
      '<div class="horse with-hands">neigh</div>'
    )
  })

  test('custom components', () => {
    const siteNav = (...links: Array<{ href: string; text: string }>) =>
      hyperaxe('nav.site')(
        links.map((link) => hyperaxe('a.link')({ href: link.href }, link.text))
      )

    assert.equal(
      (hyperaxe as any).body(
        siteNav(
          { href: '#apps', text: 'apps' },
          { href: '#games', text: 'games' }
        )
      ).outerHTML,
      '<body><nav class="site"><a class="link" href="#apps">apps</a><a class="link" href="#games">games</a></nav></body>'
    )
  })

  test('variadic arguments', () => {
    assert.equal(
      hyperaxe('.variadic')(
        hyperaxe('h1')('hi'),
        hyperaxe('h2')('hello'),
        hyperaxe('h3')('hey'),
        hyperaxe('h4')('howdy')
      ).outerHTML,
      '<div class="variadic"><h1>hi</h1><h2>hello</h2><h3>hey</h3><h4>howdy</h4></div>'
    )
  })

  test('array children', () => {
    const kids = [
      hyperaxe('p')('Once upon a time,'),
      hyperaxe('p')('there was a variadic function,'),
      hyperaxe('p')('that also accepted arrays.')
    ]

    assert.equal(
      hyperaxe('.arrays')(kids).outerHTML,
      '<div class="arrays"><p>Once upon a time,</p><p>there was a variadic function,</p><p>that also accepted arrays.</p></div>'
    )
  })
})

describe('Factory Caching', () => {
  test('getFactory returns cached instance', () => {
    // Cast needed because node:test types interfere with hyperscript types
    const factory1 = getFactory(h as unknown as CreateElementFunction)
    const factory2 = getFactory(h as unknown as CreateElementFunction)

    assert.strictEqual(
      factory1,
      factory2,
      'getFactory should return same instance for same createElement function'
    )
  })
})
