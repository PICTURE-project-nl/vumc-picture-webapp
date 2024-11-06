<template>
  <div>
    <AtomTextHeading :level="1" isLarge>
      {{ title }}
    </AtomTextHeading>

    <div class="u-margin-top" v-html="intro"></div>

    <MoleculeFormState v-bind="formState">
      <form @submit.prevent="submitForm">
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
        <div class="u-margin-top-small">
          <AtomFormInputText
            label="Password"
            name="password"
            :value="getInputValue('password')"
            :hasError="hasInputError('password')"
            :hasSuccess="isInputValid('password')"
            :message="getInputMessage('password')"
            @change="setInputValue"
            @blur="handleInputBlur"
            isPassword
          />
        </div>
        <div class="u-margin-top-small">
          <AtomTextBody isSmall alignRight>
            <router-link :to="ROUTES.USER_FORGOT_PASSWORD.path">
              {{ buttonForgotPasswordText }}
            </router-link>
          </AtomTextBody>
        </div>
        <div class="u-margin-top">
          <AtomButton isFullWidth>
            {{ buttonLoginText }}
          </AtomButton>
        </div>
      </form>
    </MoleculeFormState>

    <div class="u-margin-top">
      <AtomDivider />
    </div>
    <div class="u-margin-top">
      <AtomButton
        :toName="registerToName"
        isFullWidth
        isGhost
      >
        {{ buttonRegisterText }}
      </AtomButton>
    </div>
  </div>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { formsMixins } from '@/store/forms'
  import { userValidations } from '@/store/user'

  import {
    AtomButton,
    AtomDivider,
    AtomFormInputText,
    AtomTextBody,
    AtomTextHeading
  } from '@/components/presentational/atoms'

  import { MoleculeFormState } from '@/components/presentational/molecules'

  export default {
    name: 'OrganismSignUpForm',
    components: {
      AtomButton,
      AtomDivider,
      AtomFormInputText,
      AtomTextBody,
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
        default: 'Forgot password?'
      },
      buttonLoginText: {
        type: String,
        default: 'Login'
      },
      buttonRegisterText: {
        type: String,
        default: 'Sign up'
      },
      registerToName: {
        type: String,
        default: ROUTES.USER_SIGN_UP.name,
        description: 'The router link for the register button'
      }
    },
    data: function () {
      return {
        ROUTES
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
