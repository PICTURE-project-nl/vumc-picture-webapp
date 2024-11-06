<template>
  <div class="o-layout-flex o-layout-flex--vertical-center-row">
    <div
      class="alert-icon"
      :class="classes"
    >
      <AtomIcon
        v-if="!isLoading"
        :boxSize="iconSize"
        :type="iconType"
      ></AtomIcon>
      <AtomLoadingSpinner
        v-if="isLoading"
        :size="iconSize"
      >
      </AtomLoadingSpinner>
    </div>
    <div
      :class="{
        'u-padding-left': !isSmall,
        'u-padding-left-small': isSmall
      }"
    >
      <AtomTextBody isSmall>
        <slot>{{ name }}</slot>
      </AtomTextBody>
    </div>
  </div>
</template>

<script>
  import { STATUSES, STATUSES_ICONS } from '@/assets/scripts/constants/statuses'
  import { statusPropTypes } from '@/prop-types/status'
  import { getStatusClasses } from '@/assets/scripts/utils/status'

  import {
    AtomIcon,
    AtomTextBody,
    AtomLoadingSpinner
  } from '@/components/presentational/atoms'

  export default {
    name: 'MoleculeAlert',
    components: {
      AtomIcon,
      AtomTextBody,
      AtomLoadingSpinner
    },
    props: {
      status: statusPropTypes.type('MoleculeAlert'),
      isSmall: {
        type: Boolean
      }
    },
    data: function () {
      return {
        name: 'MoleculeAlert'
      }
    },
    computed: {
      classes: function () {
        const status = this.status

        return {
          'alert-icon--small': this.isSmall,
          ...getStatusClasses({ baseClass: 'alert-icon', status })
        }
      },
      iconType: function () {
        return STATUSES_ICONS[this.status]
      },
      isLoading: function () {
        return this.status === STATUSES.LOADING
      },
      iconSize: function () {
        return this.isSmall ? 16 : 24
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alert-icon {
    @include position-flexbox-center();

    background-color: $color-ebony-clay;
    border-radius: 50%;
    flex: 0 0 $global-spacing-unit-large;
    height: $global-spacing-unit-large;
    width: $global-spacing-unit-large;
  }

  .alert-icon--small {
    flex-basis: $global-spacing-unit;
    height: $global-spacing-unit;
    width: $global-spacing-unit;
  }

  @each $state, $color in $status {
    .alert-icon--#{$state} {
      background-color: $color;
    }
  }
</style>
