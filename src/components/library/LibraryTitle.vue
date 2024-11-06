<template>
  <AtomTextHeading color="dodger-blue">
    <slot></slot>
  </AtomTextHeading>
</template>

<script>
  import { AtomTextHeading } from '@/components/presentational/atoms'

  export default {
    name: 'LibraryTitle',
    components: {
      AtomTextHeading
    }
  }
</script>
