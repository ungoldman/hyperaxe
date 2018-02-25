var tags = require('html-tags')
var h = require('hyperscript')

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
