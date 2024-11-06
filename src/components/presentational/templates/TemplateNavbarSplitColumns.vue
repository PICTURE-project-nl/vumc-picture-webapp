<template>
  <div>

    <ContainerNavigationBar />

    <div class="login-page" >
      <div class="o-wrapper o-wrapper--extended">
        <div class="o-simple-grid">
          <div class="o-simple-grid__column o-simple-grid__column--split">
            <slot :name="slotConfig.columnLeft.name"></slot>
          </div>
          <div class="o-simple-grid__divider">
            <AtomDivider isVertical />
          </div>
          <div class="o-simple-grid__column o-simple-grid__column--split">
            <slot :name="slotConfig.columnRight.name"></slot>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { SLOT_EXPECTS } from '@/assets/scripts/constants/slots'
  import { AtomDivider } from '@/components/presentational/atoms'
  import { ContainerNavigationBar } from '@/components/container/general'

  const slotConfig = {
    columnLeft: {
      name: 'column-left',
      expects: SLOT_EXPECTS.COMPONENTS
    },
    columnRight: {
      name: 'column-right',
      expects: SLOT_EXPECTS.COMPONENTS
    }
  }

  export default {
    name: 'TemplateNavbarSplitColumns',
    components: {
      AtomDivider,
      ContainerNavigationBar
    },
    slotConfig,
    data: function () {
      return {
        slotConfig
      }
    }
  }
</script>
<style>
.login-page
{
min-width: 80%;
padding-top: 96px;
}
</style>