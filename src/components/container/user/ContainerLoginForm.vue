<template>
  <OrganismLoginForm
    v-bind="content"
    :formData="formData"
    :formName="formName"
    @submit="handleSubmit"
  />
</template>

<script>
  import { DEFAULT_AUTHENTICATED_PAGE } from '@/config/routing'
  import { FORMS_ACTION_TYPES } from '@/store/forms'
  import { staticContent } from '@/data/static-content'
  import { userMixins } from '@/store/user'
  import { OrganismLoginForm } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerLoginForm',
    components: {
      OrganismLoginForm
    },
    mixins: [
      userMixins.unauthenticated
    ],
    data: function () {
      return {
        content: {
          ...staticContent.loginForm
        },
        formName: 'loginForm',

        /*
        The form data doesn't need to be reactive (computed from the store) here, because it would otherwise be
        overwritten from the store when the user logs in.
         */
        formData: {
          email: null,
          password: null
        }
      }
    },
    methods: {
      handleSubmit: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName,
            message: staticContent.loginForm.successMessage
          })

          setTimeout(() => {
            this.$router.push(DEFAULT_AUTHENTICATED_PAGE.path)
          }, 2000)
        }

        this.userLogin(payload)
      }
    }
  }
</script>
