<template>
  <div>

    <OrganismMobileControlsMenu
      @openMenu="openMenu"
    />

    <OrganismMobilePopUpMenuItem
      :isHidden="!isMenuClosed"
      @close="closeMenu"
      :component="renderedComponent"
      :coordinates="getCoordinates"
      @setCoordinates="setCoordinates"
      @resetCoordinates="resetCoordinates"
      :thresholdValue="getThresholdValue"
      @setThreshold="setThreshold"
      @resetFilters="resetFilters"
      :maskingValue="getMaskingValue"
      @setMasking="setMasking"
      @resetMasking="resetMasking"
      :brainDefaultValue="getBrainDefaultValue"
      @setBrainDefault="setBrainDefault"
      :colorOverlayValue="getColorOverlayValue"
      @setColorOverlay="setColorOverlay"
      :brainDefaultToggleValue="getBrainDefaultToggleValue"
      @setBrainDefaultToggle="setBrainDefaultToggle"
      @resetLayers="resetLayers"
    />

  </div>
</template>

<script>
  import OrganismMobileControlsMenu from '@/components/presentational/organisms/OrganismMobileControlsMenu'
  import OrganismMobilePopUpMenuItem from '@/components/presentational/organisms/OrganismMobilePopUpMenuItem'
  import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'

  export default {
    name: 'ContainerBrainMapMobileControls',
    components: {
      OrganismMobilePopUpMenuItem,
      OrganismMobileControlsMenu
    },
    mixins: [
      brainMapsViewerMixins.controls
    ],
    data: function () {
      return {
        isMenuClosed: true,
        renderedComponent: ''
      }
    },
    methods: {
      openMenu: function (type) {
        this.isMenuClosed = false
        this.renderedComponent = type
      },
      closeMenu: function () {
        this.isMenuClosed = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
