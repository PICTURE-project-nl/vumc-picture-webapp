<template>
  <TemplateNavbarSplitColumns>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnLeft.name">

    </template>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnRight.name">

      <ContainerActivateAccount></ContainerActivateAccount>

    </template>
  </TemplateNavbarSplitColumns>
</template>

<script>
  import { TemplateNavbarSplitColumns } from '@/components/presentational/templates'
  import { ContainerActivateAccount } from '@/components/container/user'

  export default {
    name: 'PageActivateAccount',
    middleware: [
      'only-unauthenticated'
    ],
    components: {
      ContainerActivateAccount,
      TemplateNavbarSplitColumns
    },
    data: function () {
      return {
        TemplateNavbarSplitColumns
      }
    }
  }
</script>
