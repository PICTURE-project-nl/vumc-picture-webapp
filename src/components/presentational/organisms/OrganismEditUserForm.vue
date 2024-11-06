<template>
  <div>
    <AtomTextHeading :level="1" isLarge>
      {{ title }}
    </AtomTextHeading>

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
    name: 'OrganismEditUserForm',
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
