import tags from 'html-tags'

// Type definitions for hyperscript-compatible elements and properties
export interface HyperscriptNode {
  nodeType: number
  nodeName: string
  tagName?: string
  outerHTML: string
  innerHTML: string
  textContent: string
  childNodes: HyperscriptNode[]
  appendChild(child: HyperscriptNode): HyperscriptNode
  getAttribute(name: string): string | null
  setAttribute(name: string, value: string): void
  removeAttribute(name: string): void
  querySelector(selector: string): HyperscriptNode | null
  querySelectorAll(selector: string): HyperscriptNode[]
}

export interface HyperscriptProperties {
  [key: string]: any
  id?: string
  className?: string
  class?: string
  style?: string | Record<string, string | number>
  innerHTML?: string
  textContent?: string
  onclick?: (event?: Event) => void
  onchange?: (event?: Event) => void
  oninput?: (event?: Event) => void
  onsubmit?: (event?: Event) => void
  onkeydown?: (event?: Event) => void
  onkeyup?: (event?: Event) => void
  onmousedown?: (event?: Event) => void
  onmouseup?: (event?: Event) => void
  onmouseover?: (event?: Event) => void
  onmouseout?: (event?: Event) => void
  onfocus?: (event?: Event) => void
  onblur?: (event?: Event) => void
}

export type HyperscriptChild =
  | string
  | number
  | boolean
  | HyperscriptNode
  | HyperscriptChild[]

export interface TagFunction {
  (
    properties?: HyperscriptProperties,
    ...children: HyperscriptChild[]
  ): HyperscriptNode
  (...children: HyperscriptChild[]): HyperscriptNode
}

export interface HyperaxeFactory {
  (tag: string): TagFunction

  // All HTML tag methods are attached dynamically
  [key: string]: TagFunction
}

export interface CreateElementFunction {
  (tag: string, ...args: any[]): HyperscriptNode
}

let instances: Map<CreateElementFunction, HyperaxeFactory> | undefined

/**
 * Returns an element factory using the given createElement function.
 * Adapted from `lib/create-x.js` in jxnblk's https://github.com/jxnblk/reaxe.
 * Only tested with hyperscript. Not guaranteed to work with anything else.
 *
 * @param  {Function} fn - createElement function
 * @return {Function} - factory function with all HTML tag factories attached
 */
function createFactory(fn: CreateElementFunction): HyperaxeFactory {
  function factory(tag: string): TagFunction {
    return function (...args: any[]): HyperscriptNode {
      const props = args[0]
      return isObject(props)
        ? fn(tag, props, ...sliceKids(args, 1))
        : fn(tag, ...sliceKids(args))
    }
  }

  // Dynamically attach all HTML tag methods to the factory
  // This is the clean, programmatic part - no manual updates needed here
  tags.forEach(function (tag: string) {
    ;(factory as any)[tag] = factory(tag)
  })

  return factory as HyperaxeFactory
}

/**
 * Return an element factory function, either by creating a new one or by
 * getting a cached version
 *
 * @param  {Function} fn - createElement function
 * @return {Function} - factory function with all HTML tag factories attached
 */
function getFactory(fn: CreateElementFunction): HyperaxeFactory {
  if (!instances) {
    instances = new Map()
  }

  let factory = instances.get(fn)
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
function sliceKids(args: any[], num?: number): any[] {
  const arr = Array.prototype.slice.call(args, num)
  return arr
}

function isObject(val: any): val is Record<string, any> {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

export { createFactory, getFactory }
