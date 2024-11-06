<template>
  <OrganismError
    :title="content.title"
    :cta="content.button"
  >
    <template slot="body">
      {{ content.body }}
    </template>
  </OrganismError>
</template>

<script>
  import { OrganismError } from '@/components/presentational/organisms'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'ContainerError',
    components: {
      OrganismError
    },
    data: function () {
      return {
        content: {
          ...staticContent.errorPage
        }
      }
    }
  }
</script>

<style scoped>

</style>
