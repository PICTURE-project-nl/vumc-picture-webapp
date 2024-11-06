<template>
  <svg
    v-if="isValidIcon"
    class="icon"
    :class="{ [`icon--${color}`]: color }"
    :width="dimensions.width"
    :height="dimensions.height"
    :viewBox="dimensions.viewBox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="path"
      :fill-rule="fillRule"
      fill="fff"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :stroke-linecap="strokeLinecap"
      :stroke-linejoin="strokeLinejoin"
    ></path>
  </svg>
</template>

<script>
  import { ICONS, getSvgDimensions } from '@/config/icons'
  import { colorPropTypes } from '@/prop-types/color'
  import { iconPropTypes } from '@/prop-types/icon'

  const defaultBoxSize = 24

  export default {
    name: 'AtomIcon',
    props: {
      type: iconPropTypes.type('AtomIcon'),
      color: colorPropTypes.color('AtomIcon'),
      isExact: {
        type: Boolean,
        description: `Returns the icon in it's exact size`
      },
      boxSize: {
        type: Number,
        description: 'Sets a custom width and height, overrules isExact'
      }
    },
    computed: {
      isValidIcon: function () {
        return Boolean(ICONS[this.type])
      },
      icon: function () {
        return this.isValidIcon ? ICONS[this.type] : {}
      },
      isExactComputed: function () {
        return this.boxSize ? false : this.isExact
      },
      path: function () {
        return this.icon.path
      },
      dimensions: function () {
        return getSvgDimensions({
          width: this.icon.width,
          height: this.icon.height,
          boxSize: this.boxSize || defaultBoxSize,
          ...this.isExactComputed
        })
      },
      fillRule: function () {
        return this.icon.fillRule
      },
      strokeLinecap: function () {
        return this.icon.strokeLinecap
      },
      strokeWidth: function () {
        return this.icon.strokeWidth
      },
      strokeLinejoin: function () {
        return this.icon.strokeLinejoin
      },
      stroke: function () {
        return this.icon.stroke
      }
    }
  }
</script>

<style lang="scss" scoped>
  // For ::v-deep usage see: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors

  .icon {
    display: block;

    ::v-deep path {
      fill: $color-white;
    }
  }

  .icon--no-fill {
    ::v-deep path {
      fill: none;
    }
  }

  @each $name, $color in $color-ui {
    .icon--#{$name} {
      path {
        fill: $color;
      }
    }
  }
</style>
