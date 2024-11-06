<template>
  <AtomFormInputWrapper
    :id="id"
    :hasError="hasError"
    :hasSuccess="hasSuccess"
  >
    <AtomFormSelectionWrapper
      :id="id"
      :label="label"
      :hasError="hasError"
      :hasSuccess="hasSuccess"
      isCircle
    >
      <input
        type="radio"
        :id="id"
        :name="id"
        :value="value"
        v-model="model"
        class="o-visually-hidden-input__input"
      />
      <span
        class="radio-button-icon"
        :class="{ 'radio-button-icon--selected': value === groupModel }"
      ></span>
    </AtomFormSelectionWrapper>
  </AtomFormInputWrapper>
</template>

<script>
  import { formPropTypes } from '@/prop-types/form'

  import { getRandomId } from '@/assets/scripts/utils/random-id'

  import AtomFormInputWrapper from './helpers/AtomFormInputWrapper.vue'
  import AtomFormSelectionWrapper from './helpers/AtomFormSelectionWrapper.vue'

  export default {
    name: 'AtomFormInputRadioButton',
    components: {
      AtomFormInputWrapper,
      AtomFormSelectionWrapper
    },
    props: {
      groupModel: {
        type: String,
        required: true
      },
      value: formPropTypes.inputValue,
      label: formPropTypes.inputLabel,
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess
    },
    data: function () {
      return {
        id: getRandomId()
      }
    },
    computed: {
      model: {
        get: function () {
          return this.groupModel
        },
        set: function () {
          this.$emit('change', this.value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .radio-button-icon {
    background-color: $color-white;
    border-radius: 50%;
    height: 6px;
    left: 5px;
    opacity: 0;
    position: absolute;
    top: 5px;
    width: 6px;
    z-index: 1;
  }

  .radio-button-icon--selected {
    opacity: 1;
  }
</style>
