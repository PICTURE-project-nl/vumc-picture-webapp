<template>
  <div class="selection-wrapper">

    <label
      v-if="label"
      class="selection-wrapper__label"
      :class="{
        'selection-wrapper__label--has-error': hasError,
        'selection-wrapper__label--has-success': hasSuccess
      }"
      :for="id"
    >
      {{ label }}
    </label >
    <span
      class="selection-wrapper__input o-visually-hidden-input"
      :class="{
        'selection-wrapper__input--circle': isCircle,
        'selection-wrapper__input--has-error': hasError,
        'selection-wrapper__input--has-success': hasSuccess,
        'selection-wrapper__input--has-label': label
      }"
    >
      <slot></slot>
    </span>

    
  </div>
</template>

<script>
  import { formPropTypes } from '@/prop-types/form'

  export default {
    name: 'AtomFormSelectionWrapper',
    props: {
      id: formPropTypes.inputId,
      label: formPropTypes.inputLabel,
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess,
      isCircle: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  // For ::v-deep usage see: https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors

  .selection-wrapper {
    display: flex;
  }

  .selection-wrapper__input {
    display: block;
    flex: 0 0 16px;
    height: 16px;
    overflow: hidden;
    width: 16px;

    &::before {
      @include position-cover();

      background-color: $color-input;
      border: 1px solid $color-border-Abbey;
      border-radius: $global-radius;
      content: '';
      z-index: 0;
    }
  }

  .selection-wrapper__input--circle {
    &::before {
      border-radius: 50%;
    }
  }

  .selection-wrapper__input--has-label {
    margin-right: $global-spacing-unit-tiny;
    top: 4px;
    background-color: $color-very-dark-blue-black;
  }

  .selection-wrapper__input--has-error {
    &::before {
      background-color: $color-red-alert-transparent;
      border-color: $color-red-alert;
    }
  }

  .selection-wrapper__input--has-success {
    &::before {
      background-color: $color-lima-transparent;
      border-color: $color-lima;
    }
  }

  .selection-wrapper__label {
    @include font-size(14px);

    color: $color-white;
    display: block;
    padding-right:5px;
  }

  .selection-wrapper__label--has-error {
    color: $color-red-alert;
  }

  .selection-wrapper__label--has-success {
    color: $color-lima;
  }
</style>
