<template>
  <OrganismEditUserForm
    v-bind="content"
    :formData="formData"
    :formName="formName"
    @submit="userUpdate"
  />
</template>

<script>
  import { userMixins } from '@/store/user'
  import { staticContent } from '@/data/static-content'
  import { OrganismEditUserForm } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerEditUserForm',
    components: {
      OrganismEditUserForm
    },
    mixins: [
      userMixins.authenticatedData,
      userMixins.authenticatedUpdate
    ],
    data: function () {
      return {
        content: {
          ...staticContent.editUserForm
        },
        formName: 'editUserForm'
      }
    },
    computed: {
      formData: function () {
        return {
          email: this.user.email,
          name: this.user.name,
          institute: this.user.institute
        }
      }
    }
  }
</script>
