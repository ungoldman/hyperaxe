const { createFactory, getFactory } = require('./factory')
const h = require('hyperscript')

module.exports = createFactory(h)
module.exports.createFactory = createFactory
module.exports.getFactory = getFactory
