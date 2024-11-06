<template>
  <Transition name="popup">
    <div v-show="isHidden">
      <div class="mobile-popup-menu-container" @click="close">
      </div>
      <div class="mobile-popup-menu-item">
        <div class="mobile-popup-menu-item__close" @click="close">
          <span class="u-margin-right-small">
            close
          </span>
          <AtomIcon type="close" />
        </div>

        <template v-if="component === 'layers'">
          <MoleculeBrainMapControlsLayers
            :brainDefaultValue="brainDefaultValue"
            @setBrainDefault="setBrainDefault"
            :colorOverlayValue="colorOverlayValue"
            @setColorOverlay="setColorOverlay"
            :brainDefaultToggleValue="brainDefaultToggleValue"
            @setBrainDefaultToggle="setBrainDefaultToggle"
            @resetLayers="resetLayers"
          />
          <AtomDivider />
        </template>

        <template v-if="component === 'coordinates'">
          <MoleculeBrainMapControlsCoordinates
            :axiValue="coordinates.axi"
            :corValue="coordinates.cor"
            :sagValue="coordinates.sag"
            @setCoordinates="setCoordinates"
            @resetCoordinates="resetCoordinates"
          />
          <AtomDivider />
        </template>

        <template v-if="component === 'filters'">
          <MoleculeBrainMapControlsFilters
            :thresholdValue="thresholdValue"
            @setThreshold="setThreshold"
            @resetFilters="resetFilters"
          />
          <AtomDivider />
          <MoleculeBrainMapControlsMasking
            :maskingValue="maskingValue"
            @setMasking="setMasking"
            @resetMasking="resetMasking"
          />
          <AtomDivider />
        </template>

        <template v-if="component === 'info'">
          <MoleculeBrainMapInfo />
          <AtomDivider />
        </template>

      </div>
    </div>
  </Transition>
</template>

<script>
  import { AtomIcon, AtomDivider } from '@/components/presentational/atoms'
  import {
    MoleculeBrainMapControlsLayers,
    MoleculeBrainMapControlsCoordinates,
    MoleculeBrainMapControlsMasking,
    MoleculeBrainMapControlsFilters,
    MoleculeBrainMapInfo } from '@/components/presentational/molecules'
  import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'

  export default {
    name: 'OrganismMobilePopUpMenuItem',
    components: {
      AtomDivider,
      MoleculeBrainMapInfo,
      MoleculeBrainMapControlsFilters,
      MoleculeBrainMapControlsMasking,
      MoleculeBrainMapControlsCoordinates,
      MoleculeBrainMapControlsLayers,
      AtomIcon
    },
    mixins: [
      brainMapsViewerMixins.emitters
    ],
    props: {
      component: String,
      coordinates: {
        type: Object
      },
      thresholdValue: {
        type: Array
      },
      maskingValue: {
        type: String
      },
      brainDefaultValue: {
        type: Number
      },
      colorOverlayValue: {
        type: Number
      },
      brainDefaultToggleValue: {
        type: Boolean
      },
      isHidden: {
        type: Boolean
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
  .mobile-popup-menu-container {
    bottom: 0;
    height: 100vh;
    left: 0;
    position: fixed;
    width: 100vw;
  }

  .mobile-popup-menu-item {
    background-color: $color-black-transparent;
    border-top: 1px solid $color-ghost;
    bottom: 0;
    padding: $global-spacing-unit-large;
    position: fixed;
    width: 100%;
    z-index: map-get($stack-index, popup);
  }

  .mobile-popup-menu-item__close {
    align-items: center;
    cursor: pointer;
    display: flex;
    position: absolute;
    right: $global-spacing-unit-tiny;
    top: $global-spacing-unit-tiny;
  }

  .popup-enter-to {
    bottom: 0;
    opacity: 1;
    transition: all 0.3s;
  }

  .popup-enter {
    opacity: 0.5;
    position: fixed;
  }

</style>
