<template>
  <div>
    <AtomTextHeading
      isUppercase
      isSmall
      :level="2"
    >
      {{ heading }}
    </AtomTextHeading>
    <ul class="brain-map-list">
      <li
        class="brain-map-list__item"
        v-for="brainMapFolder in brainMapFolders"
        :key="brainMapFolder.id"
        @click="setSelectedFolderId(brainMapFolder.id)"
      >
        <MoleculeFolderItem  :isActive="isActive(brainMapFolder.id)">
         <router-link :to="{name: ROUTES.BRAIN_MAP_MANAGER.name}">
          {{ brainMapFolder.name }}
          </router-link>
        </MoleculeFolderItem>
      </li>
    </ul>
  </div>

</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { AtomTextHeading } from '@/components/presentational/atoms'
  import MoleculeFolderItem from './MoleculeFolderItem'
  import { ROUTES } from '@/config/routes'
  export default {
    name: 'MoleculeBrainMapList',
    components: {
      MoleculeFolderItem,
      AtomTextHeading
    },
    props: {
      brainMapFolders: {
        type: Array,
        required: true
      },
      heading: {
        type: String,
        required: true
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
    methods: {
      isActive: function (id) {
        return this.$store.state.brainMaps.selectedFolderId === id
      },
      setSelectedFolderId: function (folderId) {
        this.$emit('setSelectedFolderId', folderId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .brain-map-list {
    list-style: none;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
  }

  .brain-map-list__item {
    cursor: pointer;
    display: flex;
    margin-top: $global-spacing-unit-small;
    padding-left: 0;
    text-indent: -1em;
  }

  .brain-map-list__item--active {
    text-decoration: underline;
  }
</style>
