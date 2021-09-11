# Vite-Plugin-Md

A vite plugin for parsing md files based on marked.

## Install

```sh
npm install @col0ring/vite-plugin-md -D
# or
yarn add @col0ring/vite-plugin-md -D
```

## Usage

```js
import { defineConfig } from 'vite'
import viteMdPlugin from '@col0ring/vite-plugin-md'

export default defineConfig({
  plugins: [
    // ...
    viteMdPlugin()
  ]
})
```

You can configure the `marked` renderer：

```js
import { defineConfig } from 'vite'
import marked from 'marked'
import viteMdPlugin from '@col0ring/vite-plugin-md'

const renderer = new marked.Renderer()

// custom component
renderer.text = (text) => {
  return `<span>${text}</span>`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...
    viteMdPlugin({
      markedOptions: {
        renderer
      }
    })
  ]
})
```

Use custom component，and you need to use absolute paths (such as alias and node_modules):

```js
import { defineConfig } from 'vite'
import path from 'path'
import marked from 'marked'
import viteMdPlugin from '@col0ring/vite-plugin-md'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

const renderer = new marked.Renderer()

// use Link instead of a tag
renderer.link = (href, title, text) => {
  return `<Link to="${href}" title="${title}">${text}</Link>`
}

// custom component
renderer.text = (text) => {
  return `<Text>${text}</Text>`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...
    viteMdPlugin({
      markedOptions: {
        renderer
      },
      imports: `
      import { Link } from 'react-router-dom'
      // import here
      import Text from '@/components/text'
      `
    })
  ],
  resolve: {
    alias: {
      '@src': resolve('./src')
    }
  }
})
```

### Options

#### `markedOptions`

- Type: `MarkedOptions`
- Default: `undefined`

marked options.

#### `imports`

- Type: `string`
- Default: `undefined`

The code imported at the top of the markdown component.

#### `native`

- Type: `boolean`
- Default: `'false'`

Enable dangerous html to display markdown component.
