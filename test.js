var x = require('./')
var test = require('tape')
var tags = require('html-tags')

test('factory', function (t) {
  t.plan(5)

  t.equal(typeof x, 'function', 'factory function exists')
  t.equal(typeof x('p'), 'function', 'factory produces function')

  var h = x('p')('hello')

  t.equal(typeof h, 'object', 'tag function produces object')
  t.equal(h.nodeName, 'p', 'tag object has correct nodeName')
  t.equal(h.childNodes[0].value, 'hello', 'tag object has text node')
})

test('examples', function (t) {
  t.plan(3)

  var a = x.a({ href: '#' }, 'click')
  t.equal(a.outerHTML, '<a href="#">click</a>')

  var img = x.img({ src: 'cats.gif', alt: 'lolcats' })
  t.equal(img.outerHTML, '<img src="cats.gif" alt="lolcats">')

  var video = x.video({ src: 'dogs.mp4', autoplay: true })
  t.equal(video.outerHTML, '<video src="dogs.mp4" autoplay="true"></video>')
})

test('tags', function (t) {
  t.plan(tags.length)
  tags.forEach(function (tag) {
    t.equal(typeof x[tag], 'function', tag + ' method exists')
  })
})

test('complex nested arrays of kids', function (t) {
  var h = x.div({ id: 'kidz' }, 'I ', ['am ', ['a ', [x.em('very'), ' ', ['nested ', 'bunch ']]], 'of '], x.strong('kids'), '.')
  t.equal(h.outerHTML, '<div id="kidz">I am a <em>very</em> nested bunch of <strong>kids</strong>.</div>', 'the kids are alright')
  t.end()
})
