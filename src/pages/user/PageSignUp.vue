<template>
  <TemplateNavbarSplitColumns>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnLeft.name">

      <ContainerIntroBlock />

    </template>
    <template :slot="TemplateNavbarSplitColumns.slotConfig.columnRight.name">

      <ContainerSignUpForm />

    </template>
  </TemplateNavbarSplitColumns>
</template>

<script>
  import { TemplateNavbarSplitColumns } from '@/components/presentational/templates'
  import { ContainerIntroBlock } from '@/components/container/general'
  import { ContainerSignUpForm } from '@/components/container/user'

  export default {
    name: 'PageSignUp',
    components: {
      ContainerIntroBlock,
      ContainerSignUpForm,
      TemplateNavbarSplitColumns
    },
    data: function () {
      return {
        TemplateNavbarSplitColumns
      }
    }
  }
</script>
