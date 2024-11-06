
<template>
  <img
    class="media"
    :class="{
      'media--rounded': isRounded,
      'media--shadow': hasShadow
    }"
    :src="src"
    :alt="alt"
  >
</template>

<script>
  export default {
    name: 'AtomMedia',
    props: {
      src: {
        type: String,
        required: true
      },
      alt: {
        type: String
      },
      isRounded: {
        type: Boolean
      },
      hasShadow: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  .media--rounded {
    border-radius: $global-radius;
  }

  .media--shadow {
    @include shadow-box();
  }
</style>
