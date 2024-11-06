<template>
  <TemplateNavbarSplitColumns>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnLeft.name">

      <ContainerIntroBlock />

    </template>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnRight.name">

      <ContainerForgotPasswordForm />

    </template>
  </TemplateNavbarSplitColumns>
</template>

<script>
  import { TemplateNavbarSplitColumns } from '@/components/presentational/templates'
  import { ContainerIntroBlock } from '@/components/container/general'
  import { ContainerForgotPasswordForm } from '@/components/container/user'

  export default {
    name: 'PageForgotPassword',
    components: {
      ContainerIntroBlock,
      ContainerForgotPasswordForm,
      TemplateNavbarSplitColumns
    },
    data: function () {
      return {
        TemplateNavbarSplitColumns
      }
    }
  }
</script>
