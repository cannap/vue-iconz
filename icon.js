const Icon = {
  functional: true,
  name: Icon, // Todo:  {{replace-iconName}}
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
    var svg = h('svg', {
      class: ctx.props.className,
      style: ctx.props.styles,
      attrs: {
        height: ctx.props.height,
        width: ctx.props.width,
        viewBox: ctx.props.viewBox ||
          '0 0 ' + ctx.props.width + ' ' + ctx.props.height,
        preserveAspectRatio: 'xMidYMid meet',
        fill: 'currentColor',
        'xml:space': 'preserve'
      },

      domProps: {
        // Todo: {{replace-icon}}
        innerHTML: `<path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>`
      }
    })

    return svg
  }
}

export default Icon
