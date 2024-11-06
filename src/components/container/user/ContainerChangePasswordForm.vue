<template>
  <OrganismChangePasswordForm
    v-bind="content"
    :formData="formData"
    :formName="formName"
    @submit="userPasswordChange"
  />
</template>

<script>
  import { userMixins } from '@/store/user'
  import { staticContent } from '@/data/static-content'
  import { OrganismChangePasswordForm } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerChangePasswordForm',
    components: {
      OrganismChangePasswordForm
    },
    mixins: [
      userMixins.authenticatedData,
      userMixins.authenticatedUpdate
    ],
    data: function () {
      return {
        content: {
          ...staticContent.changePasswordForm
        },
        formData: {
          oldPassword: null,
          newPassword: null,
          newPasswordRepeat: null
        },
        formName: 'userChangePasswordForm'
      }
    }
  }
</script>
