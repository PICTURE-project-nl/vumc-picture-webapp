<template>
  <div>
    <div class="resolution-container">
      <AtomFormInputToggle
        isSmall
        :groupModel="resolutionValue"
        :labels="resolutionToggle.labels"
        :values="resolutionToggle.values"
        @change="setResolutionValue"
        v-if="false"
      />
    </div>

    <AtomDivider class="resolution-container-divider" v-if="false" />

    <div class="probability-container">

      <AtomTextHeading
        class="brain-map-name"
        :level="1"
        isSmall
        v-if="!isMobile"
      >
        {{ title }}
      </AtomTextHeading>

      <AtomFormInputToggle
        isSmall
        :groupModel="mainViewValue"
        :labels="mainViewToggle.labels"
        :values="mainViewToggle.values"
        @change="setMainViewValue"
      />

    </div>

  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { isMobile } from '@/assets/scripts/utils/media-queries'

  import {
    AtomTextHeading,
    AtomDivider,
    AtomFormInputToggle
  } from '@/components/presentational/atoms'

  export default {
    name: 'OrganismBrainMapPanelHeader',
    components: {
      AtomTextHeading,
      AtomDivider,
      AtomFormInputToggle
    },
    props: {
      title: {
        type: String
      },
      resolutionValue: {
        type: String
      },
      mainViewValue: {
        type: String
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapViewer,
          ...staticContent.brainMapControls
        },
        resolutionToggle: {
          labels: [staticContent.brainMapViewer.lowRes, staticContent.brainMapViewer.highRes],
          values: ['lowRes', 'highRes']
        },
        mainViewToggle: {
          labels: [staticContent.brainMapControls.axi, staticContent.brainMapControls.cor, staticContent.brainMapControls.sag],
          values: ['axi', 'cor', 'sag']
        }
      }
    },
    computed: {
      isMobile: function () {
        return isMobile(this.$mq)
      }
    },
    methods: {
      setResolutionValue: function (value) {
        this.$emit('setResolutionValue', value)
      },
      setMainViewValue: function (value) {
        this.$emit('setMainViewValue', value)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .mobile-header {
    display: flex;
    justify-content: space-between;
    padding-left: $global-spacing-unit-small;
    padding-right: $global-spacing-unit-small;
  }

  .probability-container {
    align-items: center;
    display: flex;
    flex-direction: column;

    @include mq($from: 1120px) {
      align-items: flex-start;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .brain-map-name {
    @include mq($until: 1120px) {
      margin-bottom: $global-spacing-unit-small;
    }
  }

  .resolution-container {
    display: flex;
    justify-content: space-between;

    @include mq($until: 1120px) {
      padding: 0 $global-spacing-unit;
    }
  }

  .resolution-container-divider {
    @include mq($until: 1120px) {
      margin: 0 $global-spacing-unit;
    }
  }
</style>
