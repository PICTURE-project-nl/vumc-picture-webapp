<template>
  <div class="form-state">
    <div class="form-state__content">
      <slot></slot>
    </div>
    <div
      v-if="hasError"
      v-html="errorMessage"
      class="form-state__error"
    ></div>
    <div
      class="form-state__overlay"
      :class="{
        'form-state__overlay--is-active': showOverlay,
        'form-state__overlay--has-success': hasSuccess
      }"
    >
      <MoleculeAlert
        v-if="showOverlay"
        :status="alertProps.status"
      >
        {{ alertProps.text }}
      </MoleculeAlert>
    </div>
  </div>
</template>

<script>
  import _reduce from 'lodash/reduce'
  import _isPlainObject from 'lodash/isPlainObject'

  import { STATUSES } from '@/assets/scripts/constants/statuses'
  import { staticContent } from '@/data/static-content'

  import MoleculeAlert from './MoleculeAlert.vue'

  export default {
    name: 'MoleculeFormState',
    components: {
      MoleculeAlert
    },
    props: {
      hasError: {
        type: Boolean,
        required: true
      },
      hasSuccess: {
        type: Boolean,
        required: true
      },
      message: {
        type: String
      },
      errorApiMessages: {
        type: [String, Object]
      },
      isLoading: {
        type: Boolean,
        required: true
      },
      isPending: {
        type: Boolean,
        required: true
      }
    },
    data: function () {
      return {
        loadingText: staticContent.formState.loading
      }
    },
    computed: {
      alertProps: function () {
        if (this.isPending || this.isLoading) {
          return {
            status: STATUSES.LOADING,
            text: staticContent.formState.loading
          }
        } else if (this.hasSuccess) {
          return {
            status: STATUSES.SUCCESS,
            text: this.message
          }
        }

        return {
          status: null,
          text: null
        }
      },
      errorMessage: function () {
        if (this.message) {
          return this.message
        }

        if (this.errorApiMessages && _isPlainObject(this.errorApiMessages)) {
          /*
          The error returned from the API is an object with keys, each key contains an array of strings.
          This will loop through all strings and returns one string to render as HTML.

          Example:
            {
              "institute": [ "The institute may not be greater than 30 characters." ],
              "email": [ "The email has already been taken." ]
            }
          */
          return _reduce(this.errorApiMessages, (result, error) => {
            result += error.reduce((errorResult, message) => {
              errorResult += `${message}<br/>`
              return errorResult
            }, '')

            return result
          }, [])
        }

        return staticContent.formErrors.default
      },
      showOverlay: function () {
        return this.isPending || this.isLoading || this.hasSuccess
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-state {
    position: relative;
  }

  .form-state__content {
    position: relative;
    z-index: 0;
  }

  .form-state__error {
    color: $color-red-alert;
    font-weight: $font-weight-semi-bold;
    margin-top: $global-spacing-unit-small;
    text-align: right;
    z-index: 0;
  }

  .form-state__overlay {
    @include position-cover();
    @include position-flexbox-center();

    background-color: rgba($color-mirage, 0.9);
    opacity: 0;
    padding: $global-spacing-unit-large;
    pointer-events: none;
    transition: $global-transition;
    z-index: 1;
  }

  .form-state__overlay--is-active {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0.5s;
  }

  .form-state__overlay--has-success {
    background-color: $color-mirage;
    transition-delay: 0s;
  }
</style>
