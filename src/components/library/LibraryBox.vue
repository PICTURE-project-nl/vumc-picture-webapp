<template>
  <div class="box">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LibraryBox'
  }
</script>

<style lang="scss" scoped>
  // For ::v-deep usage see: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors

  .box {
    /*
    Using a child div is a bit of a workaround because we also have an atom with the box class. If we nest them, they
    inherit their styles. This is default behaviour of scoped styles within Vue.js.
    See: https://github.com/vuejs/vue-loader/issues/957
     */
    ::v-deep > div {
      /* TODO: This selector is targeting all divs inside a .box, even inside the components loaded in the library We need to find a fix or this */

      /* border: 1px dotted rgba($color-dodger-blue, 0.5); */

      /* padding: $global-spacing-unit; */
    }
  }
</style>
