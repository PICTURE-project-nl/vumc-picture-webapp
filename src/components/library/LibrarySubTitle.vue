<template>
  <AtomTextHeading :level="3" isSmall>
    <slot></slot>
  </AtomTextHeading>
</template>

<script>
  import { AtomTextHeading } from '@/components/presentational/atoms'

  export default {
    name: 'LibrarySubTitle',
    components: {
      AtomTextHeading
    }
  }
</script>
