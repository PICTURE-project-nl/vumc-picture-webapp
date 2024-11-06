<template>
  <div class="u-padding-top">

     <MoleculeBrainViewerSectionHeading
      :headingText="content.masking"
      :actionText="content.reset"
      @action="resetMasking"
    /> 

    <div class="u-margin-top">
      <AtomFormInputToggle
        hasTinyPadding
        :groupModel="maskingValue"
        :labels="[content.probabilityMap,  content.patientAmount]"
        :values="['probabilityMap', 'patientAmount']"
        @change="changeMasking"
      />

      <div
        v-if="maskingValue === 'probabilityMap'"
        class="probability-container"
      >
        <div class="probability-container-value">
          <p>Resection probability map: <span class="probability-value">{{ probabilityValue }}</span></p>
        </div>
      </div>

      <div
        v-if="maskingValue === 'patientAmount'"
        class="probability-container"
      >
        <div class="probability-container-value">
          <p>Patient Amount: <span class="probability-value">{{ patientAmountValue }}</span></p>
        </div>
      </div>
    </div>

    <!--<div class="u-margin-top">-->
    <!--<AtomFormInputToggle-->
    <!--hasTinyPadding-->
    <!--:groupModel="maskingValue"-->
    <!--:labels="[content.noMasking, content.line, content.inverted]"-->
    <!--:values="['noMasking', 'line', 'inverted']"-->
    <!--@change="changeMasking"-->
    <!--/>-->
    <!--</div>-->

  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { AtomFormInputToggle } from '@/components/presentational/atoms'
  import MoleculeBrainViewerSectionHeading from '@/components/presentational/molecules/MoleculeBrainViewerSectionHeading.vue'

  export default {
    name: 'MoleculeBrainMapControlsMasking',
    components: {
      AtomFormInputToggle,
      MoleculeBrainViewerSectionHeading
    },
    props: {
      maskingValue: {
        type: String
      },
      probabilityValue: {
        type: Number
      },
      patientAmountValue: {
        type: Number
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapControls
        },
        niftiTypeToggle: {
          labels: [staticContent.brainMapViewer.probability],
          values: ['probabilityMap']
        }
      }
    },
    methods: {
      resetMasking: function () {
        this.$emit('resetMasking')
      },
      changeMasking: function (payload) {
        this.$emit('setMasking', payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .probability-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: $global-spacing-unit;

    @include mq($from: 1120px) {
      align-items: flex-end;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .probability-container-value {
    @include mq($until: 1000px) {
      margin-bottom: $global-spacing-unit;
    }
  }

  .probability-value {
    color: $color-dodger-blue;
  }
</style>
