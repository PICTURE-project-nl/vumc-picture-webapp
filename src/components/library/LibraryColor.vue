<template>
  <div class="o-layout-flex o-layout-flex--vertical-center u-text-center u-padding-small">
    <div class="color" :style="{ backgroundColor: color }"></div>
    <div class="u-margin-top-tiny">
      <LibrarySubTitle>
        {{ nameStartCased }}
      </LibrarySubTitle>
      <LibraryDescription>
        ({{ nameKebabCased }})
      </LibraryDescription>
      <LibraryDescription>
        {{ colorInRgba }}
      </LibraryDescription>
    </div>
  </div>
</template>

<script>
  import _kebabCase from 'lodash/kebabCase'
  import _startCase from 'lodash/startCase'

  import LibrarySubTitle from './LibrarySubTitle.vue'
  import LibraryDescription from './LibraryDescription.vue'

  export default {
    name: 'LibraryColor',
    components: {
      LibraryDescription,
      LibrarySubTitle
    },
    props: {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },
    computed: {
      nameStartCased: function () {
        return _startCase(this.name)
      },
      nameKebabCased: function () {
        return _kebabCase(this.name)
      },
      colorInRgba: function () {
        return this.color
      }
    }
  }
</script>

<style lang="scss" scoped>
  .color {
    height: $global-spacing-unit-large;
    outline: 1px dotted rgba($color-white, 0.5);
    vertical-align: middle;
    width: $global-spacing-unit-large;
  }
</style>
