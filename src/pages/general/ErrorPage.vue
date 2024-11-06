<template>

  <div class="u-margin">
    <TemplateNavbarOneColumn>
      <ContainerError></ContainerError>
    </TemplateNavbarOneColumn>
  </div>

</template>

<script>
  import { TemplateNavbarOneColumn } from '@/components/presentational/templates'
  import { ContainerError } from '@/components/container/general'

  export default {
    name: 'ErrorPage',
    components: {
      TemplateNavbarOneColumn,
      ContainerError
    }
  }
</script>
