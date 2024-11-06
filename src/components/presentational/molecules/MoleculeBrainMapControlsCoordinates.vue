<template>
  <div>
    <MoleculeBrainViewerSectionHeading
      :headingText="content.adjustCoordinates"
      :actionText="content.reset"
      @action="resetCoordinates"
    />

    <!-- <div class="u-margin-top"> -->
      <AtomFormInputSlider
        :label="content.axi"
        name="axi"
        :minValue="-128"
        :maxValue="128"
        :singleValue="axiValue"
        @change="changeCoordinates"
      />
    <!-- </div> -->

    <!-- <div class="u-margin-top"> -->
      <AtomFormInputSlider
        :label="content.cor"
        name="cor"
        :minValue="-128"
        :maxValue="128"
        :singleValue="corValue"

        @change="changeCoordinates"
      />
    <!-- </div> -->

    <!-- <div class="u-margin-top"> -->
      <AtomFormInputSlider
        :label="content.sag"
        name="sag"
        :minValue="-128"
        :maxValue="128"
        :singleValue="sagValue"

        @change="changeCoordinates"
      />
    <!-- </div> -->

  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { AtomFormInputSlider } from '@/components/presentational/atoms'
  import MoleculeBrainViewerSectionHeading from '@/components/presentational/molecules/MoleculeBrainViewerSectionHeading.vue'

  export default {
    name: 'MoleculeBrainMapControlsCoordinates',
    components: {
      MoleculeBrainViewerSectionHeading,
      AtomFormInputSlider
    },
    props: {
      axiValue: {
        type: Number
      },
      corValue: {
        type: Number
      },
      sagValue: {
        type: Number
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
      resetCoordinates: function () {
        this.$emit('resetCoordinates')
      },
      changeCoordinates: function (payload) {
        this.$emit('setCoordinates', payload)
      }
    }
  }
</script>
