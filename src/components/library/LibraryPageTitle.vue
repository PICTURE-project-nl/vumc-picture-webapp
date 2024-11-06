<template>
  <AtomTextHeading
    :level="1"
    color="dodger-blue"
    isLarge
  >
    <slot></slot>
  </AtomTextHeading>
</template>

<script>
  import { AtomTextHeading } from '@/components/presentational/atoms'

  export default {
    name: 'LibraryPageTitle',
    components: {
      AtomTextHeading
    }
  }
</script>
