<template>
  <div>
    <AtomTextHeading :level="1" isLarge>
      {{ title }}
    </AtomTextHeading>

    <MoleculeFormState v-bind="formState">
      <form @submit.prevent="submitForm">
        <div class="u-margin-top-small">
          <AtomFormInputText
            label="Current password"
            name="oldPassword"
            :value="getInputValue('oldPassword')"
            :hasError="hasInputError('oldPassword')"
            :hasSuccess="isInputValid('oldPassword')"
            :message="getInputMessage('oldPassword')"
            @change="setInputValue"
            @blur="handleInputBlur"
            isPassword
          />
        </div>
        <div class="u-margin-top-small">
          <AtomFormInputText
            label="New password"
            name="newPassword"
            :value="getInputValue('newPassword')"
            :hasError="hasInputError('newPassword')"
            :hasSuccess="isInputValid('newPassword')"
            :message="getInputMessage('newPassword')"
            @change="setInputValue"
            @blur="handleInputBlur"
            isPassword
          />
        </div>
        <div class="u-margin-top-small">
          <AtomFormInputText
            label="Repeat new password"
            name="newPasswordRepeat"
            :value="getInputValue('newPasswordRepeat')"
            :hasError="hasInputError('newPasswordRepeat')"
            :hasSuccess="isInputValid('newPasswordRepeat')"
            :message="getInputMessage('newPasswordRepeat')"
            @change="setInputValue"
            @blur="handleInputBlur"
            isPassword
          />
        </div>
        <div class="u-margin-top">
          <AtomDivider />
        </div>
        <div class="u-margin-top">
          <AtomButton isFullWidth>
            {{ buttonSaveText }}
          </AtomButton>
        </div>
      </form>
    </MoleculeFormState>
  </div>
</template>

<script>
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { formsMixins } from '@/store/forms'
  import { userValidations } from '@/store/user'

  import {
    AtomButton,
    AtomDivider,
    AtomFormInputText,
    AtomTextHeading
  } from '@/components/presentational/atoms'

  import { MoleculeFormState } from '@/components/presentational/molecules'

  export default {
    name: 'OrganismChangePasswordForm',
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
      buttonSaveText: {
        type: String,
        default: 'Save'
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
