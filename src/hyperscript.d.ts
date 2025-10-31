// Type definitions for hyperscript
declare module 'hyperscript' {
  import type { CreateElementFunction } from './factory'

  interface HyperscriptNode {
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
    value?: string
  }

  const h: CreateElementFunction
  export = h
}
