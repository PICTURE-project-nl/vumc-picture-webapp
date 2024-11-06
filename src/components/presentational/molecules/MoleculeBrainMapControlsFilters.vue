<template>
  <div>


    <!-- <MoleculeBrainViewerSectionHeading class="lable_space"
      :headingText="content.adjustThreshold"
      :actionText="content.reset"
      @action="resetFilters"
    />
    -->

      <AtomFormInputSlider
        name="threshold"
        :minValue="0"
        :maxValue="1"
        :rangeValue="thresholdValue"
        :interval="0.01"
        hasGradient
        @change="changeThreshold"
      />

  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { AtomFormInputSlider } from '@/components/presentational/atoms'
  import MoleculeBrainViewerSectionHeading from '@/components/presentational/molecules/MoleculeBrainViewerSectionHeading.vue'

  export default {
    name: 'MoleculeBrainMapControlsFilters',
    components: {
      AtomFormInputSlider,
      MoleculeBrainViewerSectionHeading
    },
    props: {
      thresholdValue: {
        type: Array
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
      resetFilters: function () {
        this.$emit('resetFilters')
      },
      changeThreshold: function (payload) {
        this.$emit('setThreshold', payload.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter-reset-button {
    color: #1da79f;//$color-ghost;
    cursor: pointer;
    text-decoration: underline;
    background-color:#1da79f;
    background:#1da79f;
  }
  .lable_space{
    padding-right: 5px;
  }
</style>
