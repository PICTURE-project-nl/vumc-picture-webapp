<template>
  <div>
    <AtomTextHeading>
      Activate account
    </AtomTextHeading>
    <AtomTextBody>
      {{ activateAccountStatus }}
    </AtomTextBody>

    <AtomButton
      class="u-margin-top"
      isFullWidth
      :toName="ROUTES.USER_LOG_IN.name"
    >
      Log in
    </AtomButton>
  </div>
</template>

<script>
  import { apiUser } from '@/api/user'
  import { ROUTES } from '@/config/routes'
  import AtomTextHeading from '@/components/presentational/atoms/AtomTextHeading'
  import AtomButton from '@/components/presentational/atoms/AtomButton'
  import AtomTextBody from '@/components/presentational/atoms/AtomTextBody'

  export default {
    name: 'ContainerActivateAccount',
    components: {
      AtomTextBody,
      AtomButton,
      AtomTextHeading
    },
    data: function () {
      return {
        ROUTES,
        hasError: false,
        errorMessage: false,
        isChecking: true
      }
    },
    computed: {
      activateAccountStatus: function () {
        let message = 'Waiting for activation'
        if (this.hasError) {
          message = 'An error occurred during activation. Please contact: development@activecollective.nl'
        } else if (!this.hasError && !this.isChecking) {
          message = 'Activation succes!'
        }
        return message
      }
    },
    created: function () {
      if (process.browser) {
        apiUser.userActivateAccount(
          this.$route.params.token,
          (response) => {
            console.error('response', response)
            this.errorMessage = response
            this.hasError = true
            this.isChecking = false
          },
          () => {
            this.isChecking = false
            setTimeout(() => {
              this.$router.push({ name: ROUTES.USER_LOG_IN.name, params: { lang: this.$route.params.lang } })
            }, 2000)
          }
        )
      }
    }
  }
</script>
