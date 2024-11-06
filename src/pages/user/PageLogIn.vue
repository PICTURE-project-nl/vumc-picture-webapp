<template>
  <TemplateNavbarSplitColumns>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnLeft.name">

      <ContainerIntroBlock />

    </template>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnRight.name">

      <ContainerLoginForm />

    </template>
  </TemplateNavbarSplitColumns>
</template>

<script>
  import { TemplateNavbarSplitColumns } from '@/components/presentational/templates'
  import { ContainerIntroBlock } from '@/components/container/general'
  import { ContainerLoginForm } from '@/components/container/user'

  export default {
    name: 'PageLogIn',
    middleware: [
      'only-unauthenticated'
    ],
    components: {
      ContainerIntroBlock,
      ContainerLoginForm,
      TemplateNavbarSplitColumns
    },
    data: function () {
      return {
        TemplateNavbarSplitColumns
      }
    }
  }
</script>
