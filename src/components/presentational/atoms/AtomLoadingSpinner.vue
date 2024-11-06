<template>
  <div
    class="loading-spinner"
    :style="{ width: `${size}px`, height: `${size}px` }"
  ></div>
</template>

<script>
  export default {
    name: 'AtomLoadingSpinner',
    props: {
      size: {
        type: Number,
        default: 40,
        description: 'Sets a custom width and height'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading-spinner {
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: animation-rotate;
    animation-timing-function: linear;
    border: 2px solid $color-white-transparent; /* stylelint-disable-line */
    border-radius: 50%;
    border-top: 2px solid $color-white;
    height: 40px;
    transition-property: transform;
    width: 40px;
  }
</style>
