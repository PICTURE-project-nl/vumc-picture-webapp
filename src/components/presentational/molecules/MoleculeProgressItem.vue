<template>
  <div class="progress-item">

    <template v-if="isCompleted || isInProgress">
      <div
        class="progress-item__icon"
        :class="{ 'progress-item__icon--active': isInProgress }"
      >
        <AtomIcon
          :type="typeIcon"
          color="white"
          :boxSize="16"
        ></AtomIcon>
      </div>
    </template>

    <template v-else>
      <div
        class="progress-item__bullet"
      >
      </div>
    </template>

    <AtomTextBody isSmall :class="{ 'progress-item__text--disabled': !isCompleted && !isInProgress }">
      <slot></slot>
    </AtomTextBody>
  </div>
</template>

<script>
  import { AtomIcon, AtomTextBody } from '@/components/presentational/atoms'

  export default {
    name: 'MoleculeProgressItem',
    components: {
      AtomIcon,
      AtomTextBody
    },
    props: {
      isCompleted: Boolean,
      isInProgress: Boolean
    },
    computed: {
      typeIcon: function () {
        let type = ''
        if (this.isCompleted) {
          type = 'check'
        }
        if (this.isInProgress) {
          type = 'arrow-right'
        }
        return type
      }
    }
  }
</script>

<style lang="scss" scoped>
  .progress-item {
    align-items: center;
    display: flex;
  }

  .progress-item__bullet {
    background-color: $color-ghost;
    border-radius: 50%;
    height: 9px;
    margin-left: 9px;
    margin-right: 33px;
    width: 9px;
  }

  .progress-item__icon {
    align-items: center;
    background-color: $color-ghost;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    margin-left: 2px;
    margin-right: $global-spacing-unit;
    padding: 4px;
  }

  .progress-item__icon--active {
    background-color: $color-dodger-blue;
  }

  .progress-item__text--disabled {
    color: $color-ghost-transparent;
  }
</style>
