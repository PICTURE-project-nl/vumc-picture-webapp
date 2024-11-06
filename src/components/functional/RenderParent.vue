<script>
  /*
  Conditionally render the parent element.

  See: https://forum.vuejs.org/t/conditionally-render-parent-element/9324/2
   */
  export default {
    name: 'RenderParent',
    functional: true,
    props: {
      when: {
        type: Boolean
      }
    },
    render (createElement, context) {
      // Remove unnecessary text nodes
      const children = context.children.filter(vnode => vnode.tag)

      if (children.length !== 1) console.warn('RenderParent: This component accepts only one root node in its slot.')

      if (context.props.when) {
        return children[0]
      } else {
        return children[0].children[0]
      }
    }
  }
</script>
