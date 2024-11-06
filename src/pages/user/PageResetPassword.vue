<template>
  <TemplateNavbarSplitColumns>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnLeft.name">

      <ContainerIntroBlock />

    </template>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnRight.name">

      <ContainerResetPasswordForm />

    </template>
  </TemplateNavbarSplitColumns>
</template>

<script>
  import { TemplateNavbarSplitColumns } from '@/components/presentational/templates'
  import { ContainerIntroBlock } from '@/components/container/general'
  import { ContainerResetPasswordForm } from '@/components/container/user'

  export default {
    name: 'PageForgotPassword',
    components: {
      ContainerIntroBlock,
      ContainerResetPasswordForm,
      TemplateNavbarSplitColumns
    },
    data: function () {
      return {
        TemplateNavbarSplitColumns
      }
    }
  }
</script>
