function template (data) {
  return `
const ${data.componentName} = {
  functional: true,
  name: ${data.componentName},
  props: {
    height: {
      type: [String, Number],
      default: 24
    },
    width: {
      type: [String, Number],
      default: 24
    },
    viewBox: {
      type: String
    },
    className: {
      type: [Object, Array, String]
    },
    styles: {
      type: [Object, Array, String]
    }
  },
  render (h, ctx) {
    const svg = h('svg', {
      class: ctx.props.className,
      style: ctx.props.styles,
      attrs: {
        height: ctx.props.height,
        width: ctx.props.width,
        viewBox: ctx.props.viewBox ||
                   '0 0' + ' ' + ctx.props.width + ' ' + ctx.props.height,
        preserveAspectRatio: 'xMidYMid meet',
        fill: 'currentColor',
        'xml:space': 'preserve'
      },
      domProps: {
        innerHTML:'${data.content}'
      }
    })
    return svg
  }
}
export default ${data.componentName}
`
}

module.exports = template
