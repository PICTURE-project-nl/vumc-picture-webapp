<template>
  <div>
    <MoleculeBrainViewerSectionHeading
      :headingText="content.layers"
      :actionText="content.reset"
      @action="resetLayers"
    />

    <div class="u-margin-top">
      <AtomFormInputCheckbox
        :label="content.brainDefault"
        name="brainDefaultToggle"
        :isChecked="brainDefaultToggleValue"
        @change="changeBrainDefaultToggle"
      />
    </div>

    <div class="u-margin-top">
      <AtomFormInputSlider
        :label="content.brainDefault"
        name="brainDefault"
        :minValue="0"
        :maxValue="100"
        :singleValue="brainDefaultValue"
        :isDisabled="!brainDefaultToggleValue"
        @change="changeBrainDefaultValue"
      />
    </div>

    <div class="u-margin-top">
      <AtomFormInputSlider
        :label="content.colorOverlay"
        name="colorOverlay"
        :minValue="0"
        :maxValue="100"
        :singleValue="colorOverlayValue"
        @change="changeColorOverlay"
      />
    </div>

  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { AtomFormInputCheckbox, AtomFormInputSlider } from '@/components/presentational/atoms'
  import MoleculeBrainViewerSectionHeading
    from '@/components/presentational/molecules/MoleculeBrainViewerSectionHeading'

  export default {
    name: 'MoleculeBrainMapControlsLayers',
    components: {
      MoleculeBrainViewerSectionHeading,
      AtomFormInputCheckbox,
      AtomFormInputSlider
    },
    props: {
      brainDefaultValue: {
        type: Number
      },
      colorOverlayValue: {
        type: Number
      },
      brainDefaultToggleValue: {
        type: Boolean
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapControls
        }
      }
    },
    methods: {
      resetLayers: function () {
        this.$emit('resetLayers')
      },
      changeBrainDefaultValue: function (payload) {
        this.$emit('setBrainDefault', payload.value)
      },
      changeBrainDefaultToggle: function (payload) {
        this.$emit('setBrainDefaultToggle', payload.value)
      },
      changeColorOverlay: function (payload) {
        this.$emit('setColorOverlay', payload.value)
      }
    }
  }
</script>
