<template>
  <div
    class="controls-container"
    :class="{
      'while-brains-loading': isLoading,
      'brains-loaded': !isLoading
    }"
  >
    <MoleculeBrainMapControlsLayers
      :brainDefaultValue="brainDefaultValue"
      @setBrainDefault="setBrainDefault"
      :colorOverlayValue="colorOverlayValue"
      @setColorOverlay="setColorOverlay"
      :brainDefaultToggleValue="brainDefaultToggleValue"
      @setBrainDefaultToggle="setBrainDefaultToggle"
      @resetLayers="resetLayers"
    />

    <AtomDivider></AtomDivider>

    <div
      class="u-padding-top"
    >
      <MoleculeBrainMapInfo
        :expectedResectabilityIndex="expectedResectabilityIndex"
        :expectedResidualVolume="expectedResidualVolume"
      />
    </div>

    <AtomDivider></AtomDivider>

  </div>
</template>

<script>
  import {
    MoleculeBrainMapControlsLayers
  } from '@/components/presentational/molecules'
  import AtomDivider from '@/components/presentational/atoms/AtomDivider'
  import MoleculeBrainMapInfo from '@/components/presentational/molecules/MoleculeBrainMapInfo'
  import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'

  export default {
    name: 'OrganismBrainMapControlsRight',
    components: {
      MoleculeBrainMapInfo,
      AtomDivider,
      MoleculeBrainMapControlsLayers
    },
    mixins: [
      brainMapsViewerMixins.emitters
    ],
    props: {
      brainDefaultValue: {
        type: Number
      },
      colorOverlayValue: {
        type: Number
      },
      brainDefaultToggleValue: {
        type: Boolean
      },
      isLoading: {
        type: Boolean
      },
      expectedResidualVolume: {
        type: String
      },
      expectedResectabilityIndex: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .controls-container {
    background-color: $color-ebony-clay;
    min-height: calc(100vh - 72px);
    padding-left: $global-spacing-unit-tiny * 5;
    padding-right: $global-spacing-unit-tiny * 5;
    padding-top: $global-spacing-unit-large;
  }

  .while-brains-loading * {
    opacity: 0.1;
    pointer-events: none;
  }

  .brains-loaded * {
    opacity: 1;
    transition: opacity 1s;
  }
</style>
