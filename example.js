const { body, button, h1 } = require('./')

const state = { count: 0 }

function view () {
  return body(
    h1(`count is ${state.count}`),
    button({ onclick }, 'Increment')
  )
}

function onclick () {
  state.count++
  render()
}

function render () {
  document.body.replaceWith(view())
}

render()
