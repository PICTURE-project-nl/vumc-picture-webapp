<template>
  <div
    class="controls-container"
    :class="{
      'while-brains-loading': isLoading,
      'brains-loaded': !isLoading
    }"
  >

    <MoleculeBrainMapControlsCoordinates
      :axiValue="coordinates.axi"
      :corValue="coordinates.cor"
      :sagValue="coordinates.sag"
      @setCoordinates="setCoordinates"
      @resetCoordinates="resetCoordinates"
    />

    <AtomDivider ></AtomDivider>

    <MoleculeBrainMapControlsFilters
      v-if="$store.state.brainMapViewer.masking !== 'patientAmount'"
      :thresholdValue="thresholdValue"
      @setThreshold="setThreshold"
      @resetFilters="resetFilters"
    />

    <AtomDivider
      v-if="$store.state.brainMapViewer.masking !== 'patientAmount'"
    ></AtomDivider>

    <MoleculeBrainMapControlsMasking
      :maskingValue="maskingValue"
      @setMasking="setMasking"
      @resetMasking="resetMasking"
      :probabilityValue="probabilityValue"
      :patientAmountValue="patientAmountValue"
    />

    <AtomDivider></AtomDivider>

    <div>

      <AtomButton
        isSmall
        isGhost
        isFullWidth
        @click.native="openDownload"
      >
        Download
      </AtomButton>

      <div class="u-margin-top-small">
        <AtomButton
          isGhost
          isSmall
          isFullWidth
          @click.native="openShare"
        >
          Share
        </AtomButton>
      </div>

    </div>

  </div>
</template>

<script>
  import {
    MoleculeBrainMapControlsCoordinates,
    MoleculeBrainMapControlsFilters,
    MoleculeBrainMapControlsMasking
  } from '@/components/presentational/molecules'
  import {
    AtomDivider
  } from '@/components/presentational/atoms'
  import AtomButton from '@/components/presentational/atoms/AtomButton'
  import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'

  export default {
    name: 'OrganismBrainMapControlsLeft',
    components: {
      AtomButton,
      MoleculeBrainMapControlsCoordinates,
      MoleculeBrainMapControlsFilters,
      MoleculeBrainMapControlsMasking,
      AtomDivider
    },
    mixins: [
      brainMapsViewerMixins.emitters
    ],
    props: {
      coordinates: {
        type: Object
      },
      thresholdValue: {
        type: Array
      },
      maskingValue: {
        type: String
      },
      probabilityValue: {
        type: Number
      },
      patientAmountValue: {
        type: Number
      },
      isLoading: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
  .controls-container {
    background-color: $color-ebony-clay;
    height: auto;
    min-height: calc(100vh - 72px);
    opacity: 1;
    padding-left: $global-spacing-unit-tiny * 5;
    padding-right: $global-spacing-unit-tiny * 5;
    padding-top: $global-spacing-unit-large;
    transition: opacity 1s;
  }

  .while-brains-loading * {
    opacity: 0.2;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .brains-loaded * {
    opacity: 1;
    transition: opacity 1s;
  }
</style>
