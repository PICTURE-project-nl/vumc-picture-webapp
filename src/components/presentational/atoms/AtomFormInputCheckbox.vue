<template>
  <AtomFormInputWrapper
    :id="id"
    :message="message"
    :hasError="hasError"
    :hasSuccess="hasSuccess"
  >
    <AtomFormSelectionWrapper
      :id="id"
      :label="label"
      :hasError="hasError"
      :hasSuccess="hasSuccess"
    >
      <input
        v-model="model"
        type="checkbox"
        :disabled="isDisabled"
        :name="id"
        :id="id"
        class="o-visually-hidden-input__input"
      />
      <span
        class="checkbox-icon"
        :class="{ 'checkbox-icon--checked': model }"
      >
        <AtomIcon
          type="check"
          color="white"
          :boxSize="12"
        />
      </span>
    </AtomFormSelectionWrapper>
  </AtomFormInputWrapper>
</template>

<script>
  import { formPropTypes } from '@/prop-types/form'
  import { getRandomId } from '@/assets/scripts/utils/random-id'

  import AtomIcon from './AtomIcon.vue'
  import AtomFormInputWrapper from './helpers/AtomFormInputWrapper.vue'
  import AtomFormSelectionWrapper from './helpers/AtomFormSelectionWrapper.vue'

  export default {
    name: 'AtomFormInputCheckbox',
    components: {
      AtomFormInputWrapper,
      AtomFormSelectionWrapper,
      AtomIcon
    },
    props: {
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess,
      isChecked: formPropTypes.inputIsChecked,
      label: formPropTypes.inputLabel,
      message: formPropTypes.inputMessage,
      name: formPropTypes.inputName,
      isDisabled: formPropTypes.isDisabled
    },
    data: function () {
      return {
        id: getRandomId()
      }
    },
    computed: {
      model: {
        get: function () {
          return this.isChecked
        },
        set: function (value) {
          this.$emit('change', {
            name: this.name,
            value
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .checkbox-icon {
    left: 2px;
    opacity: 0;
    position: absolute;
    top: 2px;
     
    background: $color-input;// #1C1B21;
    accent-color: red;
  }

  .checkbox-icon:hover{
    cursor: pointer;
  }

  .checkbox-icon--checked {
     opacity: 1;
  }

  input[type=checkbox] {
    position: absolute;
    cursor: pointer;
 z-index: unset;
  }

  input[type=checkbox]:before {
  content: "";
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0; 
   border: 1px solid $color-border-Abbey;
 
  border-radius: 2px;
  background-color: $color-input;// #1C1B21;
  padding: 1px;
   accent-color: red;
}
  input[type=checkbox]:checked::before {
    background-color:$color-input// #1C1B21;
      // background-color: #77ACFF;
  }

  input[type=checkbox]:checked::after {
      content: "";
      display: block;
      width: 5px;
      height: 10px; 
      border: 1px solid $color-border-Abbey;//#51525C;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 6px;
  }

</style>
