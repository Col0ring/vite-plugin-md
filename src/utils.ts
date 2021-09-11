import * as marked from 'marked'
import * as path from 'path'
import * as fs from 'fs'
import { render } from 'art-template'
import { TocProps, RenderProps } from './type'

export interface MarkedRenderOptions {
  // The code imported at the top of the markdown component
  imports?: string
  // marked options
  markedOptions?: marked.MarkedOptions
  //  Enable dangerous html to display markdown component
  native?: boolean
}

const MarkdownComponent = fs
  .readFileSync(path.resolve(__dirname, '../templates/markdown-component.art'))
  .toString()

export function markdown2jsx(markdown: string, options: MarkedRenderOptions) {
  let renderer = options.markedOptions?.renderer
  if (!renderer) {
    renderer = new marked.Renderer()
  }
  const headingRender = renderer.heading
  const toc: TocProps[] = []
  renderer.heading = function (text, level, raw, slugger) {
    return headingRender.call(this, text, level, raw, {
      ...slugger,
      slug(...args) {
        const res = slugger.slug(...args)
        toc.push({
          level,
          text,
          slug: res
        })
        return res
      }
    })
  }
  const content = marked(markdown, {
    xhtml: true,
    ...options.markedOptions,
    renderer
  })

  const renderOptions: RenderProps = {
    isNative: options.native || false,
    nativeContent: JSON.stringify(content) || '',
    content: options.native ? '' : content,
    imports: options.imports,
    toc: JSON.stringify(toc)
  }

  return {
    content: render(MarkdownComponent, renderOptions, {
      escape: false
    })
  }
}
