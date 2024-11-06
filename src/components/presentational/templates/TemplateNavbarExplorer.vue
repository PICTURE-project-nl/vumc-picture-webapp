<template>
  <div>

    <ContainerNavigationBar />

    <div class="">
      <!-- <div class="o-wrapper o-wrapper--extended"> -->
        <div class="o-simple-grid" style="
    padding-left: 8%;
    padding-right: 5%;
    padding-bottom: 0%;
    padding-top:40px;
">
         <!-- / <div class="o-simple-grid__column o-simple-grid__column--explorer-sidebar"> -->
         <div style="width:20%">
            <slot :name="slotConfig.columnSidebar.name"></slot>

          </div>
          <!-- <div class="o-simple-grid__column o-simple-grid__column--explorer-main"> -->
<div style="width:80%">
            <slot :name="slotConfig.columnMain.name"></slot>

          </div>
        <!-- </div> -->
      </div>
    </div>

  </div>
</template>

<script>
  import { SLOT_EXPECTS } from '@/assets/scripts/constants/slots'
  import { ContainerNavigationBar } from '@/components/container/general'

  const slotConfig = {
    columnSidebar: {
      name: 'column-sidebar',
      expects: SLOT_EXPECTS.COMPONENTS
    },
    columnMain: {
      name: 'column-main',
      expects: SLOT_EXPECTS.COMPONENTS
    }
  }

  export default {
    name: 'TemplateNavbarExplorer',
    components: {
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
</style>
