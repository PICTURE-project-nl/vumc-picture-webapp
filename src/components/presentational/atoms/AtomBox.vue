<template>
  <div class="box" :class="{ 'box--dark': isDark, 'box--long': isLong, 'box--bordered': hasBorder }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AtomBox',
    props: {
      isDark: Boolean,
      isLong: Boolean,
      hasBorder: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    //background-color:  $color-ebony-clay;
    padding: $global-spacing-unit;
  }

  .box--dark {
    background-color: $color-mirage;
  }

  .box--long {
    min-height: 600px;
  }

  .box--bordered {
    border-bottom: 1px solid $color-ghost;
    border-top: 1px solid $color-ghost;
  }
</style>
