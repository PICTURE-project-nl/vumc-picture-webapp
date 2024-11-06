<template>
  <OrganismForgotPasswordForm
    v-bind="content"
    :formData="formData"
    :formName="formName"
    @submit="userResetPassword"
  />
</template>

<script>
  import { userMixins } from '@/store/user'
  import { staticContent } from '@/data/static-content'
  import { OrganismForgotPasswordForm } from '@/components/presentational/organisms'
  import { DEFAULT_UNAUTHENTICATED_PAGE } from '@/config/routing'
  import { FORMS_ACTION_TYPES } from '@/store/forms'

  export default {
    name: 'ContainerForgotPasswordForm',
    components: {
      OrganismForgotPasswordForm
    },
    mixins: [
      userMixins.unauthenticated
    ],
    data: function () {
      return {
        content: {
          ...staticContent.forgotPasswordForm
        },
        formName: 'forgotPasswordForm'
      }
    },
    computed: {
      formData: function () {
        return {
          email: this.user.email
        }
      }
    },
    methods: {
      userResetPassword: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName,
            message: staticContent.loginForm.successMessage
          })

          setTimeout(() => {
            this.$router.push(DEFAULT_UNAUTHENTICATED_PAGE.path)
          }, 2000)
        }

        this.userForgotPassword(payload)
      }
    }
  }
</script>
