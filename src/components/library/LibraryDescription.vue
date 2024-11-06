<template>
  <div class="description">
    <AtomTextBody color="ghost">
      <slot></slot>
    </AtomTextBody>
  </div>
</template>

<script>
  import { AtomTextBody } from '@/components/presentational/atoms'

  export default {
    name: 'LibraryDescription',
    components: {
      AtomTextBody
    }
  }
</script>

<style lang="scss" scoped>
  .description {
    &:not(:last-child) {
      margin-bottom: $global-spacing-unit-small;
    }
  }
</style>
