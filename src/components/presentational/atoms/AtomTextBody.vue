<script>
  import { colorPropTypes } from '@/prop-types/color'

  export default {
    name: 'AtomTextBody',
    props: {
      isSmall: Boolean,
      alignRight: Boolean,
      isInline: {
        type: Boolean,
        description: 'Returns a <strong>span</strong> instead of a <strong>p</strong>'
      },
      isDiv: {
        type: Boolean,
        description: 'Returns a <strong>div</strong> instead of a <strong>p</strong>'
      },
      color: colorPropTypes.color('AtomTextBody')
    },
    render: function (createElement) {
      /*
      We need to dynamically render the HTML tag like p or span, but this can only be done by using the createElement
      method.

      See: https://vuejs.org/v2/guide/render-function.html
       */
      let tag = 'p'

      if (this.isDiv) {
        tag = 'div'
      } else if (this.isInline) {
        tag = 'span'
      }

      return createElement(
        `${tag}`,
        {
          class: [
            'body',
            {
              'body--tiny': this.isTiny,
              'body--small': this.isSmall,
              'body--align-right': this.alignRight,
              [`body--${this.color}`]: this.color
            }
          ]
        },
        this.$slots.default || this.name
      )
    }
  }
</script>

<style lang="scss" scoped>
  // For ::v-deep usage see: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors

  .body {
    @include font-size(14px);

    ::v-deep strong,
    ::v-deep b {
      font-weight: $font-weight-semi-bold;
    }

    ::v-deep a {
      color: inherit;
      outline: 0;
    }

    ::v-deep p,
    ::v-deep ul,
    ::v-deep ol {
      margin-top: $global-spacing-unit-small;
    }
  }

  .body--small {
    @include font-size(14px);
  }
   .body--tiny {
    @include font-size(12px);
  }

  .body--align-right {
    text-align: right;
  }

  @each $name, $color in $color-ui {
    .body--#{$name} {
      color: $color;
    }
  }
</style>
