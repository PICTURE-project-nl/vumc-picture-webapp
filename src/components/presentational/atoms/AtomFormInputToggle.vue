<template>
  <AtomFormInputWrapper
    :isSmall="isSmall"
    :id="id"
    :hasError="hasError"
    :hasSuccess="hasSuccess"
  >
    <div
      class="toggle"
      :class="{
        'toggle--disabled': isDisabled,
        'toggle--highlight': isHighlight
      }"
    >
      <template
        v-for="(value, index) in values"
      >
        <input
          class="toggle__input"
          type="radio"
          name="radio-group"
          :key="`input-${index}`"
          :id="`${value}_${id}`"
          :value="value"
          v-model="model"
          :disabled="isDisabled"
        />
        <label
          class="toggle__label"
          :class="{ 'toggle__label--selected': value === groupModel, 'toggle__label--small': isSmall, 'toggle__label--tiny-padding': hasTinyPadding }"
          :key="`label-${index}`"
          :for="`${value}_${id}`"
        >
          <template v-if="labels">
            {{ labels[index] }}
          </template>
          <AtomIcon
            class="toggle__icon"
            v-if="icons && !labels"
            :type="icons[index]"
          >
          </AtomIcon>
        </label>
      </template>
    </div>
  </AtomFormInputWrapper>
</template>

<script>
  import { formPropTypes } from '@/prop-types/form'

  import { getRandomId } from '@/assets/scripts/utils/random-id'

  import AtomIcon from './AtomIcon.vue'
  import AtomFormInputWrapper from './helpers/AtomFormInputWrapper.vue'

  export default {
    name: 'AtomFormInputToggle',
    components: {
      AtomIcon,
      AtomFormInputWrapper
    },
    props: {
      groupModel: {
        type: String,
        required: true
      },
      values: {
        type: Array,
        required: true
      },
      labels: {
        type: Array,
        description: 'Text displayed in toggle button. Text and icons can not be combined right now!'
      },
      icons: {
        type: Array,
        description: 'Icon displayed in toggle button. Text and icons can not be combined right now!'
      },
      isHighlight: {
        type: Boolean,
        required: false
      },
      isSmall: Boolean,
      hasTinyPadding: Boolean,
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess,
      isDisabled: {
        type: Boolean,
        required: false
      }
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
        set: function (value) {
          this.$emit('change', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toggle {
    border-radius: $global-radius;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  .toggle__label {
    background-color: $color-ghost-transparent;
    color: $color-ghost;
    cursor: pointer;
    flex-basis: 0;
    flex-grow: 1;
    padding: $global-spacing-unit-small $global-spacing-unit;
    text-align: center;
    transition: $global-transition;
    text-wrap: nowrap; /*RMM*/

    &:not(:last-of-type) {
      border-right: solid 1px $color-ghost;
    }

    .toggle--disabled & {
      color: $color-ghost-transparent;
      cursor: default;
    }

    .toggle:not(.toggle--disabled) & {
      &:hover,
      &:active {
        color: $color-white;
      }
    }
  }

  .toggle__label--tiny-padding {
    padding: $global-spacing-unit-small $global-spacing-unit-tiny;
  }

  .toggle__label--small {
    padding: $global-spacing-unit-tiny $global-spacing-unit-tiny;
  }

  .toggle__label--selected {
    background-color: rgba($color-white, 0.5);
    color: $color-white;

    .toggle--highlight & {
      background-color: $color-dodger-blue;
    }

    .toggle--disabled & {
      color: $color-white;
    }
  }

  .toggle__icon {
    display: inline-block;
  }

  .toggle__input {
    position: absolute;
    visibility: hidden;
  }
</style>
