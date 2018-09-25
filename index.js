var tags = require('html-tags')
var h = require('hyperscript')
var instances

/**
 * Returns an element factory using the given createElement function.
 * Adapted from `lib/create-x.js` in jxnblk's https://github.com/jxnblk/reaxe.
 * Only tested with hyperscript. Not guaranteed to work with anything else.
 *
 * @param  {Function} fn - createElement function
 * @return {Function} - factory function with all HTML tag factories attached
 */
function createFactory (fn) {
  function factory (tag) {
    return function (props) {
      return isObject(props)
        ? fn(tag, props, sliceKids(arguments, 1))
        : fn(tag, sliceKids(arguments))
    }
  }

  tags.forEach(function (tag) {
    factory[tag] = factory(tag)
  })

  return factory
}

/**
 * Return an element factory function, either by creating a new one or by
 * getting a cached version
 *
 * @param  {Function} fn - createElement function
 * @return {Function} - factory function with all HTML tag factories attached
 */
function getFactory (fn) {
  if (!instances) {
    instances = new Map()
  }

  var factory = instances.get(fn)
  if (factory) {
    return factory
  }

  factory = createFactory(fn)
  instances.set(fn, factory)
  return factory
}

/**
 * Turns arguments into an array, optionally slicing off a portion.
 * @param  {array} args - arguments object (array-like)
 * @param  {number} num - optional integer for Array.slice
 * @return {array} - array of arguments
 */
function sliceKids (args, num) {
  var arr = Array.prototype.slice.call(args, num)
  return arr
}

function isObject (val) {
  return val != null &&
    typeof val === 'object' &&
    Array.isArray(val) === false
}

module.exports = createFactory(h)
module.exports.createFactory = createFactory
module.exports.getFactory = getFactory
