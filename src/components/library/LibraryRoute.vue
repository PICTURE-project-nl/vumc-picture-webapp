<template>
  <div>
    <router-link :to="{ name: route.name, params: route.exampleParam }">
      {{ route.title }}
    </router-link>
    <AtomTextBody isSmall color="ghost">
      {{ route.path }}
    </AtomTextBody>
  </div>
</template>

<script>
  import { AtomTextBody } from '@/components/presentational/atoms'

  export default {
    name: 'LibraryRoute',
    components: {
      AtomTextBody
    },
    props: {
      route: {
        type: Object,
        required: true
      }
    }
  }
</script>
