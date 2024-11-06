<template>
  <div>
    <div class="manager-header-heading" :class="{'u-hidden': isTabletOrBelow}">
      <AtomTextHeading :level="3" is-small>
        {{ content.title }}
      </AtomTextHeading>
    </div>

    <div
      class="manager-header-heading--mobile"
      :class="{'u-hidden': !isTabletOrBelow}"
      @click="toggleMenu"
    >
      <AtomTextHeading :level="1" isSmall>
        {{ content.title }}
      </AtomTextHeading>
      <AtomIcon :type="iconType"></AtomIcon>
    </div>

    <div class="manager-header-folders" :class="{'u-hidden': isMenuHidden && isTabletOrBelow}">
      <div v-if="isAuthenticated">
        <MoleculeBrainMapList
          :heading="content.myBrainMaps"
          @setSelectedFolderId="setSelectedFolderId"
          :brainMapFolders="userBrainMapsFolders"
        ></MoleculeBrainMapList>
      </div>

      <div class="u-margin-top-large">
        <div>
           <AtomTextHeading  isUppercase isSmall   :level="2">
                 {{content.existingBrainmaps}}
          </AtomTextHeading>
        </div>
      </div>

       <div class="u-margin-top-small">
      <MoleculeFolderItem :isActive="true"><router-link :to="{ name: ROUTES.RESEARCH_BRAIN_MAP_MANAGER.name }" style="margin-left:-13px">  Research Brain Maps  </router-link></MoleculeFolderItem>
      </div>
    </div>
  </div>
</template>

<script>
  import { brainMapsPropTypes } from '@/prop-types/brain-maps'
  import { AtomTextHeading, AtomIcon } from '@/components/presentational/atoms'
  import { MoleculeBrainMapList,MoleculeFolderItem } from '@/components/presentational/molecules'
  import { isTabletOrSmaller } from '@/assets/scripts/utils/media-queries'
  import { staticContent } from '@/data/static-content'
  import { ROUTES } from '@/config/routes';
  export default {
    name: 'OrganismFolderColumn',
    components: {
      AtomTextHeading,
      MoleculeBrainMapList,
      AtomIcon,
      MoleculeFolderItem
    },
    props: {
      userBrainMapsFolders: brainMapsPropTypes.foldersArray,
      // researchBrainMapsFolders: brainMapsPropTypes.foldersArray,
      isAuthenticated: Boolean
    },
    data: function () {
      return {
        ROUTES,
        isMenuHidden: true,
        content: {
          ...staticContent.brainMapManager
        }
      }
    },
    computed: {
      iconType: function () {
        return this.isMenuHidden ? 'arrow-down' : 'arrow-up'
      },
      isTabletOrBelow: function () {
        return isTabletOrSmaller(this.$mq)
      }
    },
    methods: {
      setSelectedFolderId: function (folderId) {
        this.$emit('setSelectedFolderId', folderId)
        this.toggleMenu()
      },
      toggleMenu: function () {
        this.isMenuHidden = !this.isMenuHidden
      }
    }
  }
</script>
<style lang="scss" scoped>
  .manager-header-heading {
    border-bottom: 1px solid $color-ghost;
    display: none;
    margin-bottom: $inuit-global-spacing-unit;
    //padding-bottom: $global-spacing-unit-small;
    min-height: 44px;

    @include mq($from: tablet) {
      display: flex;
      align-items: center;
      margin-left: $global-spacing-unit;
    }
  }

  .manager-header-heading--mobile {
    align-items: center;
    border-bottom: 1px solid $color-ghost;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin-bottom: $inuit-global-spacing-unit;
    padding-bottom: $global-spacing-unit-small;

    @include mq($from: tablet) {
      display: none;
    }
  }

  .manager-header-folders {
    @include mq($from: tablet) {
      padding-left: $global-spacing-unit;
    }
  }
</style>
