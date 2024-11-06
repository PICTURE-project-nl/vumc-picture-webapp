<template>
  <TemplateNavbarSplitColumns>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnLeft.name">

      <ContainerEditUserForm />

    </template>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnRight.name">

      <ContainerChangePasswordForm />

    </template>
  </TemplateNavbarSplitColumns>
</template>

<script>
  import { TemplateNavbarSplitColumns } from '@/components/presentational/templates'
  import { ContainerEditUserForm, ContainerChangePasswordForm } from '@/components/container/user'

  export default {
    name: 'PageEditAccount',
    middleware: [
      'only-authenticated'
    ],
    components: {
      ContainerEditUserForm,
      ContainerChangePasswordForm,
      TemplateNavbarSplitColumns
    },
    data: function () {
      return {
        TemplateNavbarSplitColumns
      }
    }
  }
</script>
