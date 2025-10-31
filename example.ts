import { body, button, h1 } from './src/hyperaxe.js'

const state = { count: 0 }

function view() {
  return body(
    h1(`count is ${state.count}`),
    button({ onclick }, 'Increment')
  )
}

function onclick() {
  state.count++
  render()
}

function render() {
  document.body.replaceWith(view() as any as HTMLElement)
}

render()
