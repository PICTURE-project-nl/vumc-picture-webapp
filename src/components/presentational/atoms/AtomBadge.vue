<template>
  <span class="badge">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'AtomBadge'
  }
</script>

<style lang="scss" scoped>
  .badge {
    @include font-size(16px);
    @include shape-pill();

    border: 1px solid $color-ghost;
    color: $color-ghost;
    font-weight: $font-weight-semi-bold;
    min-width: 124px;
    padding: $global-spacing-unit-tiny $global-spacing-unit;
    position: relative;
    text-align: center;

    &::before {
      background-color: $color-ghost;
      border-radius: 50%;
      content: '';
      height: 4px;
      left: $global-spacing-unit-small;
      position: absolute;
      top: calc(50% - 2px);
      width: 4px;
    }
  }
</style>
