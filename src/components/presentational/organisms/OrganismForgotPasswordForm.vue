<template>
  <div>
    <AtomTextHeading :level="1" isLarge>
      {{ title }}
    </AtomTextHeading>

    <div class="u-margin-top" v-html="intro"></div>

    <MoleculeFormState v-bind="formState">
      <form
        autocomplete="off"
        @submit.prevent="submitForm"
      >
        <div class="u-margin-top-small">
          <AtomFormInputText
            label="Email"
            name="email"
            placeholder="email@domain.com"
            :value="getInputValue('email')"
            :hasError="hasInputError('email')"
            :hasSuccess="isInputValid('email')"
            :message="getInputMessage('email')"
            @change="setInputValue"
            @blur="handleInputBlur"
          />
        </div>
        <div class="u-margin-top">
          <AtomButton isFullWidth>
            {{ buttonForgotPasswordText }}
          </AtomButton>
        </div>
      </form>
    </MoleculeFormState>

    <div class="u-margin-top">
      <AtomDivider />
    </div>
    <div class="u-margin-top">
      <AtomButton
        :toName="loginToName"
        isFullWidth
        isGhost
      >
        {{ buttonLoginText }}
      </AtomButton>
    </div>
  </div>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { formsMixins } from '@/store/forms'
  import { userValidations } from '@/store/user/validations'

  import {
    AtomButton,
    AtomDivider,
    AtomFormInputText,
    AtomTextHeading
  } from '@/components/presentational/atoms'

  import { MoleculeFormState } from '@/components/presentational/molecules'

  export default {
    name: 'OrganismForgotPasswordForm',
    components: {
      AtomButton,
      AtomDivider,
      AtomFormInputText,
      AtomTextHeading,
      MoleculeFormState
    },
    mixins: [
      formsMixins.all
    ],
    props: {
      title: {
        type: String,
        required: true
      },
      intro: {
        type: String,
        required: true,
        description: 'Can receive HTML'
      },
      buttonForgotPasswordText: {
        type: String,
        default: 'Reset password'
      },
      loginToName: {
        type: String,
        default: ROUTES.USER_LOG_IN.name,
        description: 'The router link for the login button'
      },
      buttonLoginText: {
        type: String,
        default: 'Login'
      }
    },
    validations: function () {
      return {
        localFormData: getValidationProperties({
          formData: this.formData,
          validations: userValidations
        })
      }
    }
  }
</script>
