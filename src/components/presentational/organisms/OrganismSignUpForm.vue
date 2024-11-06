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
            label="Name"
            name="name"
            :value="getInputValue('name')"
            :hasError="hasInputError('name')"
            :hasSuccess="isInputValid('name')"
            :message="getInputMessage('name')"
            @change="setInputValue"
            @blur="handleInputBlur"
          />
        </div>
        <div class="u-margin-top-small">
          <AtomFormInputText
            label="Institute"
            name="institute"
            :value="getInputValue('institute')"
            :hasError="hasInputError('institute')"
            :hasSuccess="isInputValid('institute')"
            :message="getInputMessage('institute')"
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
          <AtomFormInputText
            label="Repeat password"
            name="passwordRepeat"
            :value="getInputValue('passwordRepeat')"
            :hasError="hasInputError('passwordRepeat')"
            :hasSuccess="isInputValid('passwordRepeat')"
            :message="getInputMessage('passwordRepeat')"
            @change="setInputValue"
            @blur="handleInputBlur"
            isPassword
          />
        </div>
        <div class="u-margin-top-small">
          <AtomTextBody isSmall alignRight> By checking the box below, you agree to our
            <a href="https://pictureproject.nl/privacy-statement-eu/">   {{ 'Privacy Policy' }}</a>

          </AtomTextBody>
          <div class="u-margin-top-small">
          <AtomFormInputCheckbox
            label="Accept our policies"
            name="policiesAreAccepted"
            :isChecked="getInputValue('policiesAreAccepted')"
            :hasError="hasInputError('policiesAreAccepted')"
            :hasSuccess="isInputValid('policiesAreAccepted')"
            :message="getInputMessage('policiesAreAccepted', 'Please accept our policies')"
            @change="setInputValue"
          />

          </div>

        </div>
        <div class="u-margin-top">
          <AtomButton isFullWidth>
            {{ buttonRegisterText }}
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
  import { userValidations } from '@/store/user'

  import {
    AtomButton,
    AtomDivider,
    AtomFormInputText,
    AtomFormInputCheckbox,
    AtomTextHeading
  } from '@/components/presentational/atoms'

  import { MoleculeFormState } from '@/components/presentational/molecules'

  export default {
    name: 'OrganismSignUpForm',
    components: {
      AtomButton,
      AtomDivider,
      AtomFormInputCheckbox,
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
      loginToName: {
        type: String,
        default: ROUTES.USER_LOG_IN.name,
        description: 'The router link for the login button'
      },
      buttonRegisterText: {
        type: String,
        default: 'Sign up'
      },
      buttonLoginText: {
        type: String,
        default: 'Login'
      }
    },
    data(){
      return {
        ROUTES
      }
    },
    created(){
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
