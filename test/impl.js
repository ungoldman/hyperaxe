var axe = require('../factory')
var runTests = require('./tests')

var implementations = [
  require('hyperscript')
]

implementations.forEach(h => {
  var x = axe.getFactory(h)
  runTests(x, h)
})
