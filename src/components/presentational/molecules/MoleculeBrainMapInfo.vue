<template>
  <div class="brain-map-info">
    <MoleculeBrainViewerSectionHeading
      :headingText="content.info"
    />

    <div class="u-margin-top">

      <div class="o-layout-flex o-layout-flex--between-row">
        <div class="brain-map-info__type">
          <AtomTextBody isSmall>
            {{ content.expectedResidualVolume }}
          </AtomTextBody>
        </div>
        <div class="brain-map-info__result">
          <AtomTextBody isSmall>
            {{ expectedResidualVolume }}
          </AtomTextBody>
        </div>
      </div>

      <div class="o-layout-flex o-layout-flex--between-row u-margin-top-small">
        <div class="brain-map-info__type">
          <AtomTextBody isSmall>
            {{ content.expectedResectabilityIndex }}
          </AtomTextBody>
        </div>
        <div class="brain-map-info__result">
          <AtomTextBody isSmall>
            {{ expectedResectabilityIndex }}
          </AtomTextBody>
        </div>
      </div>

      <div class="u-margin-top">
        <AtomTextBody isSmall>
          {{ content.description }}
        </AtomTextBody>
      </div>

    </div>
  </div>
</template>

<script>
  import MoleculeBrainViewerSectionHeading
    from '@/components/presentational/molecules/MoleculeBrainViewerSectionHeading'
  import { staticContent } from '@/data/static-content'
  import AtomTextBody from '@/components/presentational/atoms/AtomTextBody'

  export default {
    name: 'MoleculeBrainMapInfo',
    components: {
      AtomTextBody,
      MoleculeBrainViewerSectionHeading
    },
    props: {
      expectedResidualVolume: {
        type: String
      },
      expectedResectabilityIndex: {
        type: String
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapInfo
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .brain-map-info__result {
    color: $color-dodger-blue;
  }
</style>
