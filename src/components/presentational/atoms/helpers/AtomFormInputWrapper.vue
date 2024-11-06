<template>
  <div class="input-wrapper" :class="{'input-wrapper--small': isSmall}">
    <label
      v-if="label"
      class="input-wrapper__label"
      :class="{ 'input-wrapper__label--has-focus': hasFocus }"
      :for="id"
    >
      {{ label }}
    </label>
    <slot></slot>
    <p
      v-if="message"
      class="input-wrapper__message"
      :class="{
        'input-wrapper__message--has-error': hasError,
        'input-wrapper__message--has-success': hasSuccess,
      }"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
  import { formPropTypes } from '@/prop-types/form'

  export default {
    name: 'AtomFormInputWrapper',
    props: {
      id: formPropTypes.inputId,
      label: formPropTypes.inputLabel,
      message: formPropTypes.inputMessage,
      hasFocus: formPropTypes.inputHasFocus,
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess,
      isSmall: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .input-wrapper--small {
    width: 12rem;
  }

  .input-wrapper__label {
    @include font-size(18px);

    color:  $color-white;
    display: block;
    transition: $global-transition;

    &:not(:last-child) {
      margin-bottom: $global-spacing-unit-tiny;
    }
  }

  .input-wrapper__label--has-focus {
    color: $color-white;
  }

  .input-wrapper__message {
    @include font-size(14px);

    text-align: right;
  }

  .input-wrapper__message--has-error {
    color: $color-red-alert;
  }

  .input-wrapper__message--has-success {
    color: $color-lima;
  }
</style>
