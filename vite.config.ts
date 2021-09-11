import { defineConfig } from 'vite'
import path from 'path'
import marked from 'marked'
import reactRefresh from '@vitejs/plugin-react-refresh'
// link @col0ring/vite-plugin-md local
import viteMdPlugin from '@col0ring/vite-plugin-md'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

const renderer = new marked.Renderer()

// use Link instead of a tag
renderer.link = (href, title, text) => {
  return `<Link to="${href}" title="${title}">${text}</Link>`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    viteMdPlugin({
      markedOptions: {
        renderer
      },
      imports: `
      import { Link } from 'react-router-dom'
      `
    })
  ],
  resolve: {
    alias: {
      '@src': resolve('./src'),
      '@examples': resolve('./examples')
    }
  }
})
