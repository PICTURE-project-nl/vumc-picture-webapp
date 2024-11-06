<script>
  import { SLOT_EXPECTS } from '@/assets/scripts/constants/slots'

  const slotConfig = {
    iconLeft: {
      name: 'iconLeft',
      expects: SLOT_EXPECTS.COMPONENTS
    },
    iconRight: {
      name: 'iconRight',
      expects: SLOT_EXPECTS.COMPONENTS
    }
  }

  export default {
    name: 'AtomButton',
    props: {
      href: {
        type: String,
        description: 'Returns an <strong>a</strong> instead of a <strong>button</strong>'
      },
      isExternalLink: {
        type: Boolean,
        description: 'Adds a target="_blank", but only when the href prop is also provided'
      },
      toName: {
        type: String,
        description: 'Returns an <strong>router-link</strong> component instead of a <strong>button</strong>'
      },
      toParams: {
        type: Object
      },
      hasHover: Boolean,
      isSecondary: Boolean,
      isGhost: Boolean,
      isDisabled: Boolean,
      isSmall: Boolean,
      isExtraSmall: Boolean,
      isFullWidth: Boolean
    },
    slotConfig,
    render: function (createElement) {
      /*
      We need to dynamically render the HTML tag like p or span, but this can only be done by using the createElement
      method.

      See: https://vuejs.org/v2/guide/render-function.html
       */
      let tag = 'button'
      if (this.href) {
        tag = 'a'
      } else if (this.toName) {
        tag = 'router-link'
      }

      const iconLeft = this.$slots.iconLeft
      const iconRight = this.$slots.iconRight
      const textElement = createElement(
        'span',
        {
          attrs: {
            class: 'button__text'
          }
        },
        this.$slots.default || this.name
      )

      const buttonElements = [
        textElement
      ]

      if (iconLeft || iconRight) {
        buttonElements.unshift(createElement(
          'span',
          {
            attrs: {
              class: 'button__icon-left'
            }
          },
          iconLeft
        ))

        buttonElements.push(createElement(
          'span',
          {
            attrs: {
              class: 'button__icon-right'
            }
          },
          iconRight
        ))
      }

      return createElement(
        tag,
        {
          class: [
            'button',
            {
              'button--has-hover': this.hasHover,
              'button--primary': !this.isSecondary && !this.isGhost,
              'button--secondary': this.isSecondary,
              'button--ghost': this.isGhost,
              'button--small': this.isSmall,
              'button--extra-small': this.isExtraSmall,
              'button--full-width': this.isFullWidth
            }
          ],
          attrs: {
            disabled: this.isDisabled,
            href: this.href,
            target: (this.isExternalLink && this.href) ? '_blank' : null,
            to: this.toName ? { name: this.toName, params: this.toParams } : null
          }
        },
        buttonElements
      )
    }
  }
</script>

<style lang="scss" scoped>
  .button {
    @include font-size(16px);
    @include reset-button();

    border: 1px solid transparent;
    border-radius: $global-radius;
    display: inline-flex;
    flex-wrap: nowrap;
    font-weight: $font-weight-semi-bold;
    justify-content: space-between;
    min-width: 148px;
    outline: 0;
    padding: $global-spacing-unit-small $global-spacing-unit;
    text-align: center;
    transition: $global-transition;
  }

  .button--primary {
    background-color: $color-dodger-blue;
    color: $color-white;

    &.button--has-hover,
    &:hover,
    &:active {
      background-color: rgba($color-dodger-blue, 0.8);
    }
  }

  .button--secondary {
    background-color: $color-ebony-clay;
    color: $color-ghost;

    &:hover,
    &:active {
      color: $color-white;
    }
  }

  .button--ghost {
    border-color: $color-ghost;
    color: $color-ghost;

    &:hover,
    &:active {
      border-color: $color-white;
      color: $color-white;
    }
  }

  .button--small {
    min-width: 124px;
    padding: $global-spacing-unit-tiny $global-spacing-unit-small;
  }

  .button--extra-small {
    min-width: 124px;
    padding: $global-spacing-unit-tiny $global-spacing-unit-small;
    font-size: 12px;
  }

  .button--full-width {
    display: flex;
    width: 100%;
  }

  .button[disabled] {
    opacity: 0.4;
    pointer-events: none;
  }

  .button__text {
    width: 100%;
  }

  .button__icon-left {
    left: 0 - $global-spacing-unit-small;
    position: relative;

    .button--small & {
      left: 0 - $global-spacing-unit-tiny;
    }
  }

  .button__icon-right {
    position: relative;
    right: 0 - $global-spacing-unit-small;

    .button--small & {
      right: 0 - $global-spacing-unit-tiny;
    }
  }
</style>
