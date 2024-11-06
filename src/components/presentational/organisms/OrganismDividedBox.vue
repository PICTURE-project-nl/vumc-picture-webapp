<template>
  <AtomBox class="u-padding-bottom-large">

    <div class="o-wrapper o-wrapper--small">
      <slot :name="slotConfig.top.name"></slot>
    </div>

    <div class="u-margin-top-large u-margin-bottom-small">
      <AtomDivider></AtomDivider>
    </div>

    <div class="o-wrapper o-wrapper--small u-margin-top-small">
      <slot :name="slotConfig.bottom.name"></slot>
    </div>

  </AtomBox>
</template>

<script>
  import {
    AtomBox,
    AtomDivider } from '@/components/presentational/atoms'
  import { SLOT_EXPECTS } from '@/assets/scripts/constants/slots'

  const slotConfig = {
    top: {
      name: 'top',
      expects: SLOT_EXPECTS.COMPONENTS
    },
    bottom: {
      name: 'bottom',
      expects: SLOT_EXPECTS.COMPONENTS
    }
  }

  export default {
    name: 'OrganismDividedBox',
    components: {
      AtomBox,
      AtomDivider
    },
    props: {
      title: {
        type: String,
        default: 'Title'
      }
    },
    slotConfig,
    data: function () {
      return {
        slotConfig
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .close {
    cursor: pointer;
  }
</style>
