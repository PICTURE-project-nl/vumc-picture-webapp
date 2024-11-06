<template>
  <hr
    class="divider"
    :class="{ 'divider--vertical': isVertical }"
  />
</template>

<script>
  export default {
    name: 'AtomDivider',
    props: {
      isVertical: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  .divider {
    border-top: 1px solid $color-border-Abbey;

    &:not(:first-child) {
      margin-top: $global-spacing-unit-tiny;
    }

    &:not(:last-child) {
      margin-bottom: $global-spacing-unit-tiny;
    }
  }
  .divider--horizondal {
    border-left: 1px solid $color-border-Abbey;
    border-top: 0;
    height: 0;
    width: 100%;
  }

  .divider--vertical {
    border-left: 1px solid $color-border-Abbey;
    border-top: 0;
    height: 100%;
    width: 0;
  }
</style>
