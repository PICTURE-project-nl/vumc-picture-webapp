<template>
  <div>
    <div class="brain-map-overview-block__heading">
      <AtomTextHeading
        isSmall
        :level="3"
      >
        {{ title }} <span class="brain-map-overview-block__counter">({{ brainMaps.length }})</span>
      </AtomTextHeading>
      <div v-if="!isResearch" class="brain-map-overview-block__button">
        <AtomButton
          isExtraSmall
          :toName="buttonUrl"
          :toParams="{stepSlug: 'upload'}"
        >
          {{ content.upload }}
        </AtomButton>
      </div>
    </div>

    <div class="brain-map-overview-block__items">
      <div
        v-if="brainMaps.length > 0"
        class="o-grid"
      >
        <template
          v-for="brainMap in brainMaps"
        >
          <div
            :key="brainMap.id"
             v-if="(brainMap.lowResBrainMap && brainMap.lowResBrainMap.probabilityMapFileURL && Object.keys(brainMap.lowResBrainMap).length > 0)"

             class="o-grid__cell u-1/4@laptop u-1/2@tablet u-1/1@mobile"
          >
            <MoleculeFileTile
              :fileId="brainMap.id"
              :isResearch="!!brainMap.isResearch"
              :toName="ROUTES.BRAIN_MAP_VIEWER_ID.name"
              :toParams="{ id: brainMap.id }"
              :tags="brainMap.tags ? brainMap.tags : []"
              :external-link="brainMap.externalLink ? brainMap.externalLink : ''"
              :name="brainMap.brainMapName"
              :thumbnailUrl="brainMap.T1cSliceFileURL"
              :subText="`${brainMap.surgicalComplexity}`"
              @setPopupFileId="setPopupFileId"
            >
            </MoleculeFileTile>
          </div>
          <div
            :key="brainMap.id"
            v-else-if="brainMap.lowResBrainMap && Object.keys(brainMap.lowResBrainMap).length < 6"
            class="o-grid__cell u-1/4@laptop u-1/2@tablet u-1/1@mobile"
          >
            <MoleculeFileTile
              :fileId="brainMap.id"
              name="Failed"
              isDisabled
            >
            </MoleculeFileTile>
          </div>
          <div
            :key="brainMap.id"
            v-else
            class="o-grid__cell u-1/4@laptop u-1/2@tablet u-1/1@mobile"
          >
            <MoleculeFileTile
              :fileId="brainMap.id"
              name="in progress"
              isDisabled
            >
            </MoleculeFileTile>
          </div>
        </template>
      </div>
      <div v-else>{{ content.selectFolder }}</div>
    </div>
  </div>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { brainMapsPropTypes } from '@/prop-types/brain-maps'
  import { MoleculeFileTile } from '@/components/presentational/molecules'
  import { AtomTextHeading, AtomButton, AtomIcon } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'
  import { userMixins } from '@/store/user'

  export default {
    name: 'OrganismBrainMapOverviewBlock',
    components: {
      MoleculeFileTile,
      AtomTextHeading,
      AtomButton,
      AtomIcon
    },
    mixins: [
      userMixins.authenticatedData
    ],
    props: {
      brainMaps: brainMapsPropTypes.brainMapsArray,
      isResearch: {
        type: Boolean
      },
      title: {
        type: String
      }
    },
    data: function () {
      return {
        ROUTES,
        content: {
          ...staticContent.brainMapManager
        }
      }
    },
    computed: {
      buttonUrl: function () {
        if (this.userIsAuthenticated) {
          return ROUTES.BRAIN_MAP_UPLOAD.name
        } else {
          return ROUTES.USER_SIGN_UP.name
        }
      }
    },
    methods: {
      setPopupFileId: function (fileId) {
        this.$emit('setPopupFileId', fileId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .brain-map-overview-block__heading {
    align-items: center;
    border-bottom: 1px solid $color-ghost;
    display: flex;
    justify-content: space-between;
    //margin-top: -7px; // this is hack is needed to get 2 separate components on the same alignment
    margin-bottom: $inuit-global-spacing-unit;
    min-height: 44px;
    //padding-bottom: $global-spacing-unit-small;
  }

  .brain-map-overview-block__button {
    display: none;
  }

  @include mq($from: tablet) {
    .brain-map-overview-block__items {
      padding-left: $global-spacing-unit;
      margin-right: $global-spacing-unit;
    }

    .brain-map-overview-block__heading {
      padding-left: $global-spacing-unit;
      margin-right: $global-spacing-unit;
    }

    .brain-map-overview-block__button {
      display: block;
      padding-bottom: $global-spacing-unit-tiny;
    }
  }

  .brain-map-overview-block__counter {
    color: $color-ghost;
  }
</style>
