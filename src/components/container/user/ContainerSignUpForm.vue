<template>
  <OrganismSignUpForm
    v-bind="content"
    :formData="formData"
    :formName="formName"
    @submit="handleSubmit"
  />
</template>

<script>
  import { FORMS_ACTION_TYPES } from '@/store/forms'
  import { userMixins } from '@/store/user'
  import { staticContent } from '@/data/static-content'
  import { OrganismSignUpForm } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerSignUpForm',
    components: {
      OrganismSignUpForm
    },
    mixins: [
      userMixins.unauthenticated
    ],
    data: function () {
      return {
        content: {
          ...staticContent.signUpForm
        },
        formName: 'signUpForm'
      }
    },
    computed: {
      formData: function () {
        return {
          email: this.user.email,
          name: this.user.name,
          institute: this.user.institute,
          password: this.user.password,
          passwordRepeat: this.user.passwordRepeat,
          policiesAreAccepted: this.user.policiesAreAccepted
        }
      }
    },
    methods: {
      handleSubmit: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName,
            message: staticContent.signUpForm.successMessage
          })
        }

        this.userRegister(payload)
      }
    }
  }
</script>
