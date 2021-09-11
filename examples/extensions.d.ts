declare module '*.md' {
  import {
    html,
    toc,
    MarkdownComponent
  } from '@col0ring/vite-plugin-md/types/shim'
  export default MarkdownComponent
  export { toc, html }
}
