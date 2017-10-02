import { parseMarkdown } from './parser'

const getTextContent = children => children.map(
  node => node.children ? getTextContent(node.children) : node.text
).join('')

export default {
  name: 'markdown',
  props: {
    content: String,
    theme: {
      type: Object,
      default: {
        a: { color: '#3333FF' },
        codespan: {
          fontFamily: 'monospace',
          backgroundColor: '#ddd',
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 10
        },
        del: { textDecoration: 'line-through' },
        em: { fontStyle: 'italic' },
        strong: { fontWeight: 700 }
      }
    }
  },
  render (h) {
    const content = this.content || getTextContent(this.$slots.default)
    return h('richtext', {
      style: { fontSize: 60, color: '#404040' },
      attrs: {
        value: parseMarkdown(content, this.theme)
      }
    })
  }
}