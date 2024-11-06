<template>
  <div class="progress-container">
    <AtomTextHeading isSmall>
      Progress
    </AtomTextHeading>
    <div class="progress">
      <div
        class="progress__item"
        v-for="(item, index) in items"
        :key="index+item.title"
      >
        <MoleculeProgressItem
          :status="item.status"
          :isCompleted="item.isCompleted"
          :isInProgress="item.isInProgress"
        >
          {{ item.title }}
        </MoleculeProgressItem>
      </div>
    </div>
  </div>
</template>

<script>

  import {
    MoleculeProgressItem
  } from '@/components/presentational/molecules'

  import {
    AtomTextHeading
  } from '@/components/presentational/atoms'

  export default {
    name: 'OrganismProgress',
    components: {
      AtomTextHeading,
      MoleculeProgressItem
    },
    props: {
      items: {
        type: Array,
        description: 'Expects an array with objects with a status property: completed, inProgress, unset. and a title property'
      }
    }
  }
</script>

<style lang="scss" scoped>
  // This random number comes from aligning the 2 components Process and the process components next to each other
  .progress-container {
    margin-top: $global-spacing-unit-large + 25;
  }

  .progress {
    margin-top: $global-spacing-unit;
    position: relative;

    &::before {
      background-color: $color-ghost;
      content: ' ';
      height: calc(100% - 9px);
      left: 13px;
      position: absolute;
      width: 1px;
      z-index: 0;
    }
  }

  .progress__item {
    position: relative;
    z-index: 0;

    &:not(:last-of-type) {
      margin-bottom: $global-spacing-unit;
    }
  }
</style>
