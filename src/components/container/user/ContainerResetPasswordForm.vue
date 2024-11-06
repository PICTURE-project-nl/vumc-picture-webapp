<template>
  <OrganismResetPasswordForm
    v-bind="content"
    :formData="formData"
    :formName="formName"
    :hasError="hasError"
    :errorMessage="content.tokenFailed"
    @submit="userPostResetPassword"
  />
</template>

<script>
  import { userMixins } from '@/store/user'
  import { staticContent } from '@/data/static-content'
  import { OrganismResetPasswordForm } from '@/components/presentational/organisms'
  import { DEFAULT_UNAUTHENTICATED_PAGE } from '@/config/routing'
  import { FORMS_ACTION_TYPES } from '@/store/forms'
  import { formHandlers } from '@/store/forms/handlers'
  import { apiUser } from '@/api/user'

  export default {
    name: 'ContainerResetPasswordForm',
    components: {
      OrganismResetPasswordForm
    },
    mixins: [
      userMixins.unauthenticated
    ],
    data: function () {
      return {
        content: {
          ...staticContent.resetPasswordForm
        },
        formName: 'resetPasswordForm',
        formData: {
          email: null,
          newPassword: null,
          newPasswordRepeat: null
        },
        hasError: false
      }
    },
    mounted: function () {
      let payload = {formName: this.formName, data: this.$route.params.token}
      const context = {...this.$store}

      formHandlers.startHandler({ context, payload })

      apiUser.userCheckResetPassword(
        payload.data,
        (response) => {
          formHandlers.errorHandler({ response, context, payload })
          this.hasError = true
        },
        () => {
          formHandlers.successHandler({ context, payload })
        }
      )
    },
    methods: {
      userPostResetPassword: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName,
            message: staticContent.resetPasswordForm.successMessage
          })

          setTimeout(() => {
            this.$router.push(DEFAULT_UNAUTHENTICATED_PAGE.path)
          }, 2000)
        }
        const context = {...this.$store}
        payload.data.token = this.$route.params.token
        formHandlers.startHandler({ context, payload })

        apiUser.resetPassword(
          payload.data,
          (response) => {
            formHandlers.errorHandler({ response, context, payload })
          },
          (data) => {
            formHandlers.successHandler({ context, payload })
          }
        )
      }
    }
  }
</script>
