<template>
<div>
  <AtomFormInputWrapper
    :id="id"
    :label="label"
    :message="message"
    :hasFocus="hasFocus"
    :hasError="hasError"
    :hasSuccess="hasSuccess"
  >
  <div> 
    <input
      v-if="!isTextarea && !isPassword"
      v-model="model"
      type="text"
      class="input"
      :style="{backgroundImage:'url(@/assets/link.svg)'}"
      :class="inputClasses"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @focus="toggleFocus(true)"
      @blur="toggleFocus(false)"
    />
    </div>

    <textarea
      v-if="isTextarea"
      v-model="model"
      class="input input--textarea"
      :class="inputClasses"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @focus="toggleFocus(true)"
      @blur="toggleFocus(false)"
    >
    
    </textarea>
    

    <input
      v-if="isPassword"
      v-model="model"
      type="password"
      class="input"
      :class="inputClasses"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @focus="toggleFocus(true)"
      @blur="toggleFocus(false)"
    />
  </AtomFormInputWrapper>
  </div>
</template>

<script>
import image_link from '@/assets/link.svg';
import { AtomIcon } from '@/components/presentational/atoms'


  import { formPropTypes } from '@/prop-types/form'
  import { getRandomId } from '@/assets/scripts/utils/random-id'

  import AtomFormInputWrapper from './helpers/AtomFormInputWrapper.vue'

  export default {
    name: 'AtomFormInputText',
    components: {
      AtomFormInputWrapper,AtomIcon,image_link
    },
    props: {
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess,
      isPassword: formPropTypes.inputIsPassword,
      isTextarea: formPropTypes.inputIsTextarea,
      label: formPropTypes.inputLabel,
      message: formPropTypes.inputMessage,
      name: formPropTypes.inputName,
      placeholder: formPropTypes.inputPlaceholder,
      value: formPropTypes.inputValue,
      isDisabled: formPropTypes.isDisabled
    },
    data: function () {
      return {
        id: getRandomId(),
        hasFocus: false,
        iconNeeded:true
      }
    },
    computed: {
      model: {
        get: function () {
          return this.value
        },
        set: function (value) {
          this.$emit('change', {
            name: this.name,
            value
          })
        }
      },
      inputClasses: function () {
        return {
          'input--has-error': this.hasError,
          'input--has-success': this.hasSuccess
        }
      }
    },
    methods: {
      toggleFocus: function (hasFocus) {
        this.hasFocus = hasFocus
        this.$emit(hasFocus ? 'focus' : 'blur', {
          name: this.name
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input {
    @include reset-form-element();
    background-color:$color-input;
    
    // background-color: $color-input-transparent;//green;//$color-ghost-transparent;
    border: 1px solid transparent;
    color: $color-white;
    display: block;
    padding: $global-spacing-unit-small $global-spacing-unit;
    width: 100%;
    
  }

  .input--textarea {
    height: 4 * $global-line-height;
  }

  .input--has-error {
    background-color: $color-red-alert-transparent;
    border-bottom: 1px solid $color-red-alert;
  }

  .input--has-success {
    background-color: $color-lima-transparent;
    border-bottom: 1px solid $color-lima;
  }

   .link-copy__icon {
    background-color: $color-ghost-transparent;
    cursor: pointer;
    padding: $global-spacing-unit-small $global-spacing-unit-tiny $global-spacing-unit-small 0;
  }
</style>
