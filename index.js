var { createFactory, getFactory } = require('./factory')
var h = require('hyperscript')

module.exports = createFactory(h)
module.exports.createFactory = createFactory
module.exports.getFactory = getFactory
