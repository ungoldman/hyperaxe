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

test('tags', function (t) {
  t.plan(tags.length)
  tags.forEach(function (tag) {
    t.equal(typeof x[tag], 'function', tag + ' method exists')
  })
})
